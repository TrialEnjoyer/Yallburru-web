import { useState, useEffect, useCallback, useMemo } from 'react';
import { X, Upload, Image as ImageIcon, Loader2, Trash2, AlertCircle, RotateCw, ZoomIn, CropIcon } from 'lucide-react';
import ReactCrop, { type Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { UploadButton } from '~/utils/uploadthing';
import {genUploader} from 'uploadthing/client';
import { useUserProfile } from '~/utils/UserProfileContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '~/components/ui/dialog';
import { Button } from '~/components/ui/button';
import { supabase } from '~/utils/supabase';
import type { Database } from '~/types/supabase';
import { saveImageMetadata, fetchImages, deleteImage } from '~/utils/image-upload';
import { getCookie, setCookie, removeCookie } from '~/utils/cookie';
import NextImage from 'next/image';
import { OurFileRouter } from '~/server/uploadthing';

type Image = Database['public']['Tables']['images']['Row'];

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImageSelect: (url: string) => void;
}

const CACHE_KEY = 'uploadedImages';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

type CacheData = {
  images: Image[];
  timestamp: number;
};

const getCachedImages = (): CacheData | null => {
  const data = getCookie<CacheData>(CACHE_KEY);
  if (!data) return null;

  if (Date.now() - data.timestamp > CACHE_DURATION) {
    removeCookie(CACHE_KEY);
    return null;
  }

  return data;
};

const setCachedImages = (images: Image[]) => {
  const cacheData: CacheData = {
    images,
    timestamp: Date.now(),
  };
  setCookie(CACHE_KEY, cacheData, { expires: 1 }); // Expires in 1 day
};

interface ButtonAppearance {
  button: string;
  allowedContent: string;
}

const buttonAppearance: ButtonAppearance = {
  button: "bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg w-full flex items-center justify-center gap-2",
  allowedContent: "text-sm text-gray-500 mt-2",
};

interface DeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
}

function DeleteDialog({ isOpen, onClose, onConfirm, isDeleting }: DeleteDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Image</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this image? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Deleting...
              </>
            ) : (
              'Delete'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface ImageThumbnailProps {
  image: Image;
  onSelect: (url: string) => void;
  onDelete: (id: string) => void;
  onEdit: (image: Image) => void;
}

function ImageThumbnail({ image, onSelect, onDelete, onEdit }: ImageThumbnailProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative group">
      <div className={`w-full aspect-square rounded-lg overflow-hidden ${isLoading ? 'bg-gray-100 animate-pulse' : ''}`}>
        <NextImage
          width={100}
          height={100}
          src={image.url}
          alt={image.alt_text ?? image.filename}
          className={`w-full h-full object-cover transition-all duration-200 ${
            isLoading ? 'opacity-0' : 'opacity-100 group-hover:scale-105'
          }`}
          onLoad={() => setIsLoading(false)}
          onClick={() => !isLoading && onSelect(image.url)}
        />
      </div>
      {!isLoading && (
        <>
          <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {/*!image.modified && (
              <button
                onClick={() => onEdit(image)}
                className="p-2 rounded-full bg-white text-gray-600 hover:text-blue-500 hover:bg-white transition-all shadow-sm"
                title="Edit image"
              >
                <CropIcon className="h-4 w-4" />
              </button>
            )*/}
            <button
              onClick={() => onDelete(image.id)}
              className="p-2 rounded-full bg-white text-gray-600 hover:text-red-500 hover:bg-white transition-all shadow-sm"
              title="Delete image"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          {image.modified && (
            <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
              Modified
            </span>
          )}
        </>
      )}
    </div>
  );
}

interface EditingState {
  imageUrl: string;
  originalId: string;
  crop: Crop;
  rotation: number;
  scale: number;
}

const DEFAULT_CROP: Crop = {
  unit: '%',
  width: 100,
  height: 100,
  x: 0,
  y: 0,
};

function ImageEditor({ image: initialImage, onSave, onCancel, userId }: { 
  image: EditingState; 
  onSave: (imageUrl: string) => void;
  onCancel: () => void;
  userId: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [crop, setCrop] = useState<Crop>(initialImage.crop);
  const [rotation, setRotation] = useState(initialImage.rotation);
  const [scale, setScale] = useState(initialImage.scale);

  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      // Create a temporary canvas to apply transformations
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get canvas context');

      // Load the image
      const img = new Image();
      img.crossOrigin = 'anonymous';
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = reject;
        img.src = initialImage.imageUrl;
      });

      // Calculate dimensions
      const cropX = (crop.x / 100) * img.width;
      const cropY = (crop.y / 100) * img.height;
      const cropWidth = (crop.width / 100) * img.width;
      const cropHeight = (crop.height / 100) * img.height;

      // Set canvas size to match crop
      canvas.width = cropWidth ?? img.width;
      canvas.height = cropHeight ?? img.height;

      // Apply transformations
      ctx.save();
      ctx.translate(canvas.width/2, canvas.height/2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(scale, scale);
      ctx.translate(-canvas.width/2, -canvas.height/2);

      // Draw the image
      if (crop.width && crop.height) {
        // Draw cropped region
        ctx.drawImage(
          img,
          cropX, cropY, cropWidth, cropHeight,
          0, 0, canvas.width, canvas.height
        );
      } else {
        // Draw full image
        ctx.drawImage(
          img,
          -img.width/2, -img.height/2, img.width, img.height
        );
      }

      ctx.restore();

      // Convert to blob
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (b) => b ? resolve(b) : reject(new Error('Failed to create blob')),
          'image/jpeg',
          0.9
        );
      });

      // Convert Blob to File
      const file = new File([blob], 'edited-image.jpg', { type: 'image/jpeg' });

      const { createUpload } = genUploader<OurFileRouter>({package: "@uploadthing/react"});

      const { pauseUpload, resumeUpload, done } = await createUpload("imageUploader", {
        files: [file],
      });

      // Pause the upload of a file (if needed)
      pauseUpload(file);
      // Resume the upload of a file
      resumeUpload(file);
      // Await the completion of all files
      const files = await done();
      
      if (files[0]?.url) {
        // Save the edited image metadata and update the library
        if (userId) {
          try {
            const result = await saveImageMetadata(files[0].url, userId, {
              modified: true,
              originalId: initialImage.originalId,
            });

            if (!result.success || !result.data) {
              throw new Error(result.error ?? 'Failed to save image metadata');
            }

            // Update the images state through the parent component
            onSave(files[0].url);
          } catch (err) {
            console.error('Error saving image metadata:', err);
            throw new Error('Failed to save image metadata');
          }
        } else {
          throw new Error('User ID not found');
        }
      } else {
        throw new Error('Failed to get uploaded file URL');
      }
    } catch (err) {
      console.error('Error saving edited image:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Edit Image</DialogTitle>
          <DialogDescription>
            Crop, rotate, or zoom the image. Cropping is optional.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="relative border rounded-lg overflow-hidden bg-gray-50">
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              aspect={undefined}
            >
              <img
                src={initialImage.imageUrl}
                className='w-full h-full'
                style={{
                  transform: `rotate(${rotation}deg) scale(${scale})`,
                  maxHeight: '60vh',
                  width: 'auto',
                }}
                alt="Edit preview"
              />
            </ReactCrop>
          </div>

          <div className="space-y-4">
            <div className="flex gap-4 justify-center">
              <Button
                variant="outline"
                onClick={() => setRotation((prev) => (prev + 90) % 360)}
                className="flex items-center gap-2"
              >
                <RotateCw className="h-4 w-4" />
                Rotate
              </Button>
              <Button
                variant="outline"
                onClick={() => setScale((prev) => prev + 0.1)}
                className="flex items-center gap-2"
              >
                <ZoomIn className="h-4 w-4" />
                Zoom In
              </Button>
              <Button
                variant="outline"
                onClick={() => setScale((prev) => Math.max(0.1, prev - 0.1))}
                className="flex items-center gap-2"
              >
                <ZoomIn className="h-4 w-4 rotate-180" />
                Zoom Out
              </Button>
            </div>

            <div className="flex justify-center">
              <Button
                variant="ghost"
                onClick={() => setCrop(DEFAULT_CROP)}
                size="sm"
              >
                Reset Crop
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onCancel} disabled={isLoading}>
            Cancel
          </Button>
          <Button 
            onClick={() => void handleSave()} 
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function ImageUploadModal({ isOpen, onClose, onImageSelect }: ImageUploadModalProps) {
  const { userId } = useUserProfile();
  const [showPreviousImages, setShowPreviousImages] = useState(false);
  const [showModifiedImages, setShowModifiedImages] = useState(false);
  const [images, setImages] = useState<Image[]>([]);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [deletingImage, setDeletingImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [editingImage, setEditingImage] = useState<EditingState | null>(null);

  const loadImages = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Check cache first
      const cachedData = getCachedImages();
      if (cachedData) {
        setImages(cachedData.images);
        setIsLoading(false);
        return;
      }

      const result = await fetchImages();
      if (!result.success) {
        throw new Error(result.error);
      }

      const fetchedImages = Array.isArray(result.data) ? result.data : [];
      setImages(fetchedImages);
      setCachedImages(fetchedImages);
    } catch (err) {
      console.error('Error fetching images:', err);
      setError('Failed to load images. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen && showPreviousImages) {
      void loadImages();
    } else {
      // Reset state when modal is closed
      setImages([]);
      setError(null);
      setIsLoading(false);
    }
  }, [isOpen, showPreviousImages, loadImages]);

  const filteredImages = useMemo(() => {
    return showModifiedImages ? images : images.filter(img => !img.modified);
  }, [images, showModifiedImages]);

  const handleImageUploadComplete = async (res: { url: string }[]) => {
    if (res[0]?.url && userId) {
      setUploadStatus('uploading');
      
      try {
        const result = await saveImageMetadata(res[0].url, userId);
        if (!result.success || !result.data) {
          throw new Error(result.error ?? 'Failed to save image');
        }

        const newImage = result.data as Image;
        const newImages = [newImage, ...images];
        setImages(newImages);
        setCachedImages(newImages);
        
        setUploadStatus('success');
        onImageSelect(res[0].url);
        onClose();
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to save image. Please try again.';
        console.error('Error saving image:', err);
        setUploadStatus('error');
        setError(message);
      }
    }
  };

  const handleDeleteImage = async (imageId: string) => {
    setDeletingImage(imageId);
    try {
      const result = await deleteImage(imageId);
      if (!result.success) {
        throw new Error(result.error);
      }

      // Update local state and cache
      const newImages = images.filter(img => img.id !== imageId);
      setImages(newImages);
      setCachedImages(newImages);
      setDeleteConfirm(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete image. Please try again.';
      console.error('Error deleting image:', err);
      setError(message);
    } finally {
      setDeletingImage(null);
    }
  };

  const handleStartEdit = (image: Image) => {
    setEditingImage({
      imageUrl: image.url,
      originalId: image.id,
      crop: DEFAULT_CROP,
      rotation: 0,
      scale: 1,
    });
  };

  const handleSaveEdit = async (newImageUrl: string) => {
    if (!editingImage || !userId) return;
    
    setUploadStatus('uploading');
    try {
      const result = await saveImageMetadata(newImageUrl, userId, {
        modified: true,
        originalId: editingImage.originalId,
      });

      if (!result.success || !result.data) {
        throw new Error(result.error ?? 'Failed to save image');
      }

      const newImage = result.data as Image;
      
      // Update local state with the new image at the start of the array
      const newImages = [newImage, ...images];
      setImages(newImages);
      
      // Update cookies with the new image list
      setCachedImages(newImages);
      
      setEditingImage(null);
      setUploadStatus('success');
      onImageSelect(newImageUrl);
      onClose();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save edited image';
      console.error('Error saving edited image:', err);
      setError(message);
      setUploadStatus('error');
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Upload Image</DialogTitle>
            <DialogDescription>
              Upload a new image or select from previously uploaded images.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="relative">
              {uploadStatus === 'uploading' && (
                <div className="absolute inset-0 bg-white flex items-center justify-center z-10 rounded-lg">
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                    <span className="text-sm text-gray-600">Uploading image...</span>
                  </div>
                </div>
              )}
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 transition-colors hover:border-gray-300">
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={handleImageUploadComplete}
                  onUploadError={(error: Error) => {
                    setError(error.message);
                    setUploadStatus('error');
                  }}
                  appearance={buttonAppearance}
                />
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or select from library</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={() => setShowPreviousImages(!showPreviousImages)}
                  className="w-full"
                >
                  {showPreviousImages ? (
                    <span className="flex items-center gap-2">
                      <X className="h-4 w-4" />
                      Close Library
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <ImageIcon className="h-4 w-4" />
                      Browse Library
                    </span>
                  )}
                </Button>
              </div>

              {showPreviousImages && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowModifiedImages(!showModifiedImages)}
                      className="text-gray-500 hover:text-gray-900"
                    >
                      {showModifiedImages ? 'Hide Modified Images' : 'Show Modified Images'}
                    </Button>
                  </div>

                  <div className="relative rounded-lg border border-gray-200 bg-white">
                    <div className="grid grid-cols-3 gap-4 p-4 max-h-[400px] overflow-y-auto">
                      {isLoading ? (
                        <div className="col-span-3 flex items-center justify-center py-12">
                          <div className="flex flex-col items-center gap-2">
                            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                            <span className="text-sm text-gray-600">Loading images...</span>
                          </div>
                        </div>
                      ) : error ? (
                        <div className="col-span-3 text-center py-12">
                          <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-500 opacity-50" />
                          <p className="text-gray-500 mb-4">{error}</p>
                          <Button
                            variant="outline"
                            onClick={() => void loadImages()}
                            className="mx-auto"
                          >
                            Try Again
                          </Button>
                        </div>
                      ) : filteredImages.length === 0 ? (
                        <div className="col-span-3 text-center py-12">
                          <ImageIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                          <p className="text-gray-500">No {showModifiedImages ? '' : 'original '}images found</p>
                        </div>
                      ) : (
                        filteredImages.map((image) => (
                          <ImageThumbnail
                            key={image.id}
                            image={image}
                            onSelect={(url) => {
                              onImageSelect(url);
                              onClose();
                            }}
                            onDelete={(id) => setDeleteConfirm(id)}
                            onEdit={handleStartEdit}
                          />
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {error && uploadStatus === 'error' && (
            <div className="text-red-500 text-sm mt-2 flex items-center gap-2 bg-red-50 p-3 rounded-lg">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {editingImage && (
        <ImageEditor
          image={editingImage}
          onSave={handleSaveEdit}
          onCancel={() => setEditingImage(null)}
          userId={userId ?? ''}
        />
      )}

      <DeleteDialog
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={() => {
          if (deleteConfirm) {
            void handleDeleteImage(deleteConfirm);
          }
        }}
        isDeleting={!!deletingImage}
      />
    </div>
  );
} 
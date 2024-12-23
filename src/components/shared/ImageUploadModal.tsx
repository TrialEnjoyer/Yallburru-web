import { useState, useEffect } from 'react';
import { X, Upload, Image as ImageIcon, Loader2, Trash2, AlertCircle } from 'lucide-react';
import { UploadButton } from '~/utils/uploadthing';
import { supabase } from '~/utils/supabase';
import type { Database } from '~/types/supabase';
import Cookies from 'js-cookie';

type Image = Database['public']['Tables']['images']['Row'];

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImageSelect: (imageUrl: string) => void;
}

const CACHE_KEY = 'yallburru_images_cache';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

interface CacheData {
  images: Image[];
  timestamp: number;
}

export default function ImageUploadModal({ isOpen, onClose, onImageSelect }: ImageUploadModalProps) {
  const [showPreviousImages, setShowPreviousImages] = useState(false);
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && showPreviousImages) {
      void fetchImages();
    }
  }, [isOpen, showPreviousImages]);

  const getCachedImages = (): CacheData | null => {
    const cached = Cookies.get(CACHE_KEY);
    if (!cached) return null;
    
    try {
      const data = JSON.parse(cached) as CacheData;
      if (Date.now() - data.timestamp > CACHE_DURATION) {
        Cookies.remove(CACHE_KEY);
        return null;
      }
      return data;
    } catch {
      Cookies.remove(CACHE_KEY);
      return null;
    }
  };

  const setCachedImages = (images: Image[]) => {
    const cacheData: CacheData = {
      images,
      timestamp: Date.now(),
    };
    Cookies.set(CACHE_KEY, JSON.stringify(cacheData), { expires: 1 }); // Expires in 1 day
  };

  const fetchImages = async () => {
    setError(null);
    setIsLoading(true);

    // Try to get cached images first
    const cached = getCachedImages();
    if (cached) {
      setImages(cached.images);
      setIsLoading(false);
      return;
    }

    // If no cache, fetch from Supabase
    const { data, error } = await supabase
      .from('images')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching images:', error);
      setError('Failed to load images. Please try again.');
    } else {
      setImages(data ?? []);
      setCachedImages(data ?? []);
    }
    setIsLoading(false);
  };

  const handleImageUploadComplete = async (res: { url: string }[]) => {
    if (res[0]?.url) {
      setUploadStatus('uploading');
      const filename = res[0].url.split('/').pop() ?? 'unknown';
      
      try {
        const { data, error } = await supabase.from('images').insert([
          {
            url: res[0].url,
            filename,
            size: 0,
          },
        ]).select().single();

        if (error) throw error;

        // Update local state and cache
        const newImages = [data, ...images];
        setImages(newImages);
        setCachedImages(newImages);
        
        setUploadStatus('success');
        onImageSelect(res[0].url);
        onClose();
      } catch (error) {
        console.error('Error saving image:', error);
        setUploadStatus('error');
        setError('Failed to save image. Please try again.');
      }
    }
  };

  const handleDeleteImage = async (imageId: string) => {
    if (!deleteConfirm || deleteConfirm !== imageId) {
      setDeleteConfirm(imageId);
      return;
    }

    try {
      const { error } = await supabase
        .from('images')
        .delete()
        .eq('id', imageId);

      if (error) throw error;

      // Update local state and cache
      const newImages = images.filter(img => img.id !== imageId);
      setImages(newImages);
      setCachedImages(newImages);
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting image:', error);
      setError('Failed to delete image. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Select Image</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 rounded-lg p-1 hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg flex items-center gap-2">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        <div className="space-y-4">
          {/* Upload Section */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            {uploadStatus === 'uploading' ? (
              <div className="flex items-center justify-center gap-2 text-blue-600">
                <Loader2 size={20} className="animate-spin" />
                <span>Uploading image...</span>
              </div>
            ) : (
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={handleImageUploadComplete}
                onUploadError={(error: Error) => {
                  console.error('Upload error:', error);
                  setError('Failed to upload image. Please try again.');
                  setUploadStatus('error');
                }}
                appearance={{
                  button: "bg-blue-500 hover:bg-blue-600",
                  allowedContent: "text-gray-600 text-sm",
                }}
              />
            )}
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">OR</span>
            </div>
          </div>

          {/* Previous Images Section */}
          <button
            onClick={() => setShowPreviousImages(!showPreviousImages)}
            className="w-full py-2 px-4 border border-gray-300 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50"
          >
            <ImageIcon size={20} />
            {showPreviousImages ? 'Hide Previous Images' : 'Use Previous Images'}
          </button>

          {showPreviousImages && (
            <div className="mt-4">
              {isLoading ? (
                <div className="text-center py-8">
                  <Loader2 size={24} className="animate-spin mx-auto mb-2" />
                  <p className="text-gray-600">Loading images...</p>
                </div>
              ) : images.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <ImageIcon size={24} className="mx-auto mb-2 opacity-50" />
                  <p>No previous images found</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-4 max-h-[400px] overflow-y-auto p-1">
                  {images.map((image) => (
                    <div key={image.id} className="relative group">
                      <button
                        onClick={() => {
                          onImageSelect(image.url);
                          onClose();
                        }}
                        className="relative aspect-square w-full overflow-hidden rounded-lg border border-gray-200 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={image.url}
                          alt={image.alt_text ?? image.filename}
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity" />
                      </button>
                      <button
                        onClick={() => handleDeleteImage(image.id)}
                        className={`absolute top-2 right-2 p-1.5 rounded-full 
                          ${deleteConfirm === image.id 
                            ? 'bg-red-500 text-white hover:bg-red-600' 
                            : 'bg-white text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100'
                          } transition-all shadow-sm`}
                        title={deleteConfirm === image.id ? "Click again to confirm deletion" : "Delete image"}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
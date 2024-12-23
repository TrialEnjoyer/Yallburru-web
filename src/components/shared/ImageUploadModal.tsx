import { useState, useEffect } from 'react';
import { X, Upload, Image as ImageIcon } from 'lucide-react';
import { UploadButton } from '~/utils/uploadthing';
import { supabase } from '~/utils/supabase';
import type { Database } from '~/types/supabase';

type Image = Database['public']['Tables']['images']['Row'];

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImageSelect: (imageUrl: string) => void;
}

export default function ImageUploadModal({ isOpen, onClose, onImageSelect }: ImageUploadModalProps) {
  const [showPreviousImages, setShowPreviousImages] = useState(false);
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen && showPreviousImages) {
      void fetchImages();
    }
  }, [isOpen, showPreviousImages]);

  const fetchImages = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('images')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching images:', error);
    } else {
      setImages(data ?? []);
    }
    setIsLoading(false);
  };

  const handleImageUploadComplete = async (res: { url: string }[]) => {
    // Save the uploaded image to our Supabase images table
    if (res[0]?.url) {
      const filename = res[0].url.split('/').pop() ?? 'unknown';
      const { data, error } = await supabase.from('images').insert([
        {
          url: res[0].url,
          filename,
          size: 0, // We don't get the size from uploadthing in this response
        },
      ]);
      if (error) {
        console.error('Error saving image to Supabase:', error);
      } else {
        console.log('Image saved to Supabase:', data);
      }
      onImageSelect(res[0].url);
      onClose();
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
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          {/* Upload Section */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={handleImageUploadComplete}
              onUploadError={(error: Error) => {
                console.error('Upload error:', error);
              }}
            />
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
            Use Previous Images
          </button>

          {showPreviousImages && (
            <div className="mt-4">
              {isLoading ? (
                <div className="text-center py-4">Loading images...</div>
              ) : images.length === 0 ? (
                <div className="text-center py-4 text-gray-500">
                  No previous images found
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-4 max-h-60 overflow-y-auto">
                  {images.map((image) => (
                    <button
                      key={image.id}
                      onClick={() => {
                        onImageSelect(image.url);
                        onClose();
                      }}
                      className="relative group aspect-square overflow-hidden rounded-lg border border-gray-200 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={image.url}
                        alt={image.alt_text ?? image.filename}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity" />
                    </button>
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
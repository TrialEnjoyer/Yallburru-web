import { supabase } from './supabase';
import type { Database } from '~/types/supabase';

type Image = Database['public']['Tables']['images']['Row'];

interface UploadResult {
  success: boolean;
  data?: Image | Image[];
  error?: string;
}

export async function saveImageMetadata(
  url: string,
  userId: string,
  options: {
    modified?: boolean;
    originalId?: string;
  } = {}
): Promise<UploadResult> {
  try {
    const filename = url.split('/').pop() ?? 'unknown';
    const toInsert = {
        url:url,
        filename:filename,
        size: 0,
        owner_id: userId,
        modified: options.modified ?? false,
        original_id: options.originalId ?? null,
    }
    console.log('toInsert', toInsert);
    const { data, error } = await supabase
      .from('images')
      .insert(toInsert)
      .select('*')
      //.single();
    console.log('data', data);
    if (error) throw error;
    if (!data) throw new Error('No data returned from insert');

    return {
      success: true,
      data: data[0],
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to save image metadata';
    console.error('Error saving image metadata:', err);
    return {
      success: false,
      error: message,
    };
  }
}

export async function fetchImages(): Promise<UploadResult> {
  try {
    const { data, error } = await supabase
      .from('images')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return {
      success: true,
      data: data ?? [],
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to fetch images';
    console.error('Error fetching images:', err);
    return {
      success: false,
      error: message,
    };
  }
}

export async function deleteImage(imageId: string): Promise<UploadResult> {
  try {
    const { error } = await supabase
      .from('images')
      .delete()
      .eq('id', imageId);

    if (error) throw error;

    return {
      success: true,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to delete image';
    console.error('Error deleting image:', err);
    return {
      success: false,
      error: message,
    };
  }
} 
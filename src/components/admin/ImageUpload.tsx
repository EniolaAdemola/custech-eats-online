import { useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Upload, X, Loader2, ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  currentImageUrl?: string | null;
  onImageChange: (url: string | null) => void;
  disabled?: boolean;
}

export function ImageUpload({ currentImageUrl, onImageChange, disabled }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImageUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB');
      return;
    }

    setUploading(true);

    try {
      // Create a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `menu-items/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('menu-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('menu-images')
        .getPublicUrl(filePath);

      setPreview(publicUrl);
      onImageChange(publicUrl);
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = async () => {
    if (preview) {
      // Extract file path from URL to delete from storage
      try {
        const url = new URL(preview);
        const pathParts = url.pathname.split('/');
        const bucketIndex = pathParts.indexOf('menu-images');
        if (bucketIndex !== -1) {
          const filePath = pathParts.slice(bucketIndex + 1).join('/');
          await supabase.storage.from('menu-images').remove([filePath]);
        }
      } catch (error) {
        console.error('Error removing old image:', error);
      }
    }
    
    setPreview(null);
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={disabled || uploading}
      />
      
      {preview ? (
        <div className="relative">
          <img
            src={preview}
            alt="Menu item preview"
            className="w-full h-40 object-cover rounded-lg border"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8"
            onClick={handleRemoveImage}
            disabled={disabled || uploading}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled || uploading}
          className="w-full h-40 border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-2 hover:bg-secondary/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? (
            <>
              <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
              <span className="text-sm text-muted-foreground">Uploading...</span>
            </>
          ) : (
            <>
              <ImageIcon className="h-8 w-8 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Click to upload image</span>
              <span className="text-xs text-muted-foreground">Max 5MB</span>
            </>
          )}
        </button>
      )}
      
      {!preview && !uploading && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload Image
        </Button>
      )}
    </div>
  );
}

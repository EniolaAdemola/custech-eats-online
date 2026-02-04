-- Create a storage bucket for menu item images
INSERT INTO storage.buckets (id, name, public)
VALUES ('menu-images', 'menu-images', true);

-- Allow anyone to view menu images (public bucket)
CREATE POLICY "Anyone can view menu images"
ON storage.objects FOR SELECT
USING (bucket_id = 'menu-images');

-- Allow staff/admin to upload menu images
CREATE POLICY "Staff can upload menu images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'menu-images' 
  AND (
    public.has_role(auth.uid(), 'staff'::app_role) 
    OR public.has_role(auth.uid(), 'admin'::app_role)
  )
);

-- Allow staff/admin to update menu images
CREATE POLICY "Staff can update menu images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'menu-images' 
  AND (
    public.has_role(auth.uid(), 'staff'::app_role) 
    OR public.has_role(auth.uid(), 'admin'::app_role)
  )
);

-- Allow staff/admin to delete menu images
CREATE POLICY "Staff can delete menu images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'menu-images' 
  AND (
    public.has_role(auth.uid(), 'staff'::app_role) 
    OR public.has_role(auth.uid(), 'admin'::app_role)
  )
);
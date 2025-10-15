import imageCompression from 'browser-image-compression'

export interface CompressionOptions {
  maxSizeMB?: number
  maxWidthOrHeight?: number
  useWebWorker?: boolean
  fileType?: string
}

export async function compressImage(
  file: File,
  options: CompressionOptions = {}
): Promise<File> {
  const defaultOptions = {
    maxSizeMB: 0.5, // 500KB
    maxWidthOrHeight: 400, // 400x400px
    useWebWorker: true,
    fileType: 'image/webp', // Convert to WebP for better compression
    ...options,
  }

  try {
    const compressedFile = await imageCompression(file, defaultOptions)
    
    // Create a new File object with .webp extension
    const webpFile = new File(
      [compressedFile],
      file.name.replace(/\.[^/.]+$/, '.webp'),
      { type: 'image/webp' }
    )
    
    return webpFile
  } catch (error) {
    console.error('Image compression error:', error)
    throw new Error('Failed to compress image. Please try a different image.')
  }
}

export function validateImageFile(file: File): { valid: boolean; error?: string } {
  // Check if it's an image
  if (!file.type.startsWith('image/')) {
    return {
      valid: false,
      error: 'Please upload an image file',
    }
  }

  // Check file size (max 5MB before compression)
  const maxSize = 5 * 1024 * 1024 // 5MB
  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'Image size must be less than 5MB',
    }
  }

  return { valid: true }
}

export function getImagePreviewUrl(file: File): string {
  return URL.createObjectURL(file)
}

export function revokeImagePreviewUrl(url: string): void {
  URL.revokeObjectURL(url)
}


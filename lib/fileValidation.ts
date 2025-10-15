export const FILE_FORMATS = {
  text: {
    extensions: ['.txt', '.pdf', '.docx'],
    mimeTypes: ['text/plain', 'application/pdf', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    maxSize: 10 * 1024 * 1024, // 10MB
  },
  image: {
    extensions: ['.jpg', '.jpeg', '.png', '.webp'],
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
    maxSize: 10 * 1024 * 1024, // 10MB
  },
  video: {
    extensions: ['.mp4'],
    mimeTypes: ['video/mp4'],
    maxSize: 100 * 1024 * 1024, // 100MB
  },
} as const

export interface ValidationResult {
  valid: boolean
  error?: string
}

export function validateFile(file: File, mode: 'text' | 'image' | 'video'): ValidationResult {
  const config = FILE_FORMATS[mode]
  const extension = '.' + file.name.split('.').pop()?.toLowerCase()
  
  // Check extension
  if (!(config.extensions as readonly string[]).includes(extension)) {
    return {
      valid: false,
      error: `Invalid file format. Accepted: ${config.extensions.join(', ')}`
    }
  }
  
  // Check MIME type
  if (!(config.mimeTypes as readonly string[]).includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type. Please upload a valid ${mode} file.`
    }
  }
  
  // Check file size
  if (file.size > config.maxSize) {
    return {
      valid: false,
      error: `File too large. Max size: ${config.maxSize / 1024 / 1024}MB`
    }
  }
  
  return { valid: true }
}

export function getBucketName(mode: 'text' | 'image' | 'video'): string {
  return `${mode}-uploads`
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}


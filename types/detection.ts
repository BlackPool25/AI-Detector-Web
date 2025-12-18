export interface DetectionResult {
  confidence: number
  isAI: boolean
  label: string
  model: string
  // Video-specific fields
  layers?: Array<{
    name: string
    verdict: string
    confidence: number
    time: number
  }>
  stopped_at?: string
  total_time?: number
  processing_time?: number
  // Image-specific fields
  predictions?: Array<{
    label: string
    score: number
  }>
  top_prediction?: string
  // Text-specific fields
  prediction?: string
  agreement?: string
  ensemble_score?: number
  breakdown?: {
    detective?: any
    binoculars?: any
    fast_detect?: any
  }
}

export interface DetectorScores {
  visual_artifacts?: number
  temporal_consistency?: number
  audio_synthesis?: number | null
  face_quality?: number
}

export interface ModelMetadata {
  models_used?: string[]
  processing_time_seconds?: number
  frames_analyzed?: number
  video_duration_seconds?: number
  total_frames?: number
  fps?: number
}

export interface DetectionHistory {
  id: string
  filename: string
  file_type: 'text' | 'image' | 'video'
  file_size: number
  file_extension: string
  file_url: string | null
  detection_result: DetectionResult | string  // Can be string for videos being processed
  confidence_score: number
  model_used: string
  detector_scores?: DetectorScores  // For multimodal video detection
  model_metadata?: ModelMetadata    // For video detection metadata
  created_at: string
  is_file_available: boolean
  file_deleted_at: string | null
}

export interface UploadedFile {
  path: string
  url: string
  fileName: string
  fileSize: number
  fileType: 'text' | 'image' | 'video'
  fileExtension: string
}


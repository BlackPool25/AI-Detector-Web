'use client'

import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, FileText, Image, Video, X, Loader2, AlertCircle } from 'lucide-react'
import { useMode } from '@/components/providers/ThemeProvider'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { getModeColors, DetectionMode } from '@/lib/utils'
import { cn } from '@/lib/utils'
import { useFileUpload } from '@/hooks/useFileUpload'
import { validateFile } from '@/lib/fileValidation'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import type { DetectionResult } from '@/types/detection'

interface UploadModalProps {
  isOpen: boolean
  onClose: () => void
}

const modeConfig: Record<
  DetectionMode,
  {
    icon: React.ElementType
    accept: string
    description: string
  }
> = {
  text: {
    icon: FileText,
    accept: '.txt,.doc,.docx,.pdf',
    description: 'Upload text files (TXT, DOC, DOCX, PDF)',
  },
  image: {
    icon: Image,
    accept: 'image/*',
    description: 'Upload image files (JPG, PNG, GIF, WebP)',
  },
  video: {
    icon: Video,
    accept: 'video/*',
    description: 'Upload video files (MP4, MOV, AVI, WebM)',
  },
}

export function UploadModal({ isOpen, onClose }: UploadModalProps) {
  const { mode, isDark } = useMode()
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<DetectionResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { uploadFile, uploading } = useFileUpload(mode)
  const supabase = createClient()
  const router = useRouter()

  const config = modeConfig[mode]
  const Icon = config.icon

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    setError(null)
    
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      // Validate file before setting
      const validation = validateFile(droppedFile, mode)
      if (!validation.valid) {
        setError(validation.error || 'Invalid file')
        return
      }
      setFile(droppedFile)
    }
  }, [mode])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null)
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      // Validate file before setting
      const validation = validateFile(selectedFile, mode)
      if (!validation.valid) {
        setError(validation.error || 'Invalid file')
        return
      }
      setFile(selectedFile)
    }
  }, [mode])

  // Helper function to convert File to base64 string
  const fileToBase64 = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        const base64 = (reader.result as string).split(',')[1]
        resolve(base64)
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  const handleUpload = async () => {
    if (!file) return

    setIsAnalyzing(true)
    setResult(null)
    setError(null)

    try {
      // Check if user is authenticated
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setError('Please login to analyze files')
        setIsAnalyzing(false)
        // Redirect to login after a delay
        setTimeout(() => {
          router.push('/auth/login')
          handleClose()
        }, 2000)
        return
      }

      let detectionResult: DetectionResult
      let modelUsed: string
      let uploadedFile: any = null

      // Branch on mode: use real AI models
      if (mode === 'image') {
        console.log('[Upload] Processing image detection...')
        // Convert file to base64 for Modal API
        const base64Image = await fileToBase64(file)
        console.log('[Upload] Converted to base64, length:', base64Image.length)

        // Call our backend API that connects to Modal
        const detectResponse = await fetch('/api/detect', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64Image }),
        })

        console.log('[Upload] Detection response status:', detectResponse.status)

        if (!detectResponse.ok) {
          const errorText = await detectResponse.text()
          console.error('[Upload] Detection failed:', errorText)
          let errorData
          try {
            errorData = JSON.parse(errorText)
          } catch {
            errorData = { error: errorText }
          }
          throw new Error(errorData.error || 'Failed to analyze image')
        }

        detectionResult = await detectResponse.json()
        console.log('[Upload] Detection result:', detectionResult)
        modelUsed = detectionResult.model
        
        // For images, upload to storage after detection (optional, for history)
        try {
          uploadedFile = await uploadFile(file)
        } catch (uploadError) {
          console.warn('[Upload] Storage upload failed, continuing without storage:', uploadError)
          // Create a minimal uploadedFile object
          uploadedFile = {
            fileName: file.name,
            fileSize: file.size,
            fileExtension: '.' + file.name.split('.').pop()!,
            url: null,
            path: null
          }
        }
      } else if (mode === 'video') {
        // Upload video first
        uploadedFile = await uploadFile(file)
        
        // Real video detection using balanced 3-layer pipeline
        const detectResponse = await fetch('/api/detect', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ video_url: uploadedFile.url }),
        })

        if (!detectResponse.ok) {
          const errorData = await detectResponse.json().catch(() => ({ error: 'Detection failed' }))
          throw new Error(errorData.error || 'Failed to analyze video')
        }

        detectionResult = await detectResponse.json()
        modelUsed = detectionResult.model
      } else if (mode === 'text') {
        // Real text detection using ensemble AI detector
        // For text mode, handle both plain text and documents (PDF, DOCX, etc.)
        let textContent: string
        
        // Check if it's a document that needs extraction
        const fileExtension = file.name.toLowerCase().split('.').pop()
        const isDocument = ['pdf', 'doc', 'docx'].includes(fileExtension || '')
        
        if (isDocument) {
          console.log('[Upload] Document detected, extracting text...')
          // For documents, send the file to backend for extraction
          const formData = new FormData()
          formData.append('file', file)
          formData.append('extract_text', 'true')
          
          const extractResponse = await fetch('/api/extract-text', {
            method: 'POST',
            body: formData,
          })
          
          if (!extractResponse.ok) {
            const errorData = await extractResponse.json().catch(() => ({ error: 'Text extraction failed' }))
            throw new Error(errorData.error || 'Failed to extract text from document')
          }
          
          const extractData = await extractResponse.json()
          textContent = extractData.text
          console.log('[Upload] Text extracted:', textContent.length, 'characters')
        } else {
          // Plain text file
          textContent = await file.text()
        }

        const detectResponse = await fetch('/api/detect', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: textContent }),
        })

        if (!detectResponse.ok) {
          const errorData = await detectResponse.json().catch(() => ({ error: 'Detection failed' }))
          throw new Error(errorData.error || 'Failed to analyze text')
        }

        detectionResult = await detectResponse.json()
        modelUsed = detectionResult.model
        
        // For text, create a minimal uploadedFile object
        uploadedFile = {
          fileName: file.name,
          fileSize: file.size,
          fileExtension: '.' + file.name.split('.').pop()!,
          url: null,
          path: null,
          extractedText: textContent.substring(0, 200) + (textContent.length > 200 ? '...' : '') // Store preview
        }
      } else {
        // Fallback for unknown modes
        throw new Error('Unsupported detection mode')
      }

      // Save to database
      // Map detection result to simple string for database
      const detectionResultString = detectionResult.isAI ? 'FAKE' : 'REAL'
      
      const { error: dbError } = await supabase
        .from('detection_history')
        .insert({
          user_id: user.id,
          filename: uploadedFile?.fileName || file.name,
          file_type: mode, // 'text', 'image', or 'video' - all valid
          file_size: uploadedFile?.fileSize || file.size,
          file_extension: uploadedFile?.fileExtension || '.' + file.name.split('.').pop()!,
          file_url: uploadedFile?.url || null,
          detection_result: detectionResultString, // Must be simple string, not JSON
          confidence_score: detectionResult.confidence || 0,
          model_used: modelUsed || 'Unknown'
        })

      if (dbError) {
        console.error('Database error:', dbError)
        throw new Error(`Database error: ${dbError.message}`)
      }

      setResult(detectionResult)
    } catch (err: any) {
      console.error('Upload error:', err)
      setError(err.message || 'Failed to analyze file. Please try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleClose = () => {
    setFile(null)
    setResult(null)
    setIsAnalyzing(false)
    setError(null)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} className="max-w-lg">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div
              className="p-4 rounded-full glass dark:glass-dark"
              style={{
                boxShadow: `0 0 20px ${getModeColors(mode, isDark)}30`,
              }}
            >
              <Icon
                className="w-8 h-8"
                style={{ color: getModeColors(mode, isDark) }}
              />
            </div>
          </div>
          <h2 className="text-2xl font-bold">
            Upload {mode.charAt(0).toUpperCase() + mode.slice(1)}
          </h2>
          <p className="text-sm text-foreground/60">{config.description}</p>
        </div>

        {/* Error message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-lg p-4 flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p className="text-sm">{error}</p>
          </motion.div>
        )}

        {/* Upload area */}
        {!result && (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={cn(
              'relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 cursor-pointer group',
              isDragging
                ? 'border-primary bg-primary/10 scale-105'
                : 'border-foreground/20 hover:border-primary/50 hover:bg-primary/5'
            )}
          >
            <input
              type="file"
              accept={config.accept}
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={isAnalyzing}
            />

            <div className="text-center space-y-3">
              <Upload className="w-12 h-12 mx-auto text-foreground/40 group-hover:text-primary transition-colors" />
              <div>
                <p className="font-medium">
                  {file ? file.name : 'Click to upload or drag files here'}
                </p>
                <p className="text-sm text-foreground/60 mt-1">
                  Maximum file size: 100MB
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Progress */}
        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-center space-x-3">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
              <span className="font-medium">Analyzing...</span>
            </div>
            <div className="w-full bg-foreground/10 rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-accent"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 3, ease: 'linear' }}
              />
            </div>
          </motion.div>
        )}

        {/* Result */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 text-center"
          >
            <div
              className={cn(
                'p-6 rounded-xl',
                result.isAI
                  ? 'bg-red-500/10 border border-red-500/20'
                  : 'bg-green-500/10 border border-green-500/20'
              )}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                className="text-5xl font-bold mb-2"
              >
                {result.confidence}%
              </motion.div>
              <p className="text-lg font-semibold">
                {result.isAI ? 'AI-Generated' : 'Human Created'}
              </p>
              <p className="text-sm text-foreground/60 mt-1">
                {result.label}
              </p>
              
              {/* Video-specific metadata */}
              {(result.total_time || result.processing_time || result.stopped_at) && (
                <div className="mt-4 pt-4 border-t border-foreground/10 space-y-2 text-xs text-foreground/70">
                  {result.stopped_at && (
                    <div className="flex justify-between">
                      <span>Analysis:</span>
                      <span className="font-medium">{result.stopped_at}</span>
                    </div>
                  )}
                  {(result.total_time || result.processing_time) && (
                    <div className="flex justify-between">
                      <span>Processing Time:</span>
                      <span className="font-medium">{(result.total_time || result.processing_time)?.toFixed(2)}s</span>
                    </div>
                  )}
                  {result.model && (
                    <div className="flex justify-between">
                      <span>Model:</span>
                      <span className="font-medium text-xs">{result.model}</span>
                    </div>
                  )}
                </div>
              )}
              
              {/* Image-specific predictions */}
              {result.predictions && result.predictions.length > 0 && (
                <div className="mt-4 pt-4 border-t border-foreground/10">
                  <p className="text-xs font-semibold text-foreground/80 mb-3">Model Predictions:</p>
                  <div className="space-y-2">
                    {result.predictions.map((pred, idx) => {
                      const isTop = pred.label === result.top_prediction
                      const isAI = pred.label.toUpperCase().includes('AI')
                      return (
                        <div key={idx} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <div className={cn(
                              'w-2 h-2 rounded-full',
                              isAI ? 'bg-orange-500' : 'bg-blue-500',
                              isTop && 'ring-2 ring-offset-1 ring-primary'
                            )} />
                            <span className={cn(
                              'font-medium',
                              isTop && 'text-foreground'
                            )}>
                              {pred.label}
                              {isTop && ' ✓'}
                            </span>
                          </div>
                          <span className={cn(
                            'font-semibold',
                            isTop ? 'text-foreground' : 'text-foreground/60'
                          )}>
                            {(pred.score * 100).toFixed(1)}%
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
              
              {/* Text-specific breakdown */}
              {result.agreement && (
                <div className="mt-4 pt-4 border-t border-foreground/10">
                  <p className="text-xs font-semibold text-foreground/80 mb-3">Detection Details:</p>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-foreground/70">Model Agreement:</span>
                      <span className="font-medium">{result.agreement}</span>
                    </div>
                    {result.ensemble_score !== undefined && (
                      <div className="flex justify-between">
                        <span className="text-foreground/70">Ensemble Score:</span>
                        <span className="font-medium">{result.ensemble_score.toFixed(4)}</span>
                      </div>
                    )}
                    {result.prediction && (
                      <div className="flex justify-between">
                        <span className="text-foreground/70">Prediction:</span>
                        <span className="font-medium">{result.prediction}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Show individual model scores if available */}
                  {result.breakdown && (
                    <div className="mt-3 pt-3 border-t border-foreground/10">
                      <p className="text-xs font-semibold text-foreground/80 mb-2">Model Breakdown:</p>
                      <div className="space-y-1.5">
                        {Object.entries(result.breakdown).map(([model, data]: [string, any]) => (
                          <div key={model} className="flex items-center justify-between text-[10px]">
                            <span className="text-foreground/60 capitalize">{model}:</span>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{data.prediction}</span>
                              <span className="text-foreground/50">({(data.confidence * 100).toFixed(0)}%)</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {/* Layer Breakdown for Video */}
              {result.layers && result.layers.length > 0 && (
                <div className="mt-4 pt-4 border-t border-foreground/10">
                  <p className="text-xs font-semibold text-foreground/80 mb-3">Detection Layers:</p>
                  <div className="space-y-2">
                    {result.layers.map((layer, idx) => {
                      const isLayerFake = layer.verdict === 'FAKE'
                      return (
                        <div key={idx} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <div className={cn(
                              'w-2 h-2 rounded-full',
                              isLayerFake ? 'bg-red-500' : 'bg-green-500'
                            )} />
                            <span className="font-medium">{layer.name.replace('Layer 1: ', '').replace('Layer 2: ', '').replace('Layer 3: ', '')}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={cn(
                              'font-semibold',
                              isLayerFake ? 'text-red-500' : 'text-green-500'
                            )}>
                              {layer.confidence}%
                            </span>
                            <span className="text-foreground/50 text-[10px]">{layer.time.toFixed(1)}s</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-foreground/60">Confidence Level</span>
                <span className="font-medium">{result.confidence}%</span>
              </div>
              <div className="w-full bg-foreground/10 rounded-full h-2 overflow-hidden">
                <motion.div
                  className={cn(
                    'h-full',
                    result.isAI
                      ? 'bg-gradient-to-r from-red-500 to-orange-500'
                      : 'bg-gradient-to-r from-green-500 to-emerald-500'
                  )}
                  initial={{ width: '0%' }}
                  animate={{ width: `${result.confidence}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          {!result ? (
            <>
              <Button
                variant="outline"
                onClick={handleClose}
                className="flex-1"
                disabled={isAnalyzing}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={handleUpload}
                className="flex-1"
                disabled={!file || isAnalyzing}
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze'}
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={() => {
                  setFile(null)
                  setResult(null)
                }}
                className="flex-1"
              >
                Upload Another
              </Button>
              <Button variant="default" onClick={handleClose} className="flex-1">
                Done
              </Button>
            </>
          )}
        </div>
      </div>
    </Modal>
  )
}


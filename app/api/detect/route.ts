import { NextRequest, NextResponse } from 'next/server'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

// Modal API response for video detection (Balanced 3-Layer Pipeline)
interface LayerResult {
  layer_name: string
  is_fake: boolean
  confidence: number
  processing_time: number
  details: Record<string, any>
}

interface ModalVideoResponse {
  video_path: string
  final_verdict: string  // "FAKE" or "REAL"
  confidence: number  // 0-1 scale
  stopped_at_layer: string
  layer_results: LayerResult[]
  total_time: number
  // Error fields
  error?: string
  error_type?: string
}

// Our app's detection result type
interface DetectionResult {
  confidence: number  // 0-100 scale
  isAI: boolean
  label: string
  model: string
  processing_time?: number
  layers?: Array<{
    name: string
    verdict: string
    confidence: number
    time: number
  }>
  stopped_at?: string
  total_time?: number
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { video_url, image, threshold = 0.33 } = body

    // Support both video and image detection
    if (!video_url && !image) {
      return NextResponse.json(
        { error: 'No video_url or image provided' },
        { status: 400 }
      )
    }

    // Get Modal API URL from environment
    const modalApiUrl = process.env.MODAL_VIDEO_API_URL || process.env.MODAL_API_URL
    if (!modalApiUrl) {
      console.error('MODAL_VIDEO_API_URL is not configured')
      return NextResponse.json(
        { error: 'AI detection service is not configured' },
        { status: 500 }
      )
    }

    // Handle video detection (new optimized pipeline)
    if (video_url) {
      console.log(`[API] Processing video: ${video_url}`)
      
      // Modal endpoint URL already includes the function name
      // Format: https://blackpool25--deepfake-detector-optimized-detect-video.modal.run
      const url = new URL(modalApiUrl)
      url.searchParams.append('video_url', video_url)
      url.searchParams.append('threshold', threshold.toString())
      
      const modalResponse = await fetch(url.toString(), {
        method: 'POST',
        headers: {
          ...(process.env.MODAL_API_KEY && {
            Authorization: `Bearer ${process.env.MODAL_API_KEY}`,
          }),
        },
      })

      if (!modalResponse.ok) {
        const errorText = await modalResponse.text().catch(() => 'Unknown error')
        console.error('Modal API error:', modalResponse.status, errorText)
        return NextResponse.json(
          { error: 'Failed to process video with AI model' },
          { status: 500 }
        )
      }

      const modalData: ModalVideoResponse = await modalResponse.json()

      // Check for errors in response
      if (modalData.error) {
        console.error('Modal API returned error:', modalData.error)
        return NextResponse.json(
          { error: modalData.error },
          { status: 500 }
        )
      }

      const isAI = modalData.final_verdict === 'FAKE'
      
      // Map Modal response to our DetectionResult format
      const detectionResult: DetectionResult = {
        confidence: Math.round(modalData.confidence * 100),  // Convert to percentage
        isAI,
        label: isAI 
          ? 'Deepfake Video Detected' 
          : 'Authentic Video',
        model: 'Balanced-3Layer-Pipeline-v1',
        processing_time: modalData.total_time,
        total_time: modalData.total_time,
        stopped_at: modalData.stopped_at_layer,
        layers: modalData.layer_results.map(lr => ({
          name: lr.layer_name,
          verdict: lr.is_fake ? 'FAKE' : 'REAL',
          confidence: Math.round(lr.confidence * 100),
          time: lr.processing_time
        }))
      }

      console.log(`[API] Result: ${detectionResult.label} (${detectionResult.confidence}%)`)
      console.log(`[API] Layers: ${modalData.layer_results.length}, Stopped at: ${modalData.stopped_at_layer}`)

      return NextResponse.json(detectionResult)
    }

    // Handle legacy image detection (fallback)
    if (image) {
      console.log('[API] Processing image (legacy)')
      
      const modalResponse = await fetch(`${modalApiUrl}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(process.env.MODAL_API_KEY && {
            Authorization: `Bearer ${process.env.MODAL_API_KEY}`,
          }),
        },
        body: JSON.stringify({
          image,
          return_all_scores: true,
        }),
      })

      if (!modalResponse.ok) {
        const errorText = await modalResponse.text().catch(() => 'Unknown error')
        console.error('Modal API error:', modalResponse.status, errorText)
        return NextResponse.json(
          { error: 'Failed to process image with AI model' },
          { status: 500 }
        )
      }

      const modalData: any = await modalResponse.json()

      const topPrediction = modalData.top_prediction?.toUpperCase() || ''
      const isAI = topPrediction.includes('AI') || topPrediction.includes('FAKE')
      const confidencePercent = Math.round((modalData.confidence || 0.5) * 100)

      const detectionResult: DetectionResult = {
        confidence: confidencePercent,
        isAI,
        label: isAI
          ? 'AI-Generated Content Detected'
          : 'Authentic Human Content',
        model: 'EfficientFormer-S2V1 (Modal)',
      }

      return NextResponse.json(detectionResult)
    }

    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    )
  } catch (err: any) {
    console.error('Detection API error:', err)
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}


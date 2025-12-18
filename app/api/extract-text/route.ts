import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

// Maximum file size: 10MB
const MAX_FILE_SIZE = 10 * 1024 * 1024

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const supabase = await createServerClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 10MB' },
        { status: 400 }
      )
    }

    // Get file extension
    const extension = file.name.toLowerCase().split('.').pop()
    
    // Supported document formats
    const supportedFormats = ['pdf', 'docx', 'doc', 'txt', 'csv']
    if (!extension || !supportedFormats.includes(extension)) {
      return NextResponse.json(
        { error: `Unsupported format. Supported: ${supportedFormats.join(', ')}` },
        { status: 400 }
      )
    }

    // Read file bytes
    const fileBuffer = Buffer.from(await file.arrayBuffer())

    let extractedText = ''
    let metadata = {
      extraction_method: '',
      char_count: 0,
      word_count: 0,
      file_type: extension,
      success: false,
    }

    try {
      // Handle different file types
      if (extension === 'pdf') {
        // Extract text from PDF using pdf-parse (npm package)
        const pdfParse = require('pdf-parse')
        const pdfData = await pdfParse(fileBuffer)
        extractedText = pdfData.text
        metadata.extraction_method = 'pdf-parse'
        metadata.success = true
      } else if (extension === 'docx' || extension === 'doc') {
        // Extract text from DOCX using mammoth (npm package)
        const mammoth = require('mammoth')
        const result = await mammoth.extractRawText({ buffer: fileBuffer })
        extractedText = result.value
        metadata.extraction_method = 'mammoth'
        metadata.success = true
      } else if (extension === 'txt') {
        // Plain text - just decode
        extractedText = fileBuffer.toString('utf-8')
        metadata.extraction_method = 'utf8-decode'
        metadata.success = true
      } else if (extension === 'csv') {
        // CSV - decode and format
        extractedText = fileBuffer.toString('utf-8')
        metadata.extraction_method = 'csv-decode'
        metadata.success = true
      }

      // Update metadata
      metadata.char_count = extractedText.length
      metadata.word_count = extractedText.split(/\s+/).filter(Boolean).length

      // Validate minimum text length
      if (extractedText.length < 20) {
        return NextResponse.json(
          { error: 'Document too short. Minimum 20 characters required.' },
          { status: 400 }
        )
      }

      // Return extracted text and metadata
      return NextResponse.json({
        success: true,
        text: extractedText,
        metadata,
        preview: extractedText.substring(0, 200) + (extractedText.length > 200 ? '...' : ''),
      })

    } catch (extractError: any) {
      console.error('Text extraction error:', extractError)
      
      // Check if it's a missing dependency error
      if (extractError.code === 'MODULE_NOT_FOUND') {
        return NextResponse.json(
          { error: 'Document processing library not installed. Please contact support.' },
          { status: 500 }
        )
      }
      
      return NextResponse.json(
        { error: `Failed to extract text: ${extractError.message}` },
        { status: 500 }
      )
    }

  } catch (err: any) {
    console.error('Extract text API error:', err)
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

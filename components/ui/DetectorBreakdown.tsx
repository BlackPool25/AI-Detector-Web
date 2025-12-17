'use client'

import { Card } from './Card'
import { motion } from 'framer-motion'

interface DetectorScores {
  visual_artifacts?: number
  temporal_consistency?: number
  audio_synthesis?: number | null
  face_quality?: number
}

interface DetectorBreakdownProps {
  scores: DetectorScores
  hasAudio: boolean
}

function ScoreBar({ 
  label, 
  score, 
  color,
  description 
}: { 
  label: string
  score: number
  color: string
  description: string
}) {
  const percentage = Math.round(score * 100)
  
  // Color mapping
  const colors = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500'
  }
  
  const bgColor = colors[color as keyof typeof colors] || 'bg-gray-500'
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-medium text-foreground">{label}</p>
          <p className="text-xs text-foreground/60">{description}</p>
        </div>
        <span className="text-sm font-semibold text-foreground/80">{percentage}%</span>
      </div>
      <div className="w-full bg-foreground/10 rounded-full h-2 overflow-hidden">
        <motion.div 
          className={`${bgColor} h-2 rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}

export function DetectorBreakdown({ scores, hasAudio }: DetectorBreakdownProps) {
  // Calculate authenticity scores (flip fake scores to real scores)
  const visualAuthenticity = scores.visual_artifacts !== undefined 
    ? 1 - scores.visual_artifacts 
    : 0
  
  const temporalConsistency = scores.temporal_consistency || 0
  
  const audioAuthenticity = scores.audio_synthesis !== undefined && scores.audio_synthesis !== null
    ? 1 - scores.audio_synthesis
    : 0
  
  const faceQuality = scores.face_quality || 0

  return (
    <Card className="p-6 mt-4 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
      <div className="mb-4">
        <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <span className="text-xl">🔍</span>
          Multimodal Detection Breakdown
        </h4>
        <p className="text-sm text-foreground/60 mt-1">
          Detailed analysis from multiple AI detection models
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ScoreBar 
          label="Visual Authenticity" 
          score={visualAuthenticity} 
          color="blue"
          description="Checks for visual manipulation artifacts"
        />
        
        <ScoreBar 
          label="Temporal Consistency" 
          score={temporalConsistency} 
          color="green"
          description="Analyzes frame-to-frame coherence"
        />
        
        {hasAudio && scores.audio_synthesis !== null && (
          <ScoreBar 
            label="Audio Authenticity" 
            score={audioAuthenticity} 
            color="purple"
            description="Detects AI-generated voice patterns"
          />
        )}
        
        <ScoreBar 
          label="Face Detection Quality" 
          score={faceQuality} 
          color="orange"
          description="Confidence in face extraction"
        />
      </div>

      {!hasAudio && (
        <div className="mt-4 p-3 bg-foreground/5 rounded-lg border border-foreground/10">
          <p className="text-xs text-foreground/60">
            ℹ️ This video has no audio track, so audio-visual sync analysis was not performed
          </p>
        </div>
      )}
      
      <div className="mt-6 pt-4 border-t border-foreground/10">
        <p className="text-xs text-foreground/50">
          Models used: MTCNN (face detection), EfficientNet-B7 (visual artifacts)
          {hasAudio && ', Wav2Vec2 (audio synthesis)'}
        </p>
      </div>
    </Card>
  )
}

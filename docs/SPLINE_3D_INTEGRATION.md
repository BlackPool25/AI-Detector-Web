# Spline 3D Scene Integration Guide

## Overview
Successfully integrated Spline 3D scenes into the AI Website project. This enables interactive 3D content with beautiful spotlight effects and smooth animations.

## 📁 Components Created

### Core Components
1. **`/components/ui/spline.tsx`** - Main Spline scene wrapper with lazy loading
2. **`/components/ui/spotlight.tsx`** - Default spotlight export (Aceternity variant)
3. **`/components/ui/spotlight-aceternity.tsx`** - SVG-based spotlight effect
4. **`/components/ui/spotlight-ibelick.tsx`** - Interactive mouse-following spotlight
5. **`/components/ui/spline-demo.tsx`** - Complete demo/example component

## 📦 Dependencies Installed
```bash
npm install @splinetool/runtime @splinetool/react-spline
```

### Already Available
- ✅ `framer-motion` (v11.0.3)
- ✅ `lucide-react` (v0.312.0)
- ✅ Tailwind CSS (v3.4.18)
- ✅ TypeScript (v5.3.3)

## 🎨 CSS Updates

### Tailwind Config (`tailwind.config.ts`)
Added spotlight animation:
```ts
keyframes: {
  "spotlight": {
    "0%": {
      opacity: "0",
      transform: "translate(-72%, -62%) scale(0.5)",
    },
    "100%": {
      opacity: "1",
      transform: "translate(-50%,-40%) scale(1)",
    },
  },
}

animation: {
  "spotlight": "spotlight 2s ease .75s 1 forwards",
}
```

### Global CSS (`app/globals.css`)
Added loader spinner:
```css
.loader {
  width: 48px;
  height: 48px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  border-top-color: rgba(255, 255, 255, 0.8);
  animation: spin 1s linear infinite;
}
```

## 🚀 Usage Examples

### Basic Usage
```tsx
import { SplineScene } from "@/components/ui/spline"

export function MyComponent() {
  return (
    <SplineScene 
      scene="https://prod.spline.design/YOUR_SCENE_ID/scene.splinecode"
      className="w-full h-[500px]"
    />
  )
}
```

### With Aceternity Spotlight (SVG-based)
```tsx
import { SplineScene } from "@/components/ui/spline"
import { Spotlight } from "@/components/ui/spotlight"
import { Card } from "@/components/ui/Card"

export function SplineWithSpotlight() {
  return (
    <Card className="relative overflow-hidden bg-black/[0.96]">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className="relative z-10">
        <SplineScene 
          scene="https://prod.spline.design/YOUR_SCENE_ID/scene.splinecode"
          className="w-full h-[500px]"
        />
      </div>
    </Card>
  )
}
```

### With Interactive Spotlight (Mouse-following)
```tsx
import { SplineScene } from "@/components/ui/spline"
import { Spotlight } from "@/components/ui/spotlight-ibelick"
import { Card } from "@/components/ui/Card"

export function InteractiveSpline() {
  return (
    <Card className="relative overflow-hidden">
      <Spotlight size={300} />
      <div className="relative z-10">
        <SplineScene 
          scene="https://prod.spline.design/YOUR_SCENE_ID/scene.splinecode"
          className="w-full h-[500px]"
        />
      </div>
    </Card>
  )
}
```

### Complete Demo (Left Content + Right 3D)
```tsx
import { SplineSceneBasic } from "@/components/ui/spline-demo"

export function MyPage() {
  return (
    <div className="container mx-auto py-12">
      <SplineSceneBasic />
    </div>
  )
}
```

## 🎯 Best Integration Points in Your App

### 1. **Hero Section** (`components/home/Hero.tsx`)
Replace or complement the existing 3D robot with a Spline scene:
```tsx
<SplineScene 
  scene="https://prod.spline.design/YOUR_SCENE/scene.splinecode"
  className="w-full h-full"
/>
```

### 2. **Mode Tiles** (`components/home/ModeTiles.tsx`)
Add 3D previews for each detection mode:
```tsx
// In each mode tile
<SplineScene 
  scene={getModeSplineScene(mode)} // text, image, or video
  className="w-full h-48"
/>
```

### 3. **How It Works** (`components/home/HowItWorks.tsx`)
Visualize the pipeline with interactive 3D elements:
```tsx
<SplineScene 
  scene="https://prod.spline.design/PIPELINE_SCENE/scene.splinecode"
  className="w-full h-[600px]"
/>
```

### 4. **About Page** (`app/about/page.tsx`)
Add engaging 3D visuals to explain the technology

### 5. **Research Page** (`app/research/page.tsx`)
Interactive 3D data visualizations

## 🎨 Spline Scene Resources

### Where to Get Spline Scenes
1. **Create Your Own**: [spline.design](https://spline.design)
2. **Spline Community**: Browse pre-made scenes
3. **Export URL**: Get the `.splinecode` URL from Spline editor

### Example Scenes (Public)
- `https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode` (Demo scene)
- Create custom scenes for:
  - AI Brain/Neural Network
  - Data Flow Visualization
  - Detection Process Animation
  - Mode-specific illustrations

## 🔧 Component Props

### SplineScene
```tsx
interface SplineSceneProps {
  scene: string        // Spline scene URL (.splinecode)
  className?: string   // Tailwind classes
}
```

### Spotlight (Aceternity)
```tsx
interface SpotlightProps {
  className?: string   // Positioning classes
  fill?: string       // Color (default: "white")
}
```

### Spotlight (ibelick)
```tsx
interface SpotlightProps {
  className?: string   // Positioning classes
  size?: number       // Spotlight diameter (default: 200)
  springOptions?: SpringOptions  // Framer Motion spring config
}
```

## ⚡ Performance Considerations

### Lazy Loading
The SplineScene component uses React.lazy() for code splitting:
- Spline library loads only when needed
- Shows loading spinner during load
- Improves initial page load time

### Best Practices
1. **Optimize Scene Size**: Keep Spline scenes under 5MB
2. **Use Appropriate Dimensions**: Don't load huge scenes in small containers
3. **Limit Concurrent Scenes**: Load 1-2 scenes per page max
4. **Mobile Considerations**: Consider showing static images on mobile
5. **Preload Critical Scenes**: Add `<link rel="preload">` for hero scenes

## 🎯 Responsive Design

### Recommended Breakpoints
```tsx
<SplineScene 
  scene="your-scene.splinecode"
  className="
    w-full 
    h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]
  "
/>
```

### Mobile Optimization
Consider conditional rendering:
```tsx
'use client'
import { useEffect, useState } from 'react'

export function ResponsiveSpline() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  if (isMobile) {
    return <img src="/static-scene.png" alt="3D Scene" />
  }

  return <SplineScene scene="your-scene.splinecode" />
}
```

## 🐛 Troubleshooting

### Scene Not Loading
1. Check scene URL is valid `.splinecode` format
2. Ensure scene is published in Spline
3. Check browser console for errors
4. Verify network connectivity

### Spotlight Not Visible
1. Ensure parent has `position: relative`
2. Check z-index stacking
3. Verify animation classes are working
4. Check Tailwind config includes spotlight keyframes

### Performance Issues
1. Reduce scene complexity in Spline editor
2. Limit number of simultaneous scenes
3. Use static images on mobile
4. Enable hardware acceleration in CSS

## 🎨 Customization Ideas

### Dark Mode Support
```tsx
import { useTheme } from 'next-themes'

export function ThemedSpline() {
  const { theme } = useTheme()
  
  return (
    <SplineScene 
      scene={theme === 'dark' 
        ? 'dark-scene.splinecode' 
        : 'light-scene.splinecode'
      }
    />
  )
}
```

### Mode-Specific Scenes
```tsx
import { DetectionMode } from '@/lib/utils'

const sceneMap: Record<DetectionMode, string> = {
  text: 'text-detection-scene.splinecode',
  image: 'image-detection-scene.splinecode',
  video: 'video-detection-scene.splinecode',
}

export function ModeSpline({ mode }: { mode: DetectionMode }) {
  return <SplineScene scene={sceneMap[mode]} />
}
```

## 📝 Next Steps

1. **Create Custom Scenes**: Design AI-themed 3D scenes in Spline
2. **Replace Robot**: Consider replacing Three.js robot with Spline
3. **Add to Hero**: Integrate into main hero section
4. **Mode Previews**: Add 3D previews for each detection mode
5. **Loading States**: Enhance loading experience with custom loaders

## 🔗 Useful Links
- [Spline Design](https://spline.design)
- [Spline React Documentation](https://docs.spline.design/react)
- [Aceternity UI](https://ui.aceternity.com)
- [Framer Motion](https://www.framer.com/motion)


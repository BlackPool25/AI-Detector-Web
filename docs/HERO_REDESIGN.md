# Hero Section Redesign - Scroll-Pinned 3D Background

## Overview
Completely redesigned the hero section to match Apple-style scroll animations:
- **Robot as background layer** (behind text, not side-by-side)
- **Text centered** in foreground
- **Fixed/pinned hero** during scroll animation
- **Camera sweeps LEFT → RIGHT** as user scrolls through hero
- **After animation**: Robot appears on left side, normal scrolling resumes

## Key Changes

### 1. Hero Layout (/components/home/Hero.tsx)

**Before**: Side-by-side grid layout (text left, robot right)

**After**: Layered composition
```tsx
<section id="hero-section" className="relative min-h-[200vh]">
  {/* Robot - Fixed background layer (z-0) */}
  <div className="fixed inset-0 w-full h-screen z-0">
    <RobotScene />
  </div>
  
  {/* Text - Centered foreground (z-10) */}
  <div className="relative z-10 min-h-screen flex items-center justify-center">
    <motion.div className="text-center">
      {/* Headline, Mode Tiles, Upload Button */}
    </motion.div>
  </div>
</section>
```

### 2. Hero Scroll Progress Hook

Created `/hooks/useHeroScrollProgress.ts`:
- Tracks scroll progress specifically for hero section (0-1)
- Based on hero section height (200vh)
- Returns 0 at top, 1 when hero completes
- Used to drive camera animation

### 3. Camera Animation Update

**New Behavior** (/components/3d/RobotScene.tsx):
```tsx
// Camera starts on LEFT side
const leftPosition = new THREE.Vector3(-5, 1.5, 4)

// Camera ends on RIGHT side
const rightPosition = new THREE.Vector3(5, 1.5, 4)

// Smooth sweep based on scroll progress
const targetPosition = new THREE.Vector3().lerpVectors(
  leftPosition, 
  rightPosition, 
  scrollProgress
)
```

### 4. How It Works

**User Experience**:
1. **Page loads**: 
   - Robot in background, camera on left side
   - Text centered and visible in foreground
   - Robot tracks mouse cursor

2. **User scrolls down**:
   - Hero section stays fixed (200vh height provides scroll range)
   - Camera smoothly sweeps from left to right around robot
   - Robot appears to rotate in view
   - Text remains centered

3. **Scroll completes** (100% progress):
   - Camera on right side looking at robot
   - Robot now positioned on left side of frame
   - User continues scrolling to next sections (normal scroll)

### 5. Visual Improvements

Added drop shadows to text for better readability over 3D background:
- `drop-shadow-2xl` on headline
- `drop-shadow-lg` on subtitle

### 6. Technical Details

**Hero Section Height**: `min-h-[200vh]`
- Provides scroll distance for camera animation
- First 100vh: Camera sweeps while text stays visible
- Second 100vh: Transition to normal scrolling

**Fixed Positioning**: `fixed inset-0`
- Robot canvas stays in viewport during scroll
- Creates pinned effect
- Text scrolls naturally over it

**Z-Index Layering**:
- Background (z-0): 3D Robot Scene
- Foreground (z-10): Text Content
- Modal (default z-index): Upload Modal

## Files Modified

1. `/components/home/Hero.tsx` - Complete redesign
2. `/components/3d/RobotScene.tsx` - Camera animation direction
3. `/hooks/useHeroScrollProgress.ts` - New hero-specific scroll hook

## Build Status

✅ Build successful  
✅ No TypeScript errors  
✅ No linter warnings  
✅ Dev server running  

## Testing

Visit http://localhost:3000:

1. **Initial state**: Robot in background (left camera angle), text centered
2. **Mouse tracking**: Robot follows cursor when at top
3. **Scroll down**: Camera sweeps left → right around robot
4. **After scroll**: Robot on left, continue to next sections

## Comparison: Before vs After

| Aspect | Before | After |
|--------|--------|-------|
| Layout | Side-by-side grid | Layered (background/foreground) |
| Text Position | Left aligned | Centered |
| Robot Position | Right side only | Background, full screen |
| Camera Motion | Right → Center → Left | Left → Right |
| Scroll Behavior | Normal page scroll | Pinned during animation |
| Final Position | Robot on right | Robot on left |

## Future Enhancements

- Add GSAP ScrollTrigger for smoother pinning
- Implement easing functions for camera motion
- Add progress indicator showing scroll position
- Mobile: Reduce scroll distance or disable effect
- Add parallax to text elements


# 3D Robot Scene

This directory contains the 3D robot animation components for the hero section.

## Components

### RobotScene.tsx
Main canvas component that handles:
- Three.js canvas setup
- Camera animation based on scroll progress
- Lighting and environment
- Post-processing effects (bloom, glow)
- Mobile optimization

### Robot.tsx
Procedural geometric robot component:
- Built entirely with Three.js primitives (no external models)
- Metallic materials with neon blue emissive glow
- Mouse tracking for interactive head/body rotation
- Floating idle animation

## Features

### Scroll-Based Camera Animation
The camera smoothly transitions through three positions as the user scrolls:
- **0-33% scroll**: Right-side angle view
- **33-66% scroll**: Front center view
- **66-100% scroll**: Left-side angle view

### Mouse Tracking
When the page is at the top (scroll position 0), the robot tracks the user's cursor:
- Head rotates more actively (±30% rotation)
- Body has subtle rotation (±15% rotation)
- Smooth spring animation for natural movement

### Mobile Optimization
Automatically detects mobile devices and reduces:
- Shadow quality (disabled on mobile)
- Bloom intensity (1.0 vs 1.5)
- Antialiasing (disabled on mobile)
- Device pixel ratio (1.5 vs 2.0)

## Dependencies

- `@react-three/fiber` - React renderer for Three.js
- `@react-three/drei` - Helpers and abstractions
- `@react-three/postprocessing` - Post-processing effects
- `three` - 3D library

## Customization

### Changing Robot Colors
Edit the emissive colors in `Robot.tsx`:
```tsx
emissive="#00d4ff" // Cyan blue glow
```

### Adjusting Camera Positions
Modify the camera positions in `RobotScene.tsx`:
```tsx
const rightPosition = new THREE.Vector3(4, 1, 3)
const centerPosition = new THREE.Vector3(0, 1, 5)
const leftPosition = new THREE.Vector3(-4, 1, 3)
```

### Changing Animation Speed
Adjust the lerp factor in `CameraRig`:
```tsx
cameraRef.current.position.lerp(targetPosition, 0.1) // Higher = faster
```

## Performance

The scene is optimized for performance:
- Lazy loading via Next.js dynamic imports
- Reduced quality on mobile devices
- Efficient geometry with minimal polygons
- Shared materials for reduced memory usage


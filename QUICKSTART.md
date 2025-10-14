# 🚀 AI Detection Hub - Quick Start Guide

Welcome! Your AI Detection Hub is ready to use.

## ✅ What's Been Built

A complete, production-ready AI detection website with:

### 🎨 Core Features
- **3 Detection Modes**: Text, Image, and Video with unique themes
- **Dynamic Theme System**: Each mode changes the entire site's color scheme
- **Glassmorphic UI**: Modern frosted glass design with backdrop blur
- **Smooth Animations**: Framer Motion, GSAP, and React Spring
- **Smooth Scrolling**: Lenis integration for butter-smooth navigation

### 📄 Pages
1. **Homepage** (`/`) - Hero with mode tiles, How It Works section
2. **Awareness** (`/awareness`) - Timeline and impact statistics
3. **Datasets** (`/datasets`) - Dataset showcase with filters
4. **Research** (`/research`) - Academic papers by category
5. **How It Works** (`/how-it-works`) - Detection pipeline explained
6. **About** (`/about`) - Team and mission
7. **Resources** (`/resources`) - External tools and links
8. **Contact** (`/contact`) - Contact form

### 🎭 Key Interactions
- **Mode Selection**: Click tiles to switch between Text/Image/Video modes
- **Upload System**: Click "Upload to Detect" to open modal
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Dark/Light Mode**: Automatic theme switching with manual toggle

## 🏃 Running the Project

### Development Mode
```bash
cd /home/lightdesk/Projects/AI-Website
npm run dev
```
Visit: [http://localhost:3000](http://localhost:3000)

### Production Build
```bash
npm run build
npm start
```

### Check for Errors
```bash
npm run lint
```

## 🎨 Customization Guide

### Change Colors
Edit `tailwind.config.ts` and `app/globals.css`:

```typescript
// tailwind.config.ts
colors: {
  text: {
    light: '#YOUR_COLOR',  // Text mode light color
    dark: '#YOUR_COLOR',   // Text mode dark color
  },
  // ... same for image and video modes
}
```

### Add New Pages
1. Create `app/your-page/page.tsx`
2. Add link to `components/layout/Navbar.tsx`
3. Page will automatically get smooth scrolling and transitions

### Modify Animations
Edit `lib/animationVariants.ts`:

```typescript
export const yourAnimation: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
}
```

## 🎯 Key Components

### Mode System
```typescript
import { useMode } from '@/components/providers/ThemeProvider'

function YourComponent() {
  const { mode, setMode, isDark } = useMode()
  // mode: 'text' | 'image' | 'video'
  // setMode: (newMode) => void
  // isDark: boolean
}
```

### Upload Modal
```typescript
import { UploadModal } from '@/components/home/UploadModal'

<UploadModal 
  isOpen={isOpen} 
  onClose={() => setIsOpen(false)} 
/>
```

### Glassmorphic Styles
```tsx
<div className="glass dark:glass-dark rounded-2xl p-6">
  Your content
</div>
```

## 🔧 Tech Stack

- **Next.js 15.5.5** - React framework
- **React 19.2.0** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 3.4** - Styling
- **Framer Motion** - Animations
- **GSAP** - Scroll animations
- **Lenis** - Smooth scrolling
- **Lucide React** - Icons

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

All components are responsive by default.

## 🎨 Animation Timeline

### Mode Switch Animation
1. User clicks mode tile
2. Tile spins (slot machine effect) - 0.5s
3. Theme colors transition - 1.2s
4. Background animation changes
5. Upload button fades in - 0.6s

### Page Transitions
- Fade + slide animation on route change
- Smooth curtain transition between pages
- All controlled by Framer Motion

## 🚨 Common Issues

### Build Errors
If you see Tailwind CSS errors:
```bash
npm install tailwindcss@^3.4.0 --save-dev
```

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
npm run dev
```

### Module Not Found
```bash
rm -rf node_modules package-lock.json
npm install
```

## 🎁 Next Steps

### Connect to Backend
1. Create `/app/api` directory for API routes
2. Add environment variables to `.env.local`
3. Update `UploadModal.tsx` to call real API

### Add Authentication
1. Install NextAuth.js: `npm install next-auth`
2. Create `/app/api/auth/[...nextauth]/route.ts`
3. Update Login/Signup buttons in Navbar

### Deploy
```bash
# Vercel (recommended)
npm install -g vercel
vercel

# Or Netlify, AWS, Docker, etc.
```

## 📚 Documentation Links

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [React Spring](https://www.react-spring.dev/)
- [GSAP](https://greensock.com/docs/)

## 💡 Tips

1. **Performance**: The site includes code splitting and lazy loading
2. **Accessibility**: All interactive elements have ARIA labels
3. **SEO**: Metadata is configured in each page
4. **Dark Mode**: Respects system preferences
5. **Reduced Motion**: Animations disabled if user prefers

## 🐛 Debugging

Enable dev tools console to see:
- Mode changes
- Animation states
- Upload progress
- Theme transitions

## 🎉 You're Ready!

The development server should be running. Open your browser and explore:
- Click mode tiles to see theme changes
- Try the upload modal
- Check different pages
- Toggle dark/light mode
- Test on mobile (responsive design)

**Enjoy building with AI Detection Hub!** 🚀

---

Need help? Check README.md or open an issue.


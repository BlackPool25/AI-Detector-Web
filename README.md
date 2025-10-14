# 🎯 DetectX

A modern, cinematic web application for detecting AI-generated text, images, and videos. Built with Next.js 14+, TypeScript, and Framer Motion.

![DetectX](https://via.placeholder.com/1200x600/0EA5E9/FFFFFF?text=DetectX)

## ✨ Features

### 🎨 Dynamic Theme System
- **Three Detection Modes**: Text, Image, and Video
- Each mode features unique color schemes and animations
- Automatic dark/light mode switching
- Smooth theme transitions (1.2s)

### 🖼️ Stunning UI/UX
- **Glassmorphic Design**: Frosted glass effects with backdrop blur
- **3D Tilt Effects**: Interactive card tilting with React Spring
- **Slot Machine Animations**: Mode selection with spinning transitions
- **Smooth Scrolling**: Lenis integration for butter-smooth navigation
- **Background Animations**: Mode-specific particle systems and effects

### 📱 Fully Responsive
- Mobile-first design approach
- Optimized for tablets and desktops
- Touch-friendly interactions

### 🔍 Core Functionality
- Upload and analyze text, images, or videos
- Real-time detection with confidence scores
- Interactive pipeline visualization
- Educational resources and research papers

## 🛠️ Tech Stack

### Core
- **Next.js 14+** - React framework with App Router
- **TypeScript** - Type-safe development
- **TailwindCSS** - Utility-first styling

### Animation & Motion
- **Framer Motion** - Component animations and page transitions
- **GSAP** - Advanced scroll-triggered animations
- **React Spring** - Physics-based interactions
- **Lenis** - Smooth scrolling

### UI Components
- Custom component library (shadcn/ui inspired)
- **Lucide React** - Beautiful icon system
- **next-themes** - Dark/light mode management

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (recommended 20+)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ai-detection-hub.git
   cd ai-detection-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
AI-Website/
├── app/                      # Next.js App Router pages
│   ├── about/               # About page
│   ├── awareness/           # Awareness & education
│   ├── contact/             # Contact form
│   ├── datasets/            # Dataset showcase
│   ├── how-it-works/        # Detection methodology
│   ├── research/            # Research papers
│   ├── resources/           # External resources
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   └── globals.css          # Global styles
├── components/
│   ├── animations/          # Animation components
│   ├── effects/             # Visual effects (background, smooth scroll)
│   ├── home/                # Homepage components
│   │   ├── Hero.tsx
│   │   ├── ModeTiles.tsx
│   │   ├── UploadButton.tsx
│   │   ├── UploadModal.tsx
│   │   └── HowItWorks.tsx
│   ├── layout/              # Layout components
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── providers/           # Context providers
│   │   └── ThemeProvider.tsx
│   └── ui/                  # Reusable UI components
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Input.tsx
│       ├── Modal.tsx
│       └── Textarea.tsx
├── lib/
│   ├── animationVariants.ts # Framer Motion variants
│   ├── themeConfig.ts       # Mode theme configurations
│   └── utils.ts             # Utility functions
├── public/                   # Static assets
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## 🎨 Design System

### Color Modes

#### 📝 Text Mode
- **Light**: Cyan/Blue gradients (#0EA5E9, #38BDF8)
- **Dark**: Bright cyan accents (#06B6D4, #22D3EE)
- **Mood**: Cool, flowing, text-stream effects

#### 🖼️ Image Mode
- **Light**: Pink/Magenta gradients (#EC4899, #F472B6)
- **Dark**: Vivid purple/magenta (#D946EF, #C026D3)
- **Mood**: Bokeh particles, photographic feel

#### 🎥 Video Mode
- **Light**: Orange/Coral gradients (#F97316, #FB923C)
- **Dark**: Red/Coral accents (#EF4444, #F87171)
- **Mood**: Film grain, cinematic motion

### Typography
- **Headings**: Inter (700-800 weight)
- **Body**: Inter (400-500 weight)
- **Code**: JetBrains Mono

### Spacing
- Border radius: 16-20px (cards), 12px (buttons)
- Glass opacity: 0.15 (dark), 0.4 (light)
- Backdrop blur: 12px (standard), 20px (modals)

## 🎬 Key Animations

### Slot Machine Effect
Triggered when switching detection modes:
- 360° Y-axis rotation
- 0.5s duration with bounce easing
- Smooth theme color transition

### Mode Tiles
- 3D tilt effect following cursor
- Hover: Float animation + glow
- Active: Pulsing border ring

### Upload Modal
- Glassmorphic popup with backdrop blur
- Scale spring animation (0.8 → 1.0)
- Drag-and-drop file upload

### Background Animations
- **Text Mode**: Connected particle network
- **Image Mode**: Bokeh blur circles
- **Video Mode**: Vertical light rays

## 📄 Pages

- **/** - Homepage with hero and mode selection
- **/awareness** - Education about synthetic media impact
- **/datasets** - Dataset showcase with filters
- **/research** - Academic papers and methodology
- **/how-it-works** - Detection pipeline explained
- **/about** - Mission, team, and values
- **/resources** - External tools and links
- **/contact** - Contact form

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

### Tailwind Configuration
Customize colors and themes in `tailwind.config.ts`

### Font Configuration
Modify fonts in `app/layout.tsx` (currently using Inter)

## 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📈 Performance

### Optimization Features
- Code splitting (Next.js automatic)
- Dynamic imports for heavy animations
- Lazy loading of images and components
- Debounced scroll handlers
- RequestAnimationFrame for animations

### Target Metrics
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- Time to Interactive: < 3.5s
- Lighthouse Score: 90+

## ♿ Accessibility

- Semantic HTML
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus states clearly visible
- Respects `prefers-reduced-motion`
- Screen reader compatible

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Lenis](https://lenis.studiofreight.com/) - Smooth scrolling
- [Lucide Icons](https://lucide.dev/) - Icon library
- [shadcn/ui](https://ui.shadcn.com/) - Component inspiration

## 📧 Contact

- Website: [aidetector.com](https://aidetector.com)
- Email: contact@aidetector.com
- Twitter: [@aidetector](https://twitter.com/aidetector)
- GitHub: [@aidetector](https://github.com/aidetector)

---

**Built with ❤️ for a more authentic digital world**


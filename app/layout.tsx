import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ModeProvider } from '@/components/providers/ThemeProvider'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { BackgroundAnimation } from '@/components/effects/BackgroundAnimation'
import { SmoothScroll } from '@/components/effects/SmoothScroll'
import { PageLoader } from '@/components/animations/PageLoader'
import { ScrollToTop } from '@/components/effects/ScrollToTop'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DetectX - Detect AI-Generated Content',
  description: 'Detect AI-generated images, videos, and text instantly. Advanced detection technology for digital authenticity.',
  keywords: ['AI detection', 'deepfake', 'synthetic media', 'AI-generated content', 'DetectX'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ModeProvider>
          <PageLoader />
          <ScrollToTop />
          <SmoothScroll />
          <BackgroundAnimation />
          <div className="relative z-10">
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </div>
        </ModeProvider>
      </body>
    </html>
  )
}


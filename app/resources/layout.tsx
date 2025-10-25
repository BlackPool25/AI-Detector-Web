import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resources - AI Detection Tools, Guides & Documentation | DetectX',
  description: 'Access comprehensive resources for AI content detection including tutorials, API documentation, best practices, and guides. Learn how to integrate DetectX into your workflow and protect against AI-generated misinformation.',
  openGraph: {
    title: 'Resources - AI Detection Tools & Guides | DetectX',
    description: 'Access comprehensive resources for AI content detection.',
  },
  twitter: {
    card: 'summary',
    title: 'Resources - AI Detection Tools | DetectX',
    description: 'Access resources for AI content detection.',
  },
  alternates: {
    canonical: '/resources',
  },
}

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

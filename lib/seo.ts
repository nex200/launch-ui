import { Metadata } from 'next'
import { siteConfig } from '@/config/site'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article'
  locale?: string
}

export function generateMetadata({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
  locale = 'en'
}: SEOProps): Metadata {
  const siteName = siteConfig.name
  const siteUrl = siteConfig.url || process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'
  const defaultImage = `${siteUrl}/og-image.jpg`
  
  const fullTitle = title ? `${title}` : siteName
  const fullDescription = description || 'Create amazing AI videos with our advanced video generation platform. Transform text and images into stunning videos using cutting-edge AI technology.'
  const fullImage = image || defaultImage
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl

  return {
    title: fullTitle,
    description: fullDescription,
    keywords: [
      'AI video generation',
      'text to video',
      'image to video',
      'video creation',
      'artificial intelligence',
      'video editing',
      'content creation',
      ...keywords
    ],
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(siteUrl),
    icons: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        url: '/favicon-16x16.png',
      },
      {
        rel: 'icon',
        url: '/favicon.ico',
      },
    ],
    alternates: {
      canonical: fullUrl,
      languages: {
        'en-US': `${siteUrl}/en${url || ''}`,
        'zh-CN': `${siteUrl}/cn${url || ''}`,
      },
    },
    openGraph: {
      type,
      locale,
      url: fullUrl,
      title: fullTitle,
      description: fullDescription,
      siteName,
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      images: [fullImage],
      creator: '@your-twitter-handle',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
      yandex: process.env.YANDEX_VERIFICATION,
      yahoo: process.env.YAHOO_VERIFICATION,
    },
  }
}

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import createMiddleware from 'next-intl/middleware'
import { siteConfig } from '@/config/site'

const intlMiddleware = createMiddleware({
    locales: siteConfig.locales,
    localePrefix: siteConfig.localePrefix,
    defaultLocale: siteConfig.defaultLocale,
    localeDetection: false
})

const isProtectedRoute = createRouteMatcher(['/:locale/dashboard(.*)'])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect()

  return intlMiddleware(req)
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
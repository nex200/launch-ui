import "@/styles/globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/contexts/theme-provider";
import { inter } from "@/lib/fonts";
import { generateMetadata } from '@/lib/seo'
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale, getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

export const metadata: Metadata = generateMetadata({
  title: 'AI Video Generator - Create Amazing Videos with AI',
  description: 'Transform your ideas into stunning videos with our advanced AI video generation platform. Create professional videos from text and images in minutes.',
  keywords: ['AI video generator', 'text to video', 'video creation', 'AI technology'],
  type: 'website',
});

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const { locale } = await params;
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
      notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.className} bg-background antialiased`}>
      <NextIntlClientProvider messages={messages}>
        <ThemeProvider>{children}</ThemeProvider>
      </NextIntlClientProvider>
      </body>
    </html>
  );
}

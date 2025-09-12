import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

export const metadata: Metadata = {
  title: "CareerCompass - AI-Powered Career Recommendation System",
  description:
    "Discover your perfect career path with our comprehensive AI-powered assessment. Get personalized career recommendations based on your skills, interests, and goals.",
  generator: "CareerCompass",
  keywords:
    "career assessment, career guidance, job recommendations, career counseling, professional development, career test, AI career advice, career finder, job matching, career exploration",
  authors: [{ name: "CareerCompass Team" }],
  creator: "CareerCompass",
  publisher: "CareerCompass",
  robots: "index, follow",
  metadataBase: new URL("https://your-domain.vercel.app"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [{ url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" }],
  },
  openGraph: {
    title: "CareerCompass - Find Your Perfect Career",
    description:
      "AI-powered career recommendations tailored to your unique profile. Take our free 15-minute assessment and discover careers that match your skills and interests.",
    type: "website",
    locale: "en_US",
    url: "https://your-domain.vercel.app",
    siteName: "CareerCompass",
  },
  twitter: {
    card: "summary_large_image",
    title: "CareerCompass - AI Career Assessment",
    description: "Discover your ideal career path with our comprehensive assessment",
    creator: "@careercompass",
  },
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="canonical" href="https://your-domain.vercel.app" />
        <style>{`
          html {
            font-family: ${GeistSans.style.fontFamily};
            --font-sans: ${GeistSans.variable};
            --font-mono: ${GeistMono.variable};
          }
        `}</style>
      </head>
      <body className="bg-gray-50">

        <main>{children}</main>
      </body>
    </html>
  )
}

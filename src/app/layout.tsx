import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cutesy Recipe App 🍳',
  description: 'A minimalist recipe app with cute cooking animals',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
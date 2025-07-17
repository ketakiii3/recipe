import type { Metadata } from 'next'
import Head from 'next/head'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cutesy Recipe App 🍳',
  description: 'A minimalist recipe app with cute cooking animals',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <script
          async
          src="https://tenor.com/embed.js"
        ></script>
      </Head>
      <body>{children}</body>
    </html>
  )
}

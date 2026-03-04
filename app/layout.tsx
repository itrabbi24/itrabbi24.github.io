import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ARG RABBY – Full-Stack Software Developer',
  description:
    'Senior Full-Stack Software Developer specializing in scalable, performant, production-ready web solutions. Expert in .NET, React, Node.js, and modern web technologies.',
  keywords: [
    'ARG RABBY',
    'Full-Stack Developer',
    'Software Engineer',
    '.NET Developer',
    'React Developer',
    'Node.js',
    'PHP',
    'Portfolio',
  ],
  authors: [{ name: 'ARG RABBY', url: 'https://github.com/itrabbi24' }],
  openGraph: {
    title: 'ARG RABBY – Full-Stack Software Developer',
    description: 'Building scalable, performant, production-ready web solutions with modern tech.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ARG RABBY – Full-Stack Software Developer',
    description: 'Building scalable, performant, production-ready web solutions with modern tech.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

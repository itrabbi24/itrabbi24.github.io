import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import SessionProvider from '@/components/SessionProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', display: 'swap' });

export const metadata: Metadata = {
  title: 'ARG RABBY — Full-Stack Software Developer',
  description: 'Full-Stack Developer specializing in .NET Core, React, PHP/Laravel and modern web technologies. 5+ years building scalable enterprise applications in Bangladesh.',
  keywords: ['ARG RABBY', 'Full-Stack Developer', '.NET Developer', 'React Developer', 'PHP Laravel', 'Portfolio', 'Bangladesh Developer'],
  authors: [{ name: 'ARG RABBY', url: 'https://github.com/itrabbi24' }],
  openGraph: {
    title: 'ARG RABBY — Full-Stack Software Developer',
    description: 'Building scalable, high-performance web & mobile applications.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
        style={{ background: 'var(--bg)', color: 'var(--text)' }}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}

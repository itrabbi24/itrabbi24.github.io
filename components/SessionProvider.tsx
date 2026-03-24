'use client';
import { SessionProvider as NextSessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';

export default function SessionProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
      <NextSessionProvider>{children}</NextSessionProvider>
    </ThemeProvider>
  );
}

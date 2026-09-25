'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from 'next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      {children}
    </NextThemesProvider>
  );
}

export function useTheme() {
  const { theme, setTheme } = useNextTheme();
  return {
    theme: (theme === 'light' ? 'light' : 'dark') as 'light' | 'dark',
    toggleTheme: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
  };
}
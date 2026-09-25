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

  // Lazily initialize mounted state to avoid useEffect setState linter warnings
  const [mounted] = React.useState(() => typeof window !== 'undefined');

  return {
    mounted,
    theme: (theme === 'light' ? 'light' : 'dark') as 'light' | 'dark',
    toggleTheme: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
  };
}
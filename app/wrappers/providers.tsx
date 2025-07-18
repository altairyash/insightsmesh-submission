"use client";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="data-theme" enableSystem defaultTheme="light">
      {children}
    </ThemeProvider>
  );
}

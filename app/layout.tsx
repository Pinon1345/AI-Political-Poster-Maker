import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PoliticAI Studio",
  description: "AI-powered political campaign generator platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#18181b',
                color: '#fff',
                border: '1px solid #27272a',
              }
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
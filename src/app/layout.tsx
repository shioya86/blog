import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Blog",
    template: "%s | Blog",
  },
  description: "個人技術ブログ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <div className="mx-auto max-w-2xl px-4">
          <header className="flex items-center justify-between py-8">
            <Link
              href="/"
              className="text-lg font-semibold tracking-tight hover:opacity-70 transition-opacity"
            >
              Blog
            </Link>
          </header>
          <main>{children}</main>
          <footer className="py-12 text-sm text-zinc-500">
            © {new Date().getFullYear()} Blog
          </footer>
        </div>
      </body>
    </html>
  );
}

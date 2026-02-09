import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Providers } from "@/components/Providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Scribble | Virtual Whiteboard for Sketching Diagrams",
  description:
    "Create hand-drawn style diagrams with real-time collaboration, complete privacy, and unlimited possibilities. No account needed.",
  openGraph: {
    title: "Scribble | Virtual Whiteboard",
    description: "Create beautiful hand-drawn diagrams collaboratively",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scribble | Virtual Whiteboard",
    description: "Create beautiful hand-drawn diagrams collaboratively",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-white text-gray-900 dark:bg-zinc-950 dark:text-zinc-50`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Providers>
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}


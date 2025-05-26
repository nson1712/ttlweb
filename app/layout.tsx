import { ThemeProvider } from "next-themes";
import { MainLayout } from "../app/components/layout/main-layout";
import { ReactNode, Suspense } from "react";
import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TruyenABC – Discover & Read Novels Online",
  description:
    "TruyenABC brings you thousands of online novels across every genre—fantasy, romance, sci-fi, and more. Find your next favorite read today!",
  keywords: [
    "online novels",
    "read web novels",
    "fantasy stories",
    "romance novels",
    "sci-fi books",
    "novel discovery",
  ],
  openGraph: {
    title: "TruyenABC – Discover & Read Novels Online",
    description:
      "Thousands of novels across all genres. Start your next reading adventure on TruyenABC!",
    url: "https://truyenabc.site/",
    siteName: "TruyenABC",
    images: [
      { url: "https://yoursite.com/og-image.jpg", width: 1200, height: 630 },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TruyenABC – Discover & Read Novels Online",
    description:
      "Thousands of novels across all genres. Start your next reading adventure on TruyenABC!",
    images: ["https://yoursite.com/twitter-card.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense
            fallback={
              <div className="flex h-64 items-center justify-center">
                Loading…
              </div>
            }
          >
            <MainLayout>{children}</MainLayout>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}

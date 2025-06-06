import { ThemeProvider } from "next-themes";
import { MainLayout } from "../app/components/layout/main-layout";
import { ReactNode, Suspense } from "react";
import "./globals.css";
import { Metadata } from "next";
import Loading from "./components/components/loading";

export const metadata: Metadata = {
  title: "Tàng Thư Lâu – Discover & Read Novels Online",
  description:
    "Tàng Thư Lâu brings you thousands of online novels across every genre—fantasy, romance, sci-fi, and more. Find your next favorite read today!",
  keywords: [
    "online novels",
    "read web novels",
    "fantasy stories",
    "romance novels",
    "sci-fi books",
    "novel discovery",
  ],
  openGraph: {
    title: "Tàng Thư Lâu – Discover & Read Novels Online",
    description:
      "Thousands of novels across all genres. Start your next reading adventure on Tàng Thư Lâu!",
    url: "https://tangthulau.com/",
    siteName: "Tàng Thư Lâu",
    images: [
      { url: "https://yoursite.com/og-image.jpg", width: 1200, height: 630 },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tàng Thư Lâu – Discover & Read Novels Online",
    description:
      "Thousands of novels across all genres. Start your next reading adventure on Tàng Thư Lâu!",
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
              <Loading  />
            }
          >
            <MainLayout>{children}</MainLayout>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}

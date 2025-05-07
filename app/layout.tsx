"use client";

import { ThemeProvider } from "next-themes";
import { MainLayout } from "../app/components/layout/main-layout";
import { ReactNode, Suspense } from "react";
import "./globals.css";

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
          
          <Suspense fallback={<div className="flex h-64 items-center justify-center">Loading…</div>}>
          <MainLayout>{children}</MainLayout>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}

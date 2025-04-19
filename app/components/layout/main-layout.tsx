"use client";

import { Header } from "../../components/layout/header";
import { Footer } from "../../components/layout/footer";
import { Providers } from "@/app/providers";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <Providers>
      <div className="flex flex-col min-h-screen bg-gray-900 text-white">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
      </div>
    </Providers>
  );
}

"use client";

import { SettingsContext, Theme } from "@/app/context/setting-context";
import { cn } from "@/app/lib/utils";
import { useContext } from "react";
import { Header } from "./header";
import { Footer } from "./footer";
import { SessionProvider } from "next-auth/react";

export function LayoutInner({ children }: { children: React.ReactNode }) {
  const { theme } = useContext(SettingsContext);

  // Bản đồ class theo theme
  const themeClasses: Record<Theme, string> = {
    light: "bg-white text-gray-900",
    dark: "bg-gray-900 text-white",
    sepia: "bg-[#f8f1e3] text-[#5f4b32]",
  };

  return (
    <SessionProvider>
      <div className={cn("flex flex-col min-h-screen", themeClasses[theme ?? "dark"])}>
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 min-h-svh">
        {children}
      </main>
      <Footer />
    </div>
    </SessionProvider>
  );
}
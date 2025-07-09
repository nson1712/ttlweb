import React from "react";
import { cn } from "../../../lib/utils";
import { HeaderLogo } from "./header-logo";
import { DesktopNavigation } from "./desktop-navigation";
import { HeaderActions } from "./header-action";
import { MobileSearch } from "./mobile-search";
import { MobileNavigation } from "./mobile-navigation";

export interface Theme {
  light: string;
  dark: string;
  sepia: string;
}

export interface UserProfile {
  avatar: string;
  displayName: string;
}

interface HeaderProps {
  isLoggedIn: boolean;
  userProfile: UserProfile | null;
  theme: keyof Theme;
}

export function Header({
  isLoggedIn,
  userProfile,
  theme = "dark",
}: HeaderProps) {
  const gradientClasses: Theme = {
    light: "bg-white text-gray-900",
    dark: "bg-gradient-to-r from-gray-900/95 to-gray-900 text-white",
    sepia: "bg-gradient-to-r from-[#f8f1e3] to-[#efe2c7] text-[#5f4b32]",
  };

  return (
    <header className="sticky top-0 z-50">
      <div
        className={cn(
          "h-1 w-full",
          theme === "light"
            ? "bg-gradient-to-r from-emerald-600 to-cyan-600"
            : theme === "dark"
            ? "bg-gradient-to-r from-emerald-500 to-cyan-500"
            : "bg-gradient-to-r from-emerald-400 to-cyan-400"
        )}
      />

      <div
        className={cn("transition-all duration-300", gradientClasses[theme])}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <HeaderLogo theme={theme} />

            <DesktopNavigation theme={theme} />

            <HeaderActions
              isLoggedIn={isLoggedIn}
              userProfile={userProfile}
              theme={theme}
            />
          </div>

          <MobileSearch theme={theme} />

          <MobileNavigation isLoggedIn={isLoggedIn} theme={theme} />
        </div>
      </div>
    </header>
  );
}

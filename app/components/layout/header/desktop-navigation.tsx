import React from "react";
import Link from "next/link";
import { Home, BookOpen, Tag, Clock } from "lucide-react";
import { cn } from "../../../lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../../ui/navigation-menu";
import { Theme } from ".";

interface DesktopNavigationProps {
  theme: keyof Theme;
}

// Server Component - Desktop Navigation
export function DesktopNavigation({ theme }: DesktopNavigationProps) {
  const textColorMap: Record<keyof Theme, { base: string; hover: string }> = {
    light: {
      base: "text-gray-700",
      hover: "hover:bg-gray-100 hover:text-gray-900",
    },
    dark: {
      base: "text-gray-200",
      hover: "hover:bg-gray-800 hover:text-white",
    },
    sepia: {
      base: "text-[#5f4b32]",
      hover: "hover:bg-[#f8f1e3] hover:text-[#7a6f49]",
    },
  };

  const navLinkText = textColorMap[theme];

  const navigationItems = [
    {
      href: "/",
      icon: Home,
      label: "Trang chủ",
    },
    {
      href: "/truyen",
      icon: BookOpen,
      label: "Truyện",
    },
    {
      href: "/the-loai",
      icon: Tag,
      label: "Thể loại",
    },
    {
      href: "/moi-cap-nhat",
      icon: Clock,
      label: "Mới cập nhật",
    },
  ];

  return (
    <div className="hidden lg:block">
      <NavigationMenu>
        <NavigationMenuList className="gap-1">
          {navigationItems.map(({ href, icon: Icon, label }) => (
            <NavigationMenuItem key={href}>
              <Link href={href} legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent hover:bg-gray-800/70",
                    navLinkText.base,
                    navLinkText.hover
                  )}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {label}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}


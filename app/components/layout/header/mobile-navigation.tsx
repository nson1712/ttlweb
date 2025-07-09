"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Home, BookOpen, Tag, Clock, LogInIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../../lib/utils";
import LogoutButton from "../../components/logout-btn";
import { Theme } from ".";

interface MobileNavigationProps {
  isLoggedIn: boolean;
  theme: keyof Theme;
}

export const MobileNavigation = ({
  isLoggedIn,
  theme,
}: MobileNavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleMenuToggle = (event: CustomEvent) => {
      setIsOpen(event.detail.isOpen);
    };

    window.addEventListener("menuToggle", handleMenuToggle as EventListener);
    return () => {
      window.removeEventListener(
        "menuToggle",
        handleMenuToggle as EventListener
      );
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !menuToggleRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const mobileNavBg: Record<keyof Theme, string> = {
    light: "bg-white border-gray-200",
    dark: "bg-gray-900 border-gray-700/50",
    sepia: "bg-[#f8f1e3] border-[#e8d9c0]/50",
  };

  const mobileNavText: Record<keyof Theme, string> = {
    light: "text-gray-700 hover:text-gray-900 hover:bg-gray-100",
    dark: "text-gray-200 hover:text-white hover:bg-gray-800/50",
    sepia: "text-[#5f4b32] hover:text-[#7a6f49] hover:bg-[#f8f1e3]/50",
  };

  const navigationItems = [
    {
      href: "/",
      icon: Home,
      label: "Trang chủ",
    },
    {
      href: "/the-loai",
      icon: Tag,
      label: "Thể loại",
    },
    {
      href: "/truyen",
      icon: BookOpen,
      label: "Truyện",
    },
    {
      href: "/moi-cap-nhat",
      icon: Clock,
      label: "Mới cập nhật",
    },
  ];

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          exit={{ scaleY: 0, opacity: 0 }}
          className={cn(
            "absolute inset-x-0 lg:hidden overflow-hidden mt-4 rounded-xl border p-2",
            mobileNavBg[theme]
          )}
          ref={menuRef}
        >
          <nav className="flex flex-col">
            {navigationItems.map(({ href, icon: Icon, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors active:bg-gray-800",
                  mobileNavText[theme]
                )}
                onClick={closeMenu}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}

            <div className="w-[95%] mx-auto mb-4 border-[0.5px] border-gray-500"></div>

            {isLoggedIn ? (
              <LogoutButton />
            ) : (
              <Link
                href="/login"
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  mobileNavText[theme]
                )}
                onClick={closeMenu}
              >
                <LogInIcon className="h-4 w-4" />
                <span>Đăng nhập</span>
              </Link>
            )}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

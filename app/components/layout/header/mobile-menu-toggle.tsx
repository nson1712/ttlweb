"use client";

import React, { useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "../../ui/button";
import { cn } from "../../../lib/utils";
import { Theme } from ".";

interface MobileMenuToggleProps {
  theme: keyof Theme;
  onToggle: () => void;
  isOpen: boolean;
  closeMenu: () => void;
}

export const MobileMenuToggle = ({
  theme,
  onToggle,
  isOpen,
  closeMenu,
}: MobileMenuToggleProps) => {
  const iconColorMap: Record<keyof Theme, string> = {
    light: "text-gray-700",
    dark: "text-gray-200",
    sepia: "text-[#5f4b32]",
  };

  const menuToggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuToggleRef.current &&
        !menuToggleRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeMenu]);

  return (
    <Button
      ref={menuToggleRef}
      variant="ghost"
      size="icon"
      className="sm:hidden text-gray-300 hover:text-white hover:bg-gray-800/70"
      onClick={onToggle}
    >
      {isOpen ? (
        <X className={cn("h-6 w-6", iconColorMap[theme])} />
      ) : (
        <Menu className={cn("h-6 w-6", iconColorMap[theme])} />
      )}
    </Button>
  );
};

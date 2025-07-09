"use client";
import React from "react";
import { Search } from "lucide-react";
import { Button } from "../../ui/button";
import { cn } from "../../../lib/utils";
import { Theme } from ".";

interface SearchToggleProps {
  theme: keyof Theme;
  onToggle: () => void;
}

export const SearchToggle = ({ theme, onToggle }: SearchToggleProps) => {
  const iconColorMap: Record<keyof Theme, string> = {
    light: "text-gray-700",
    dark: "text-gray-200",
    sepia: "text-[#5f4b32]",
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="md:hidden relative text-gray-300 hover:text-white hover:bg-gray-800/70"
      onClick={onToggle}
    >
      <Search className={cn("h-5 w-5", iconColorMap[theme])} />
    </Button>
  );
};

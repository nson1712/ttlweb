"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { cn } from "../../../lib/utils";
import { useSearch } from "@/app/context/search-context";
import { Theme } from ".";

interface MobileSearchProps {
  theme: keyof Theme;
}

// Client Component - Mobile Search
export const MobileSearch = ({ theme }: MobileSearchProps) => {
  const router = useRouter();
  const { searchTerm, setSearchTerm } = useSearch();
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleSearchToggle = (event: CustomEvent) => {
      setIsOpen(event.detail.isOpen);
    };

    window.addEventListener(
      "searchToggle",
      handleSearchToggle as EventListener
    );
    return () => {
      window.removeEventListener(
        "searchToggle",
        handleSearchToggle as EventListener
      );
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const mobileSearchBg: Record<keyof Theme, string> = {
    light: "bg-white text-gray-900",
    dark: "bg-gray-900 text-white",
    sepia: "bg-[#f8f1e3] text-[#5f4b32]",
  };

  const mobileInputBg: Record<keyof Theme, string> = {
    light: "bg-gray-100 placeholder-gray-500 ring-gray-400",
    dark: "bg-gray-800 placeholder-gray-400 ring-emerald-500",
    sepia: "bg-[#efe2c7] placeholder-[#7a6f49] ring-[#d1b97e]",
  };

  const mobileBtnBg: Record<keyof Theme, string> = {
    light: "bg-emerald-500 hover:bg-emerald-600 text-white",
    dark: "bg-emerald-400 hover:bg-emerald-500 text-white",
    sepia: "bg-emerald-300 hover:bg-emerald-400 text-white",
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/truyen?filter=title%7Clike%7C${searchTerm}`);
      setIsOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          exit={{ scaleY: 0, opacity: 0 }}
          className={cn(
            "absolute top-full inset-x-0 overflow-hidden md:hidden p-4 rounded-lg",
            mobileSearchBg[theme]
          )}
          ref={searchRef}
        >
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="text"
              placeholder="Tìm kiếm truyện..."
              className={cn(
                "w-full rounded-lg pl-10 pr-4 py-2 focus:border-transparent",
                mobileInputBg[theme]
              )}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
            <Search
              className={cn(
                "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4",
                theme === "light"
                  ? "text-gray-400"
                  : theme === "dark"
                  ? "text-gray-500"
                  : "text-[#7a6f49]"
              )}
            />
            <Button
              type="submit"
              className={cn(
                "absolute right-0.5 top-1/2 bg-gradient-to-r from-emerald-500 to-teal-600 transform -translate-y-1/2 rounded-md h-8 px-3",
                mobileBtnBg[theme]
              )}
            >
              Tìm kiếm
            </Button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

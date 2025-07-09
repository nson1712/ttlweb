"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "../../ui/input";
import { cn } from "../../../lib/utils";
import { useSearch } from "@/app/context/search-context";
import { Theme } from ".";

interface DesktopSearchProps {
  theme: keyof Theme;
}

// Client Component - Desktop Search
export function DesktopSearch({ theme }: DesktopSearchProps) {
  const router = useRouter();
  const { searchTerm, setSearchTerm } = useSearch();

  const desktopInputMap: Record<keyof Theme, string> = {
    light:
      "bg-gray-100 text-gray-900 border-gray-300 placeholder-gray-500 focus:ring-gray-400",
    dark: "bg-gray-800 text-white border-gray-700 placeholder-gray-400 focus:ring-emerald-500",
    sepia:
      "bg-[#efe2c7] text-[#5f4b32] border-[#e8d9c0] placeholder-[#7a6f49] focus:ring-[#d1b97e]",
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/truyen?filter=title%7Clike%7C${searchTerm}`);
    }
  };

  return (
    <div className="hidden md:block relative">
      <form onSubmit={handleSearch} className="relative group">
        <Input
          type="text"
          placeholder="Tìm kiếm truyện..."
          className={cn(
            "w-64 rounded-full pl-10 pr-4 py-2 transition-all focus:border-transparent",
            desktopInputMap[theme]
          )}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
      </form>
    </div>
  );
}


"use client";

import { FC, useContext } from "react";
import { cn } from "@/app/lib/utils";
import { Filter, SortAsc, SortDesc } from "lucide-react";
import Link from "next/link";
import { SettingsContext, Theme } from "@/app/context/setting-context";

type StoryByCategoryFilterProps = {
  category: string;
  sort: string;
};

export const StoryByCategoryFilter: FC<StoryByCategoryFilterProps> = ({
  category,
  sort,
}) => {
  const { theme } = useContext(SettingsContext);

  const wrapperBg: Record<Theme, string> = {
    light: "bg-gray-100/90",
    dark: "bg-gray-800/50",
    sepia: "bg-[#efe2c7]",
  };

  const textBase: Record<Theme, string> = {
    light: "text-gray-900",
    dark: "text-white",
    sepia: "text-[#5f4b32]",
  };

  const filterIcon: Record<Theme, string> = {
    light: "text-gray-600",
    dark: "text-gray-400",
    sepia: "text-[#7a6f49]",
  };

  const linkBase: Record<Theme, string> = {
    light: "text-gray-700 hover:bg-gray-200",
    dark: "text-gray-300 hover:bg-gray-600",
    sepia: "text-[#7a6f49] hover:bg-[#f8f1e3]/50",
  };

  const activeLink: Record<Theme, string> = {
    light: "bg-gradient-to-r from-emerald-600 to-teal-600 text-white",
    dark: "bg-gradient-to-r from-emerald-500 to-teal-600 text-white",
    sepia: "bg-gradient-to-r from-emerald-400 to-teal-500 text-white",
  };

  return (
    <div
      className={cn(
        "mb-6 flex flex-col gap-4 p-4 rounded-xl backdrop-blur-sm",
        wrapperBg[theme ?? "dark"]
      )}
    >
      <div className="flex items-center gap-2">
        <Filter className={cn("h-5 w-5", filterIcon[theme ?? "dark"])} />
        <span className={cn("text-sm font-medium", textBase[theme ?? "dark"])}>
          Sắp xếp theo:
        </span>

        <Link
          href={`/the-loai/${category}?sort=rate:DESC`}
          className={cn(
            "rounded-full px-3 py-1 text-sm font-medium transition-colors",
            sort === "rate:DESC" ? activeLink[theme ?? "dark"] : linkBase[theme ?? "dark"]
          )}
        >
          Đánh giá
        </Link>

        <Link
          href={`/the-loai/${category}?sort=updatedAt:DESC`}
          className={cn(
            "flex items-center rounded-full px-3 py-1 text-sm font-medium transition-colors",
            sort === "updatedAt:DESC" ? activeLink[theme ?? "dark"] : linkBase[theme ?? "dark"]
          )}
        >
          <SortDesc className="mr-1 h-3 w-3 inline" />
          Mới nhất
        </Link>

        <Link
          href={`/the-loai/${category}?sort=updatedAt:ASC`}
          className={cn(
            "flex items-center rounded-full px-3 py-1 text-sm font-medium transition-colors",
            sort === "updatedAt:ASC" ? activeLink[theme ?? "dark"] : linkBase[theme ?? "dark"]
          )}
        >
          <SortAsc className="mr-1 h-3 w-3 inline" />
          Cũ nhất
        </Link>
      </div>
    </div>
  );
};

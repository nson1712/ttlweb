"use client";

import { FC, useContext } from "react";
import Link from "next/link";
import { capitalizeFirstLetter, cn } from "@/app/lib/utils";
import { ChevronLeft, Tag as TagIcon } from "lucide-react";
import { SettingsContext, Theme } from "@/app/context/setting-context";

type StoryByCategoryHeaderProps = {
  finalColorClasses: string;
  categoryName: string;
  totalStories: number;
};

export const StoryByCategoryHeader: FC<StoryByCategoryHeaderProps> = ({
  finalColorClasses,
  categoryName,
  totalStories,
}) => {
  const { theme } = useContext(SettingsContext);

  const wrapperBg: Record<Theme, string> = {
    light: "bg-white text-gray-900",
    dark: "bg-gray-900 text-white",
    sepia: "bg-[#f8f1e3] text-[#5f4b32]",
  };

  const sectionBg: Record<Theme, string> = {
    light: "bg-gray-100/90",
    dark: "bg-gray-800/50",
    sepia: "bg-[#f8f1e3]/80",
  };

  return (
    <div className={cn("mb-8 p-4 rounded-lg transition-colors", wrapperBg[theme ?? 'dark'])}>
      <Link
        href="/the-loai"
        className="inline-flex items-center mb-4 text-sm font-medium text-emerald-400 hover:text-emerald-300"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Danh sách thể loại
      </Link>

      <div className={cn("flex items-center gap-3 p-4 rounded-lg", sectionBg[theme ?? 'dark'])}>
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-lg border bg-gradient-to-br",
            finalColorClasses
          )}
        >
          <TagIcon className="h-6 w-6" />
        </div>
        <h1 className={cn("text-3xl font-bold", {
          'text-gray-900': theme === 'light',
          'text-white': theme === 'dark',
          'text-[#5f4b32]': theme === 'sepia',
        })}>
          {capitalizeFirstLetter(categoryName)}
        </h1>
        <span className={cn(
          "rounded-full px-3 py-1 text-sm font-medium",
          {
            'bg-gray-200 text-gray-800': theme === 'light',
            'bg-gray-700 text-gray-200': theme === 'dark',
            'bg-[#efe2c7] text-[#7a6f49]': theme === 'sepia',
          }
        )}>
          {totalStories} truyện
        </span>
      </div>

      <p className={cn("mt-2", {
        'text-gray-700': theme === 'light',
        'text-gray-400': theme === 'dark',
        'text-[#7a6f49]': theme === 'sepia',
      })}>
        Danh sách truyện {capitalizeFirstLetter(categoryName)}
      </p>
    </div>
  );
};

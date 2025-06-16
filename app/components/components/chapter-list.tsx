// components/ChapterList.tsx
"use client";

import React, { FC, useContext } from "react";
import Link from "next/link";
import { Calendar, ChevronRight, LockKeyhole } from "lucide-react";
import { cn, formatDateTime } from "@/app/lib/utils";
import { ChapterType } from "@/app/types/chapter";
import { SettingsContext, Theme } from "@/app/context/setting-context";

export type ChapterListProps = {
  chapters: ChapterType[];
  storySlug: string;
};

export const ChapterList: FC<ChapterListProps> = ({ chapters, storySlug }) => {
  const { theme } = useContext(SettingsContext);

  // Theme-based style maps
  const wrapperBg: Record<Theme, string> = {
    light: "bg-gray-100/30",
    dark: "bg-gray-800/50",
    sepia: "bg-[#f8f1e3]/80",
  };
  const itemBg: Record<Theme, string> = {
    light: "bg-gray-100/80 hover:bg-gray-200",
    dark: "bg-gray-700/50 hover:bg-gray-700/70",
    sepia: "bg-[#efe2c7]/80 hover:bg-[#e8d9c0]/90",
  };
  const titleColor: Record<Theme, string> = {
    light: "text-gray-900 group-hover:text-gray-800",
    dark: "text-emerald-400 group-hover:text-emerald-300",
    sepia: "text-[#5f4b32] group-hover:text-[#7a6f49]",
  };
  const metaColor: Record<Theme, string> = {
    light: "text-gray-700",
    dark: "text-gray-400",
    sepia: "text-[#7a6f49]",
  };
  const iconColor: Record<Theme, string> = {
    light: "text-emerald-600",
    dark: "text-emerald-400",
    sepia: "text-emerald-500",
  };
  const navIconColor: Record<Theme, string> = {
    light: "text-gray-500 group-hover:text-gray-700",
    dark: "text-gray-500 group-hover:text-emerald-400",
    sepia: "text-[#7a6f49] group-hover:text-[#5f4b32]",
  };

  return (
    <div
      className={cn(
        "mb-6 space-y-3 p-2 rounded",
        wrapperBg[theme ?? "dark"]
      )}
    >
      {chapters.map((chapter) => (
        <Link
          key={chapter.id}
          href={`/truyen/${storySlug}/${chapter.slug}`}
          className={cn(
            "group block rounded-lg p-3 transition",
            itemBg[theme ?? "dark"]
          )}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3
                className={cn(
                  "font-medium line-clamp-2 text-lg",
                  titleColor[theme ?? "dark"]
                )}
              >
                {chapter.title}
              </h3>

              <div
                className={cn(
                  "flex items-center gap-3 mt-1 text-sm",
                  metaColor[theme ?? "dark"]
                )}
              >
                <div className="flex items-center gap-1">
                  <Calendar
                    className={cn("h-4 w-4", iconColor[theme ?? "dark"])}
                  />
                  <span>{formatDateTime(chapter.createdAt)}</span>
                </div>
              </div>
            </div>

            <div className="ml-4 flex items-center gap-2">
              {chapter.price !== 0 && (
                <LockKeyhole
                  className={cn("h-5 w-5", iconColor[theme ?? "dark"])}
                />
              )}
              <ChevronRight
                className={cn("h-5 w-5", navIconColor[theme ?? "dark"])}
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

"use client";

import React, { FC, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { StoryType } from "@/app/types/story";
import { StarRate } from "./star-rate";
import { SettingsContext, Theme } from "@/app/context/setting-context";
import { cn } from "@/app/lib/utils";

export type TabCardProps = {
  novel: StoryType;
};

export const TabCard: FC<TabCardProps> = ({ novel }) => {
  const { theme } = useContext(SettingsContext);

  const cardBgMap: Record<Theme, string> = {
    light: "bg-gray-100 hover:bg-gray-200",
    dark: "bg-gray-800 hover:bg-gray-700",
    sepia: "bg-[#e0ceb0] hover:bg-[#e0ceb0]/50",
  };

  const titleMap: Record<Theme, string> = {
    light: "text-gray-900",
    dark: "text-emerald-400",
    sepia: "text-[#5f4b32]",
  };

  const titleHoverMap: Record<Theme, string> = {
    light: "group-hover:text-emerald-600",
    dark: "group-hover:text-emerald-300",
    sepia: "group-hover:text-emerald-500",
  };

  const authorMap: Record<Theme, string> = {
    light: "text-gray-700",
    dark: "text-gray-300",
    sepia: "text-[#7a6f49]",
  };

  return (
    <Link href={`/truyen/${novel.slug}`} key={novel.id}>
      <div
        className={cn(
          "group flex items-center gap-4 shadow-md p-3 rounded-lg transition-transform duration-200 hover:scale-102",
          cardBgMap[theme ?? "dark"]
        )}
      >
        <Image
          src={novel.coverImage}
          alt={novel.title}
          className="object-cover rounded-md flex-shrink-0"
          unoptimized
          width={50}
          height={50}
        />
        <div className="flex-1">
          <h3
            className={cn(
              "font-medium line-clamp-2 transition-colors duration-150",
              titleMap[theme ?? "dark"],
              titleHoverMap[theme ?? "dark"]
            )}
          >
            {novel.title}
          </h3>
          <p className={cn("text-sm line-clamp-1", authorMap[theme ?? "dark"])}>
            {novel.author?.name}
          </p>
          <StarRate rate={novel.rate} />
        </div>
      </div>
    </Link>
  );
};

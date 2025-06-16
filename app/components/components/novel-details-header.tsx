"use client";

import React, { FC, useContext } from "react";
import {
  BookOpen,
  CheckCircle2Icon,
  Eye,
  Loader2Icon,
  Star,
  User,
} from "lucide-react";
import Image from "next/image";
import { BaseTag } from "./base-tag";
import { StoryType } from "@/app/types/story";
import { SettingsContext, Theme } from "@/app/context/setting-context";
import { cn } from "@/app/lib/utils";

export type NovelDetailsHeaderProps = {
  storyDetails: StoryType;
  totalChapters?: number;
};

export const NovelDetailsHeader: FC<NovelDetailsHeaderProps> = ({
  storyDetails,
  totalChapters,
}) => {
  const { theme } = useContext(SettingsContext);

  // Theme-based styles
  const headerBgMap: Record<Theme, string> = {
    light: "bg-white",
    dark:  "bg-gray-900",
    sepia: "bg-[#f8f1e3]",
  };
  const overlayMap: Record<Theme, string> = {
    light: "overlay-light",
    dark:  "overlay-dark",
    sepia: "overlay-sepia",
  };
  const titleMap: Record<Theme, string> = {
    light: "text-gray-900",
    dark:  "text-white",
    sepia: "text-[#5f4b32]",
  };
  const infoTextMap: Record<Theme, string> = {
    light: "text-gray-700",
    dark:  "text-gray-300",
    sepia: "text-[#7a6f49]",
  };
  const iconColorMap: Record<Theme, string> = {
    light: "text-emerald-600",
    dark:  "text-emerald-400",
    sepia: "text-emerald-500",
  };

  return (
    <div
      className={cn(
        "relative mb-8 overflow-hidden rounded-xl p-6 shadow-xl",
        headerBgMap[theme ?? "dark"]
      )}
    >
      <div className={cn(
        "absolute inset-0 overflow-hidden opacity-5",
        overlayMap[theme ?? "dark"]
      )}>
        {storyDetails.coverImage && (
          <Image
            src={storyDetails.coverImage}
            alt={storyDetails.title}
            fill
            unoptimized
            className="object-cover"
            priority
          />
        )}
      </div>

      <div className="relative z-10 flex flex-col gap-6 md:flex-row">
        {/* Cover */}
        <div className="relative mx-auto w-48 md:mx-0 md:w-56 flex-shrink-0">
          <div className="aspect-[3/4] overflow-hidden rounded-lg shadow-lg">
            {storyDetails.coverImage && (
              <Image
                src={storyDetails.coverImage}
                alt={storyDetails.title}
                fill
                unoptimized
                className="object-cover rounded-xl"
                priority
              />
            )}
          </div>
          <div className={cn(
            "absolute bottom-1 left-1 rounded-full px-3 py-1 text-sm font-medium shadow-md",
            theme === 'light'
              ? 'bg-white'
              : theme === 'dark'
              ? 'bg-gray-800'
              : 'bg-[#f8f1e3]'
          )}>
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className={infoTextMap[theme ?? "dark"]}>
                {(storyDetails.rate ?? 0).toFixed(1)}
              </span>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 space-y-4">
          <div>
            <h1 className={cn("text-3xl font-bold md:text-4xl", titleMap[theme ?? "dark"])}>
              {storyDetails.title}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <div className={cn("flex items-center gap-1 text-base", infoTextMap[theme ?? "dark"])}>
                <User className={cn("h-5 w-5", iconColorMap[theme ?? "dark"])} />
                <span>{storyDetails.author?.name}</span>
              </div>
              <div className={cn("flex items-center gap-1 text-base", infoTextMap[theme ?? "dark"])}>
                <BookOpen className={cn("h-5 w-5", iconColorMap[theme ?? "dark"])} />
                <span>{totalChapters} chương</span>
              </div>
              <div className={cn("flex items-center gap-1 text-base", infoTextMap[theme ?? "dark"])}>
                <Eye className={cn("h-5 w-5", iconColorMap[theme ?? "dark"])} />
                <span>{storyDetails.totalView.toLocaleString()} lượt đọc</span>
              </div>
              <div className={cn("flex items-center gap-1 text-base", infoTextMap[theme ?? "dark"])}>
                {storyDetails.status === "COMPLETED" ? (
                  <>
                    <CheckCircle2Icon className="w-5 h-5 text-green-500" />
                    <span>Hoàn thành</span>
                  </>
                ) : (
                  <>
                    <Loader2Icon className="w-4 h-4 text-blue-500" />
                    <span>Đang ra</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {[...storyDetails.mainCategories,
              ...storyDetails.categories.filter(c => c.slug !== storyDetails.mainCategories[0]?.slug)
            ].map((category, idx) => (
              <BaseTag
                key={category.id}
                href={`/the-loai/${category.slug}`}
                name={category.name}
                variant={idx === 0 ? "mainCategories" : "categories"}
              />
            ))}
          </div>

          <p className={cn("max-h-36 overflow-y-auto", infoTextMap[theme ?? "dark"])}
            dangerouslySetInnerHTML={{ __html: storyDetails.shortDescription || "" }}
          />

          <div className="flex flex-wrap gap-3">
            {/* Extra actions */}
          </div>
        </div>
      </div>
    </div>
  );
};

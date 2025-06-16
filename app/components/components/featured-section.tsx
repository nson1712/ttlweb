"use client";

import React, { FC, useContext } from "react";
import { Sparkles } from "lucide-react";
import { NovelCard } from "../novels/novel-card";
import { StoryType } from "@/app/types/story";
import { LinkButton } from "./link-btn";
import { SettingsContext, Theme } from "@/app/context/setting-context";
import { cn } from "@/app/lib/utils";

type FeaturedSectionProps = {
  feturedStories: StoryType[];
};

export const FeaturedSection: FC<FeaturedSectionProps> = ({ feturedStories }) => {
  const { theme } = useContext(SettingsContext);

  // Map màu cho Sparkles icon
  const iconMap: Record<Theme, string> = {
    light: "text-emerald-600",
    dark:  "text-emerald-400",
    sepia: "text-emerald-500",
  };
  // Map màu cho title
  const titleMap: Record<Theme, string> = {
    light: "text-gray-900",
    dark:  "text-white",
    sepia: "text-[#5f4b32]",
  };
  // Map nền section
  const sectionBgMap: Record<Theme, string> = {
    light: "bg-white",
    dark:  "bg-gray-900",
    sepia: "bg-[#f8f1e3]",
  };

  return (
    <section className={cn("p-4 rounded-lg", sectionBgMap[theme ?? "dark"])}>
      <div className="my-6 flex items-center">
        <Sparkles className={cn("mr-2 h-5 w-5", iconMap[theme ?? "dark"])} />
        <h2 className={cn("text-2xl font-bold", titleMap[theme ?? "dark"])}>
          Truyện đặc sắc
        </h2>
      </div>
      <div className="space-y-4">
        {feturedStories.map(novel => (
          <NovelCard key={novel.id} {...novel} />
        ))}
      </div>
      <LinkButton href="/truyen-dac-sac" label="Xem thêm" />
    </section>
  );
};

"use client";

import React, { FC, useContext } from "react";
import { colorClasses } from "@/app/lib/store-data";
import { CategoriesTag } from "./categories-card";
import { SettingsContext, Theme } from "@/app/context/setting-context";
import { cn } from "@/app/lib/utils";
import { Tag } from "lucide-react";

type CategoriesProps = {
  name: string;
  slug: string;
};

type CategoriesSectionProps = {
  categories: CategoriesProps[];
};

export const CategoriesTagsSection: FC<CategoriesSectionProps> = ({ categories }) => {
  const { theme } = useContext(SettingsContext);

  // Map nền section
  const sectionBgMap: Record<Theme, string> = {
    light: "bg-gray-100/50",
    dark:  "bg-gray-800/50",
    sepia: "bg-amber-50",
  };
  // Map màu tiêu đề
  const titleMap: Record<Theme, string> = {
    light: "text-gray-900",
    dark:  "text-white",
    sepia: "text-[#5f4b32]",
  };

  const colorKeys = Object.keys(colorClasses) as (keyof typeof colorClasses)[];
  const coloredCategories = categories.map((cate, index) => ({
    ...cate,
    color: colorKeys[index % colorKeys.length],
  }));


  return (
    <section className={cn("rounded-xl p-6 backdrop-blur-sm", sectionBgMap[theme ?? "dark"])}>
      <h2 className={cn("flex gap-x-2 mb-6 text-2xl font-bold", titleMap[theme ?? "dark"])}>
        <Tag className="self-center text-emerald-500" /> Thể Loại Nổi Bật
      </h2>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {coloredCategories.map((cate) => (
          <CategoriesTag key={cate.name} {...cate} />
        ))}
      </div>
    </section>
  );
};

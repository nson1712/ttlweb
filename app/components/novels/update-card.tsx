"use client";

import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, Star } from "lucide-react";
import { formatDateTime } from "@/app/lib/utils";
import { SettingsContext, Theme } from "@/app/context/setting-context";
import { cn } from "@/app/lib/utils";

interface UpdateCardProps {
  id: number;
  slug: string;
  chapterSlug: string;
  coverImage: string;
  rate: number;
  title: string;
  chapterTitle: string;
  updatedAt: string;
}

export function UpdateCard({
  id,
  slug,
  chapterSlug,
  coverImage,
  rate,
  title,
  chapterTitle,
  updatedAt,
}: UpdateCardProps) {
  const { theme } = useContext(SettingsContext);

  // Bản đồ nền
  const cardBgMap: Record<Theme, string> = {
    light: "bg-gray-100/90 hover:bg-gray-200",
    dark:  "bg-gradient-to-br from-gray-800/90 to-gray-900 hover:shadow-lg",
    sepia: " bg-[#efe2c0]  hover:bg-[#efe2c0]/50",
  };
  // Bản đồ màu tiêu đề
  const titleMap: Record<Theme, string> = {
    light: "text-gray-900 group-hover:text-emerald-600",
    dark:  "text-emerald-400 group-hover:text-emerald-300",
    sepia: "text-[#5f4b32] group-hover:text-emerald-500",
  };
  // Bản đồ màu chương
  const chapterMap: Record<Theme, string> = {
    light: "text-gray-700",
    dark:  "text-gray-300",
    sepia: "text-[#7a6f49]",
  };
  // Bản đồ màu meta
  const metaMap: Record<Theme, string> = {
    light: "text-gray-500",
    dark:  "text-gray-500",
    sepia: "text-[#8a7055]",
  };
  // Bản đồ màu line hover
  const lineGradientMap: Record<Theme, string> = {
    light: "from-emerald-600 to-teal-600",
    dark:  "from-emerald-500 to-teal-500",
    sepia: "from-emerald-500 to-teal-400",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Link
        href={`/truyen/${slug}/${chapterSlug}`}
        className="block"
        id={`${chapterTitle}-${id}`}
      >
        <div
          className={cn(
            "group relative overflow-hidden rounded-lg p-3 shadow-md transition-all duration-150",
            cardBgMap[theme ?? "dark"]
          )}
        >
          <div className="flex gap-4">
            <div className="relative h-16 w-12 flex-shrink-0 overflow-hidden rounded-md">
              <Image
                src={coverImage}
                alt={title}
                fill
                unoptimized
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="48px"
              />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className={cn("font-medium line-clamp-1", titleMap[theme ?? "dark"])}>
                {title}
              </h3>
              <p className={cn("text-sm line-clamp-1", chapterMap[theme ?? "dark"])}>
                {chapterTitle}
              </p>
              <div className={cn("flex items-center gap-2 text-xs", metaMap[theme ?? "dark"])}>
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span>{(rate ?? 0).toFixed(1)}</span>
                <Clock className="h-3 w-3" />
                <span>{formatDateTime(updatedAt)}</span>
              </div>
            </div>
          </div>

          <div
            className={cn(
              "absolute inset-x-0 bottom-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full",
              `bg-gradient-to-r ${lineGradientMap[theme ?? "dark"]}`
            )}
          />
        </div>
      </Link>
    </motion.div>
  );
}

"use client";

import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../../components/ui/button";
import { BookmarkIcon, Clock, User } from "lucide-react";
import { AuthorType, CategoryType } from "@/app/lib/types";
import { BaseTag } from "../components/base-tag";
import { formatDateTime } from "@/app/lib/utils";
import { StarRate } from "../components/star-rate";
import { SettingsContext, Theme } from "@/app/context/setting-context";
import { cn } from "@/app/lib/utils";

export interface NovelCardProps {
  slug?: string;
  title: string;
  coverImage: string;
  author?: AuthorType;
  rate?: number;
  totalRatings?: number;
  mainCategories?: CategoryType[];
  categories?: CategoryType[];
  updatedAt?: string;
  chapterCount?: number;
  shortDescription: string;
}

export function NovelCard({
  slug,
  title,
  coverImage,
  author,
  rate,
  mainCategories,
  categories,
  shortDescription,
  updatedAt,
  chapterCount,
}: NovelCardProps) {
  const { theme } = useContext(SettingsContext);
  const cardBgMap: Record<Theme, string> = {
    light: "bg-gray-100 hover:bg-gray-200",
    dark:  "bg-gray-800 hover:bg-gray-700",
    sepia: "bg-[#efe2c0] hover:bg-[#e0ceb0]",
  };

  const titleMap: Record<Theme, string> = {
    light: "text-gray-900 hover:text-emerald-600",
    dark:  "text-emerald-400 hover:text-emerald-300",
    sepia: "text-[#5f4b32] hover:text-emerald-500",
  };

  const authorMap: Record<Theme, string> = {
    light: "text-gray-700",
    dark:  "text-gray-300",
    sepia: "text-[#7a6f49]",
  };

  const metaMap: Record<Theme, string> = {
    light: "text-gray-500",
    dark:  "text-gray-500",
    sepia: "text-[#8a7055]",
  };

  const lineMap: Record<Theme, string> = {
    light: "from-emerald-600 to-teal-600",
    dark:  "from-emerald-500 to-teal-500",
    sepia: "from-emerald-500 to-teal-400",
  };

  return (
    <div
      className={cn(
        "group relative flex flex-col md:flex-row gap-4 shadow-md rounded-lg overflow-hidden p-4 transition-all duration-150",
        cardBgMap[theme ?? "dark"]
      )}
    >
      <Link
        href={`/truyen/${slug}`}
        className={cn(
          "relative w-full md:w-48 h-64 md:h-auto flex-shrink-0 aspect-[3/4] transition-transform duration-200",
          cardBgMap[theme ?? "dark"],
          "group-hover:scale-105"
        )}
      >
        <Image
          src={coverImage ?? "/default-image.jpg"}
          alt={title}
          fill
          unoptimized
          className="object-cover rounded-md"
          sizes="(max-width:768px)100vw,192px"
        />
      </Link>

      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <Link href={`/truyen/${slug}`}>  
              <h2
                className={cn(
                  "text-xl font-bold transition-colors duration-150",
                  titleMap[theme ?? "dark"]
                )}
              >
                {title}
              </h2>
            </Link>
            <p className={cn("flex gap-x-1 text-sm", authorMap[theme ?? "dark"])}>
              <User className="w-4 h-5 mt-0.5 text-emerald-500" />
              {author?.name}
            </p>
            <StarRate rate={rate ?? 0} />
          </div>

          <Button variant="ghost" size="icon">
            <BookmarkIcon className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 my-2">
          {[
            ...(mainCategories ?? []),
            ...(categories ?? []).filter(c => c.slug !== mainCategories?.[0]?.slug),
          ].map((cate, idx) => (
            <BaseTag
              key={idx}
              href={`/the-loai/${cate.slug}`}
              name={cate.name}
              variant={idx === 0 && mainCategories?.length ? 'mainCategories' : 'categories'}
            />
          ))}
        </div>

        {shortDescription && (
          <div
            className={cn(
              "text-sm mb-2 line-clamp-3",
              authorMap[theme ?? "dark"]
            )}
            dangerouslySetInnerHTML={{ __html: shortDescription }}
          />
        )}

        <div className="mt-auto flex items-center justify-between pt-4">
          {updatedAt && (
            <div className={cn(
              "flex items-center gap-x-1 text-sm px-2 py-1 rounded",
              metaMap[theme ?? "dark"],
              theme === 'light' ? 'bg-gray-200' : theme === 'dark' ? 'bg-gray-700' : 'bg-[#efe2c0]'
            )}>
              <Clock className="w-4 h-4 text-emerald-500" />
              {formatDateTime(updatedAt)}
            </div>
          )}

          <div className="flex items-center gap-4 ml-auto">
            {chapterCount !== undefined && (
              <div className={cn("flex items-center text-sm", metaMap[theme ?? "dark"])}>
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
                {chapterCount}
              </div>
            )}

            <Link href={`/truyen/${slug}`}>
              <Button
                className={cn(
                  "rounded-full px-6 py-2.5 text-sm font-medium shadow-lg transition-all bg-gradient-to-r from-emerald-500 to-teal-600"
                )}
              >
                ◃Chi tiết▹
              </Button>
            </Link>
          </div>
        </div>

        <div
          className={cn(
            "absolute inset-x-0 bottom-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full",
            `bg-gradient-to-r ${lineMap[theme ?? "dark"]}`
          )}
        />
      </div>
    </div>
  );
}
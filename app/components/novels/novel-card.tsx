"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import { BookmarkIcon, Clock, User } from "lucide-react";
import { AuthorType, CategoryType } from "@/app/lib/types";
import { BaseTag } from "../components/base-tag";
import { formatDateTime } from "@/app/lib/utils";
import { StarRate } from "../components/star-rate";

export interface NovelCardProps {
  slug?: string;
  title: string;
  coverImage: string;
  author?: AuthorType;
  rate?: number;
  totalRatings?: number;
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
  categories,
  shortDescription,
  updatedAt,
  chapterCount,
}: NovelCardProps) {
  return (
    <div className="group relative flex flex-col md:flex-row gap-4 bg-gradient-to-br from-gray-800/90 to-gray-900 shadow-md transition-all hover:shadow-2xl rounded-lg overflow-hidden p-4">
      <Link href={`/truyen/${slug}`} className="relative w-full md:w-48 h-64 md:h-auto flex-shrink-0 aspect-[3/4] hover:scale-105 transition-all duration-200">
        <Image
          src={coverImage ?? "/default-image.jpg"}
          alt={title ?? "default-image"}
          fill
          unoptimized
          className="object-cover rounded-md"
          sizes="(max-width: 768px) 100vw, 192px"
        />
      </Link>

      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <Link href={`/truyen/${slug ?? ""}`}>
              <h2 className="text-xl font-bold text-emerald-400 hover:text-emerald-300 transition-colors">
                {title}
              </h2>
            </Link>
            <p className="text-gray-400 flex gap-x-1"><User className="w-4 h-5 mt-0.5 text-emerald-500" />{author?.name}</p>

            <StarRate rate={rate ?? 0} />
          </div>

          <Button variant="ghost" size="icon">
            <BookmarkIcon className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 my-2">
          {categories?.map((cate, index) => (
            <BaseTag
              key={index}
              href={`/the-loai/${cate?.slug}`}
              name={cate?.name}
            />
          ))}
        </div>

        {shortDescription && (
          <div
            className="text-gray-300 text-sm mt-2 line-clamp-3"
            dangerouslySetInnerHTML={{
              __html: shortDescription,
            }}
          />
        )}

        <div className="mt-auto flex items-center justify-between pt-4">
          {updatedAt && (
            <div className="flex gap-x-1 text-sm text-gray-400 bg-gray-700 px-2 py-1 rounded">
              <Clock className="w-4 h-4 self-center text-emerald-500" />{" "}
              {formatDateTime(updatedAt)}
            </div>
          )}

          <div className="flex items-center gap-4 ml-auto">
            {chapterCount !== undefined && (
              <div className="flex items-center text-gray-400">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
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

            <Link href={`/truyen/${slug ?? ""}`}>
              <Button className="rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-2.5 text-sm font-medium text-white shadow-lg transition-all hover:shadow-emerald-500/20">
                ◃Chi tiết▹
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-0.5 w-0 bg-gradient-to-r from-emerald-500 to-teal-600 transition-all duration-300 group-hover:w-full"></div>
    </div>
  );
}

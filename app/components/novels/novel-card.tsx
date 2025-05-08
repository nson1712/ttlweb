"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { BookmarkIcon } from "lucide-react";

export interface NovelCardProps {
  slug: string;
  title: string;
  coverImage: string;
  author: string;
  rating: number;
  totalRatings: number;
  categories: string[];
  description?: string;
  updatedAt?: string;
  chapterCount?: number;
}

export function NovelCard({
  // slug,
  title,
  coverImage,
  author,
  rating,
  totalRatings,
  categories,
  description,
  updatedAt,
  chapterCount,
}: NovelCardProps) {
  return (
    <div className="group relative flex flex-col md:flex-row gap-4 bg-gradient-to-br from-gray-800/90 to-gray-900 shadow-md transition-all hover:shadow-2xl rounded-lg overflow-hidden p-4">
      <div className="relative w-full md:w-48 h-64 md:h-auto flex-shrink-0 aspect-[3/4]">
        <Image
          src={coverImage}
          alt={title}
          fill
          className="object-cover rounded-md"
          sizes="(max-width: 768px) 100vw, 192px"
        />
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-start">
          <div>
            {/* <Link href={`/novels/${slug}`}> */}
            <Link href={`/novels/lord-mysteries`}>
              <h2 className="text-xl font-bold text-emerald-400 hover:text-emerald-300 transition-colors">
                {title}
              </h2>
            </Link>
            <p className="text-gray-400">{author}</p>

            <div className="flex items-center mt-1">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-4 h-4 ${
                      star <= Math.round(rating)
                        ? "text-yellow-400"
                        : "text-gray-600"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-400">
                {rating.toFixed(1)} / 5 from {totalRatings} ratings
              </span>
            </div>
          </div>

          <Button variant="ghost" size="icon">
            <BookmarkIcon className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 my-2">
          {categories.map((cate) => (
            <Link key={cate} href={`/tags/${cate}`}>
            <Badge
              key={cate}
              variant="secondary"
              className="text-emerald-400 bg-gray-700 hover:scale-110 transition-transform cursor-pointer"
            >
              {cate}
            </Badge>
            </Link>
          ))}
        </div>

        {description && (
          <p className="text-gray-300 text-sm mt-2 line-clamp-3">
            {description}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between pt-4">
          {updatedAt && (
            <div className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">
              {updatedAt}
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

            {/* <Link href={`/novels/${slug}/chapters`}> */}
            <Link href={`/novels/lord-mysteries/chapters`}>
              <Button className="rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-2.5 text-sm font-medium text-white shadow-lg transition-all hover:shadow-emerald-500/20">
                ◃ Read ▹
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-0.5 w-0 bg-gradient-to-r from-emerald-500 to-teal-600 transition-all duration-300 group-hover:w-full"></div>
    </div>
  );
}

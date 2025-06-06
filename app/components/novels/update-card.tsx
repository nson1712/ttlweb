"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, Star } from "lucide-react";
import { formatDateTime } from "@/app/lib/utils";
// import { cn } from "../../lib/utils"

interface UpdateCardProps {
  id: number;
  status: string;
  slug: string;
  chapterId: number;
  chapterSlug: string;
  coverImage: string;
  rate: number;
  title: string;
  chapterTitle: string;
  updatedAt: string;
}

export function UpdateCard({
  id,
  // status,
  slug,
  // chapterId,
  chapterSlug,
  coverImage,
  rate,
  title,
  chapterTitle,
  updatedAt,
}: UpdateCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Link
        href={`/novels/${slug}/${chapterSlug}`}
        className="block"
        id={`${chapterTitle}-${id}`}
      >
        <div className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-gray-800/90 to-gray-900 p-3 shadow-md transition-all hover:shadow-lg">
          <div className="flex gap-4">
            <div className="relative h-16 w-12 flex-shrink-0 overflow-hidden rounded-md">
              <Image
                src={coverImage}
                alt={title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="48px"
              />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-emerald-400 line-clamp-1 group-hover:text-emerald-300">
                {title}
              </h3>
              <p className="text-sm text-gray-300 line-clamp-1">
                {chapterTitle}
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span>{(rate ?? 0).toFixed(1)}</span>
                <Clock className="h-3 w-3" />
                <span>{formatDateTime(updatedAt)}</span>
              </div>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 h-0.5 w-0 bg-gradient-to-r from-emerald-500 to-teal-600 transition-all duration-300 group-hover:w-full"></div>
        </div>
      </Link>
    </motion.div>
  );
}

"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Clock, BookOpen, ChevronLeft, ChevronRight, X } from "lucide-react"
import { cn } from "../../lib/utils"

interface ChapterPreviewProps {
  id: string
  slug: string
  coverImage: string
  storyTitle: string
  chapterTitle: string
  order: number
  updatedAt: string
  content: string
  previousChapter?: {
    slug: string
    order: number
    title: string
  }
  nextChapter?: {
    slug: string
    order: number
    title: string
  }
  onClose: () => void
}

export function ChapterPreview({
  // id,
  slug,
  coverImage,
  storyTitle,
  chapterTitle,
  order,
  updatedAt,
  content,
  previousChapter,
  nextChapter,
  onClose,
}: ChapterPreviewProps) {
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large">("medium")
  
  const fontSizeClasses = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
    >
      <div className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-xl bg-gray-900 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 border-b border-gray-800 bg-gray-900/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-gray-900/80">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative h-12 w-9 overflow-hidden rounded-md">
                <Image
                  src={coverImage}
                  alt={storyTitle}
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="36px"
                />
              </div>
              
              <div>
                <h3 className="font-medium text-emerald-400 line-clamp-1">
                  {storyTitle}
                </h3>
                <p className="text-sm text-gray-300 line-clamp-1">
                  {chapterTitle}
                </p>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="rounded-full p-1 text-gray-400 hover:bg-gray-800 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                <span>{updatedAt}</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="h-3.5 w-3.5" />
                <span>Chapter {order}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFontSize("small")}
                className={cn(
                  "rounded-full p-1.5 text-xs",
                  fontSize === "small" ? "bg-emerald-500 text-white" : "bg-gray-800 text-gray-400 hover:text-white"
                )}
              >
                A
              </button>
              <button
                onClick={() => setFontSize("medium")}
                className={cn(
                  "rounded-full p-1.5 text-sm",
                  fontSize === "medium" ? "bg-emerald-500 text-white" : "bg-gray-800 text-gray-400 hover:text-white"
                )}
              >
                A
              </button>
              <button
                onClick={() => setFontSize("large")}
                className={cn(
                  "rounded-full p-1.5 text-base",
                  fontSize === "large" ? "bg-emerald-500 text-white" : "bg-gray-800 text-gray-400 hover:text-white"
                )}
              >
                A
              </button>
            </div>
          </div>
        </div>
        
        {/* Chapter Content */}
        <div className="max-h-[calc(90vh-8rem)] overflow-y-auto p-6">
          <div className={cn(
            "prose prose-invert max-w-none prose-p:my-4 prose-headings:text-emerald-400",
            fontSizeClasses[fontSize]
          )}>
            {content.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
        
        {/* Footer */}
        <div className="sticky bottom-0 border-t border-gray-800 bg-gray-900/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-gray-900/80">
          <div className="flex items-center justify-between">
            {previousChapter ? (
              <Link
                href={`/truyen/${slug}/${previousChapter.slug}`}
                className="flex items-center gap-1 rounded-lg bg-gray-800 px-3 py-2 text-sm font-medium text-white hover:bg-gray-700"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Previous:</span>
                <span className="truncate max-w-[100px] sm:max-w-[150px]">
                  Ch.{previousChapter.order}: {previousChapter.title}
                </span>
              </Link>
            ) : (
              <div className="invisible" />
            )}
            
            <Link
              // href={`/truyen/${slug}/chapters/${slug}`}
              href={`/truyen/lord-mysteries/1`}
              className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600"
            >
              Read Full Chapter
            </Link>
            
            {nextChapter ? (
              <Link
                href={`/truyen/${slug}/${nextChapter.slug}`}
                className="flex items-center gap-1 rounded-lg bg-gray-800 px-3 py-2 text-sm font-medium text-white hover:bg-gray-700"
              >
                <span className="truncate max-w-[100px] sm:max-w-[150px]">
                  Ch.{nextChapter.order}: {nextChapter.title}
                </span>
                <span className="hidden sm:inline">Next:</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            ) : (
              <div className="invisible" />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, BookOpen } from "lucide-react";
import { FC } from "react";
import { WeeklyStoryPropsType } from "@/app/types/story";


export const WeeklyStory: FC<WeeklyStoryPropsType> = ({weeklyStory}) => {
  return (
    <section className="relative mb-12 overflow-hidden rounded-xl">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800/95 to-transparent z-0"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-[200px] aspect-[3/4] overflow-hidden rounded-lg shadow-2xl"
        >
          <Image
            src={weeklyStory?.coverImage ?? "/placeholder-cover.jpg"}
            alt={weeklyStory?.title ?? "Weekly Story"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 200px, 200px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span>{weeklyStory?.rate.toFixed(1)}</span>
            {/* <span className="text-gray-300">({weeklyStory.totalRatings})</span> */}
          </div>
          {/* <div className="absolute bottom-3 left-0 right-0 mx-auto w-11/12 bg-gray-900/90 backdrop-blur-md rounded-lg p-2 shadow-lg border border-gray-800 group-hover:border-gray-700 transition-all duration-300">
            <div className="flex items-center justify-between px-1 text-xs">
              <span className="text-emerald-400 font-medium">
                {weeklyStory.progress}% Complete
              </span>
            </div>
            <div className="relative h-2 bg-gray-800 rounded-full mt-1.5 overflow-hidden">
              <div
                className="relative h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                style={{ width: `${weeklyStory.progress}%` }}
              >
                <div className="absolute top-0 left-0 h-full w-full flex justify-between px-1 items-center">
                  {[...Array(10)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 w-1 rounded-full ${
                        i < 9 ? "bg-white/30" : "bg-white/70"
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div> */}
        </motion.div>

        <div className="flex-1 space-y-4">
          <div className="space-y-1">
            <h2 className="text-sm font-medium uppercase tracking-wider text-emerald-400">
              Weekly Featured Book
            </h2>
            <h1 className="text-3xl font-bold text-white md:text-4xl">
              {weeklyStory?.title}
            </h1>
            {/* <p className="text-lg text-gray-300">by {weeklyStory.author}</p> */}
          </div>

          <div className="flex flex-wrap gap-2">
            {weeklyStory?.categories.map((category) => (
              <span
                key={category.id}
                className="rounded-full bg-gray-700/50 px-3 py-1 text-xs font-medium text-emerald-300"
              >
                {category.name}
              </span>
            ))}
          </div>

          <p className="text-gray-400 line-clamp-3 md:line-clamp-4">
            {/* {weeklyStory.description} */}
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              {/* <span>{weeklyStory.chapterCount} chapters</span> */}
            </div>
            <span>Updated {weeklyStory?.updatedAt}</span>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href={`/novels/${weeklyStory?.slug}`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-2.5 text-sm font-medium text-white shadow-lg transition-all hover:shadow-emerald-500/20 cursor-pointer"
              >
                Đọc Truyện
              </motion.button>
            </Link>
            {/* <Link href={`/novels/${weeklyStory.slug}/chapters`}> */}
            <Link href={`/novels/lord-mysteries/chapters`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full bg-gray-700 px-6 py-2.5 text-sm font-medium text-white shadow-lg transition-all hover:bg-gray-600 cursor-pointer"
              >
                Danh sách chương
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

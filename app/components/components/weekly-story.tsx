"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, BookOpen, Clock, User } from "lucide-react";
import { FC } from "react";
import { WeeklyStoryPropsType } from "@/app/types/story";
import { formatDateTime } from "@/app/lib/utils";
import { BaseTag } from "./base-tag";

export const WeeklyStory: FC<WeeklyStoryPropsType> = ({ weeklyStory }) => {
  return (
    <section className="relative mb-12 overflow-hidden rounded-xl">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800/95 to-transparent z-0"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-[200px] aspect-[3/4] overflow-hidden rounded-lg shadow-2xl  hover:scale-105 transition-all duration-200"
        >
          <Link href={`/truyen/${weeklyStory?.slug}`} passHref>
            <Image
              src={weeklyStory?.coverImage ?? "/placeholder-cover.jpg"}
              alt={weeklyStory?.title ?? "Truyện đặc sắc trong tuần"}
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 768px) 200px, 200px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-sm font-medium text-white backdrop-blur-sm">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{(weeklyStory?.rate ?? 0).toFixed(1)}</span>
              {/* <span className="text-gray-300">({weeklyStory.totalRatings})</span> */}
            </div>
          </Link>
        </motion.div>

        <div className="flex-1 space-y-4">
          <div className="space-y-1">
            <h2 className="text-sm font-medium uppercase tracking-wider text-emerald-400">
              Truyện đặc sắc trong tuần
            </h2>
            <Link href={`/truyen/${weeklyStory?.slug}`} passHref>
              <h1 className="text-3xl font-bold text-white md:text-4xl hover:text-emerald-500 transition-colors duration-150">
                {weeklyStory?.title}
              </h1>
            </Link>
            <p className="text-lg text-gray-300 flex gap-x-1">
              {" "}
              <User className="w-5 h-5 self-center text-emerald-500" />{" "}
              {weeklyStory.author?.name}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {weeklyStory?.categories?.map((category) => (
              <BaseTag
                key={category?.id}
                href={`categories/${category?.slug}`}
                name={category?.name}
              />
            ))}
          </div>

          <p
            className="text-gray-400 line-clamp-3"
            dangerouslySetInnerHTML={{
              __html: weeklyStory?.shortDescription,
            }}
          ></p>

          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4 text-emerald-500" />
              <span>{weeklyStory?.totalChapter ?? 0} chương</span>
            </div>
            <div className="flex gap-x-1">
              <Clock className="w-4 h-4 self-center text-emerald-500" />
              <span>Cập nhật: {formatDateTime(weeklyStory?.updatedAt)}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href={`/truyen/${weeklyStory?.slug}`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-2.5 text-sm font-medium text-white shadow-lg transition-all hover:shadow-emerald-500/20 cursor-pointer"
              >
                Thông tin truyện
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

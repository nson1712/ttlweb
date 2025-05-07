"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, BookOpen } from "lucide-react";

export function WeeklyFeaturedBook() {
  const featuredBook = {
    id: "timeless-assassin",
    slug: "timeless-assassin",
    title: "Timeless Assassin",
    coverImage:
      "/1726838702_reborn-as-my-love-rivals-wife.webp",
    author: "Solver Keter",
    rating: 4.8,
    totalRatings: 287,
    categories: ["Fantasy", "Adventure", "Action"],
    description:
      "Leo awakens in a world he doesn't recognize, with no memory of who he is or why he's there. All he knows is that survival isn't just a necessity—it's his only chance to uncover the truth. Thrown into a brutal test for assassins on a hostile planet, Leo must navigate deadly challenges, forge uncertain alliances, and unlock the skills buried deep within his fractured mind. As memories slowly return, he realizes his past may be more dangerous than the killers surrounding him.",
    chapterCount: 46,
    updatedAt: "8 hours ago",
  };

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
            src={featuredBook.coverImage}
            alt={featuredBook.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 200px, 200px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span>{featuredBook.rating.toFixed(1)}</span>
            <span className="text-gray-300">({featuredBook.totalRatings})</span>
          </div>
        </motion.div>

        <div className="flex-1 space-y-4">
          <div className="space-y-1">
            <h2 className="text-sm font-medium uppercase tracking-wider text-emerald-400">
              Weekly Featured Book
            </h2>
            <h1 className="text-3xl font-bold text-white md:text-4xl">
              {featuredBook.title}
            </h1>
            <p className="text-lg text-gray-300">by {featuredBook.author}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {featuredBook.categories.map((category) => (
              <span
                key={category}
                className="rounded-full bg-gray-700/50 px-3 py-1 text-xs font-medium text-emerald-300"
              >
                {category}
              </span>
            ))}
          </div>

          <p className="text-gray-400 line-clamp-3 md:line-clamp-4">
            {featuredBook.description}
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span>{featuredBook.chapterCount} chapters</span>
            </div>
            <span>Updated {featuredBook.updatedAt}</span>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href={`/novels/${featuredBook.slug}`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-2.5 text-sm font-medium text-white shadow-lg transition-all hover:shadow-emerald-500/20 cursor-pointer"
              >
                Read Now
              </motion.button>
            </Link>
            <Link href={`/novels/${featuredBook.slug}/chapters`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full bg-gray-700 px-6 py-2.5 text-sm font-medium text-white shadow-lg transition-all hover:bg-gray-600"
              >
                View Chapters
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

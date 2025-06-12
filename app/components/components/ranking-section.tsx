"use client";

import { FC, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { cn } from "../../lib/utils";

import {
  Tabs,
  TabsContent,
  // TabsList,
  // TabsTrigger,
} from "../../components/ui/tabs";
import { RankingNovelProps } from "@/app/types/story";

type RankingNovelSectionProps = {
  rankingNovels: RankingNovelProps[];
  // collectionRankingNovels: RankingNovelProps[];
  // newReleasesNovels: RankingNovelProps[];
}

export const RankingSection : FC<RankingNovelSectionProps> = ({rankingNovels}) => {
  const [activeTab, setActiveTab] = useState("power-ranking");

  return (
    <section className="rounded-xl bg-gray-800/50 p-6 backdrop-blur-sm">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <Award className="mr-2 h-5 w-5 text-emerald-400" />
          <h2 className="text-2xl font-bold text-white">Bảng xếp hạng</h2>
        </div>
        {/* <Link
          href="/rankings"
          className="text-sm font-medium text-emerald-400 hover:text-emerald-300"
        >
          View All
        </Link> */}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* <TabsList className="mb-6 w-full justify-start gap-2">
          <TabsTrigger
            value="power-ranking"
            className="flex items-center gap-1"
          >
            <TrendingUp className="h-4 w-4" />
            <span>Power</span>
          </TabsTrigger>
          <TabsTrigger
            value="collection-ranking"
            className="flex items-center gap-1"
          >
            <Star className="h-4 w-4" />
            <span>Collection</span>
          </TabsTrigger>
          <TabsTrigger value="new-releases" className="flex items-center gap-1">
            <Flame className="h-4 w-4" />
            <span>New Releases</span>
          </TabsTrigger>
        </TabsList> */}

        <TabsContent value="power-ranking" className="space-y-4 mt-2">
          {rankingNovels?.map((novel, index) => (
            <RankingNovelCard key={novel.id} {...{...novel, rank: index + 1}} />
          ))}
        </TabsContent>

        {/* <TabsContent value="collection-ranking" className="space-y-4 mt-2">
          {collectionRankingNovels.map((novel) => (
            <RankingNovelCard key={novel.id} {...novel} />
          ))}
        </TabsContent>

        <TabsContent value="new-releases" className="space-y-4 mt-2">
          {newReleasesNovels.map((novel) => (
            <RankingNovelCard key={novel.id} {...novel} />
          ))}
        </TabsContent> */}
      </Tabs>
    </section>
  );
}

const RankingNovelCard: FC<RankingNovelProps> = ({
  id,
  slug,
  title,
  coverImage,
  author,
  rate,
  // totalRatings,
  categories,
  rank,
}) => {
  return (
    <Link href={`/novels/${slug}`} id={id}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="group relative flex items-center gap-4 rounded-lg bg-gray-800/80 p-3 hover:bg-gray-800"
      >
        <div
          className={cn(
            "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-lg font-bold",
            rank <= 3
              ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
              : "bg-gray-700 text-gray-300"
          )}
        >
          {rank}
        </div>

        <div className="relative h-16 w-12 overflow-hidden rounded-md">
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
          <h3 className="font-medium text-emerald-400 line-clamp-1 group-hover:text-emerald-300">
            {title}
          </h3>
          <p className="text-sm text-gray-400">{author?.name}</p>
          <div className="flex items-center text-xs text-gray-500">
            <span className="flex items-center">
              <span className="text-yellow-400">★</span> {(rate ?? 0).toFixed(1)}
            </span>
            <span className="mx-1">•</span>
            <span className="text-emerald-400/80">{categories?.[0]?.name}</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};
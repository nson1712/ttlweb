"use client";

import { FC, useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { cn } from "../../lib/utils";
import {
  Tabs,
  TabsContent,
} from "../../components/ui/tabs";
import { RankingNovelProps } from "@/app/types/story";
import { SettingsContext, Theme } from "@/app/context/setting-context";

type RankingNovelSectionProps = {
  rankingNovels: RankingNovelProps[];
};

export const RankingSection: FC<RankingNovelSectionProps> = ({ rankingNovels }) => {
  const { theme } = useContext(SettingsContext);
  const [activeTab, setActiveTab] = useState("power-ranking");

  // Section background + text
  const sectionBgMap: Record<Theme, string> = {
    light: "bg-white/50",
    dark:  "bg-gray-800/50",
    sepia: "bg-amber-50",
  };
  const headingColorMap: Record<Theme, string> = {
    light: "text-gray-900",
    dark:  "text-white",
    sepia: "text-[#5f4b32]",
  };
  const iconColorMap: Record<Theme, string> = {
    light: "text-emerald-600",
    dark:  "text-emerald-400",
    sepia: "text-emerald-500",
  };

  return (
    <section
      className={cn(
        "rounded-xl p-6 backdrop-blur-sm",
        sectionBgMap[theme ?? "dark"]
      )}
    >
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <Award className={cn("mr-2 h-5 w-5", iconColorMap[theme ?? "dark"])} />
          <h2 className={cn("text-2xl font-bold", headingColorMap[theme ?? "dark"])}>
            Bảng xếp hạng
          </h2>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsContent value="power-ranking" className="flex flex-col gap-y-1 mt-2">
          {rankingNovels.map((novel, idx) => (
            <RankingNovelCard
              key={novel.id}
              {...novel}
              rank={idx + 1}
            />
          ))}
        </TabsContent>
      </Tabs>
    </section>
  );
};

const RankingNovelCard: FC<RankingNovelProps & { rank: number }> = ({
  id,
  slug,
  title,
  coverImage,
  author,
  rate,
  categories,
  rank,
}) => {
  const { theme } = useContext(SettingsContext);

  // Card background hover
  const cardBgMap: Record<Theme, string> = {
    light: "bg-gray-100/80 hover:bg-gray-200",
    dark:  "bg-gray-800/80 hover:bg-gray-800",
    sepia: "bg-[#efe2c7]/80 hover:bg-[#e0ceb0]",
  };
  // Title colors
  const titleMap: Record<Theme, string> = {
    light: "text-gray-900",
    dark:  "text-white",
    sepia: "text-[#5f4b32]",
  };
  const titleHoverMap: Record<Theme, string> = {
    light: "group-hover:text-emerald-600",
    dark:  "group-hover:text-emerald-400",
    sepia: "group-hover:text-emerald-500",
  };
  // Author & meta
  const authorMap: Record<Theme, string> = {
    light: "text-gray-700",
    dark:  "text-gray-400",
    sepia: "text-[#7a6f49]",
  };
  const metaMap: Record<Theme, string> = {
    light: "text-gray-500",
    dark:  "text-gray-500",
    sepia: "text-[#8a7055]",
  };
  // Rank circle (keep existing gradient for top3)
  const rankBg = rank <= 3
    ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
    : "bg-gray-700 text-gray-300";

  return (
    <Link href={`/truyen/${slug}`} id={id}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className={cn(
          "group relative flex items-center gap-4 rounded-lg p-3 transition-colors duration-150",
          cardBgMap[theme ?? "dark"]
        )}
      >
        <div className={cn("flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-lg font-bold", rankBg)}>
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
          <h3
            className={cn(
              "font-medium line-clamp-1 transition-colors duration-150",
              titleMap[theme ?? "dark"],
              titleHoverMap[theme ?? "dark"]
            )}
          >
            {title}
          </h3>
          <p className={cn("text-sm", authorMap[theme ?? "dark"])}>
            {author?.name}
          </p>
          <div className={cn("flex items-center text-xs", metaMap[theme ?? "dark"])}>
            <span className="flex items-center">
              <span className="text-yellow-400">★</span> {(rate ?? 0).toFixed(1)}
            </span>
            <span className="mx-1">•</span>
            <span className="text-emerald-400/80">
              {categories?.[0]?.name}
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

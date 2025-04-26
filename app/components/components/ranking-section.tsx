"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, TrendingUp, Flame, Award } from "lucide-react";
import { cn } from "../../lib/utils";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";

interface RankingNovelProps {
  id: string;
  slug: string;
  title: string;
  coverImage: string;
  author: string;
  rating: number;
  totalRatings: number;
  categories: string[];
  rank: number;
}

export function RankingSection() {
  const [activeTab, setActiveTab] = useState("power-ranking");

  return (
    <section className="rounded-xl bg-gray-800/50 p-6 backdrop-blur-sm">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <Award className="mr-2 h-5 w-5 text-emerald-400" />
          <h2 className="text-2xl font-bold text-white">Novel Rankings</h2>
        </div>
        <Link
          href="/rankings"
          className="text-sm font-medium text-emerald-400 hover:text-emerald-300"
        >
          View All
        </Link>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6 w-full justify-start gap-2">
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
        </TabsList>

        <TabsContent value="power-ranking" className="space-y-4 mt-2">
          {powerRankingNovels.map((novel) => (
            <RankingNovelCard key={novel.id} {...novel} />
          ))}
        </TabsContent>

        <TabsContent value="collection-ranking" className="space-y-4 mt-2">
          {collectionRankingNovels.map((novel) => (
            <RankingNovelCard key={novel.id} {...novel} />
          ))}
        </TabsContent>

        <TabsContent value="new-releases" className="space-y-4 mt-2">
          {newReleasesNovels.map((novel) => (
            <RankingNovelCard key={novel.id} {...novel} />
          ))}
        </TabsContent>
      </Tabs>
    </section>
  );
}

function RankingNovelCard({
  id,
  slug,
  title,
  coverImage,
  author,
  rating,
  totalRatings,
  categories,
  rank,
}: RankingNovelProps) {
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
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="48px"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-emerald-400 line-clamp-1 group-hover:text-emerald-300">
            {title}
          </h3>
          <p className="text-sm text-gray-400">{author}</p>
          <div className="flex items-center text-xs text-gray-500">
            <span className="flex items-center">
              <span className="text-yellow-400">★</span> {rating.toFixed(1)}
            </span>
            <span className="mx-1">•</span>
            <span>{totalRatings} ratings</span>
            <span className="mx-1">•</span>
            <span className="text-emerald-400/80">{categories[0]}</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

// Mock data for power ranking novels
const powerRankingNovels = [
  {
    id: "shadow-slave",
    slug: "shadow-slave",
    title: "Shadow Slave",
    coverImage:
      "https://ranobes.top/uploads/posts/2025-04/thumbs/1744879926_diary-of-a-dead-wizard.webp",
    author: "Guiltythree",
    rating: 4.7,
    totalRatings: 769,
    categories: ["Fantasy", "Action", "Adventure"],
    rank: 1,
  },
  {
    id: "legendary-beast-master",
    slug: "legendary-beast-master",
    title: "The First Legendary Beast Master",
    coverImage:
      "https://ranobes.top/uploads/posts/2025-04/thumbs/1744879926_diary-of-a-dead-wizard.webp",
    author: "Frost Blade",
    rating: 4.5,
    totalRatings: 523,
    categories: ["Fantasy", "Adventure", "Action"],
    rank: 2,
  },
  {
    id: "supreme-magus",
    slug: "supreme-magus",
    title: "Supreme Magus",
    coverImage:
      "https://ranobes.top/uploads/posts/2025-04/thumbs/1744879926_diary-of-a-dead-wizard.webp",
    author: "Legion20",
    rating: 4.8,
    totalRatings: 612,
    categories: ["Fantasy", "Adventure", "Magic"],
    rank: 3,
  },
  {
    id: "cultivation-online",
    slug: "cultivation-online",
    title: "Cultivation Online",
    coverImage:
      "https://ranobes.top/uploads/posts/2025-04/thumbs/1744879926_diary-of-a-dead-wizard.webp",
    author: "MyLittleBrother",
    rating: 4.8,
    totalRatings: 487,
    categories: ["Games", "Adventure", "Fantasy"],
    rank: 4,
  },
  {
    id: "mech-touch",
    slug: "mech-touch",
    title: "The Mech Touch",
    coverImage:
      "https://ranobes.top/uploads/posts/2025-04/thumbs/1744879926_diary-of-a-dead-wizard.webp",
    author: "Exlor",
    rating: 4.6,
    totalRatings: 398,
    categories: ["Sci-fi", "Adventure", "Mecha"],
    rank: 5,
  },
];

// Mock data for collection ranking novels
const collectionRankingNovels = [
  {
    id: "shadow-slave-2",
    slug: "shadow-slave-2",
    title: "Shadow Slave",
    coverImage:
      "https://ranobes.top/uploads/posts/2025-04/thumbs/1744879926_diary-of-a-dead-wizard.webp",
    author: "Guiltythree",
    rating: 4.7,
    totalRatings: 769,
    categories: ["Fantasy", "Action", "Adventure"],
    rank: 1,
  },
  {
    id: "beast-tamer",
    slug: "beast-tamer",
    title: "Weakest Beast Tamer Gets All SSS Dragons",
    coverImage:
      "https://ranobes.top/uploads/posts/2025-04/thumbs/1744879926_diary-of-a-dead-wizard.webp",
    author: "Dragon Lover",
    rating: 4.6,
    totalRatings: 612,
    categories: ["Fantasy", "Adventure", "Action"],
    rank: 2,
  },
  {
    id: "legendary-beast-master-2",
    slug: "legendary-beast-master-2",
    title: "The First Legendary Beast Master",
    coverImage:
      "https://ranobes.top/uploads/posts/2025-04/thumbs/1744879926_diary-of-a-dead-wizard.webp",
    author: "Frost Blade",
    rating: 4.5,
    totalRatings: 523,
    categories: ["Fantasy", "Adventure", "Action"],
    rank: 3,
  },
  {
    id: "multiversal-livestreaming",
    slug: "multiversal-livestreaming",
    title: "Multiversal Livestreaming System",
    coverImage:
      "https://ranobes.top/uploads/posts/2025-04/thumbs/1744879926_diary-of-a-dead-wizard.webp",
    author: "Cosmic Streamer",
    rating: 4.7,
    totalRatings: 487,
    categories: ["Fantasy", "Adventure", "System"],
    rank: 4,
  },
  {
    id: "vampire-system",
    slug: "vampire-system",
    title: "My Vampire System",
    coverImage:
      "https://ranobes.top/uploads/posts/2025-04/thumbs/1744879926_diary-of-a-dead-wizard.webp",
    author: "JKSManga",
    rating: 4.6,
    totalRatings: 398,
    categories: ["Fantasy", "Adventure", "Supernatural"],
    rank: 5,
  },
];

// Mock data for new releases novels
const newReleasesNovels = [
  {
    id: "dimensional-storekeeper",
    slug: "dimensional-storekeeper",
    title: "Dimensional Storekeeper",
    coverImage:
      "https://ranobes.top/uploads/posts/2025-04/thumbs/1744879926_diary-of-a-dead-wizard.webp",
    author: "Dimension Walker",
    rating: 4.7,
    totalRatings: 321,
    categories: ["Fantasy", "Adventure", "System"],
    rank: 1,
  },
  {
    id: "timeless-assassin",
    slug: "timeless-assassin",
    title: "Timeless Assassin",
    coverImage:
      "https://ranobes.top/uploads/posts/2025-04/thumbs/1744879926_diary-of-a-dead-wizard.webp",
    author: "Solver Keter",
    rating: 4.8,
    totalRatings: 287,
    categories: ["Fantasy", "Adventure", "Action"],
    rank: 2,
  },
  {
    id: "talent-generator",
    slug: "talent-generator",
    title: "My Talent's Name Is Generator",
    coverImage:
      "https://ranobes.top/uploads/posts/2025-04/thumbs/1744879926_diary-of-a-dead-wizard.webp",
    author: "Talent Master",
    rating: 4.7,
    totalRatings: 254,
    categories: ["Fantasy", "Adventure", "System"],
    rank: 3,
  },
  {
    id: "multiversal-livestreaming-2",
    slug: "multiversal-livestreaming-2",
    title: "Multiversal Livestreaming System",
    coverImage:
      "https://ranobes.top/uploads/posts/2025-04/thumbs/1744879926_diary-of-a-dead-wizard.webp",
    author: "Cosmic Streamer",
    rating: 4.7,
    totalRatings: 198,
    categories: ["Fantasy", "Adventure", "System"],
    rank: 4,
  },
  {
    id: "villains-pov",
    slug: "villains-pov",
    title: "THE VILLAIN'S POV",
    coverImage:
      "https://ranobes.top/uploads/posts/2025-04/thumbs/1744879926_diary-of-a-dead-wizard.webp",
    author: "Evil Writer",
    rating: 4.8,
    totalRatings: 176,
    categories: ["Fantasy", "Adventure", "Villain"],
    rank: 5,
  },
];

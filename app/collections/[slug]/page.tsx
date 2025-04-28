"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Grid,
  List,
  BookOpen,
  Heart,
  Clock,
  Calendar,
  Star,
  Share2,
  Bookmark,
  Sword,
  Trophy,
  Flame,
  Check,
  Eye,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { Badge } from "../../components/ui/badge";
import { useParams, useSearchParams } from "next/navigation";

// Collection type definition
interface Collection {
  id: string;
  slug: string;
  title: string;
  description: string;
  coverImages: string[];
  creator: string;
  creatorAvatar: string;
  novelCount: number;
  likes: number;
  lastUpdated: string;
  category: "Battle" | "Adventure" | "Epic" | "Conquest" | "Personal";
  featured?: boolean;
  tags: string[];
  combatFocus: number; // 1-10 scale of combat focus
  epicScale: number; // 1-10 scale of epic scale/scope
}

// Novel type definition
interface Novel {
  id: string;
  slug: string;
  title: string;
  coverImage: string;
  author: string;
  rating: number;
  totalRatings: number;
  categories: string[];
  description: string;
  chapterCount: number;
  status: "ongoing" | "completed" | "hiatus";
  lastUpdated: string;
  views: number;
  combatRating?: number; // 1-10 scale
  powerLevel?: number; // 1-10 scale
}

// Mock data for collections
const collections: Collection[] = [
  {
    id: "1",
    slug: "legendary-warriors",
    title: "Legendary Warriors",
    description:
      "A collection of novels featuring the most powerful warriors across different worlds and eras. From ancient battlefields to futuristic arenas, these protagonists dominate through sheer combat prowess.",
    coverImages: [
      "https://images.unsplash.com/photo-1584837140804-599ddb86a9f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
      "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
      "https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    ],
    creator: "BattleMaster",
    creatorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    novelCount: 12,
    likes: 4582,
    lastUpdated: "2024-04-15",
    category: "Battle",
    featured: true,
    tags: ["warriors", "combat", "martial arts", "swordplay", "legends"],
    combatFocus: 10,
    epicScale: 8,
  },
  {
    id: "2",
    slug: "epic-quests",
    title: "Epic Quests & Adventures",
    description:
      "Join heroes on their journeys across dangerous lands, ancient ruins, and mystical realms. These novels feature grand adventures with high stakes and powerful adversaries.",
    coverImages: [
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
      "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    ],
    creator: "QuestMaster",
    creatorAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    novelCount: 8,
    likes: 3245,
    lastUpdated: "2024-04-10",
    category: "Adventure",
    featured: true,
    tags: ["adventure", "quest", "journey", "exploration", "discovery"],
    combatFocus: 7,
    epicScale: 9,
  },
];

// Mock data for novels in a collection
const collectionNovels: Novel[] = [
  {
    id: "1",
    slug: "the-ancient-sovereign",
    title: "The Ancient Sovereign",
    coverImage: "/images/covers/cover1.jpg",
    author: "Aria Nightshade",
    rating: 4.8,
    totalRatings: 1245,
    categories: ["Fantasy", "Adventure", "Cultivation"],
    description:
      "After a thousand years of slumber, the Ancient Sovereign awakens to a world that has forgotten him. With his powers diminished, he must reclaim his throne and legacy.",
    chapterCount: 356,
    status: "ongoing",
    lastUpdated: "2024-04-20",
    views: 1250000,
    combatRating: 9,
    powerLevel: 10,
  },
  {
    id: "2",
    slug: "dragon-emperor",
    title: "Dragon Emperor",
    coverImage: "/images/covers/cover4.jpg",
    author: "Blaze Fireheart",
    rating: 4.7,
    totalRatings: 1123,
    categories: ["Fantasy", "Dragons", "Cultivation"],
    description:
      "Born with the rare ability to communicate with dragons, Lin Feng rises from humble beginnings to become the legendary Dragon Emperor, uniting humans and dragons against an ancient evil.",
    chapterCount: 412,
    status: "completed",
    lastUpdated: "2023-12-20",
    views: 1680000,
    combatRating: 9,
    powerLevel: 9,
  },
  {
    id: "3",
    slug: "shadow-assassin",
    title: "Shadow Assassin",
    coverImage: "/images/covers/cover3.jpg",
    author: "Raven Steele",
    rating: 4.9,
    totalRatings: 1567,
    categories: ["Fantasy", "Action", "Martial Arts"],
    description:
      "Trained from birth in the ancient arts of assassination, Kage must choose between following his clan's traditions or forging his own path when he discovers the truth behind his assignments.",
    chapterCount: 278,
    status: "completed",
    lastUpdated: "2024-01-05",
    views: 1450000,
    combatRating: 8,
    powerLevel: 7,
  },
  {
    id: "4",
    slug: "immortal-blade",
    title: "Immortal Blade",
    coverImage: "/images/covers/cover6.jpg",
    author: "Shin Kazama",
    rating: 4.8,
    totalRatings: 1342,
    categories: ["Martial Arts", "Fantasy", "Historical"],
    description:
      "A legendary sword that grants immortality to its wielder becomes the center of a centuries-long conflict between martial arts schools. Follow the journey of the blade and those who seek its power.",
    chapterCount: 324,
    status: "completed",
    lastUpdated: "2023-10-10",
    views: 1320000,
    combatRating: 10,
    powerLevel: 8,
  },
  {
    id: "5",
    slug: "demon-hunter-chronicles",
    title: "Demon Hunter Chronicles",
    coverImage: "/images/covers/cover8.jpg",
    author: "Dante Shadowbane",
    rating: 4.9,
    totalRatings: 1654,
    categories: ["Urban Fantasy", "Action", "Horror"],
    description:
      "When demons begin crossing into our world, a reluctant hunter with demon blood in his veins becomes humanity's best hope for survival.",
    chapterCount: 298,
    status: "ongoing",
    lastUpdated: "2024-04-15",
    views: 1580000,
    combatRating: 9,
    powerLevel: 8,
  },
  {
    id: "6",
    slug: "samurai-legend",
    title: "Samurai Legend",
    coverImage: "/images/covers/cover12.jpg",
    author: "Takeshi Blade",
    rating: 4.9,
    totalRatings: 1532,
    categories: ["Historical", "Martial Arts", "Drama"],
    description:
      "In feudal Japan, a masterless samurai seeks redemption for his past while protecting a village from corrupt officials and ruthless bandits.",
    chapterCount: 256,
    status: "completed",
    lastUpdated: "2023-04-01",
    views: 1280000,
    combatRating: 10,
    powerLevel: 7,
  },
  {
    id: "7",
    slug: "elemental-sovereign",
    title: "Elemental Sovereign",
    coverImage: "/images/covers/cover10.jpg",
    author: "Aether Flameheart",
    rating: 4.8,
    totalRatings: 1276,
    categories: ["Fantasy", "Adventure", "Elemental Magic"],
    description:
      "Born with the ability to control all five elements, Kai must master his powers and unite the warring elemental tribes before an ancient darkness consumes the world.",
    chapterCount: 385,
    status: "ongoing",
    lastUpdated: "2024-04-18",
    views: 1420000,
    combatRating: 8,
    powerLevel: 9,
  },
  {
    id: "8",
    slug: "galactic-mercenary",
    title: "Galactic Mercenary",
    coverImage: "/images/covers/cover9.jpg",
    author: "Rex Starfury",
    rating: 4.7,
    totalRatings: 1089,
    categories: ["Sci-Fi", "Military", "Action"],
    description:
      "A former elite soldier becomes a mercenary after being betrayed by his government, taking on the most dangerous missions across the galaxy while uncovering a plot that threatens all inhabited worlds.",
    chapterCount: 267,
    status: "ongoing",
    lastUpdated: "2024-04-10",
    views: 1150000,
    combatRating: 8,
    powerLevel: 7,
  },
];

// interface CollectionDetailPageProps {
//   params: {
//     slug: string;
//   };
//   searchParams?: {
//     page?: string;
//     pageSize?: string;
//     sort?: string;
//     view?: string;
//     search?: string;
//     category?: string;
//   };
// }

export default function CollectionDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || ""
  );
  const [isFollowing, setIsFollowing] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const page = parseInt(searchParams.get("page") ?? "1", 10);

  const pageSize = parseInt(searchParams.get("pageSize") ?? "10", 10);

  const sort = searchParams.get("sort") ?? "rating";

  const view = searchParams.get("view") ?? "list";

  // Find collection by slug
  const collection = collections.find((c) => c.slug === params.slug);

  if (!collection) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-white">Collection not found</h1>
        <p className="mt-2 text-gray-400">
          The collection you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
        <Link
          href="/collections"
          className="mt-4 rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600"
        >
          Return to Collections
        </Link>
      </div>
    );
  }

  // Get all unique categories from novels in this collection
  const allCategories = Array.from(
    new Set(collectionNovels.flatMap((novel) => novel.categories))
  ).sort();

  // Filter novels based on search query and selected category
  const filteredNovels = collectionNovels.filter((novel) => {
    const matchesSearch = searchQuery
      ? novel.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        novel.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        novel.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchesCategory = selectedCategory
      ? novel.categories.includes(selectedCategory)
      : true;

    return matchesSearch && matchesCategory;
  });

  // Sort novels based on sort parameter
  const sortedNovels = [...filteredNovels].sort((a, b) => {
    if (sort === "rating") return b.rating - a.rating;
    if (sort === "popular") return b.views - a.views;
    if (sort === "chapters") return b.chapterCount - a.chapterCount;
    if (sort === "recent")
      return (
        new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
      );
    if (sort === "combat") return (b.combatRating || 0) - (a.combatRating || 0);
    if (sort === "power") return (b.powerLevel || 0) - (a.powerLevel || 0);
    return 0;
  });

  // Paginate novels
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedNovels = sortedNovels.slice(start, end);

  // Calculate total pages
  const totalPages = Math.ceil(sortedNovels.length / pageSize);

  // Get category badge color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Battle":
        return "bg-red-500/20 text-red-400 border border-red-500/30";
      case "Adventure":
        return "bg-blue-500/20 text-blue-400 border border-blue-500/30";
      case "Epic":
        return "bg-purple-500/20 text-purple-400 border border-purple-500/30";
      case "Conquest":
        return "bg-amber-500/20 text-amber-400 border border-amber-500/30";
      default:
        return "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex items-center text-sm text-gray-400">
            <Link href="/" className="hover:text-emerald-400">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/collections" className="hover:text-emerald-400">
              Collections
            </Link>
            <span className="mx-2">/</span>
            <span className="text-emerald-400">{collection.title}</span>
          </nav>
        </div>

        {/* Collection Header */}
        <div className="relative mb-8 overflow-hidden rounded-xl bg-gradient-to-br from-gray-800/90 to-gray-900 shadow-xl">
          <div className="absolute inset-0 overflow-hidden opacity-20">
            <div className="grid grid-cols-2 h-full w-full">
              {collection.coverImages.slice(0, 4).map((image, index) => (
                <div key={index} className="relative">
                  <Image
                    src={image}
                    alt={`Cover ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>

          <div className="relative z-10 p-6 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
              {/* Collection Info */}
              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span
                      className={cn(
                        "text-xs font-medium px-2.5 py-0.5 rounded",
                        getCategoryColor(collection.category)
                      )}
                    >
                      {collection.category}
                    </span>

                    <span className="bg-gray-700 text-gray-300 text-xs font-medium px-2.5 py-0.5 rounded flex items-center">
                      <BookOpen className="h-3 w-3 mr-1" />
                      {collection.novelCount} novels
                    </span>

                    {collection.featured && (
                      <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-medium px-2.5 py-0.5 rounded">
                        Featured
                      </span>
                    )}
                  </div>

                  <h1 className="text-3xl font-bold text-white md:text-4xl">
                    {collection.title}
                  </h1>

                  <div className="mt-2 flex items-center gap-3">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <div className="relative h-6 w-6 overflow-hidden rounded-full">
                        <Image
                          src={collection.creatorAvatar}
                          alt={collection.creator}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span>Created by {collection.creator}</span>
                    </div>

                    <div className="flex items-center gap-1 text-sm text-gray-300">
                      <Heart className="h-4 w-4 text-red-400" />
                      <span>{collection.likes.toLocaleString()} likes</span>
                    </div>

                    <div className="flex items-center gap-1 text-sm text-gray-300">
                      <Clock className="h-4 w-4 text-emerald-400" />
                      <span>Updated {collection.lastUpdated}</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-300">{collection.description}</p>

                <div className="flex flex-wrap gap-2">
                  {collection.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="bg-gray-700/50 text-xs text-emerald-300 border-emerald-500/20 hover:bg-emerald-900/20"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setIsFollowing(!isFollowing)}
                    className={cn(
                      "flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium",
                      isFollowing
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-gray-700 text-white hover:bg-gray-600"
                    )}
                  >
                    <Heart
                      className={cn(
                        "h-4 w-4",
                        isFollowing && "fill-emerald-400"
                      )}
                    />
                    <span>{isFollowing ? "Following" : "Follow"}</span>
                  </button>
                  <button
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={cn(
                      "flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium",
                      isBookmarked
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-gray-700 text-white hover:bg-gray-600"
                    )}
                  >
                    <Bookmark
                      className={cn(
                        "h-4 w-4",
                        isBookmarked && "fill-emerald-400"
                      )}
                    />
                    <span>{isBookmarked ? "Bookmarked" : "Bookmark"}</span>
                  </button>
                  <button className="flex items-center gap-1 rounded-full bg-gray-700 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600">
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </button>
                </div>
              </div>

              {/* Collection Stats */}
              <div className="mt-4 flex flex-row gap-4 md:mt-0 md:flex-col md:gap-2">
                <div className="flex flex-1 flex-col items-center justify-center rounded-lg bg-gray-800/50 p-3 backdrop-blur-sm">
                  <div className="flex items-center gap-1 text-emerald-400">
                    <Sword className="h-5 w-5" />
                    <span className="text-lg font-bold">
                      {collection.combatFocus}/10
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">Combat Focus</span>
                </div>

                <div className="flex flex-1 flex-col items-center justify-center rounded-lg bg-gray-800/50 p-3 backdrop-blur-sm">
                  <div className="flex items-center gap-1 text-purple-400">
                    <Trophy className="h-5 w-5" />
                    <span className="text-lg font-bold">
                      {collection.epicScale}/10
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">Epic Scale</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Novels in Collection */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-bold text-white">
              Novels in this Collection
              <span className="ml-2 text-sm font-normal text-gray-400">
                ({filteredNovels.length})
              </span>
            </h2>

            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search novels..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 py-2 pl-10 pr-4 text-sm text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 sm:w-64"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-lg border border-gray-700 bg-gray-800 py-2 pl-3 pr-10 text-sm text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="">All Categories</option>
                {allCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg bg-gray-800/50 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <span className="text-sm font-medium text-white">Sort by:</span>

              <div className="flex flex-wrap items-center gap-2 rounded-lg bg-gray-700 p-1">
                <Link
                  href={`/collections/${
                    params.slug
                  }?sort=rating&view=${view}&page=1${
                    searchQuery ? `&search=${searchQuery}` : ""
                  }${selectedCategory ? `&category=${selectedCategory}` : ""}`}
                  className={cn(
                    "rounded-md px-3 py-1 text-sm",
                    sort === "rating"
                      ? "bg-gray-600 text-white"
                      : "text-gray-300 hover:bg-gray-600/50"
                  )}
                >
                  Rating
                </Link>
                <Link
                  href={`/collections/${
                    params.slug
                  }?sort=popular&view=${view}&page=1${
                    searchQuery ? `&search=${searchQuery}` : ""
                  }${selectedCategory ? `&category=${selectedCategory}` : ""}`}
                  className={cn(
                    "rounded-md px-3 py-1 text-sm",
                    sort === "popular"
                      ? "bg-gray-600 text-white"
                      : "text-gray-300 hover:bg-gray-600/50"
                  )}
                >
                  Popular
                </Link>
                <Link
                  href={`/collections/${
                    params.slug
                  }?sort=chapters&view=${view}&page=1${
                    searchQuery ? `&search=${searchQuery}` : ""
                  }${selectedCategory ? `&category=${selectedCategory}` : ""}`}
                  className={cn(
                    "rounded-md px-3 py-1 text-sm",
                    sort === "chapters"
                      ? "bg-gray-600 text-white"
                      : "text-gray-300 hover:bg-gray-600/50"
                  )}
                >
                  Chapters
                </Link>
                <Link
                  href={`/collections/${
                    params.slug
                  }?sort=recent&view=${view}&page=1${
                    searchQuery ? `&search=${searchQuery}` : ""
                  }${selectedCategory ? `&category=${selectedCategory}` : ""}`}
                  className={cn(
                    "rounded-md px-3 py-1 text-sm",
                    sort === "recent"
                      ? "bg-gray-600 text-white"
                      : "text-gray-300 hover:bg-gray-600/50"
                  )}
                >
                  Recent
                </Link>
                <Link
                  href={`/collections/${
                    params.slug
                  }?sort=combat&view=${view}&page=1${
                    searchQuery ? `&search=${searchQuery}` : ""
                  }${selectedCategory ? `&category=${selectedCategory}` : ""}`}
                  className={cn(
                    "rounded-md px-3 py-1 text-sm",
                    sort === "combat"
                      ? "bg-gray-600 text-white"
                      : "text-gray-300 hover:bg-gray-600/50"
                  )}
                >
                  Combat
                </Link>
                <Link
                  href={`/collections/${
                    params.slug
                  }?sort=power&view=${view}&page=1${
                    searchQuery ? `&search=${searchQuery}` : ""
                  }${selectedCategory ? `&category=${selectedCategory}` : ""}`}
                  className={cn(
                    "rounded-md px-3 py-1 text-sm",
                    sort === "power"
                      ? "bg-gray-600 text-white"
                      : "text-gray-300 hover:bg-gray-600/50"
                  )}
                >
                  Power
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-white">View:</span>
              <div className="flex items-center gap-1 rounded-lg bg-gray-700 p-1">
                <Link
                  href={`/collections/${
                    params.slug
                  }?sort=${sort}&view=grid&page=1${
                    searchQuery ? `&search=${searchQuery}` : ""
                  }${selectedCategory ? `&category=${selectedCategory}` : ""}`}
                  className={cn(
                    "rounded-md p-1.5",
                    view === "grid"
                      ? "bg-gray-600 text-white"
                      : "text-gray-300 hover:bg-gray-600/50"
                  )}
                >
                  <Grid className="h-4 w-4" />
                </Link>
                <Link
                  href={`/collections/${
                    params.slug
                  }?sort=${sort}&view=list&page=1${
                    searchQuery ? `&search=${searchQuery}` : ""
                  }${selectedCategory ? `&category=${selectedCategory}` : ""}`}
                  className={cn(
                    "rounded-md p-1.5",
                    view === "list"
                      ? "bg-gray-600 text-white"
                      : "text-gray-300 hover:bg-gray-600/50"
                  )}
                >
                  <List className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Novels Grid/List */}
        {filteredNovels.length === 0 ? (
          <div className="flex h-[40vh] flex-col items-center justify-center rounded-xl bg-gray-800/50 p-8 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white">No novels found</h3>
            <p className="mt-2 text-gray-400">
              Try adjusting your search or filters.
            </p>
          </div>
        ) : (
          <>
            <div
              className={cn(
                "mb-8",
                view === "grid"
                  ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "space-y-6"
              )}
            >
              {paginatedNovels.map((novel) => (
                <motion.div
                  key={novel.id}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className={cn(
                    "group overflow-hidden rounded-xl bg-gradient-to-br from-gray-800/90 to-gray-900 shadow-xl",
                    view === "list" && "flex gap-6"
                  )}
                >
                  <Link href={`/novels/${novel.slug}`} className="block w-full">
                    <div
                      className={cn(
                        view === "grid"
                          ? "flex flex-col"
                          : "flex flex-row gap-6"
                      )}
                    >
                      <div
                        className={cn(
                          "relative overflow-hidden",
                          view === "grid"
                            ? "aspect-[3/4] w-full"
                            : "aspect-[3/4] w-1/4 flex-shrink-0"
                        )}
                      >
                        <Image
                          src={novel.coverImage}
                          alt={novel.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes={
                            view === "grid"
                              ? "(max-width: 768px) 100vw, 33vw"
                              : "(max-width: 768px) 100vw, 25vw"
                          }
                          priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                        {/* Status Badge */}
                        <div
                          className={cn(
                            "absolute top-2 right-2 rounded-full px-2 py-1 text-xs font-medium",
                            novel.status === "completed"
                              ? "bg-emerald-500 text-white"
                              : novel.status === "hiatus"
                              ? "bg-amber-500 text-white"
                              : "bg-blue-500 text-white"
                          )}
                        >
                          <div className="flex items-center gap-1">
                            {novel.status === "completed" ? (
                              <>
                                <Check className="h-3 w-3" />
                                <span>Completed</span>
                              </>
                            ) : novel.status === "hiatus" ? (
                              <>
                                <Pause className="h-3 w-3" />
                                <span>Hiatus</span>
                              </>
                            ) : (
                              <>
                                <Clock className="h-3 w-3" />
                                <span>Ongoing</span>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Rating */}
                        <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{novel.rating.toFixed(1)}</span>
                          <span className="text-gray-300">
                            ({novel.totalRatings})
                          </span>
                        </div>

                        {/* Combat Rating - For battle collections */}
                        {novel.combatRating && (
                          <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-red-500/80 px-2 py-1 text-xs font-bold text-white backdrop-blur-sm">
                            <Sword className="h-3 w-3" />
                            <span>{novel.combatRating}/10</span>
                          </div>
                        )}
                      </div>

                      <div
                        className={cn(
                          "flex flex-col justify-between",
                          view === "grid" ? "p-4" : "flex-1 p-4"
                        )}
                      >
                        <div>
                          <h3 className="text-xl font-bold text-white line-clamp-2">
                            {novel.title}
                          </h3>
                          <p className="text-sm text-gray-300">
                            {novel.author}
                          </p>

                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {novel.categories
                              .slice(0, view === "grid" ? 3 : 5)
                              .map((category) => (
                                <Badge
                                  key={category}
                                  variant="outline"
                                  className="bg-gray-700/50 text-xs text-emerald-300 border-emerald-500/20 hover:bg-emerald-900/20"
                                >
                                  {category}
                                </Badge>
                              ))}
                            {novel.categories.length >
                              (view === "grid" ? 3 : 5) && (
                              <Badge
                                variant="outline"
                                className="bg-gray-700/50 text-xs"
                              >
                                +
                                {novel.categories.length -
                                  (view === "grid" ? 3 : 5)}
                              </Badge>
                            )}
                          </div>

                          {view === "list" && (
                            <p className="mt-2 text-sm text-gray-400 line-clamp-2">
                              {novel.description}
                            </p>
                          )}
                        </div>

                        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-400">
                          <div className="flex items-center gap-1">
                            <BookOpen className="h-3.5 w-3.5" />
                            <span>{novel.chapterCount} chapters</span>
                          </div>

                          <div className="flex items-center gap-1">
                            <Eye className="h-3.5 w-3.5" />
                            <span>{novel.views.toLocaleString()} views</span>
                          </div>

                          {view === "list" && novel.powerLevel && (
                            <div className="flex items-center gap-1 text-amber-400">
                              <Flame className="h-3.5 w-3.5" />
                              <span>Power Level: {novel.powerLevel}/10</span>
                            </div>
                          )}

                          {view === "list" && (
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" />
                              <span>Updated {novel.lastUpdated}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>

                  <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-600"></div>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <Link
                    href={`/collections/${
                      params.slug
                    }?sort=${sort}&view=${view}&page=${Math.max(1, page - 1)}${
                      searchQuery ? `&search=${searchQuery}` : ""
                    }${
                      selectedCategory ? `&category=${selectedCategory}` : ""
                    }`}
                    className={cn(
                      "rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm font-medium",
                      page <= 1
                        ? "pointer-events-none text-gray-500"
                        : "text-gray-300 hover:bg-gray-700"
                    )}
                  >
                    Previous
                  </Link>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNumber = i + 1;
                    const isCurrentPage = pageNumber === page;

                    return (
                      <Link
                        key={pageNumber}
                        href={`/collections/${
                          params.slug
                        }?sort=${sort}&view=${view}&page=${pageNumber}${
                          searchQuery ? `&search=${searchQuery}` : ""
                        }${
                          selectedCategory
                            ? `&category=${selectedCategory}`
                            : ""
                        }`}
                        className={cn(
                          "rounded-lg px-3 py-2 text-sm font-medium",
                          isCurrentPage
                            ? "bg-emerald-500 text-white"
                            : "border border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700"
                        )}
                      >
                        {pageNumber}
                      </Link>
                    );
                  })}

                  {totalPages > 5 && <span className="text-gray-500">...</span>}

                  {totalPages > 5 && (
                    <Link
                      href={`/collections/${
                        params.slug
                      }?sort=${sort}&view=${view}&page=${totalPages}${
                        searchQuery ? `&search=${searchQuery}` : ""
                      }${
                        selectedCategory ? `&category=${selectedCategory}` : ""
                      }`}
                      className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700"
                    >
                      {totalPages}
                    </Link>
                  )}

                  <Link
                    href={`/collections/${
                      params.slug
                    }?sort=${sort}&view=${view}&page=${Math.min(
                      totalPages,
                      page + 1
                    )}${searchQuery ? `&search=${searchQuery}` : ""}${
                      selectedCategory ? `&category=${selectedCategory}` : ""
                    }`}
                    className={cn(
                      "rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm font-medium",
                      page >= totalPages
                        ? "pointer-events-none text-gray-500"
                        : "text-gray-300 hover:bg-gray-700"
                    )}
                  >
                    Next
                  </Link>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// Helper component for Pause icon since it's not in lucide-react
function Pause({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </svg>
  );
}

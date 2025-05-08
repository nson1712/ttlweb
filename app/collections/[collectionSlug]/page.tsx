"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, BookOpen, Filter, SortAsc, SortDesc, Grid, List, Heart } from "lucide-react"
import { NovelCard } from "../../components/novels/novel-card"
import { cn } from "../../lib/utils"
import { useParams, useSearchParams } from "next/navigation"
import { Novel } from "@/app/lib/types"
import { PaginationWithLinks } from "@/app/components/components/pagination"

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

// Mock data for collections
const collections: Collection[] = [
  {
    id: "1",
    slug: "legendary-warriors",
    title: "Legendary Warriors",
    description: "A collection of novels featuring the most powerful warriors across different worlds and eras. From ancient battlefields to futuristic arenas, these protagonists dominate through sheer combat prowess.",
    coverImages: [
      "/1742474407_the-empty-box-and-zeroth-maria.webp",
      "/1742474407_the-empty-box-and-zeroth-maria.webp",
      "/1742474407_the-empty-box-and-zeroth-maria.webp",
      "/1742474407_the-empty-box-and-zeroth-maria.webp"
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
    epicScale: 8
  },
  {
    id: "2",
    slug: "epic-quests",
    title: "Epic Quests & Adventures",
    description: "Join heroes on their journeys across dangerous lands, ancient ruins, and mystical realms. These novels feature grand adventures with high stakes and powerful adversaries.",
    coverImages: [
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
      "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
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
    epicScale: 9
  }
];

// Mock data for novels in a collection
const collectionNovels = [
  {
    id: "1",
    slug: "the-ancient-sovereign",
    title: "The Ancient Sovereign",
    coverImage: "/1742474407_the-empty-box-and-zeroth-maria.webp",
    author: "Aria Nightshade",
    rating: 4.8,
    totalRatings: 1245,
    categories: ["Fantasy", "Adventure", "Cultivation"],
    description: "After a thousand years of slumberAfter a thousand years of slumberAfter a thousand years of slumberAfter a thousand years of slumberAfter a thousand years of slumberAfter a thousand years of slumberAfter a thousand years of slumberAfter a thousand years of slumberAfter a thousand years of slumberAfter a thousand years of slumberAfter a thousand years of slumberAfter a thousand years of slumberAfter a thousand years of slumberAfter a thousand years of slumberAfter a thousand years of slumberAfter a thousand years of slumberAfter a thousand years of slumberAfter a thousand years of slumberAfter a thousand years of slumberAfter a thousand years of slumberAfter a thousand years of slumberAfter a thousand years of slumberAfter a thousand years of slumber, cx vzxcv zxcv zxcv zxcv xzcv xzcv zxcv zxc vzxcv zxc vzxcv zxcv zxc vxzcv zxcv xczv zxcv zxcv zxcv zxcv zxcv xzcv xzcv zxcv xzc vxzc vzxcv xzc vzxcv xzc vzxcv xzc the Ancient Sovereign awakens to a world that has forgotten him. With his powers diminished, he must reclaim his throne and legacy.",
    updatedAt: "2024-04-20",
    chapterCount: 356
  },
  {
    id: "2",
    slug: "dragon-emperor",
    title: "Dragon Emperor",
    coverImage: "/1742474407_the-empty-box-and-zeroth-maria.webp",
    author: "Blaze Fireheart",
    rating: 4.7,
    totalRatings: 1123,
    categories: ["Fantasy", "Dragons", "Cultivation"],
    description: "Born with the rare ability to communicate with dragons, Lin Feng rises from humble beginnings to become the legendary Dragon Emperor, uniting humans and dragons against an ancient evil.",
    updatedAt: "2023-12-20",
    chapterCount: 412
  },
  {
    id: "3",
    slug: "shadow-assassin",
    title: "Shadow Assassin",
    coverImage: "/1742474407_the-empty-box-and-zeroth-maria.webp",
    author: "Raven Steele",
    rating: 4.9,
    totalRatings: 1567,
    categories: ["Fantasy", "Action", "Martial Arts"],
    description: "Trained from birth in the ancient arts of assassination, Kage must choose between following his clan's traditions or forging his own path when he discovers the truth behind his assignments.",
    updatedAt: "2024-01-05",
    chapterCount: 278
  },
  {
    id: "4",
    slug: "immortal-blade",
    title: "Immortal Blade",
    coverImage: "/1742474407_the-empty-box-and-zeroth-maria.webp",
    author: "Shin Kazama",
    rating: 4.8,
    totalRatings: 1342,
    categories: ["Martial Arts", "Fantasy", "Historical"],
    description: "A legendary sword that grants immortality to its wielder becomes the center of a centuries-long conflict between martial arts schools. Follow the journey of the blade and those who seek its power.",
    updatedAt: "2023-10-10",
    chapterCount: 324
  },
  {
    id: "5",
    slug: "demon-hunter-chronicles",
    title: "Demon Hunter Chronicles",
    coverImage: "/1742474407_the-empty-box-and-zeroth-maria.webp",
    author: "Dante Shadowbane",
    rating: 4.9,
    totalRatings: 1654,
    categories: ["Urban Fantasy", "Action", "Horror"],
    description: "When demons begin crossing into our world, a reluctant hunter with demon blood in his veins becomes humanity's best hope for survival.",
    updatedAt: "2024-04-15",
    chapterCount: 298
  },
  {
    id: "6",
    slug: "samurai-legend",
    title: "Samurai Legend",
    coverImage: "/1742474407_the-empty-box-and-zeroth-maria.webp",
    author: "Takeshi Blade",
    rating: 4.9,
    totalRatings: 1532,
    categories: ["Historical", "Martial Arts", "Drama"],
    description: "In feudal Japan, a masterless samurai seeks redemption for his past while protecting a village from corrupt officials and ruthless bandits.",
    updatedAt: "2023-04-01",
    chapterCount: 256
  },
  {
    id: "7",
    slug: "elemental-sovereign",
    title: "Elemental Sovereign",
    coverImage: "/1742474407_the-empty-box-and-zeroth-maria.webp",
    author: "Aether Flameheart",
    rating: 4.8,
    totalRatings: 1276,
    categories: ["Fantasy", "Adventure", "Elemental Magic"],
    description: "Born with the ability to control all five elements, Kai must master his powers and unite the warring elemental tribes before an ancient darkness consumes the world.",
    updatedAt: "2024-04-18",
    chapterCount: 385
  },
  {
    id: "8",
    slug: "galactic-mercenary",
    title: "Galactic Mercenary",
    coverImage: "/1742474407_the-empty-box-and-zeroth-maria.webp",
    author: "Rex Starfury",
    rating: 4.7,
    totalRatings: 1089,
    categories: ["Sci-Fi", "Military", "Action"],
    description: "A former elite soldier becomes a mercenary after being betrayed by his government, taking on the most dangerous missions across the galaxy while uncovering a plot that threatens all inhabited worlds.",
    updatedAt: "2024-04-10",
    chapterCount: 267
  }
];

export default function CollectionDetailPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const [novels, setNovels] = useState<Novel[]>([])
  const [loading, setLoading] = useState(true)

  const page = parseInt(searchParams.get("page") ?? "1", 10)
  
  const pageSize = parseInt(searchParams.get("pageSize") ?? "10", 10)
  
  const sort = searchParams.get("sort") ?? "popular"
  
  const view = searchParams.get("view") ?? "list"
  
  // Find collection by slug
  const collection = collections.find(c => c.slug === params.collectionSlug)
  
  // Get category color based on collection category
  const getCategoryColor = (category: string) => {
    switch(category) {
      case "Battle":
        return "red"
      case "Adventure":
        return "blue"
      case "Epic":
        return "purple"
      case "Conquest":
        return "amber"
      case "Personal":
        return "teal"
      default:
        return "teal"
    }
  }
  
  const categoryColor = collection ? getCategoryColor(collection.category) : "teal"
  
  // Get color classes based on category color
  const getColorClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: "from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-400",
      green: "from-green-500/20 to-green-600/20 border-green-500/30 text-green-400",
      red: "from-red-500/20 to-red-600/20 border-red-500/30 text-red-400",
      purple: "from-purple-500/20 to-purple-600/20 border-purple-500/30 text-purple-400",
      amber: "from-orange-500/20 to-orange-600/20 border-orange-500/30 text-orange-400",
      teal: "from-teal-500/20 to-teal-600/20 border-teal-500/30 text-teal-400",
      pink: "from-pink-500/20 to-pink-600/20 border-pink-500/30 text-pink-400",
      yellow: "from-yellow-500/20 to-yellow-600/20 border-yellow-500/30 text-yellow-400",
    }
    return colorMap[color] || colorMap.teal
  }
  
  const colorClasses = getColorClasses(categoryColor)
  
  // Fetch novels in collection
  useEffect(() => {
    const fetchNovels = () => {
      setLoading(true)
      
      // In a real app, this would be an API call
      // For now, we'll use the mock data
      
      // Sort novels based on sort parameter
      const sortedNovels = [...collectionNovels].sort((a, b) => {
        if (sort === "popular") return b.totalRatings - a.totalRatings
        if (sort === "rating") return b.rating - a.rating
        if (sort === "newest") return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        if (sort === "oldest") return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
        return 0
      })
      
      // Paginate novels
      const start = (page - 1) * pageSize
      const end = start + pageSize
      const paginatedNovels = sortedNovels.slice(start, end)
      
      setNovels(paginatedNovels)
      setLoading(false)
    }
    
    fetchNovels()
  }, [page, pageSize, sort])
  
  if (!collection) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-white">Collection not found</h1>
        <p className="mt-2 text-gray-400">The collection you&#39;re looking for doesn&#39;t exist or has been removed.</p>
        <Link 
          href="/collections" 
          className="mt-4 rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600"
        >
          Return to Collections
        </Link>
      </div>
    )
  }
  
  // Get total count of novels in this collection
  const totalCount = collectionNovels.length
  
  return (
    <div className="min-h-screen">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/collections" 
            className="mb-4 inline-flex items-center text-sm font-medium text-emerald-400 hover:text-emerald-300"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to all collections
          </Link>
          
          <div className="flex items-center gap-3">
            <div className={cn(
              "flex h-12 w-12 items-center justify-center rounded-lg border bg-gradient-to-br",
              colorClasses
            )}>
              <BookOpen className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-bold text-white">
              {collection.title}
            </h1>
            <span className="rounded-full bg-gray-800 px-3 py-1 text-sm font-medium text-gray-300">
              {collection.novelCount} novels
            </span>
          </div>
          
          <div className="mt-2 flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <div className="relative h-5 w-5 overflow-hidden rounded-full">
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
          </div>
          
          <p className="mt-2 text-gray-400">
            {collection.description}
          </p>
        </div>
        
        {/* Filters and Sort */}
        <div className="mb-6 flex flex-col gap-4 rounded-xl bg-gray-800/50 p-4 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <span className="text-sm font-medium text-white">Sort by:</span>
            <Link
              href={`/collections/${params.collectionSlug}?sort=popular&view=${view}`}
              className={cn(
                "rounded-full px-3 py-1 text-sm font-medium transition-colors",
                sort === "popular"
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              )}
            >
              Popular
            </Link>
            <Link
              href={`/collections/${params.collectionSlug}?sort=rating&view=${view}`}
              className={cn(
                "rounded-full px-3 py-1 text-sm font-medium transition-colors",
                sort === "rating"
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              )}
            >
              Rating
            </Link>
            <Link
              href={`/collections/${params.collectionSlug}?sort=newest&view=${view}`}
              className={cn(
                "rounded-full px-3 py-1 text-sm font-medium transition-colors",
                sort === "newest"
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              )}
            >
              <SortDesc className="mr-1 h-3 w-3 inline" />
              Newest
            </Link>
            <Link
              href={`/collections/${params.collectionSlug}?sort=oldest&view=${view}`}
              className={cn(
                "rounded-full px-3 py-1 text-sm font-medium transition-colors",
                sort === "oldest"
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              )}
            >
              <SortAsc className="mr-1 h-3 w-3 inline" />
              Oldest
            </Link>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-white">View:</span>
            <Link
              href={`/collections/${params.collectionSlug}?sort=${sort}&view=grid`}
              className={cn(
                "rounded-full p-1.5 transition-colors",
                view === "grid"
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              )}
            >
              <Grid className="h-4 w-4" />
            </Link>
            <Link
              href={`/collections/${params.collectionSlug}?sort=${sort}&view=list`}
              className={cn(
                "rounded-full p-1.5 transition-colors",
                view === "list"
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              )}
            >
              <List className="h-4 w-4" />
            </Link>
          </div>
        </div>
        
        {/* Novels Grid/List */}
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-emerald-500"></div>
          </div>
        ) : novels.length > 0 ? (
          <div className={cn(
            view === "grid" 
              ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" 
              : "space-y-6"
          )}>
            {novels.map((novel) => (
              <NovelCard key={novel.id} {...novel} />
            ))}
          </div>
        ) : (
          <div className="flex h-64 flex-col items-center justify-center rounded-xl bg-gray-800/50 p-6 text-center backdrop-blur-sm">
            <BookOpen className="h-12 w-12 text-gray-500" />
            <h3 className="mt-4 text-xl font-medium text-white">No novels found</h3>
            <p className="mt-2 text-gray-400">
              This collection doesn&#39;t have any novels yet
            </p>
            <Link
              href="/collections"
              className="mt-4 rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600"
            >
              Browse all collections
            </Link>
          </div>
        )}
        
        {/* Pagination */}
        {novels.length > 0 && (
          <div className="mt-8">
            <PaginationWithLinks
              pageSearchParam="page"
              pageSizeSelectOptions={{
                pageSizeSearchParam: "pageSize",
                pageSizeOptions: [5, 10, 20, 50],
              }}
              page={page}
              pageSize={pageSize}
              totalCount={totalCount}
            />
          </div>
        )}
      </div>
    </div>
  )
}

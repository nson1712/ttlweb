"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Sparkles, Filter, SortAsc, SortDesc, Grid, List } from "lucide-react"
import { NovelCard } from "../components/novels/novel-card"
import { cn } from "../lib/utils"
import { Novel } from "../lib/types"
import { useSearchParams } from "next/navigation"
import { PaginationWithLinks } from "../components/components/pagination"

// Mock data for featured novels
const allFeaturedNovels = [
  {
    id: "madman-family",
    slug: "madman-family",
    title: "I Am The Madman Of This Family",
    coverImage:
      "/1742474407_the-empty-box-and-zeroth-maria.webp",
    author: "Solver Keter",
    rating: 4.5,
    totalRatings: 11,
    categories: ["Adventure", "Fantasy", "Action"],
    description:
      'Solver Keter, one of the Five Lunatics of Lawless City, regresses to when he was the illegitimate son of a doomed archery family. "If I regressed and couldn\'t even save my family, I might as well go kill myself." For my family? No, for my freedom!...',
    updatedAt: "2025-04-20T08:00:00Z",
    chapterCount: 46,
    featured: true,
    featuredReason: "Editor's Choice"
  },
  {
    id: "industrial-cthulhu",
    slug: "industrial-cthulhu",
    title: "Industrial Cthulhu: Starting as an Island Lord",
    coverImage:
      "/1742474407_the-empty-box-and-zeroth-maria.webp",
    author: "Unknown Author",
    rating: 4.2,
    totalRatings: 21,
    categories: [
      "Adventure",
      "Fantasy",
      "Historical",
      "Horror",
      "Mystery",
      "Supernatural",
      "Tragedy",
      "Action",
    ],
    description:
      '"I saw with my own eyes that they used the finest, rustproof refined steel to make utensils and cans, filling them with just a little food, then casually throwing them away after eating." "I saw with my own eyes that they used giant beasts as tall as mountains to devour soil and rocks, digging out..."',
    updatedAt: "2025-04-20T08:00:00Z",
    chapterCount: 42,
    featured: true,
    featuredReason: "Rising Star"
  },
  {
    id: "genius-cloning-1",
    slug: "genius-cloning-1",
    title: "The Genius of Cloning in the Academy City",
    coverImage:
      "/1742474407_the-empty-box-and-zeroth-maria.webp",
    author: "Unknown Author",
    rating: 4.7,
    totalRatings: 19,
    categories: [
      "Comedy",
      "Psychological",
      "Gender Bender",
      "Fantasy",
      "Supernatural",
      "Adventure",
      "Martial Arts",
    ],
    description:
      "I awoke as Violet, a familiar villainess trapped in a shady corporate research lab. Screw this! With my unstoppable cloning technique, I'm getting out of here and going to the Academy to live my own life!...",
    updatedAt: "2025-04-21T15:00:00Z",
    chapterCount: 23,
    featured: true,
    featuredReason: "Staff Pick"
  },
  {
    id: "lord-mysteries",
    slug: "lord-mysteries",
    title: "Lord of the Mysteries",
    coverImage:
      "/1744419978_blood-eagle.webp",
    author: "Cuttlefish That Loves Diving",
    rating: 4.7,
    totalRatings: 853,
    categories: ["Fantasy", "Mystery", "Supernatural"],
    description: "In the waves of steam and machinery, who could achieve extraordinary? In the fogs of history and darkness, who was whispering? I woke up from the realm of mysteries and opened my eyes to the world.",
    updatedAt: "2025-04-15T10:30:00Z",
    chapterCount: 1430,
    featured: true,
    featuredReason: "Reader Favorite"
  },
  {
    id: "legendary-mechanic",
    slug: "legendary-mechanic",
    title: "The Legendary Mechanic",
    coverImage:
      "/1744419978_blood-eagle.webp",
    author: "Chocolion",
    rating: 4.7,
    totalRatings: 712,
    categories: ["Sci-Fi", "Adventure", "Fantasy"],
    description: "What would happen if a game's NPC possessed the player's mind? Han Xiao, a fateful NPC, got a second chance at life. As a lowly mechanic, he had managed to save a galaxy from destruction! But before he could savor his triumph, he had died. However, destiny had other plans.",
    updatedAt: "2025-04-18T14:45:00Z",
    chapterCount: 1465,
    featured: true,
    featuredReason: "Trending"
  },
  {
    id: "shadow-slave",
    slug: "shadow-slave",
    title: "Shadow Slave",
    coverImage:
      "/1744419978_blood-eagle.webp",
    author: "Guiltythree",
    rating: 4.1,
    totalRatings: 769,
    categories: ["Fantasy", "Action", "Adventure"],
    description: "Growing up in poverty, Sunny never expected anything good from life. However, even he did not anticipate being chosen by the Nightmare Spell and becoming one of the Awakened - an elite group of people gifted with supernatural powers.",
    updatedAt: "2025-04-22T09:15:00Z",
    chapterCount: 789,
    featured: true,
    featuredReason: "Community Choice"
  },
  {
    id: "throne-of-magical-arcana",
    slug: "throne-of-magical-arcana",
    title: "Throne of Magical Arcana",
    coverImage:
      "/1744419978_blood-eagle.webp",
    author: "Cuttlefish That Loves Diving",
    rating: 4.5,
    totalRatings: 623,
    categories: ["Fantasy", "Adventure", "Mystery"],
    description: "Xuan Xuan Continent, the Land of Magical Beasts, where the strong prey on the weak. After a college student on earth dies from an accident, his soul awakens in the body of an ordinary citizen.",
    updatedAt: "2025-04-12T16:20:00Z",
    chapterCount: 912,
    featured: true,
    featuredReason: "Editor's Choice"
  },
  {
    id: "omniscient-readers-viewpoint",
    slug: "omniscient-readers-viewpoint",
    title: "Omniscient Reader's Viewpoint",
    coverImage:
      "/1744419978_blood-eagle.webp",
    author: "Sing-Shong",
    rating: 4.8,
    totalRatings: 892,
    categories: ["Fantasy", "Adventure", "Action"],
    description: "Only I know the end of this world. One day our MC finds himself stuck in the world of his favorite webnovel. What does he do to survive? It is a world struck by catastrophe and danger all around. His edge? He knows the plot of the story to end. Because he was the sole reader that stuck with it. Read his story to see how he survives!",
    updatedAt: "2025-04-19T11:30:00Z",
    chapterCount: 551,
    featured: true,
    featuredReason: "Rising Star"
  }
];

export default function FeaturedPage() {
  const [novels, setNovels] = useState<Novel[]>([])
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  
  const page = parseInt(searchParams.get("page") ?? "1", 10);

  const pageSize = parseInt(searchParams.get("pageSize") ?? "10", 10);

  const sort = searchParams.get("sort") ?? "popular";

  const view = searchParams.get("view") ?? "list";
  
  // Fetch featured novels
  useEffect(() => {
    const fetchNovels = () => {
      setLoading(true)
      
      // In a real app, this would be an API call
      // For now, we'll use the mock data
      
      // Sort novels based on sort parameter
      const sortedNovels = [...allFeaturedNovels].sort((a, b) => {
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
  
  // Get total count of featured novels
  const totalCount = allFeaturedNovels.length
  
  return (
    <div className="min-h-screen">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-amber-500/30 bg-gradient-to-br from-amber-500/20 to-amber-600/20 text-amber-400">
              <Sparkles className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-bold text-white">
              Featured Novels
            </h1>
            <span className="rounded-full bg-gray-800 px-3 py-1 text-sm font-medium text-gray-300">
              {totalCount} novels
            </span>
          </div>
          
          <p className="mt-2 text-gray-400">
            Browse our handpicked selection of outstanding novels, chosen by our editors and community for their exceptional quality and popularity.
          </p>
        </div>
        
        {/* Filters and Sort */}
        <div className="mb-6 flex flex-col gap-4 rounded-xl bg-gray-800/50 p-4 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <span className="text-sm font-medium text-white">Sort by:</span>
            <Link
              href={`/featured?sort=popular&view=${view}`}
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
              href={`/featured?sort=rating&view=${view}`}
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
              href={`/featured?sort=newest&view=${view}`}
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
              href={`/featured?sort=oldest&view=${view}`}
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
              href={`/featured?sort=${sort}&view=grid`}
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
              href={`/featured?sort=${sort}&view=list`}
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
              ? "grid grid-cols-1 gap-6 md:grid-cols-2" 
              : "space-y-6"
          )}>
            {novels.map((novel) => (
              <div key={novel.id} className="relative">
                <div className="absolute -right-2 -top-2 z-10 rounded-full bg-amber-500 px-2 py-1 text-xs font-medium text-white shadow-lg">
                  {novel.featuredReason}
                </div>
                <NovelCard {...novel} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-64 flex-col items-center justify-center rounded-xl bg-gray-800/50 p-6 text-center backdrop-blur-sm">
            <Sparkles className="h-12 w-12 text-gray-500" />
            <h3 className="mt-4 text-xl font-medium text-white">No featured novels found</h3>
            <p className="mt-2 text-gray-400">
              We couldn&#39;t find any featured novels at the moment
            </p>
            <Link
              href="/"
              className="mt-4 rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600"
            >
              Return to Home
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

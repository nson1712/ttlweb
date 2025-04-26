"use client"

import { useState, useEffect } from "react"
 import Link from "next/link"
import { ChevronLeft, Tag as TagIcon, Filter, SortAsc, SortDesc, Grid, List } from "lucide-react"
import { NovelCard } from "../../components/novels/novel-card"
import { cn } from "../../lib/utils"
import { PaginationWithLinks } from "@/app/components/components/pagination"
import { useParams, useSearchParams } from "next/navigation"

export default function TagDetailPage(
) {

 const { tag: rawTag } = useParams()
 const searchParams = useSearchParams()
  const tag = decodeURIComponent(Array.isArray(rawTag) ? rawTag[0] : rawTag ?? "")

  interface Novel {
    id: string
    slug: string
    title: string
    coverImage: string
    author: string
    rating: number
    totalRatings: number
    categories: string[]
    description: string
    updatedAt: string
    chapterCount: number
  }

  const [novels, setNovels] = useState<Novel[]>([])
  const [loading, setLoading] = useState(true)
  
  const page = parseInt(searchParams.get("page") ?? "1", 10)
  
  const pageSize = parseInt(searchParams.get("pageSize") ?? "10", 10)
  
  const sort = searchParams.get("sort") ?? "popular"
  
  const view = searchParams.get("view") ?? "list"
  
  // Get tag color based on tag name
  const getTagColor = (tagName: string) => {
    const tag = allTags.find(t => t.name.toLowerCase() === tagName.toLowerCase())
    return tag?.color || "teal"
  }
  
  const tagColor = getTagColor(tag)
  
  // Get color classes based on tag color
  const getColorClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: "from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-400",
      green: "from-green-500/20 to-green-600/20 border-green-500/30 text-green-400",
      red: "from-red-500/20 to-red-600/20 border-red-500/30 text-red-400",
      purple: "from-purple-500/20 to-purple-600/20 border-purple-500/30 text-purple-400",
      orange: "from-orange-500/20 to-orange-600/20 border-orange-500/30 text-orange-400",
      teal: "from-teal-500/20 to-teal-600/20 border-teal-500/30 text-teal-400",
      pink: "from-pink-500/20 to-pink-600/20 border-pink-500/30 text-pink-400",
      yellow: "from-yellow-500/20 to-yellow-600/20 border-yellow-500/30 text-yellow-400",
    }
    return colorMap[color] || colorMap.teal
  }
  
  const colorClasses = getColorClasses(tagColor)
  
  // Fetch novels by tag
  useEffect(() => {
    const fetchNovels = () => {
      setLoading(true)
      
      // In a real app, this would be an API call
      // For now, we'll filter the mock data
      const filteredNovels = allNovels.filter(novel => 
        novel.categories.some((category: string) => 
          category.toLowerCase() === tag.toLowerCase()
        )
      )
      
      // Sort novels based on sort parameter
      const sortedNovels = [...filteredNovels].sort((a, b) => {
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
  }, [tag, page, pageSize, sort])
  
  // Get total count of novels with this tag
  const totalCount = allNovels.filter(novel => 
    novel.categories.some((category: string) => 
      category.toLowerCase() === tag.toLowerCase()
    )
  ).length
  
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/tags" 
            className="mb-4 inline-flex items-center text-sm font-medium text-emerald-400 hover:text-emerald-300"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to all tags
          </Link>
          
          <div className="flex items-center gap-3">
            <div className={cn(
              "flex h-12 w-12 items-center justify-center rounded-lg border bg-gradient-to-br",
              colorClasses
            )}>
              <TagIcon className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-bold text-white">
              {tag.charAt(0).toUpperCase() + tag.slice(1)}
            </h1>
            <span className="rounded-full bg-gray-800 px-3 py-1 text-sm font-medium text-gray-300">
              {totalCount} novels
            </span>
          </div>
          
          <p className="mt-2 text-gray-400">
            Browse all novels tagged with {tag.toLowerCase()}
          </p>
        </div>
        
        {/* Filters and Sort */}
        <div className="mb-6 flex flex-col gap-4 rounded-xl bg-gray-800/50 p-4 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <span className="text-sm font-medium text-white">Sort by:</span>
            <Link
              href={`/tags/${tag}?sort=popular&view=${view}`}
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
              href={`/tags/${tag}?sort=rating&view=${view}`}
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
              href={`/tags/${tag}?sort=newest&view=${view}`}
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
              href={`/tags/${tag}?sort=oldest&view=${view}`}
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
              href={`/tags/${tag}?sort=${sort}&view=grid`}
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
              href={`/tags/${tag}?sort=${sort}&view=list`}
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
              <NovelCard key={novel.id} {...novel} />
            ))}
          </div>
        ) : (
          <div className="flex h-64 flex-col items-center justify-center rounded-xl bg-gray-800/50  text-center backdrop-blur-sm">
            <TagIcon className="h-12 w-12 text-gray-500" />
            <h3 className="mt-4 text-xl font-medium text-white">No novels found</h3>
            <p className="mt-2 text-gray-400">
              We couldn&#39;t find any novels tagged with {tag.toLowerCase()}
            </p>
            <Link
              href="/tags"
              className="mt-4 rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600"
            >
              Browse all tags
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

// Mock data for all tags (same as in tags/page.tsx)
const allTags = [
  { name: "Fantasy", count: 1250, color: "teal" },
  { name: "Adventure", count: 987, color: "blue" },
  { name: "Romance", count: 856, color: "pink" },
  { name: "Sci-Fi", count: 723, color: "purple" },
  { name: "Action", count: 645, color: "red" },
  { name: "Mystery", count: 534, color: "yellow" },
  { name: "Horror", count: 423, color: "orange" },
  { name: "Comedy", count: 389, color: "green" },
  { name: "Drama", count: 356, color: "pink" },
  { name: "Historical", count: 289, color: "yellow" },
  { name: "Supernatural", count: 267, color: "purple" },
  { name: "Thriller", count: 245, color: "red" },
  { name: "Cultivation", count: 578, color: "teal" },
  { name: "Reincarnation", count: 432, color: "purple" },
  { name: "Martial Arts", count: 345, color: "red" },
];

// Combined mock data for all novels
const allNovels = [
  // Featured novels
  {
    id: "madman-family",
    slug: "madman-family",
    title: "I Am The Madman Of This Family",
    coverImage:
      "https://ranobes.top/uploads/posts/2025-03/thumbs/1741679006_industrial-cthulhu-starting-as-an-island-lord.webp",
    author: "Solver Keter",
    rating: 4.5,
    totalRatings: 11,
    categories: ["Adventure", "Fantasy", "Action"],
    description:
      'Solver Keter, one of the Five Lunatics of Lawless City, regresses to when he was the illegitimate son of a doomed archery family. "If I regressed and couldn\'t even save my family, I might as well go kill myself." For my family? No, for my freedom!...',
    updatedAt: "2025-04-20T08:00:00Z",
    chapterCount: 46,
  },
  {
    id: "industrial-cthulhu",
    slug: "industrial-cthulhu",
    title: "Industrial Cthulhu: Starting as an Island Lord",
    coverImage:
      "https://ranobes.top/uploads/posts/2025-03/thumbs/1741679006_industrial-cthulhu-starting-as-an-island-lord.webp",
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
  },
  {
    id: "genius-cloning-1",
    slug: "genius-cloning-1",
    title: "The Genius of Cloning in the Academy City",
    coverImage:
      "https://ranobes.top/uploads/posts/2025-03/thumbs/1741679006_industrial-cthulhu-starting-as-an-island-lord.webp",
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
  },
  
  // Best novels
  {
    id: "lord-mysteries",
    slug: "lord-mysteries",
    title: "Lord of the Mysteries",
    coverImage:
      "https://ranobes.top/uploads/posts/2025-04/thumbs/1744879926_diary-of-a-dead-wizard.webp",
    author: "Cuttlefish That Loves Diving",
    rating: 4.7,
    totalRatings: 853,
    categories: ["Fantasy", "Mystery", "Supernatural"],
    description: "In the waves of steam and machinery, who could achieve extraordinary? In the fogs of history and darkness, who was whispering? I woke up from the realm of mysteries and opened my eyes to the world.",
    updatedAt: "2025-04-15T10:30:00Z",
    chapterCount: 1430,
  },
  {
    id: "legendary-mechanic",
    slug: "legendary-mechanic",
    title: "The Legendary Mechanic",
    coverImage:
      "https://ranobes.top/uploads/posts/2025-04/thumbs/1744879926_diary-of-a-dead-wizard.webp",
    author: "Chocolion",
    rating: 4.7,
    totalRatings: 712,
    categories: ["Sci-Fi", "Adventure", "Fantasy"],
    description: "What would happen if a game's NPC possessed the player's mind? Han Xiao, a fateful NPC, got a second chance at life. As a lowly mechanic, he had managed to save a galaxy from destruction! But before he could savor his triumph, he had died. However, destiny had other plans.",
    updatedAt: "2025-04-18T14:45:00Z",
    chapterCount: 1465,
  },
  {
    id: "shadow-slave",
    slug: "shadow-slave",
    title: "Shadow Slave",
    coverImage:
      "https://ranobes.top/uploads/posts/2025-04/thumbs/1744879926_diary-of-a-dead-wizard.webp",
    author: "Guiltythree",
    rating: 4.1,
    totalRatings: 769,
    categories: ["Fantasy", "Action", "Adventure"],
    description: "Growing up in poverty, Sunny never expected anything good from life. However, even he did not anticipate being chosen by the Nightmare Spell and becoming one of the Awakened - an elite group of people gifted with supernatural powers.",
    updatedAt: "2025-04-22T09:15:00Z",
    chapterCount: 789,
  },
  
  // Most discussed novels
  {
    id: "throne-of-magical-arcana",
    slug: "throne-of-magical-arcana",
    title: "Throne of Magical Arcana",
    coverImage:
      "https://ranobes.top/uploads/posts/2025-04/thumbs/1744879926_diary-of-a-dead-wizard.webp",
    author: "Cuttlefish That Loves Diving",
    rating: 4.5,
    totalRatings: 623,
    categories: ["Fantasy", "Adventure", "Mystery"],
    description: "Xuan Xuan Continent, the Land of Magical Beasts, where the strong prey on the weak. After a college student on earth dies from an accident, his soul awakens in the body of an ordinary citizen.",
    updatedAt: "2025-04-10T11:20:00Z",
    chapterCount: 921,
  },
  {
    id: "omniscient-readers-viewpoint",
    slug: "omniscient-readers-viewpoint",
    title: "Omniscient Reader's Viewpoint",
    coverImage:
      "https://ranobes.top/uploads/posts/2025-04/thumbs/1744879926_diary-of-a-dead-wizard.webp",
    author: "Sing-Shong",
    rating: 4.8,
    totalRatings: 892,
    categories: ["Fantasy", "Adventure", "Action"],
    description: "Only I know the end of this world. One day our MC finds himself stuck in the world of his favorite webnovel. What does he do to survive? It is a world struck by catastrophe and danger all around.",
    updatedAt: "2025-04-05T16:40:00Z",
    chapterCount: 551,
  },
  {
    id: "reverend-insanity",
    slug: "reverend-insanity",
    title: "Reverend Insanity",
    coverImage:
      "https://ranobes.top/uploads/posts/2025-04/thumbs/1744879926_diary-of-a-dead-wizard.webp",
    author: "Gu Zhen Ren",
    rating: 4.6,
    totalRatings: 745,
    categories: ["Fantasy", "Martial Arts", "Xuanhuan"],
    description: "A story of a villain, Fang Yuan who was reborn 500 years into the past with the Spring Autumn Cicada he painstakingly refined. With his profound wisdom, battle and life experiences, he seeks to overcome his foes while advancing to the highest level.",
    updatedAt: "2025-04-12T13:25:00Z",
    chapterCount: 2334,
  },
  
  // Additional novels for variety
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
    description: "Derek McCoy was a man who spent his entire life facing adversity and injustice. After being forced to settle with surviving rather than living, he had finally found his place in the world, until everything was taken from him one last time.",
    updatedAt: "2025-04-08T09:50:00Z",
    chapterCount: 1876,
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
    categories: ["Games", "Adventure", "Fantasy", "Cultivation"],
    description: "Yuan was born with an incurable illness that left him blind at a young age and crippled a few years later, rendering everything below his head useless. Deemed hopeless and irredeemable, his parents abandoned him to a monastery.",
    updatedAt: "2025-04-17T10:10:00Z",
    chapterCount: 654,
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
    categories: ["Sci-Fi", "Adventure", "Mecha"],
    description: "Common sense dictates that mechs are high-maintenance weapons platforms that are expensive to deploy and maintain. Yet Ves Larkinson has always been fascinated by these fighting machines.",
    updatedAt: "2025-04-19T14:30:00Z",
    chapterCount: 3421,
  },
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
    description: "After being transported to another world, Lin Mu discovers he has a system that allows him to open a store that spans across dimensions. As the storekeeper, he must manage his business while navigating the dangers of multiple worlds.",
    updatedAt: "2025-04-23T08:45:00Z",
    chapterCount: 287,
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
    categories: ["Fantasy", "Adventure", "Action", "Time Travel"],
    description: "Leo awakens in a world he doesn't recognize, with no memory of who he is or why he's there. All he knows is that survival isn't just a necessity—it's his only chance to uncover the truth.",
    updatedAt: "2025-04-22T11:20:00Z",
    chapterCount: 156,
  },
];

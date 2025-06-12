"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  Star, 
  BookOpen, 
  Search, 
  Filter,
  Grid,
  List as ListIcon,
  Check,
  Clock,
  Trophy
} from "lucide-react"
import { Badge } from "../components/ui/badge"
// import { PaginationWithLinks } from "../components/ui/pagination"
import { cn } from "../lib/utils"
import { useSearchParams } from "next/navigation"

// Mock data for completed novels
const completedNovels = [
  {
    id: "1",
    slug: "the-ancient-sovereign",
    title: "The Ancient Sovereign",
    coverImage: "/images/covers/cover1.jpg",
    author: "Aria Nightshade",
    rating: 4.8,
    totalRatings: 1245,
    categories: ["Fantasy", "Adventure", "Cultivation"],
    description: "After a thousand years of slumber, the Ancient Sovereign awakens to a world that has forgotten him. With his powers diminished, he must reclaim his throne and legacy.",
    completedDate: "2024-03-15",
    totalChapters: 356,
    views: 1250000,
    estimatedReadingTime: "72 hours"
  },
  {
    id: "2",
    slug: "stellar-odyssey",
    title: "Stellar Odyssey",
    coverImage: "/images/covers/cover2.jpg",
    author: "Orion Blackwood",
    rating: 4.6,
    totalRatings: 987,
    categories: ["Sci-Fi", "Space", "Adventure"],
    description: "When Earth becomes uninhabitable, humanity's last hope lies in a fleet of generation ships. Follow the journey of the Stellar Odyssey as it searches for a new home among the stars.",
    completedDate: "2024-02-10",
    totalChapters: 210,
    views: 890000,
    estimatedReadingTime: "42 hours"
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
    description: "Trained from birth in the ancient arts of assassination, Kage must choose between following his clan's traditions or forging his own path when he discovers the truth behind his assignments.",
    completedDate: "2024-01-05",
    totalChapters: 278,
    views: 1450000,
    estimatedReadingTime: "56 hours"
  },
  {
    id: "4",
    slug: "dragon-emperor",
    title: "Dragon Emperor",
    coverImage: "/images/covers/cover4.jpg",
    author: "Blaze Fireheart",
    rating: 4.7,
    totalRatings: 1123,
    categories: ["Fantasy", "Dragons", "Cultivation"],
    description: "Born with the rare ability to communicate with dragons, Lin Feng rises from humble beginnings to become the legendary Dragon Emperor, uniting humans and dragons against an ancient evil.",
    completedDate: "2023-12-20",
    totalChapters: 412,
    views: 1680000,
    estimatedReadingTime: "83 hours"
  },
  {
    id: "5",
    slug: "cyber-hunter",
    title: "Cyber Hunter",
    coverImage: "/images/covers/cover5.jpg",
    author: "Neo Matrix",
    rating: 4.5,
    totalRatings: 856,
    categories: ["Cyberpunk", "Action", "Mystery"],
    description: "In a world where the line between human and machine blurs, a rogue AI hunter discovers a conspiracy that threatens to enslave humanity through neural implants.",
    completedDate: "2023-11-15",
    totalChapters: 185,
    views: 750000,
    estimatedReadingTime: "37 hours"
  },
  {
    id: "6",
    slug: "immortal-blade",
    title: "Immortal Blade",
    coverImage: "/images/covers/cover6.jpg",
    author: "Shin Kazama",
    rating: 4.8,
    totalRatings: 1342,
    categories: ["Martial Arts", "Fantasy", "Historical"],
    description: "A legendary sword that grants immortality to its wielder becomes the center of a centuries-long conflict between martial arts schools. Follow the journey of the blade and those who seek its power.",
    completedDate: "2023-10-10",
    totalChapters: 324,
    views: 1320000,
    estimatedReadingTime: "65 hours"
  },
  {
    id: "7",
    slug: "arcane-scholar",
    title: "Arcane Scholar",
    coverImage: "/images/covers/cover7.jpg",
    author: "Merlin Stormrage",
    rating: 4.6,
    totalRatings: 978,
    categories: ["Fantasy", "Magic", "Academy"],
    description: "Rejected by traditional magic academies due to his unique approach to spellcasting, Elias creates his own path to becoming the greatest arcane scholar the world has ever known.",
    completedDate: "2023-09-05",
    totalChapters: 246,
    views: 920000,
    estimatedReadingTime: "49 hours"
  },
  {
    id: "8",
    slug: "demon-hunter-chronicles",
    title: "Demon Hunter Chronicles",
    coverImage: "/images/covers/cover8.jpg",
    author: "Dante Shadowbane",
    rating: 4.9,
    totalRatings: 1654,
    categories: ["Urban Fantasy", "Action", "Horror"],
    description: "When demons begin crossing into our world, a reluctant hunter with demon blood in his veins becomes humanity's best hope for survival.",
    completedDate: "2023-08-01",
    totalChapters: 298,
    views: 1580000,
    estimatedReadingTime: "60 hours"
  },
  {
    id: "9",
    slug: "galactic-mercenary",
    title: "Galactic Mercenary",
    coverImage: "/images/covers/cover9.jpg",
    author: "Rex Starfury",
    rating: 4.7,
    totalRatings: 1089,
    categories: ["Sci-Fi", "Military", "Action"],
    description: "A former elite soldier becomes a mercenary after being betrayed by his government, taking on the most dangerous missions across the galaxy while uncovering a plot that threatens all inhabited worlds.",
    completedDate: "2023-07-15",
    totalChapters: 267,
    views: 1150000,
    estimatedReadingTime: "54 hours"
  },
  {
    id: "10",
    slug: "elemental-sovereign",
    title: "Elemental Sovereign",
    coverImage: "/images/covers/cover10.jpg",
    author: "Aether Flameheart",
    rating: 4.8,
    totalRatings: 1276,
    categories: ["Fantasy", "Adventure", "Elemental Magic"],
    description: "Born with the ability to control all five elements, Kai must master his powers and unite the warring elemental tribes before an ancient darkness consumes the world.",
    completedDate: "2023-06-10",
    totalChapters: 385,
    views: 1420000,
    estimatedReadingTime: "77 hours"
  },
  {
    id: "11",
    slug: "virtual-overlord",
    title: "Virtual Overlord",
    coverImage: "/images/covers/cover11.jpg",
    author: "Max Powers",
    rating: 4.6,
    totalRatings: 945,
    categories: ["GameLit", "LitRPG", "Adventure"],
    description: "Trapped in a virtual reality MMORPG, a top player must conquer the game to free himself and thousands of other players, while uncovering the sinister purpose behind their imprisonment.",
    completedDate: "2023-05-05",
    totalChapters: 312,
    views: 980000,
    estimatedReadingTime: "62 hours"
  },
  {
    id: "12",
    slug: "samurai-legend",
    title: "Samurai Legend",
    coverImage: "/images/covers/cover12.jpg",
    author: "Takeshi Blade",
    rating: 4.9,
    totalRatings: 1532,
    categories: ["Historical", "Martial Arts", "Drama"],
    description: "In feudal Japan, a masterless samurai seeks redemption for his past while protecting a village from corrupt officials and ruthless bandits.",
    completedDate: "2023-04-01",
    totalChapters: 256,
    views: 1280000,
    estimatedReadingTime: "51 hours"
  }
];


export default function CompletedNovelsPage() {
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") ?? "1", 10)
  
  const pageSize = parseInt(searchParams.get("pageSize") ?? "10", 10)
  
  const sort = searchParams.get("sort") ?? "rating"
  
  const view = searchParams.get("view") ?? "list"

  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "")
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "")

  
  // Get all unique categories
  const allCategories = Array.from(
    new Set(completedNovels.flatMap(novel => novel.categories))
  ).sort()
  
  // Filter novels based on search query and selected category
  const filteredNovels = completedNovels.filter(novel => {
    const matchesSearch = searchQuery
      ? novel.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        novel.author.toLowerCase().includes(searchQuery.toLowerCase())
      : true
    
    const matchesCategory = selectedCategory
      ? novel.categories.includes(selectedCategory)
      : true
    
    return matchesSearch && matchesCategory
  })
  
  // Sort novels based on sort parameter
  const sortedNovels = [...filteredNovels].sort((a, b) => {
    if (sort === "rating") return b.rating - a.rating
    if (sort === "chapters") return b.totalChapters - a.totalChapters
    if (sort === "date") return new Date(b.completedDate).getTime() - new Date(a.completedDate).getTime()
    if (sort === "views") return b.views - a.views
    if (sort === "title") return a.title.localeCompare(b.title)
    return 0
  })
  
  // Paginate novels
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const paginatedNovels = sortedNovels.slice(start, end)
  
  // Calculate total pages
  // const totalPages = Math.ceil(sortedNovels.length / pageSize)
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative mb-10 overflow-hidden rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 p-8 shadow-xl">
          <div className="absolute inset-0 overflow-hidden opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600"></div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Check className="h-5 w-5 text-emerald-400" />
              <h2 className="text-sm font-medium uppercase tracking-wider text-emerald-400">
                Complete Stories
              </h2>
            </div>
            
            <h1 className="mb-3 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              Completed Novels
            </h1>
            
            <p className="max-w-3xl text-gray-300 md:text-lg">
              Discover fully completed stories with no more chapters to be added. 
              Binge read from start to finish without waiting for updates.
            </p>
            
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 text-gray-300">
                <Trophy className="h-5 w-5 text-emerald-400" />
                <span className="font-medium">{completedNovels.length} Complete Series</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-300">
                <BookOpen className="h-5 w-5 text-emerald-400" />
                <span className="font-medium">
                  {completedNovels.reduce((total, novel) => total + novel.totalChapters, 0).toLocaleString()} Total Chapters
                </span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-300">
                <Clock className="h-5 w-5 text-emerald-400" />
                <span className="font-medium">
                  {Math.round(completedNovels.reduce(
                    (total, novel) => total + parseInt(novel.estimatedReadingTime.split(" ")[0]), 0
                  )).toLocaleString()} Hours of Reading
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Filters and Controls */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-bold text-white">
              Browse Completed Novels
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
                  placeholder="Search titles or authors..."
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
              
              <div className="flex items-center gap-2 rounded-lg bg-gray-700 p-1">
                <Link
                  href={`/completed?sort=rating&view=${view}&page=1${searchQuery ? `&search=${searchQuery}` : ""}${selectedCategory ? `&category=${selectedCategory}` : ""}`}
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
                  href={`/completed?sort=chapters&view=${view}&page=1${searchQuery ? `&search=${searchQuery}` : ""}${selectedCategory ? `&category=${selectedCategory}` : ""}`}
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
                  href={`/completed?sort=date&view=${view}&page=1${searchQuery ? `&search=${searchQuery}` : ""}${selectedCategory ? `&category=${selectedCategory}` : ""}`}
                  className={cn(
                    "rounded-md px-3 py-1 text-sm",
                    sort === "date" 
                      ? "bg-gray-600 text-white" 
                      : "text-gray-300 hover:bg-gray-600/50"
                  )}
                >
                  Completion Date
                </Link>
                <Link
                  href={`/completed?sort=views&view=${view}&page=1${searchQuery ? `&search=${searchQuery}` : ""}${selectedCategory ? `&category=${selectedCategory}` : ""}`}
                  className={cn(
                    "rounded-md px-3 py-1 text-sm",
                    sort === "views" 
                      ? "bg-gray-600 text-white" 
                      : "text-gray-300 hover:bg-gray-600/50"
                  )}
                >
                  Views
                </Link>
                <Link
                  href={`/completed?sort=title&view=${view}&page=1${searchQuery ? `&search=${searchQuery}` : ""}${selectedCategory ? `&category=${selectedCategory}` : ""}`}
                  className={cn(
                    "rounded-md px-3 py-1 text-sm",
                    sort === "title" 
                      ? "bg-gray-600 text-white" 
                      : "text-gray-300 hover:bg-gray-600/50"
                  )}
                >
                  Title
                </Link>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-white">View:</span>
              <div className="flex items-center gap-1 rounded-lg bg-gray-700 p-1">
                <Link
                  href={`/completed?sort=${sort}&view=grid&page=1${searchQuery ? `&search=${searchQuery}` : ""}${selectedCategory ? `&category=${selectedCategory}` : ""}`}
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
                  href={`/completed?sort=${sort}&view=list&page=1${searchQuery ? `&search=${searchQuery}` : ""}${selectedCategory ? `&category=${selectedCategory}` : ""}`}
                  className={cn(
                    "rounded-md p-1.5",
                    view === "list" 
                      ? "bg-gray-600 text-white" 
                      : "text-gray-300 hover:bg-gray-600/50"
                  )}
                >
                  <ListIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Novels Grid/List */}
        {filteredNovels.length === 0 ? (
          <div className="flex h-[40vh] flex-col items-center justify-center rounded-xl bg-gray-800/50 p-8 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white">No novels found</h3>
            <p className="mt-2 text-gray-400">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <>
            <div className={cn(
              "mb-8",
              view === "grid" 
                ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
                : "space-y-6"
            )}>
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
                  <Link href={`/novels/${novel.slug}`} className="block">
                    <div className={cn(
                      view === "grid" 
                        ? "flex flex-col" 
                        : "flex flex-row gap-6"
                    )}>
                      <div className={cn(
                        "relative overflow-hidden",
                        view === "grid" 
                          ? "aspect-[3/4] w-full" 
                          : "aspect-[3/4] w-1/4 flex-shrink-0"
                      )}>
                        <Image
                          src={novel.coverImage}
                          alt={novel.title}
                          fill
                          unoptimized
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes={view === "grid" ? "(max-width: 768px) 100vw, 33vw" : "(max-width: 768px) 100vw, 25vw"}
                          priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        
                        {/* Completed Badge */}
                        <div className="absolute top-2 right-2 rounded-full bg-emerald-500 px-2 py-1 text-xs font-medium text-white">
                          <div className="flex items-center gap-1">
                            <Check className="h-3 w-3" />
                            <span>Completed</span>
                          </div>
                        </div>
                        
                        {/* Rating */}
                        <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{novel.rating.toFixed(1)}</span>
                          <span className="text-gray-300">({novel.totalRatings})</span>
                        </div>
                        
                        {/* Total Chapters - Highlighted Feature */}
                        <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-emerald-500/90 px-2 py-1 text-xs font-bold text-white backdrop-blur-sm">
                          <BookOpen className="h-3 w-3" />
                          <span>{novel.totalChapters} Chapters</span>
                        </div>
                      </div>
                      
                      <div className={cn(
                        "flex flex-col justify-between",
                        view === "grid" ? "p-4" : "flex-1 p-4"
                      )}>
                        <div>
                          <h3 className="text-xl font-bold text-white line-clamp-2">{novel.title}</h3>
                          <p className="text-sm text-gray-300">{novel.author}</p>
                          
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {novel.categories.slice(0, view === "grid" ? 3 : 5).map((category) => (
                              <Badge 
                                key={category} 
                                variant="outline" 
                                className="bg-gray-700/50 text-xs text-emerald-300 border-emerald-500/20 hover:bg-emerald-900/20"
                              >
                                {category}
                              </Badge>
                            ))}
                            {novel.categories.length > (view === "grid" ? 3 : 5) && (
                              <Badge variant="outline" className="bg-gray-700/50 text-xs">
                                +{novel.categories.length - (view === "grid" ? 3 : 5)}
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
                            <BookOpen className="h-3.5 w-3.5 text-emerald-400" />
                            <span className="font-medium text-emerald-400">{novel.totalChapters} chapters</span>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{novel.estimatedReadingTime}</span>
                          </div>
                          
                          {view === "list" && (
                            <div className="flex items-center gap-1">
                              <Check className="h-3.5 w-3.5" />
                              <span>Completed {new Date(novel.completedDate).toLocaleDateString()}</span>
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
            {/* {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <PaginationWithLinks
                  currentPage={page}
                  totalPages={totalPages}
                  baseUrl={`/completed?sort=${sort}&view=${view}${searchQuery ? `&search=${searchQuery}` : ""}${selectedCategory ? `&category=${selectedCategory}` : ""}`}
                />
              </div>
            )} */}
          </>
        )}
      </div>
    </div>
  )
}

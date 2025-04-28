"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, BookOpen, Filter, SortAsc, SortDesc, Grid, List } from "lucide-react"
import { NovelCard } from "../../components/novels/novel-card"
// import { PaginationWithLinks } from "../../components/ui/pagination"
import { cn } from "../../lib/utils"
import { useParams, useSearchParams } from "next/navigation"
import { PaginationWithLinks } from "@/app/components/components/pagination"

// Genre type definition
interface Genre {
  id: string;
  name: string;
  slug: string;
  description: string;
  novelCount: number;
  image: string;
  color: string;
  category: "Combat" | "Setting" | "Theme" | "Character";
  popular: boolean;
  maleAppeal: number; // 1-10 scale of appeal to male audience
}

// Mock data for genres
const genres: Genre[] = [
  {
    id: "1",
    name: "Fantasy",
    slug: "fantasy",
    description: "Immerse yourself in magical worlds where anything is possible. From epic quests to magical creatures, fantasy novels transport you to realms of imagination.",
    novelCount: 1250,
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    color: "#10B981", // emerald-500
    category: "Setting",
    popular: true,
    maleAppeal: 9
  },
  {
    id: "2",
    name: "Action",
    slug: "action",
    description: "Fast-paced stories filled with excitement, danger, and adrenaline. Action novels feature heroes facing physical challenges and high-stakes situations.",
    novelCount: 645,
    image: "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    color: "#EF4444", // red-500
    category: "Combat",
    popular: true,
    maleAppeal: 10
  },
  {
    id: "3",
    name: "Adventure",
    slug: "adventure",
    description: "Follow characters on exciting journeys to unknown places. Adventure novels focus on exploration, discovery, and overcoming obstacles in unfamiliar territories.",
    novelCount: 987,
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    color: "#3B82F6", // blue-500
    category: "Theme",
    popular: true,
    maleAppeal: 9
  },
  {
    id: "4",
    name: "Martial Arts",
    slug: "martial-arts",
    description: "Explore the world of combat disciplines and warrior philosophies. Martial arts novels feature training, tournaments, and the pursuit of combat mastery.",
    novelCount: 345,
    image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    color: "#DC2626", // red-600
    category: "Combat",
    popular: true,
    maleAppeal: 10
  },
  {
    id: "5",
    name: "Sci-Fi",
    slug: "sci-fi",
    description: "Venture into the realm of scientific possibilities and technological wonders. Science fiction novels explore futuristic concepts, space travel, and advanced civilizations.",
    novelCount: 723,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    color: "#8B5CF6", // purple-500
    category: "Setting",
    popular: true,
    maleAppeal: 8
  }
];

// Mock data for novels
const allNovels = [
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
    updatedAt: "2024-04-20",
    chapterCount: 356
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
    description: "Born with the rare ability to communicate with dragons, Lin Feng rises from humble beginnings to become the legendary Dragon Emperor, uniting humans and dragons against an ancient evil.",
    updatedAt: "2023-12-20",
    chapterCount: 412
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
    updatedAt: "2024-01-05",
    chapterCount: 278
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
    description: "A legendary sword that grants immortality to its wielder becomes the center of a centuries-long conflict between martial arts schools. Follow the journey of the blade and those who seek its power.",
    updatedAt: "2023-10-10",
    chapterCount: 324
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
    description: "When demons begin crossing into our world, a reluctant hunter with demon blood in his veins becomes humanity's best hope for survival.",
    updatedAt: "2024-04-15",
    chapterCount: 298
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
    description: "In feudal Japan, a masterless samurai seeks redemption for his past while protecting a village from corrupt officials and ruthless bandits.",
    updatedAt: "2023-04-01",
    chapterCount: 256
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
    description: "Born with the ability to control all five elements, Kai must master his powers and unite the warring elemental tribes before an ancient darkness consumes the world.",
    updatedAt: "2024-04-18",
    chapterCount: 385
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
    description: "A former elite soldier becomes a mercenary after being betrayed by his government, taking on the most dangerous missions across the galaxy while uncovering a plot that threatens all inhabited worlds.",
    updatedAt: "2024-04-10",
    chapterCount: 267
  }
];

export default function GenreDetailPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const genreSlug = decodeURIComponent(Array.isArray(params.genre) ? params.genre[0] : params.genre ?? "")
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
    updatedAt: string;
    chapterCount: number;
  }

  const [novels, setNovels] = useState<Novel[]>([])
  const [loading, setLoading] = useState(true)
  
  const page = parseInt(searchParams.get("page") ?? "1", 10)
  
  const pageSize = parseInt(searchParams.get("pageSize") ?? "10", 10)
  
  const sort = searchParams.get("sort") ?? "popular"
  
  const view = searchParams.get("view") ?? "list"
  
  // Find genre by slug
  const genre = genres.find(g => g.slug === genreSlug)
  
  // Get color classes based on genre color
  const getColorClasses = (color: string) => {
    switch(color) {
      case "#10B981": // emerald-500
        return "from-emerald-500/20 to-emerald-600/20 border-emerald-500/30 text-emerald-400"
      case "#3B82F6": // blue-500
        return "from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-400"
      case "#EF4444": // red-500
      case "#DC2626": // red-600
        return "from-red-500/20 to-red-600/20 border-red-500/30 text-red-400"
      case "#8B5CF6": // purple-500
        return "from-purple-500/20 to-purple-600/20 border-purple-500/30 text-purple-400"
      case "#F59E0B": // amber-500
        return "from-orange-500/20 to-orange-600/20 border-orange-500/30 text-orange-400"
      case "#EC4899": // pink-500
        return "from-pink-500/20 to-pink-600/20 border-pink-500/30 text-pink-400"
      case "#EAB308": // yellow-500
        return "from-yellow-500/20 to-yellow-600/20 border-yellow-500/30 text-yellow-400"
      default:
        return "from-teal-500/20 to-teal-600/20 border-teal-500/30 text-teal-400"
    }
  }
  
  const colorClasses = genre ? getColorClasses(genre.color) : "from-teal-500/20 to-teal-600/20 border-teal-500/30 text-teal-400"
  
  // Fetch novels by genre
  useEffect(() => {
    const fetchNovels = () => {
      setLoading(true)
      
      // In a real app, this would be an API call
      // For now, we'll filter the mock data
      const filteredNovels = allNovels.filter(novel => 
        novel.categories.some((category: string) => 
          category.toLowerCase() === genreSlug.toLowerCase()
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
  }, [genreSlug, page, pageSize, sort])
  
  if (!genre) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-white">Genre not found</h1>
        <p className="mt-2 text-gray-400">The genre you&#39;re looking for doesn&#39;t exist or has been removed.</p>
        <Link 
          href="/genres" 
          className="mt-4 rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600"
        >
          Return to Genres
        </Link>
      </div>
    )
  }
  
  // Get total count of novels with this genre
  const totalCount = allNovels.filter(novel => 
    novel.categories.some((category: string) => 
      category.toLowerCase() === genreSlug.toLowerCase()
    )
  ).length
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/genres" 
            className="mb-4 inline-flex items-center text-sm font-medium text-emerald-400 hover:text-emerald-300"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to all genres
          </Link>
          
          <div className="flex items-center gap-3">
            <div className={cn(
              "flex h-12 w-12 items-center justify-center rounded-lg border bg-gradient-to-br",
              colorClasses
            )}>
              <BookOpen className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-bold text-white">
              {genre.name}
            </h1>
            <span className="rounded-full bg-gray-800 px-3 py-1 text-sm font-medium text-gray-300">
              {totalCount} novels
            </span>
          </div>
          
          <p className="mt-2 text-gray-400">
            {genre.description}
          </p>
        </div>
        
        {/* Filters and Sort */}
        <div className="mb-6 flex flex-col gap-4 rounded-xl bg-gray-800/50 p-4 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <span className="text-sm font-medium text-white">Sort by:</span>
            <Link
              href={`/genres/${params.genre}?sort=popular&view=${view}`}
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
              href={`/genres/${params.genre}?sort=rating&view=${view}`}
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
              href={`/genres/${params.genre}?sort=newest&view=${view}`}
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
              href={`/genres/${params.genre}?sort=oldest&view=${view}`}
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
              href={`/genres/${params.genre}?sort=${sort}&view=grid`}
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
              href={`/genres/${params.genre}?sort=${sort}&view=list`}
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
          <div className="flex h-64 flex-col items-center justify-center rounded-xl bg-gray-800/50 p-6 text-center backdrop-blur-sm">
            <BookOpen className="h-12 w-12 text-gray-500" />
            <h3 className="mt-4 text-xl font-medium text-white">No novels found</h3>
            <p className="mt-2 text-gray-400">
              We couldn&#39;t find any novels in the {genre.name.toLowerCase()} genre
            </p>
            <Link
              href="/genres"
              className="mt-4 rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600"
            >
              Browse all genres
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

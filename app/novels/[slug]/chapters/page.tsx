"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { 
  ChevronRight, 
  Filter, 
  SortAsc, 
  SortDesc, 
  Grid, 
  List as ListIcon, 
  Search,
  BookOpen,
  User,
  Calendar,
  Eye,
  BookMarked
} from "lucide-react"
import { cn } from "../../../lib/utils"
import { useParams, useSearchParams } from "next/navigation"
import { PaginationWithLinks } from "@/app/components/components/pagination"


export default function AllChaptersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const params = useParams()
  const searchParams = useSearchParams()

  const page = parseInt(searchParams.get("page") ?? "1", 10);

  const pageSize = parseInt(searchParams.get("pageSize") ?? "10", 10);

  const sort = searchParams.get("sort") ?? "newest";

  const view = searchParams.get("view") ?? "list";

  // const search = searchParams.get("search") ?? ""
  
  
  // Find novel by slug
  const novel = allNovels.find(novel => novel.slug === params.slug)
  
  if (!novel) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-white">Novel not found</h1>
        <p className="mt-2 text-gray-400">The novel you&#39;re looking for doesn&#39;t exist or has been removed.</p>
        <Link 
          href="/" 
          className="mt-4 rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600"
        >
          Return to Home
        </Link>
      </div>
    )
  }
  
  // Get chapters for this novel
  const novelChapters = allChapters.filter(chapter => chapter.novelSlug === novel.slug)

  console.log("NOVEL CHAPTERS: ", novelChapters)
  
  // Initialize search query from URL parameter
  // useEffect(() => {
  //   setSearchQuery(search)
  // }, [search])
  
  // Fetch and filter chapters
  // useEffect(() => {
  //   const fetchChapters = () => {
  //     setLoading(true)
      
  //     // Filter chapters by search query
  //     let filteredChapters = [...novelChapters]
      
  //     if (searchQuery) {
  //       filteredChapters = filteredChapters.filter(chapter => 
  //         chapter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //         `chapter ${chapter.number}`.includes(searchQuery.toLowerCase())
  //       )
  //     }
      
  //     // Sort chapters based on sort parameter
  //     const sortedChapters = [...filteredChapters].sort((a, b) => {
  //       if (sort === "newest") return b.number - a.number
  //       if (sort === "oldest") return a.number - b.number
  //       return 0
  //     })
      
  //     // Paginate chapters
  //     const start = (page - 1) * pageSize
  //     const end = start + pageSize
  //     const paginatedChapters = sortedChapters.slice(start, end)
      
  //     setChapters(paginatedChapters)
  //     setLoading(false)
  //   }
    
  //   fetchChapters()
  // }, [novelChapters, page, pageSize, sort, searchQuery])
  
  // Calculate reading progress
  const lastReadChapter = 10 // This would come from user data in a real app
  const readingProgress = (lastReadChapter / novelChapters.length) * 100
  
  // Group chapters by volume/arc if applicable
  // const hasVolumes = novelChapters.some(chapter => chapter.volume)
  
  // Get total count of chapters
  const totalCount = searchQuery 
    ? novelChapters.filter(chapter => 
        chapter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        `chapter ${chapter.number}`.includes(searchQuery.toLowerCase())
      ).length
    : novelChapters.length
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex items-center text-sm text-gray-400">
            <Link href="/" className="hover:text-emerald-400">Home</Link>
            <ChevronRight className="mx-2 h-4 w-4" />
            <Link href="/browse" className="hover:text-emerald-400">Browse</Link>
            <ChevronRight className="mx-2 h-4 w-4" />
            <Link href={`/novels/${novel.slug}`} className="hover:text-emerald-400">{novel.title}</Link>
            <ChevronRight className="mx-2 h-4 w-4" />
            <span className="text-emerald-400">All Chapters</span>
          </nav>
        </div>
        
        {/* Novel Header */}
        <div className="relative mb-8 overflow-hidden rounded-xl bg-gradient-to-br from-gray-800/90 to-gray-900 p-6 shadow-xl">
          <div className="absolute inset-0 overflow-hidden opacity-10">
            <Image
              src={novel.coverImage}
              alt={novel.title}
              fill
              className="object-cover blur-sm"
              sizes="100vw"
              priority
            />
          </div>
          
          <div className="relative z-10 flex flex-col gap-6 md:flex-row">
            {/* Cover Image */}
            <div className="relative mx-auto w-32 md:mx-0 md:w-40 flex-shrink-0">
              <div className="aspect-[3/4] overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={novel.coverImage}
                  alt={novel.title}
                  width={160}
                  height={240}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            </div>
            
            {/* Novel Info */}
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-2xl font-bold text-white md:text-3xl">{novel.title}</h1>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1 text-sm text-gray-300">
                    <User className="h-4 w-4 text-emerald-400" />
                    <span>{novel.author}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-300">
                    <BookOpen className="h-4 w-4 text-emerald-400" />
                    <span>{novel.chapterCount} chapters</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-300">
                    <Eye className="h-4 w-4 text-emerald-400" />
                    <span>{novel.views?.toLocaleString() || "N/A"} views</span>
                  </div>
                </div>
              </div>
              
              {/* Reading Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Reading Progress</span>
                  <span className="text-sm font-medium text-emerald-400">{Math.round(readingProgress)}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-700">
                  <div 
                    className="h-full bg-emerald-500" 
                    style={{ width: `${readingProgress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Chapter 1</span>
                  <span>Chapter {novelChapters.length}</span>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Link 
                  href={`/novels/${novel.slug}/chapter/${lastReadChapter + 1}`}
                  className="rounded-full bg-emerald-500 px-6 py-2 text-sm font-medium text-white hover:bg-emerald-600"
                >
                  Continue Reading
                </Link>
                <Link 
                  href={`/novels/${novel.slug}`}
                  className="rounded-full bg-gray-700 px-6 py-2 text-sm font-medium text-white hover:bg-gray-600"
                >
                  Novel Details
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Chapters Section */}
        <div className="rounded-xl bg-gray-800/50 p-6 backdrop-blur-sm">
          {/* Header and Search */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-bold text-white">
              All Chapters
              <span className="ml-2 text-sm font-normal text-gray-400">
                ({totalCount})
              </span>
            </h2>
            
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search chapters..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-gray-700 bg-gray-800 py-1.5 pl-10 pr-4 text-sm text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 sm:w-64"
              />
            </div>
          </div>
          
          {/* Filters and Sort */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <span className="text-sm font-medium text-white">Sort by:</span>
              <Link
                href={`/novels/${novel.slug}/chapters?sort=newest&view=${view}&search=${searchQuery}`}
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
                href={`/novels/${novel.slug}/chapters?sort=oldest&view=${view}&search=${searchQuery}`}
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
                href={`/novels/${novel.slug}/chapters?sort=${sort}&view=list&search=${searchQuery}`}
                className={cn(
                  "rounded-full p-1.5 transition-colors",
                  view === "list"
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                )}
              >
                <ListIcon className="h-4 w-4" />
              </Link>
              <Link
                href={`/novels/${novel.slug}/chapters?sort=${sort}&view=grid&search=${searchQuery}`}
                className={cn(
                  "rounded-full p-1.5 transition-colors",
                  view === "grid"
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                )}
              >
                <Grid className="h-4 w-4" />
              </Link>
            </div>
          </div>
          
          {/* Chapter Jump Navigation */}
          {novelChapters.length > 50 && (
            <div className="mb-6 overflow-x-auto">
              <div className="flex space-x-2 pb-2">
                {Array.from({ length: Math.ceil(novelChapters.length / 50) }).map((_, i) => {
                  const start = i * 50 + 1
                  const end = Math.min((i + 1) * 50, novelChapters.length)
                  return (
                    <Link
                      key={i}
                      href={`/novels/${novel.slug}/chapters?page=${Math.ceil(start / pageSize)}&pageSize=${pageSize}&sort=${sort}&view=${view}&search=${searchQuery}`}
                      className="rounded-md bg-gray-700 px-3 py-1 text-sm text-gray-300 hover:bg-gray-600"
                    >
                      {start}-{end}
                    </Link>
                  )
                })}
              </div>
            </div>
          )}
          
          {/* Chapters List */}
          {
          // loading ? (
          //   <div className="flex h-64 items-center justify-center">
          //     <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-emerald-500"></div>
          //   </div>
          // ) : 
          novelChapters.length > 0 ? (
            <div className={cn(
              "mb-6",
              view === "grid" ? "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3" : "space-y-3"
            )}>
              {novelChapters.map((chapter) => (
                <Link
                  key={chapter.id}
                  href={`/novels/${novel.slug}/chapter/${chapter.number}`}
                  className={cn(
                    "group block",
                    view === "grid" 
                      ? "rounded-lg bg-gray-700/50 p-4 hover:bg-gray-700" 
                      : "rounded-lg bg-gray-700/50 p-3 hover:bg-gray-700"
                  )}
                >
                  <div className={cn(
                    "flex items-center justify-between",
                    view === "grid" && "flex-col gap-2 text-center"
                  )}>
                    <div className={cn(
                      view === "grid" ? "space-y-1" : "flex-1"
                    )}>
                      <h3 className="font-medium text-emerald-400 group-hover:text-emerald-300">
                        {view === "grid" ? (
                          <>Chapter {chapter.number}</>
                        ) : (
                          <>Chapter {chapter.number}: {chapter.title}</>
                        )}
                      </h3>
                      
                      {view === "grid" && (
                        <p className="text-sm text-gray-300 line-clamp-1">{chapter.title}</p>
                      )}
                      
                      <div className={cn(
                        "flex items-center gap-3 text-xs text-gray-400",
                        view === "grid" && "justify-center"
                      )}>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{chapter.releaseDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          <span>{chapter.views?.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    {view === "list" && (
                      <div className="ml-4 flex items-center gap-2">
                        {chapter.isNew && (
                          <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-medium text-emerald-400">
                            NEW
                          </span>
                        )}
                        {chapter.number <= lastReadChapter && (
                          <span className="rounded-full bg-gray-600/50 px-2 py-0.5 text-xs font-medium text-gray-300">
                            READ
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex h-64 flex-col items-center justify-center rounded-xl bg-gray-800/50 p-6 text-center backdrop-blur-sm">
              <BookMarked className="h-12 w-12 text-gray-500" />
              <h3 className="mt-4 text-xl font-medium text-white">No chapters found</h3>
              <p className="mt-2 text-gray-400">
                {searchQuery 
                  ? `We couldn't find any chapters matching "${searchQuery}"`
                  : "This novel doesn't have any chapters yet"
                }
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-4 rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600"
                >
                  Clear Search
                </button>
              )}
            </div>
          )}
          
          {/* Pagination */}
          {novelChapters.length > 0 && (
            <div>
              <PaginationWithLinks
                pageSearchParam="page"
                pageSizeSelectOptions={{
                  pageSizeSearchParam: "pageSize",
                  pageSizeOptions: [10, 20, 50, 100],
                }}
                page={page}
                pageSize={pageSize}
                totalCount={totalCount}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Mock data for all novels
const allNovels = [
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
    views: 125000,
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
    views: 98000,
  },
];

// Mock data for all chapters
const allChapters = [
  // Chapters for "I Am The Madman Of This Family"
  {
    id: "madman-1",
    novelSlug: "madman-family",
    number: 1,
    title: "The Illegitimate Son",
    releaseDate: "Jan 15, 2025",
    views: 12500,
    isNew: false,
  },
  {
    id: "madman-2",
    novelSlug: "madman-family",
    number: 2,
    title: "The Archery Family",
    releaseDate: "Jan 16, 2025",
    views: 11800,
    isNew: false,
  },
  {
    id: "madman-3",
    novelSlug: "madman-family",
    number: 3,
    title: "First Signs of Madness",
    releaseDate: "Jan 17, 2025",
    views: 11200,
    isNew: false,
  },
  {
    id: "madman-4",
    novelSlug: "madman-family",
    number: 4,
    title: "The Regression",
    releaseDate: "Jan 18, 2025",
    views: 10900,
    isNew: false,
  },
  {
    id: "madman-5",
    novelSlug: "madman-family",
    number: 5,
    title: "A New Beginning",
    releaseDate: "Jan 19, 2025",
    views: 10500,
    isNew: false,
  },
  {
    id: "madman-6",
    novelSlug: "madman-family",
    number: 6,
    title: "The First Challenge",
    releaseDate: "Jan 20, 2025",
    views: 10200,
    isNew: false,
  },
  {
    id: "madman-7",
    novelSlug: "madman-family",
    number: 7,
    title: "Unexpected Allies",
    releaseDate: "Jan 21, 2025",
    views: 9800,
    isNew: false,
  },
  {
    id: "madman-8",
    novelSlug: "madman-family",
    number: 8,
    title: "The Family Secret",
    releaseDate: "Jan 22, 2025",
    views: 9500,
    isNew: false,
  },
  {
    id: "madman-9",
    novelSlug: "madman-family",
    number: 9,
    title: "The Rival Clan",
    releaseDate: "Jan 23, 2025",
    views: 9200,
    isNew: false,
  },
  {
    id: "madman-10",
    novelSlug: "madman-family",
    number: 10,
    title: "The First Victory",
    releaseDate: "Jan 24, 2025",
    views: 8900,
    isNew: false,
  },
  {
    id: "madman-11",
    novelSlug: "madman-family",
    number: 11,
    title: "The Archery Tournament",
    releaseDate: "Jan 25, 2025",
    views: 8700,
    isNew: false,
  },
  {
    id: "madman-12",
    novelSlug: "madman-family",
    number: 12,
    title: "Unexpected Developments",
    releaseDate: "Jan 26, 2025",
    views: 8500,
    isNew: false,
  },
  {
    id: "madman-13",
    novelSlug: "madman-family",
    number: 13,
    title: "The Betrayal",
    releaseDate: "Jan 27, 2025",
    views: 8300,
    isNew: false,
  },
  {
    id: "madman-14",
    novelSlug: "madman-family",
    number: 14,
    title: "The Escape",
    releaseDate: "Jan 28, 2025",
    views: 8100,
    isNew: false,
  },
  {
    id: "madman-15",
    novelSlug: "madman-family",
    number: 15,
    title: "The Journey Begins",
    releaseDate: "Jan 29, 2025",
    views: 7900,
    isNew: false,
  },
  {
    id: "madman-16",
    novelSlug: "madman-family",
    number: 16,
    title: "The Mountain Pass",
    releaseDate: "Jan 30, 2025",
    views: 7700,
    isNew: false,
  },
  {
    id: "madman-17",
    novelSlug: "madman-family",
    number: 17,
    title: "The Hidden Village",
    releaseDate: "Jan 31, 2025",
    views: 7500,
    isNew: false,
  },
  {
    id: "madman-18",
    novelSlug: "madman-family",
    number: 18,
    title: "The Old Master",
    releaseDate: "Feb 1, 2025",
    views: 7300,
    isNew: false,
  },
  {
    id: "madman-19",
    novelSlug: "madman-family",
    number: 19,
    title: "The Secret Technique",
    releaseDate: "Feb 2, 2025",
    views: 7100,
    isNew: false,
  },
  {
    id: "madman-20",
    novelSlug: "madman-family",
    number: 20,
    title: "The Return",
    releaseDate: "Feb 3, 2025",
    views: 6900,
    isNew: false,
  },
  {
    id: "madman-21",
    novelSlug: "madman-family",
    number: 21,
    title: "The Confrontation",
    releaseDate: "Feb 4, 2025",
    views: 6700,
    isNew: false,
  },
  {
    id: "madman-22",
    novelSlug: "madman-family",
    number: 22,
    title: "The Family Reunion",
    releaseDate: "Feb 5, 2025",
    views: 6500,
    isNew: false,
  },
  {
    id: "madman-23",
    novelSlug: "madman-family",
    number: 23,
    title: "The New Threat",
    releaseDate: "Feb 6, 2025",
    views: 6300,
    isNew: false,
  },
  {
    id: "madman-24",
    novelSlug: "madman-family",
    number: 24,
    title: "The Alliance",
    releaseDate: "Feb 7, 2025",
    views: 6100,
    isNew: false,
  },
  {
    id: "madman-25",
    novelSlug: "madman-family",
    number: 25,
    title: "The Battle Plan",
    releaseDate: "Feb 8, 2025",
    views: 5900,
    isNew: false,
  },
  {
    id: "madman-26",
    novelSlug: "madman-family",
    number: 26,
    title: "The First Assault",
    releaseDate: "Feb 9, 2025",
    views: 5700,
    isNew: false,
  },
  {
    id: "madman-27",
    novelSlug: "madman-family",
    number: 27,
    title: "The Unexpected Turn",
    releaseDate: "Feb 10, 2025",
    views: 5500,
    isNew: false,
  },
  {
    id: "madman-28",
    novelSlug: "madman-family",
    number: 28,
    title: "The Secret Weapon",
    releaseDate: "Feb 11, 2025",
    views: 5300,
    isNew: false,
  },
  {
    id: "madman-29",
    novelSlug: "madman-family",
    number: 29,
    title: "The Final Showdown",
    releaseDate: "Feb 12, 2025",
    views: 5100,
    isNew: false,
  },
  {
    id: "madman-30",
    novelSlug: "madman-family",
    number: 30,
    title: "The Aftermath",
    releaseDate: "Feb 13, 2025",
    views: 4900,
    isNew: false,
  },
  {
    id: "madman-31",
    novelSlug: "madman-family",
    number: 31,
    title: "New Beginnings",
    releaseDate: "Feb 14, 2025",
    views: 4700,
    isNew: false,
  },
  {
    id: "madman-32",
    novelSlug: "madman-family",
    number: 32,
    title: "The Journey Continues",
    releaseDate: "Feb 15, 2025",
    views: 4500,
    isNew: false,
  },
  {
    id: "madman-33",
    novelSlug: "madman-family",
    number: 33,
    title: "The Ancient City",
    releaseDate: "Feb 16, 2025",
    views: 4300,
    isNew: false,
  },
  {
    id: "madman-34",
    novelSlug: "madman-family",
    number: 34,
    title: "The Lost Artifact",
    releaseDate: "Feb 17, 2025",
    views: 4100,
    isNew: false,
  },
  {
    id: "madman-35",
    novelSlug: "madman-family",
    number: 35,
    title: "The Guardian",
    releaseDate: "Feb 18, 2025",
    views: 3900,
    isNew: false,
  },
  {
    id: "madman-36",
    novelSlug: "madman-family",
    number: 36,
    title: "The Trial",
    releaseDate: "Feb 19, 2025",
    views: 3700,
    isNew: false,
  },
  {
    id: "madman-37",
    novelSlug: "madman-family",
    number: 37,
    title: "The Revelation",
    releaseDate: "Feb 20, 2025",
    views: 3500,
    isNew: false,
  },
  {
    id: "madman-38",
    novelSlug: "madman-family",
    number: 38,
    title: "The True Enemy",
    releaseDate: "Feb 21, 2025",
    views: 3300,
    isNew: false,
  },
  {
    id: "madman-39",
    novelSlug: "madman-family",
    number: 39,
    title: "The Gathering Storm",
    releaseDate: "Feb 22, 2025",
    views: 3100,
    isNew: false,
  },
  {
    id: "madman-40",
    novelSlug: "madman-family",
    number: 40,
    title: "The Final Preparations",
    releaseDate: "Feb 23, 2025",
    views: 2900,
    isNew: false,
  },
  {
    id: "madman-41",
    novelSlug: "madman-family",
    number: 41,
    title: "The Last Stand",
    releaseDate: "Feb 24, 2025",
    views: 2700,
    isNew: false,
  },
  {
    id: "madman-42",
    novelSlug: "madman-family",
    number: 42,
    title: "The Ultimate Sacrifice",
    releaseDate: "Feb 25, 2025",
    views: 2500,
    isNew: false,
  },
  {
    id: "madman-43",
    novelSlug: "madman-family",
    number: 43,
    title: "The New Era",
    releaseDate: "Feb 26, 2025",
    views: 2300,
    isNew: false,
  },
  {
    id: "madman-44",
    novelSlug: "madman-family",
    number: 44,
    title: "The Legacy",
    releaseDate: "Feb 27, 2025",
    views: 2100,
    isNew: false,
  },
  {
    id: "madman-45",
    novelSlug: "madman-family",
    number: 45,
    title: "The Future Awaits",
    releaseDate: "Feb 28, 2025",
    views: 1900,
    isNew: false,
  },
  {
    id: "madman-46",
    novelSlug: "madman-family",
    number: 46,
    title: "The New Beginning",
    releaseDate: "Mar 1, 2025",
    views: 1700,
    isNew: true,
  },
  
  // Chapters for "Industrial Cthulhu"
  {
    id: "cthulhu-1",
    novelSlug: "industrial-cthulhu",
    number: 1,
    title: "The Island",
    releaseDate: "Jan 10, 2025",
    views: 9800,
    isNew: false,
  },
  {
    id: "cthulhu-2",
    novelSlug: "industrial-cthulhu",
    number: 2,
    title: "First Contact",
    releaseDate: "Jan 11, 2025",
    views: 9500,
    isNew: false,
  },
  // More chapters...
];


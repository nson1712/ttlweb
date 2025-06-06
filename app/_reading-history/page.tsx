"use client";

import React, { JSX, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Star,
  BookOpen,
  Heart,
  Share2,
  Bookmark,
  ChevronRight,
  User,
  Calendar,
  SortAsc,
  SortDesc,
  Grid,
  List as ListIcon,
  Search,
  Filter,
  Clock,
  Check,
  Download,
} from 'lucide-react';

import { Badge } from '../components/ui/badge';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../components/ui/tabs';
import { cn } from '../lib/utils';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
// import { PaginationWithLinks } from '../components/components/pagination';

export default function ReadingHistoryPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [isFollowing, setIsFollowing] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [sortBy, setSortBy] = useState("recent");
  const [timeFilter, setTimeFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [view, setView] = useState("list");
  
  // Mock reading history data
  const readingHistory: {
    id: number;
    date: string;
    novel: string;
    novelSlug: string;
    coverImage: string;
    chapter: string;
    chapterNumber: number;
    progress: number;
    status: 'completed' | 'in-progress' | 'bookmarked';
    lastPosition: string;
  }[] = [
    {
      id: 1,
      date: '21.06.2023 - 14:55',
      novel: 'The Shadow Throne',
      novelSlug: 'shadow-throne',
      coverImage: '/1742474407_the-empty-box-and-zeroth-maria.webp',
      chapter: 'Chapter 76: The Awakening',
      chapterNumber: 76,
      progress: 100,
      status: 'completed',
      lastPosition: 'Page 24 of 30'
    },
    {
      id: 2,
      date: '20.06.2023 - 22:30',
      novel: 'Eternal Flames',
      novelSlug: 'eternal-flames',
      coverImage: '/1742474407_the-empty-box-and-zeroth-maria.webp',
      chapter: 'Chapter 103: Reunion',
      chapterNumber: 103,
      progress: 100,
      status: 'completed',
      lastPosition: 'Page 18 of 18'
    },
    {
      id: 3,
      date: '19.06.2023 - 18:15',
      novel: 'Mystic Academy',
      novelSlug: 'mystic-academy',
      coverImage: '/1742474407_the-empty-box-and-zeroth-maria.webp',
      chapter: 'Chapter 42: The Trial',
      chapterNumber: 42,
      progress: 100,
      status: 'completed',
      lastPosition: 'Page 22 of 22'
    },
    {
      id: 4,
      date: '18.06.2023 - 20:45',
      novel: 'Dragon\'s Descent',
      novelSlug: 'dragons-descent',
      coverImage: '/1742474407_the-empty-box-and-zeroth-maria.webp',
      chapter: 'Chapter 15: The Abyss',
      chapterNumber: 15,
      progress: 35,
      status: 'in-progress',
      lastPosition: 'Page 8 of 25'
    },
    {
      id: 5,
      date: '17.06.2023 - 12:20',
      novel: 'The Shadow Throne',
      novelSlug: 'shadow-throne',
      coverImage: '/1742474407_the-empty-box-and-zeroth-maria.webp',
      chapter: 'Chapter 75: Betrayal',
      chapterNumber: 75,
      progress: 100,
      status: 'completed',
      lastPosition: 'Page 20 of 20'
    },
    {
      id: 6,
      date: '16.06.2023 - 23:10',
      novel: 'Celestial Odyssey',
      novelSlug: 'celestial-odyssey',
      coverImage: '/1742474407_the-empty-box-and-zeroth-maria.webp',
      chapter: 'Chapter 8: New Worlds',
      chapterNumber: 8,
      progress: 0,
      status: 'bookmarked',
      lastPosition: 'Not started'
    }
  ];

  // Mock reading stats
  const readingStats = {
    totalNovels: 42,
    totalChapters: 326,
    readingTime: "87h 23m",
    completedNovels: 12,
    inProgressNovels: 8,
    bookmarkedNovels: 22,
    averageRating: 4.2,
    favoriteGenre: "Fantasy",
    readingStreak: 15
  };

  // Function to render status indicator based on reading status
  interface StatusComponentProps {
    status: 'completed' | 'in-progress' | 'bookmarked';
    progress: number;
  }

  const renderStatus = (status: StatusComponentProps['status'], progress: number): JSX.Element | null => {
    switch(status) {
      case 'completed':
        return (
          <div className="flex items-center">
            <div className="bg-green-900/50 p-1 rounded-full mr-2 border border-green-700">
              <Check size={14} className="text-green-500" />
            </div>
            <span className="text-green-500 font-medium">Completed</span>
          </div>
        );
      case 'in-progress':
        return (
          <div className="flex items-center">
            <div className="bg-emerald-900/50 p-1 rounded-full mr-2 border border-blue-700">
              <Clock size={14} className="text-blue-400" />
            </div>
            <span className="text-blue-400">{progress}% Read</span>
          </div>
        );
      case 'bookmarked':
        return (
          <div className="flex items-center">
            <div className="bg-emerald-900/50 p-1 rounded-full mr-2 border border-emerald-700">
              <BookOpen size={14} className="text-emerald-400" />
            </div>
            <span className="text-emerald-400">Bookmarked</span>
          </div>
        );
      default:
        return null;
    }
  };

  // Filter reading history based on active tab
  const filteredHistory = readingHistory.filter(item => {
    if (activeTab === 'all') return true;
    return item.status === activeTab;
  });

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex items-center text-sm text-gray-400">
            <Link href="/" className="hover:text-emerald-400">
              Home
            </Link>
            <ChevronRight className="mx-2 h-4 w-4" />
            <Link href="/profile" className="hover:text-emerald-400">
              Profile
            </Link>
            <ChevronRight className="mx-2 h-4 w-4" />
            <span className="text-emerald-400">Reading History</span>
          </nav>
        </div>

        {/* Reading History Header */}
        <div className="relative mb-8 overflow-hidden rounded-xl bg-gradient-to-br from-gray-800/90 to-gray-900 p-6 shadow-xl">
          <div className="absolute inset-0 overflow-hidden opacity-10 bg-gradient-to-r from-emerald-500 to-teal-600"></div>

          <div className="relative z-10 flex flex-col gap-6 md:flex-row">
            {/* Reading Stats Card */}
            <div className="relative mx-auto w-48 md:mx-0 md:w-56 flex-shrink-0">
              <div className="aspect-[3/4] overflow-hidden rounded-lg shadow-lg bg-gray-700 flex flex-col items-center justify-center p-4">
                <BookOpen className="h-16 w-16 text-emerald-400 mb-2" />
                <h3 className="text-xl font-bold text-white text-center">Reading Stats</h3>
                <div className="mt-4 text-center">
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-white">{readingStats.averageRating.toFixed(1)}</span>
                    <span className="text-gray-300">avg rating</span>
                  </div>
                  <div className="text-sm text-gray-300">
                    <p>{readingStats.readingStreak} day streak</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Reading History Info */}
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-3xl font-bold text-white md:text-4xl">
                  My Reading History
                </h1>
                <div className="mt-2 flex items-center gap-3">
                  <div className="flex items-center gap-1 text-sm text-gray-300">
                    <BookOpen className="h-4 w-4 text-emerald-400" />
                    <span>{readingStats.totalChapters} chapters read</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-300">
                    <Clock className="h-4 w-4 text-emerald-400" />
                    <span>{readingStats.readingTime} total reading time</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-300">
                    <User className="h-4 w-4 text-emerald-400" />
                    <span>{readingStats.totalNovels} novels</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="outline"
                  className="bg-gray-700/50 text-xs text-emerald-300 border-emerald-500/20"
                >
                  {readingStats.favoriteGenre}
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-gray-700/50 text-xs text-emerald-300 border-emerald-500/20"
                >
                  {readingStats.completedNovels} Completed
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-gray-700/50 text-xs text-emerald-300 border-emerald-500/20"
                >
                  {readingStats.inProgressNovels} In Progress
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-gray-700/50 text-xs text-emerald-300 border-emerald-500/20"
                >
                  {readingStats.bookmarkedNovels} Bookmarked
                </Badge>
              </div>

              <p className="text-gray-300">
                Track your reading journey across all novels. View your reading history, manage bookmarks, and see your progress.
              </p>

              <div className="flex flex-wrap gap-3">
                <Button
                  className="rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-2 text-sm font-medium text-white hover:bg-emerald-600"
                >
                  Continue Reading
                </Button>
                <Button
                  className="rounded-full bg-gray-700 px-6 py-2 text-sm font-medium text-white hover:bg-gray-600"
                >
                  View Statistics
                </Button>
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
                    className={cn("h-4 w-4", isFollowing && "fill-emerald-400")}
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
          </div>
        </div>

        {/* Filters and Search */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Tìm kiếm truyện hoặc chương..." 
                  className="pl-10 bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="progress">By Progress</SelectItem>
                  <SelectItem value="title">Novel Title</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Time period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                variant="outline" 
                className="border-gray-700 text-white"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
          
          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-800/70 border border-gray-700 rounded-xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Categories</label>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-gray-700 hover:bg-gray-600 cursor-pointer">Fantasy</Badge>
                    <Badge className="bg-gray-700 hover:bg-gray-600 cursor-pointer">Romance</Badge>
                    <Badge className="bg-gray-700 hover:bg-gray-600 cursor-pointer">Action</Badge>
                    <Badge className="bg-gray-700 hover:bg-gray-600 cursor-pointer">Adventure</Badge>
                    <Badge className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 cursor-pointer">Cultivation</Badge>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Status</label>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-green-500/20 hover:bg-green-500/30 text-green-400 cursor-pointer">Completed</Badge>
                    <Badge className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 cursor-pointer">In Progress</Badge>
                    <Badge className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 cursor-pointer">Bookmarked</Badge>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Date Range</label>
                  <div className="flex gap-2">
                    <Input 
                      type="date" 
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                    <Input 
                      type="date" 
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-4">
                <Button variant="outline" className="mr-2 border-gray-700 text-white">Reset</Button>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Apply Filters</Button>
              </div>
            </div>
          )}
        </div>

        {/* Reading History Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="mb-6 w-full justify-start border-b border-gray-800 bg-transparent p-0">
            <TabsTrigger
              value="all"
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-emerald-500 data-[state=active]:bg-transparent"
            >
              All History
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-emerald-500 data-[state=active]:bg-transparent"
            >
              Completed
            </TabsTrigger>
            <TabsTrigger
              value="in-progress"
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-emerald-500 data-[state=active]:bg-transparent"
            >
              In Progress
            </TabsTrigger>
            <TabsTrigger
              value="bookmarked"
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-emerald-500 data-[state=active]:bg-transparent"
            >
              Bookmarked
            </TabsTrigger>
          </TabsList>

          {/* Reading History Tab Content */}
          <TabsContent value={activeTab} className="mt-0">
            <div className="rounded-xl bg-gray-800/50 p-3 backdrop-blur-sm">
              <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-xl font-bold text-white">
                  Reading History
                  <span className="ml-2 text-sm font-normal text-gray-400">
                    ({filteredHistory.length})
                  </span>
                </h2>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 rounded-lg bg-gray-700 p-1">
                    <button
                      onClick={() => setSortBy("recent")}
                      className={cn(
                        "rounded-md px-3 py-1 text-sm",
                        sortBy === "recent"
                          ? "bg-gray-600 text-white"
                          : "text-gray-300 hover:bg-gray-600/50"
                      )}
                    >
                      <SortDesc className="mr-1 h-3 w-3 inline" />
                      Newest
                    </button>
                    <button
                      onClick={() => setSortBy("oldest")}
                      className={cn(
                        "rounded-md px-3 py-1 text-sm",
                        sortBy === "oldest"
                          ? "bg-gray-600 text-white"
                          : "text-gray-300 hover:bg-gray-600/50"
                      )}
                    >
                      <SortAsc className="mr-1 h-3 w-3 inline" />
                      Oldest
                    </button>
                  </div>

                  <div className="flex items-center gap-1 rounded-lg bg-gray-700 p-1">
                    <button
                      onClick={() => setView("list")}
                      className={cn(
                        "rounded-md p-1.5",
                        view === "list"
                          ? "bg-gray-600 text-white"
                          : "text-gray-300 hover:bg-gray-600/50"
                      )}
                    >
                      <ListIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setView("grid")}
                      className={cn(
                        "rounded-md p-1.5",
                        view === "grid"
                          ? "bg-gray-600 text-white"
                          : "text-gray-300 hover:bg-gray-600/50"
                      )}
                    >
                      <Grid className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Reading History List */}
              <div
                className={cn(
                  "mb-6",
                  view === "grid"
                    ? "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
                    : "space-y-3"
                )}
              >
                {filteredHistory.map((item) => (
                  <div
                    key={item.id}
                    className={cn(
                      "group",
                      view === "grid"
                        ? "rounded-lg bg-gray-700/50 p-4 hover:bg-gray-700"
                        : "rounded-lg bg-gray-700/50 p-3 hover:bg-gray-700"
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-center",
                        view === "grid" ? "flex-col gap-2 text-center" : "justify-between"
                      )}
                    >
                      {view === "list" && (
                        <div className="flex items-center gap-3">
                          <div className="relative h-16 w-12 flex-shrink-0 overflow-hidden rounded-md">
                            <Image
                              src={item.coverImage || "/placeholder-cover.jpg"}
                              alt={item.novel}
                              width={48}
                              height={64}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <Link href={`/novels/${item.novelSlug}`}>
                              <h3 className="font-medium text-emerald-400 group-hover:text-emerald-300">
                                {item.novel}
                              </h3>
                            </Link>
                            <Link href={`/novels/${item.novelSlug}/${item.chapterNumber}`}>
                              <p className="text-sm text-gray-300">{item.chapter}</p>
                            </Link>
                            <div className="mt-1 flex items-center gap-3 text-xs text-gray-400">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                <span>{item.date}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{item.lastPosition}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {view === "grid" && (
                        <>
                          <div className="relative h-24 w-16 flex-shrink-0 overflow-hidden rounded-md mx-auto">
                            <Image
                              src={item.coverImage || "/placeholder-cover.jpg"}
                              alt={item.novel}
                              width={64}
                              height={96}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="text-center">
                            <Link href={`/novels/${item.novelSlug}`}>
                              <h3 className="font-medium text-emerald-400 group-hover:text-emerald-300 line-clamp-1">
                                {item.novel}
                              </h3>
                            </Link>
                            <Link href={`/novels/${item.novelSlug}/${item.chapterNumber}`}>
                              <p className="text-sm text-gray-300 line-clamp-1">{item.chapter}</p>
                            </Link>
                            <div className="mt-1 flex flex-col items-center justify-center text-xs text-gray-400">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                <span>{item.date}</span>
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      <div className={view === "grid" ? "mt-2" : ""}>
                        {renderStatus(item.status, item.progress)}
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-2 w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Pagination */}
        {/* <div className="mt-8 flex justify-center">
          <PaginationWithLinks 
            currentPage={1}
            totalPages={10}
            baseUrl="/reading-history"
          />
        </div> */}
      </div>
    </div>
  );
}

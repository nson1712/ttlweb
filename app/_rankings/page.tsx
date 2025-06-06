"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Star,
  TrendingUp,
  Clock,
  Flame,
  Award,
  Filter,
  Search,
  ChevronDown,
  Calendar,
  BookOpen,
  Users,
  BarChart4,
  Heart,
  // ThumbsUp,
  ArrowUpDown,
  ArrowDown,
  ArrowUp,
} from "lucide-react";
import { cn } from "@/app/lib/utils";

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
  views?: number;
  followers?: number;
  lastUpdated?: string;
  chapterCount?: number;
}

export default function RankingsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("power");
  const [timeRange, setTimeRange] = useState<string>("all-time");
  const [genre, setGenre] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("rank");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  // Filter novels based on search query and genre
  const filterNovels = (novels: RankingNovelProps[]) => {
    let filtered = novels;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (novel) =>
          novel.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          novel.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          novel.categories.some((category) =>
            category.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    // Filter by genre
    if (genre !== "all") {
      filtered = filtered.filter((novel) =>
        novel.categories.some(
          (category) => category.toLowerCase() === genre.toLowerCase()
        )
      );
    }

    // Sort novels
    filtered = [...filtered].sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "rank":
          comparison = a.rank - b.rank;
          break;
        case "title":
          comparison = a.title.localeCompare(b.title);
          break;
        case "rating":
          comparison = b.rating - a.rating;
          break;
        case "views":
          comparison = (b.views || 0) - (a.views || 0);
          break;
        case "followers":
          comparison = (b.followers || 0) - (a.followers || 0);
          break;
        case "updated":
          // This is a simplified sort for the mock data
          // In a real app, you'd parse dates properly
          comparison = (a.lastUpdated || "").localeCompare(b.lastUpdated || "");
          break;
        default:
          comparison = a.rank - b.rank;
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });

    return filtered;
  };

  // Get novels based on active category
  const getNovelsByCategory = () => {
    switch (activeCategory) {
      case "power":
        return filterNovels(powerRankingNovels);
      case "collection":
        return filterNovels(collectionRankingNovels);
      case "trending":
        return filterNovels(trendingNovels);
      case "rating":
        return filterNovels(ratingRankingNovels);
      case "popular":
        return filterNovels(popularNovels);
      case "new":
        return filterNovels(newReleasesNovels);
      case "completed":
        return filterNovels(completedNovels);
      default:
        return filterNovels(powerRankingNovels);
    }
  };

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "power":
        return <TrendingUp className="h-5 w-5" />;
      case "collection":
        return <Heart className="h-5 w-5" />;
      case "trending":
        return <Flame className="h-5 w-5" />;
      case "rating":
        return <Star className="h-5 w-5" />;
      case "popular":
        return <Users className="h-5 w-5" />;
      case "new":
        return <Calendar className="h-5 w-5" />;
      case "completed":
        return <BookOpen className="h-5 w-5" />;
      default:
        return <TrendingUp className="h-5 w-5" />;
    }
  };

  // Get category title
  const getCategoryTitle = (category: string) => {
    switch (category) {
      case "power":
        return "Power Ranking";
      case "collection":
        return "Collection Ranking";
      case "trending":
        return "Trending Now";
      case "rating":
        return "Highest Rated";
      case "popular":
        return "Most Popular";
      case "new":
        return "New Releases";
      case "completed":
        return "Completed Novels";
      default:
        return "Power Ranking";
    }
  };

  // Get time range title
  const getTimeRangeTitle = (range: string) => {
    switch (range) {
      case "daily":
        return "Daily";
      case "weekly":
        return "Weekly";
      case "monthly":
        return "Monthly";
      case "yearly":
        return "Yearly";
      case "all-time":
        return "All Time";
      default:
        return "All Time";
    }
  };

  // Toggle sort order
  const toggleSortOrder = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  // Get sort icon
  const getSortIcon = (field: string) => {
    if (sortBy !== field) {
      return <ArrowUpDown className="h-4 w-4 text-gray-500" />;
    }

    return sortOrder === "asc" ? (
      <ArrowUp className="h-4 w-4 text-emerald-400" />
    ) : (
      <ArrowDown className="h-4 w-4 text-emerald-400" />
    );
  };

  const novels = getNovelsByCategory();

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <Award className="h-6 w-6 text-emerald-400" />
            <h1 className="text-3xl font-bold text-white">Novel Rankings</h1>
          </div>
          <p className="mt-2 text-gray-400">
            Discover the most popular and highest-rated novels across different
            categories
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            {/* Search Bar */}
            <div className="relative flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Tìm kiếm truyện theo tên, tác giả, hoặc thể loại..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-700 bg-gray-800 py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white hover:bg-gray-700"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  showFilters && "rotate-180"
                )}
              />
            </button>

            {/* View Mode Toggle */}
            <div className="flex rounded-lg border border-gray-700 bg-gray-800">
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 transition-colors",
                  viewMode === "list"
                    ? "bg-emerald-500 text-white"
                    : "text-gray-300 hover:bg-gray-700"
                )}
              >
                <BarChart4 className="h-5 w-5" />
                <span className="hidden sm:inline">List</span>
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 transition-colors",
                  viewMode === "grid"
                    ? "bg-emerald-500 text-white"
                    : "text-gray-300 hover:bg-gray-700"
                )}
              >
                <div className="grid grid-cols-2 gap-0.5">
                  <div className="h-1.5 w-1.5 rounded-sm bg-current"></div>
                  <div className="h-1.5 w-1.5 rounded-sm bg-current"></div>
                  <div className="h-1.5 w-1.5 rounded-sm bg-current"></div>
                  <div className="h-1.5 w-1.5 rounded-sm bg-current"></div>
                </div>
                <span className="hidden sm:inline">Grid</span>
              </button>
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="rounded-lg border border-gray-700 bg-gray-800 p-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {/* Time Range Filter */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Time Range
                  </label>
                  <select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="w-full rounded-lg border border-gray-700 bg-gray-700 px-3 py-2 text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                    <option value="all-time">All Time</option>
                  </select>
                </div>

                {/* Genre Filter */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Genre
                  </label>
                  <select
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="w-full rounded-lg border border-gray-700 bg-gray-700 px-3 py-2 text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="all">All Genres</option>
                    <option value="fantasy">Fantasy</option>
                    <option value="sci-fi">Sci-Fi</option>
                    <option value="action">Action</option>
                    <option value="adventure">Adventure</option>
                    <option value="romance">Romance</option>
                    <option value="mystery">Mystery</option>
                    <option value="horror">Horror</option>
                    <option value="thriller">Thriller</option>
                    <option value="historical">Historical</option>
                    <option value="comedy">Comedy</option>
                  </select>
                </div>

                {/* Status Filter */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Status
                  </label>
                  <select className="w-full rounded-lg border border-gray-700 bg-gray-700 px-3 py-2 text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500">
                    <option value="all">All Status</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                    <option value="hiatus">On Hiatus</option>
                  </select>
                </div>

                {/* Sort By Filter */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value);
                      setSortOrder("asc");
                    }}
                    className="w-full rounded-lg border border-gray-700 bg-gray-700 px-3 py-2 text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="rank">Rank</option>
                    <option value="title">Title</option>
                    <option value="rating">Rating</option>
                    <option value="views">Views</option>
                    <option value="followers">Followers</option>
                    <option value="updated">Last Updated</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Ranking Categories */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex min-w-max space-x-2">
            {[
              "power",
              "collection",
              "trending",
              "rating",
              "popular",
              "new",
              "completed",
            ].map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  activeCategory === category
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                )}
              >
                {getCategoryIcon(category)}
                <span>{getCategoryTitle(category)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Current Category Info */}
        <div className="mb-6 flex flex-col justify-between gap-4 rounded-xl bg-gray-800/50 p-6 backdrop-blur-sm sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              {getCategoryIcon(activeCategory)}
              <h2 className="text-2xl font-bold text-white">
                {getCategoryTitle(activeCategory)}
              </h2>
            </div>
            <p className="mt-1 text-gray-400">
              {activeCategory === "power" &&
                "Novels ranked by a combination of popularity, rating, and activity"}
              {activeCategory === "collection" &&
                "Novels with the most bookmarks and collections"}
              {activeCategory === "trending" &&
                "Novels gaining popularity rapidly"}
              {activeCategory === "rating" &&
                "Novels with the highest average ratings"}
              {activeCategory === "popular" &&
                "Novels with the most views and readers"}
              {activeCategory === "new" &&
                "Recently added novels gaining attention"}
              {activeCategory === "completed" &&
                "Finished novels with complete stories"}
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-lg bg-gray-700/50 px-4 py-2">
            <Clock className="h-5 w-5 text-emerald-400" />
            <span className="text-sm font-medium text-white">
              {getTimeRangeTitle(timeRange)}
            </span>
          </div>
        </div>

        {/* Table Header (List View) */}
        {viewMode === "list" && novels.length > 0 && (
          <div className="hidden rounded-t-lg bg-gray-800 text-sm font-medium text-gray-300 md:grid md:grid-cols-12 md:gap-4 md:px-6 md:py-3">
            <div className="col-span-1 flex items-center gap-1">
              <span>Rank</span>
            </div>
            <div className="col-span-5 flex items-center gap-1">
              <span>Novel</span>
            </div>
            <div
              className="col-span-1 flex items-center gap-1 cursor-pointer"
              onClick={() => toggleSortOrder("rating")}
            >
              <span>Rating</span>
              {getSortIcon("rating")}
            </div>
            <div
              className="col-span-1 flex items-center gap-1 cursor-pointer"
              onClick={() => toggleSortOrder("views")}
            >
              <span>Views</span>
              {getSortIcon("views")}
            </div>
            <div
              className="col-span-1 flex items-center gap-1 cursor-pointer"
              onClick={() => toggleSortOrder("followers")}
            >
              <span>Followers</span>
              {getSortIcon("followers")}
            </div>
            <div
              className="col-span-2 flex items-center gap-1 cursor-pointer"
              onClick={() => toggleSortOrder("updated")}
            >
              <span>Last Updated</span>
              {getSortIcon("updated")}
            </div>
            <div className="col-span-1 flex items-center gap-1">
              <span>Chapters</span>
            </div>
          </div>
        )}

        {/* Ranking List or Grid */}
        {novels.length > 0 ? (
          <div
            className={cn(
              viewMode === "grid" &&
                "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            )}
          >
            {novels.map((novel) =>
              viewMode === "list" ? (
                <RankingNovelListItem key={novel.id} {...novel} />
              ) : (
                <RankingNovelGridItem key={novel.id} {...novel} />
              )
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl bg-gray-800/50 p-12 text-center backdrop-blur-sm">
            <div className="mb-4 rounded-full bg-gray-700 p-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-white">No novels found</h3>
            <p className="mt-2 text-gray-400">
              Try adjusting your search or filters to find what you&apos;re
              looking for
            </p>
          </div>
        )}

        {/* Pagination */}
        {novels.length > 0 && (
          <div className="mt-8 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700">
                Previous
              </button>
              <button className="rounded-lg bg-emerald-500 px-3 py-2 text-sm font-medium text-white">
                1
              </button>
              <button className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700">
                2
              </button>
              <button className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700">
                3
              </button>
              <span className="text-gray-500">...</span>
              <button className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700">
                10
              </button>
              <button className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700">
                Next
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}

function RankingNovelListItem({
  id,
  slug,
  title,
  coverImage,
  author,
  rating,
  totalRatings,
  categories,
  rank,
  views,
  followers,
  lastUpdated,
  chapterCount,
}: RankingNovelProps) {
  return (
    <Link href={`/novels/${slug}`} key={id}>
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="group relative mb-2 grid grid-cols-1 items-center gap-4 rounded-lg bg-gray-800/80 p-4 hover:bg-gray-800 md:grid-cols-12"
      >
        {/* Rank */}
        <div className="col-span-1 flex items-center">
          <div
            className={cn(
              "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-lg font-bold",
              rank <= 3
                ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
                : "bg-gray-700 text-gray-300"
            )}
          >
            {rank}
          </div>
        </div>

        {/* Novel Info */}
        <div className="col-span-5 flex items-center gap-4">
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
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
              {categories
                .map((category, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-gray-700 px-2 py-0.5 text-gray-300"
                  >
                    {category}
                  </span>
                ))
                .slice(0, 2)}
              {categories.length > 2 && (
                <span className="text-gray-500">+{categories.length - 2}</span>
              )}
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="col-span-1 hidden items-center md:flex">
          <div className="flex items-center text-yellow-400">
            <Star className="mr-1 h-4 w-4 fill-yellow-400" />
            <span>{rating.toFixed(1)}</span>
            <span className="ml-1 text-xs text-gray-500">({totalRatings})</span>
          </div>
        </div>

        {/* Views */}
        <div className="col-span-1 hidden items-center text-gray-300 md:flex">
          {views ? views.toLocaleString() : "-"}
        </div>

        {/* Followers */}
        <div className="col-span-1 hidden items-center text-gray-300 md:flex">
          {followers ? followers.toLocaleString() : "-"}
        </div>

        {/* Last Updated */}
        <div className="col-span-2 hidden items-center text-gray-300 md:flex">
          {lastUpdated || "-"}
        </div>

        {/* Chapters */}
        <div className="col-span-1 hidden items-center text-gray-300 md:flex">
          {chapterCount || "-"}
        </div>

        {/* Mobile Stats (visible on small screens) */}
        <div className="col-span-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-400 md:hidden">
          <span className="flex items-center">
            <Star className="mr-1 h-3.5 w-3.5 text-yellow-400" />
            <span>{rating.toFixed(1)}</span>
          </span>

          {views && (
            <span className="flex items-center">
              <BookOpen className="mr-1 h-3.5 w-3.5" />
              <span>
                {views >= 1000000
                  ? `${(views / 1000000).toFixed(1)}M`
                  : views >= 1000
                  ? `${(views / 1000).toFixed(1)}K`
                  : views}
              </span>
            </span>
          )}

          {chapterCount && (
            <span className="flex items-center">
              <BookOpen className="mr-1 h-3.5 w-3.5" />
              <span>{chapterCount} ch</span>
            </span>
          )}

          {lastUpdated && (
            <span className="flex items-center">
              <Calendar className="mr-1 h-3.5 w-3.5" />
              <span>{lastUpdated}</span>
            </span>
          )}
        </div>
      </motion.div>
    </Link>
  );
}

function RankingNovelGridItem({
  id,
  slug,
  title,
  coverImage,
  author,
  rating,
  totalRatings,
  categories,
  rank,
  views,
  // followers,
  lastUpdated,
  chapterCount,
}: RankingNovelProps) {
  return (
    <Link href={`/novels/${slug}`} key={id}>
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="group relative flex flex-col overflow-hidden rounded-lg bg-gray-800/80 hover:bg-gray-800"
      >
        {/* Rank Badge */}
        <div
          className={cn(
            "absolute left-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold",
            rank <= 3
              ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
              : "bg-gray-700 text-gray-300"
          )}
        >
          {rank}
        </div>

        {/* Cover Image */}
        <div className="relative aspect-[2/3] w-full overflow-hidden">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>

          {/* Categories */}
          <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
            {categories.slice(0, 2).map((category, index) => (
              <span
                key={index}
                className="rounded-full bg-gray-800/80 px-2 py-0.5 text-xs text-gray-300 backdrop-blur-sm"
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        {/* Novel Info */}
        <div className="flex flex-1 flex-col p-4">
          <h3 className="line-clamp-1 text-lg font-medium text-emerald-400 group-hover:text-emerald-300">
            {title}
          </h3>
          <p className="text-sm text-gray-400">{author}</p>

          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center text-yellow-400">
              <Star className="mr-1 h-4 w-4 fill-yellow-400" />
              <span>{rating.toFixed(1)}</span>
              <span className="ml-1 text-xs text-gray-500">
                ({totalRatings})
              </span>
            </div>

            {chapterCount && (
              <span className="flex items-center text-xs text-gray-400">
                <BookOpen className="mr-1 h-3.5 w-3.5" />
                <span>{chapterCount} ch</span>
              </span>
            )}
          </div>

          {/* Stats */}
          <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
            {views && (
              <span className="flex items-center">
                <BookOpen className="mr-1 h-3.5 w-3.5" />
                <span>
                  {views >= 1000000
                    ? `${(views / 1000000).toFixed(1)}M`
                    : views >= 1000
                    ? `${(views / 1000).toFixed(1)}K`
                    : views}
                </span>
              </span>
            )}

            {lastUpdated && (
              <span className="flex items-center">
                <Calendar className="mr-1 h-3.5 w-3.5" />
                <span>{lastUpdated}</span>
              </span>
            )}
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
      "/1744419978_blood-eagle.webp",
    author: "Guiltythree",
    rating: 4.7,
    totalRatings: 769,
    categories: ["Fantasy", "Action", "Adventure"],
    rank: 1,
    views: 1245789,
    followers: 87654,
    lastUpdated: "2 days ago",
    chapterCount: 1245,
  },
  {
    id: "legendary-beast-master",
    slug: "legendary-beast-master",
    title: "The First Legendary Beast Master",
    coverImage:
      "/1744419978_blood-eagle.webp",
    author: "Frost Blade",
    rating: 4.5,
    totalRatings: 523,
    categories: ["Fantasy", "Adventure", "Action"],
    rank: 2,
    views: 987654,
    followers: 65432,
    lastUpdated: "1 day ago",
    chapterCount: 876,
  },
  {
    id: "supreme-magus",
    slug: "supreme-magus",
    title: "Supreme Magus",
    coverImage:
      "/1744419978_blood-eagle.webp",
    author: "Legion20",
    rating: 4.8,
    totalRatings: 612,
    categories: ["Fantasy", "Adventure", "Magic"],
    rank: 3,
    views: 876543,
    followers: 54321,
    lastUpdated: "3 days ago",
    chapterCount: 1543,
  },
  {
    id: "cultivation-online",
    slug: "cultivation-online",
    title: "Cultivation Online",
    coverImage:
      "/1744419978_blood-eagle.webp",
    author: "MyLittleBrother",
    rating: 4.8,
    totalRatings: 487,
    categories: ["Games", "Adventure", "Fantasy"],
    rank: 4,
    views: 765432,
    followers: 43210,
    lastUpdated: "5 days ago",
    chapterCount: 987,
  },
  {
    id: "mech-touch",
    slug: "mech-touch",
    title: "The Mech Touch",
    coverImage:
      "/1744419978_blood-eagle.webp",
    author: "Exlor",
    rating: 4.6,
    totalRatings: 398,
    categories: ["Sci-fi", "Adventure", "Mecha"],
    rank: 5,
    views: 654321,
    followers: 32109,
    lastUpdated: "1 week ago",
    chapterCount: 1876,
  },
  {
    id: "lord-mysteries",
    slug: "lord-mysteries",
    title: "Lord of the Mysteries",
    coverImage:
      "/1744419978_blood-eagle.webp",
    author: "Cuttlefish That Loves Diving",
    rating: 4.9,
    totalRatings: 853,
    categories: ["Fantasy", "Mystery", "Supernatural"],
    rank: 6,
    views: 543210,
    followers: 21098,
    lastUpdated: "2 weeks ago",
    chapterCount: 1430,
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
    rank: 7,
    views: 432109,
    followers: 10987,
    lastUpdated: "3 weeks ago",
    chapterCount: 1465,
  },
  {
    id: "omniscient-reader",
    slug: "omniscient-reader",
    title: "Omniscient Reader's Viewpoint",
    coverImage:
      "/1744419978_blood-eagle.webp",
    author: "Sing-Shong",
    rating: 4.8,
    totalRatings: 689,
    categories: ["Fantasy", "Adventure", "Apocalypse"],
    rank: 8,
    views: 321098,
    followers: 9876,
    lastUpdated: "1 month ago",
    chapterCount: 551,
  },
  {
    id: "second-coming-gluttony",
    slug: "second-coming-gluttony",
    title: "The Second Coming of Gluttony",
    coverImage:
      "/1744419978_blood-eagle.webp",
    author: "Ro Yu-jin",
    rating: 4.7,
    totalRatings: 578,
    categories: ["Fantasy", "Adventure", "Action"],
    rank: 9,
    views: 210987,
    followers: 8765,
    lastUpdated: "1 month ago",
    chapterCount: 490,
  },
  {
    id: "reverend-insanity",
    slug: "reverend-insanity",
    title: "Reverend Insanity",
    coverImage:
      "/1744419978_blood-eagle.webp",
    author: "Gu Zhen Ren",
    rating: 4.6,
    totalRatings: 456,
    categories: ["Fantasy", "Cultivation", "Villain"],
    rank: 10,
    views: 109876,
    followers: 7654,
    lastUpdated: "2 months ago",
    chapterCount: 2334,
  },
];

// Mock data for collection ranking novels
const collectionRankingNovels = [
  {
    id: "shadow-slave-2",
    slug: "shadow-slave-2",
    title: "Shadow Slave",
    coverImage:
      "/1744419978_blood-eagle.webp",
    author: "Guiltythree",
    rating: 4.7,
    totalRatings: 769,
    categories: ["Fantasy", "Action", "Adventure"],
    rank: 1,
    views: 1245789,
    followers: 87654,
    lastUpdated: "2 days ago",
    chapterCount: 1245,
  },
  {
    id: "beast-tamer",
    slug: "beast-tamer",
    title: "Weakest Beast Tamer Gets All SSS Dragons",
    coverImage:
      "/1744419978_blood-eagle.webp",
    author: "Dragon Lover",
    rating: 4.6,
    totalRatings: 612,
    categories: ["Fantasy", "Adventure", "Action"],
    rank: 2,
    views: 987654,
    followers: 65432,
    lastUpdated: "1 day ago",
    chapterCount: 876,
  },
  {
    id: "legendary-beast-master-2",
    slug: "legendary-beast-master-2",
    title: "The First Legendary Beast Master",
    coverImage:
      "/1744419978_blood-eagle.webp",
    author: "Frost Blade",
    rating: 4.5,
    totalRatings: 523,
    categories: ["Fantasy", "Adventure", "Action"],
    rank: 3,
    views: 876543,
    followers: 54321,
    lastUpdated: "3 days ago",
    chapterCount: 1543,
  },
];

// Mock data for trending novels
const trendingNovels = [
  {
    id: "dimensional-storekeeper",
    slug: "dimensional-storekeeper",
    title: "Dimensional Storekeeper",
    coverImage:
      "/1726838702_reborn-as-my-love-rivals-wife.webp",
    author: "Dimension Walker",
    rating: 4.7,
    totalRatings: 321,
    categories: ["Fantasy", "Adventure", "System"],
    rank: 1,
    views: 765432,
    followers: 43210,
    lastUpdated: "5 days ago",
    chapterCount: 987,
  },
  {
    id: "timeless-assassin",
    slug: "timeless-assassin",
    title: "Timeless Assassin",
    coverImage:
      "/1726838702_reborn-as-my-love-rivals-wife.webp",
    author: "Solver Keter",
    rating: 4.8,
    totalRatings: 287,
    categories: ["Fantasy", "Adventure", "Action"],
    rank: 2,
    views: 654321,
    followers: 32109,
    lastUpdated: "1 week ago",
    chapterCount: 1876,
  },
];

// Mock data for rating ranking novels
const ratingRankingNovels = [
  {
    id: "lord-mysteries-2",
    slug: "lord-mysteries-2",
    title: "Lord of the Mysteries",
    coverImage:
      "/1744419978_blood-eagle.webp",
    author: "Cuttlefish That Loves Diving",
    rating: 4.9,
    totalRatings: 853,
    categories: ["Fantasy", "Mystery", "Supernatural"],
    rank: 1,
    views: 543210,
    followers: 21098,
    lastUpdated: "2 weeks ago",
    chapterCount: 1430,
  },
  {
    id: "cultivation-online-2",
    slug: "cultivation-online-2",
    title: "Cultivation Online",
    coverImage:
      "/1744419978_blood-eagle.webp",
    author: "MyLittleBrother",
    rating: 4.8,
    totalRatings: 487,
    categories: ["Games", "Adventure", "Fantasy"],
    rank: 2,
    views: 432109,
    followers: 10987,
    lastUpdated: "3 weeks ago",
    chapterCount: 1465,
  },
];

// Mock data for popular novels
const popularNovels = [
  {
    id: "shadow-slave-3",
    slug: "shadow-slave-3",
    title: "Shadow Slave",
    coverImage:
      "/1744419978_blood-eagle.webp",
    author: "Guiltythree",
    rating: 4.7,
    totalRatings: 769,
    categories: ["Fantasy", "Action", "Adventure"],
    rank: 1,
    views: 1245789,
    followers: 87654,
    lastUpdated: "2 days ago",
    chapterCount: 1245,
  },
  {
    id: "legendary-beast-master-3",
    slug: "legendary-beast-master-3",
    title: "The First Legendary Beast Master",
    coverImage:
      "/1744419978_blood-eagle.webp",
    author: "Frost Blade",
    rating: 4.5,
    totalRatings: 523,
    categories: ["Fantasy", "Adventure", "Action"],
    rank: 2,
    views: 987654,
    followers: 65432,
    lastUpdated: "1 day ago",
    chapterCount: 876,
  },
];

// Mock data for new releases novels
const newReleasesNovels = [
  {
    id: "dimensional-storekeeper-2",
    slug: "dimensional-storekeeper-2",
    title: "Dimensional Storekeeper",
    coverImage:
      "/1744419978_blood-eagle.webp",
    author: "Dimension Walker",
    rating: 4.7,
    totalRatings: 321,
    categories: ["Fantasy", "Adventure", "System"],
    rank: 1,
    views: 765432,
    followers: 43210,
    lastUpdated: "5 days ago",
    chapterCount: 987,
  },
  {
    id: "timeless-assassin-2",
    slug: "timeless-assassin-2",
    title: "Timeless Assassin",
    coverImage:
      "/1744419978_blood-eagle.webp",
    author: "Solver Keter",
    rating: 4.8,
    totalRatings: 287,
    categories: ["Fantasy", "Adventure", "Action"],
    rank: 2,
    views: 654321,
    followers: 32109,
    lastUpdated: "1 week ago",
    chapterCount: 1876,
  },
];

// Mock data for completed novels
const completedNovels = [
  {
    id: "omniscient-reader-2",
    slug: "omniscient-reader-2",
    title: "Omniscient Reader's Viewpoint",
    coverImage:
      "/1744419978_blood-eagle.webp",
    author: "Sing-Shong",
    rating: 4.8,
    totalRatings: 689,
    categories: ["Fantasy", "Adventure", "Apocalypse"],
    rank: 1,
    views: 321098,
    followers: 9876,
    lastUpdated: "1 month ago",
    chapterCount: 551,
  },
  {
    id: "second-coming-gluttony-2",
    slug: "second-coming-gluttony-2",
    title: "The Second Coming of Gluttony",
    coverImage:
      "/1744419978_blood-eagle.webp",
    author: "Ro Yu-jin",
    rating: 4.7,
    totalRatings: 578,
    categories: ["Fantasy", "Adventure", "Action"],
    rank: 2,
    views: 210987,
    followers: 8765,
    lastUpdated: "1 month ago",
    chapterCount: 490,
  },
];

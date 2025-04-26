"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search, Filter, Grid, List, ChevronDown, X, BookOpen } from "lucide-react";
import { cn } from "../lib/utils";

// Genre type definition
interface Genre {
  id: string;
  name: string;
  slug: string;
  description: string;
  novelCount: number;
  image: string;
  color: string;
  category: "Origin" | "Theme" | "Setting" | "Genre";
  popular: boolean;
}

export default function GenreCatalogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  // Filter genres based on search query and category
  const filteredGenres = genres.filter(genre => {
    const matchesSearch = genre.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         genre.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || genre.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  // Group genres by category for the list view
  const genresByCategory = filteredGenres.reduce((acc, genre) => {
    if (!acc[genre.category]) {
      acc[genre.category] = [];
    }
    acc[genre.category].push(genre);
    return acc;
  }, {} as Record<string, Genre[]>);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 p-8 mb-8">
          <div className="absolute inset-0 opacity-20">
            <Image
              src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
              alt="Books background"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Genre Catalog</h1>
            <p className="text-gray-300 max-w-2xl">
              Explore our extensive collection of novels across various genres, themes, settings, and origins.
              Find your next favorite read by browsing categories that match your interests.
            </p>
          </div>
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
                placeholder="Search genres..."
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
              <ChevronDown className={cn(
                "h-4 w-4 transition-transform",
                showFilters && "rotate-180"
              )} />
            </button>

            {/* View Mode Toggle */}
            <div className="flex rounded-lg border border-gray-700 bg-gray-800">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 transition-colors",
                  viewMode === "grid"
                    ? "bg-emerald-500 text-white"
                    : "text-gray-300 hover:bg-gray-700"
                )}
              >
                <Grid className="h-5 w-5" />
                <span className="hidden sm:inline">Grid</span>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 transition-colors",
                  viewMode === "list"
                    ? "bg-emerald-500 text-white"
                    : "text-gray-300 hover:bg-gray-700"
                )}
              >
                <List className="h-5 w-5" />
                <span className="hidden sm:inline">List</span>
              </button>
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="rounded-lg border border-gray-700 bg-gray-800 p-4">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    selectedCategory === "all"
                      ? "bg-emerald-500 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  )}
                >
                  All Categories
                </button>
                <button
                  onClick={() => setSelectedCategory("genre")}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    selectedCategory === "genre"
                      ? "bg-emerald-500 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  )}
                >
                  Genres
                </button>
                <button
                  onClick={() => setSelectedCategory("theme")}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    selectedCategory === "theme"
                      ? "bg-emerald-500 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  )}
                >
                  Themes
                </button>
                <button
                  onClick={() => setSelectedCategory("setting")}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    selectedCategory === "setting"
                      ? "bg-emerald-500 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  )}
                >
                  Settings
                </button>
                <button
                  onClick={() => setSelectedCategory("origin")}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    selectedCategory === "origin"
                      ? "bg-emerald-500 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  )}
                >
                  Origins
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Popular Genres Section */}
        {searchQuery === "" && selectedCategory === "all" && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Popular Genres</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {genres
                .filter(genre => genre.popular)
                .map(genre => (
                  <GenreCard key={genre.id} genre={genre} />
                ))}
            </div>
          </div>
        )}

        {/* All Genres Section */}
        {viewMode === "grid" ? (
          <>
            <h2 className="text-2xl font-bold text-white mb-6">
              {searchQuery ? "Search Results" : selectedCategory !== "all" ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Categories` : "All Genres"}
            </h2>

            {filteredGenres.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredGenres.map(genre => (
                  <GenreCard key={genre.id} genre={genre} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="bg-gray-800 rounded-full p-4 mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium text-white">No genres found</h3>
                <p className="mt-2 text-gray-400 max-w-md">
                  We couldn&#39;t find any genres matching your search criteria. Try adjusting your filters or search term.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                  className="mt-4 flex items-center gap-2 text-emerald-400 hover:text-emerald-300"
                >
                  <X className="h-4 w-4" />
                  Clear filters
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-white mb-6">
              {searchQuery ? "Search Results" : selectedCategory !== "all" ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Categories` : "All Genres"}
            </h2>

            {Object.keys(genresByCategory).length > 0 ? (
              <div className="space-y-8">
                {Object.entries(genresByCategory).map(([category, categoryGenres]) => (
                  <div key={category} className="space-y-4">
                    <h3 className="text-xl font-semibold text-white">{category}</h3>
                    <div className="bg-gray-800/50 rounded-xl overflow-hidden">
                      <table className="w-full border-collapse">
                        <thead className="bg-gray-800">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Genre</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Description</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Novels</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                          {categoryGenres.map(genre => (
                            <tr key={genre.id} className="hover:bg-gray-700/50 transition-colors">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <Link href={`/genres/${genre.slug}`} className="flex items-center">
                                  <div className={`w-3 h-3 rounded-full mr-2`} style={{ backgroundColor: genre.color }}></div>
                                  <span className="font-medium text-emerald-400 hover:text-emerald-300">{genre.name}</span>
                                </Link>
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-300">{genre.description}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center text-gray-300">
                                  <BookOpen className="h-4 w-4 mr-1 text-gray-400" />
                                  {genre.novelCount.toLocaleString()}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="bg-gray-800 rounded-full p-4 mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium text-white">No genres found</h3>
                <p className="mt-2 text-gray-400 max-w-md">
                  We couldn&#39;t find any genres matching your search criteria. Try adjusting your filters or search term.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                  className="mt-4 flex items-center gap-2 text-emerald-400 hover:text-emerald-300"
                >
                  <X className="h-4 w-4" />
                  Clear filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function GenreCard({ genre }: { genre: Genre }) {
  return (
    <Link href={`/genres/${genre.slug}`}>
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
        className="relative overflow-hidden rounded-xl bg-gray-800 h-full"
      >
        <div className="absolute inset-0 opacity-30">
          <Image
            src={genre.image}
            alt={genre.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>
        <div className="relative p-6 flex flex-col h-full">
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <div className={`w-3 h-3 rounded-full mr-2`} style={{ backgroundColor: genre.color }}></div>
              <span className="text-xs font-medium text-gray-400">{genre.category}</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{genre.name}</h3>
            <p className="text-gray-400 text-sm mb-4">{genre.description}</p>
          </div>
          <div className="flex items-center text-gray-300 text-sm">
            <BookOpen className="h-4 w-4 mr-1 text-emerald-400" />
            {genre.novelCount.toLocaleString()} novels
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

// Mock data for genres
const genres: Genre[] = [
  {
    id: "fantasy",
    name: "Fantasy",
    slug: "fantasy",
    description: "Stories with magical or supernatural elements often set in imaginary worlds",
    novelCount: 4582,
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=684&q=80",
    color: "#8b5cf6",
    category: "Genre",
    popular: true
  },
  {
    id: "sci-fi",
    name: "Science Fiction",
    slug: "sci-fi",
    description: "Speculative fiction exploring advanced technology, space travel, and futuristic concepts",
    novelCount: 3241,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80",
    color: "#3b82f6",
    category: "Genre",
    popular: true
  },
  {
    id: "action",
    name: "Action",
    slug: "action",
    description: "Fast-paced stories with emphasis on battles, fights, and physical feats",
    novelCount: 2876,
    image: "https://images.unsplash.com/photo-1535981767287-35259dbf7d0e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    color: "#ef4444",
    category: "Genre",
    popular: true
  },
  {
    id: "romance",
    name: "Romance",
    slug: "romance",
    description: "Stories centered around romantic relationships and emotional development",
    novelCount: 3987,
    image: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1093&q=80",
    color: "#ec4899",
    category: "Genre",
    popular: true
  },
  {
    id: "mystery",
    name: "Mystery",
    slug: "mystery",
    description: "Stories involving solving crimes, puzzles, or uncovering secrets",
    novelCount: 1854,
    image: "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    color: "#6366f1",
    category: "Genre",
    popular: false
  },
  {
    id: "horror",
    name: "Horror",
    slug: "horror",
    description: "Stories designed to frighten, scare, or disgust readers",
    novelCount: 1243,
    image: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1167&q=80",
    color: "#1e293b",
    category: "Genre",
    popular: false
  },
  {
    id: "adventure",
    name: "Adventure",
    slug: "adventure",
    description: "Stories focusing on exciting journeys, quests, and exploration",
    novelCount: 2567,
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    color: "#f59e0b",
    category: "Genre",
    popular: true
  },
  {
    id: "historical",
    name: "Historical",
    slug: "historical",
    description: "Stories set in the past, often based on real historical events",
    novelCount: 1432,
    image: "https://images.unsplash.com/photo-1461360228754-6e81c478b882?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80",
    color: "#b45309",
    category: "Genre",
    popular: false
  },
  {
    id: "cultivation",
    name: "Cultivation",
    slug: "cultivation",
    description: "Stories focusing on characters improving their abilities through martial arts and spiritual practices",
    novelCount: 3421,
    image: "https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    color: "#10b981",
    category: "Theme",
    popular: true
  },
  {
    id: "reincarnation",
    name: "Reincarnation",
    slug: "reincarnation",
    description: "Stories where characters are reborn into new lives or worlds",
    novelCount: 2876,
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    color: "#6366f1",
    category: "Theme",
    popular: true
  },
  {
    id: "system",
    name: "System",
    slug: "system",
    description: "Stories featuring game-like systems, stats, and progression",
    novelCount: 2543,
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    color: "#0ea5e9",
    category: "Theme",
    popular: true
  },
  {
    id: "harem",
    name: "Harem",
    slug: "harem",
    description: "Stories where a protagonist has multiple romantic interests",
    novelCount: 1876,
    image: "https://images.unsplash.com/photo-1516914589923-f105f1535f88?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    color: "#ec4899",
    category: "Theme",
    popular: false
  },
  {
    id: "medieval",
    name: "Medieval",
    slug: "medieval",
    description: "Stories set in medieval-inspired worlds with knights, castles, and feudal systems",
    novelCount: 1432,
    image: "https://images.unsplash.com/photo-1599732006596-01a3abb7ff6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    color: "#b45309",
    category: "Setting",
    popular: false
  },
  {
    id: "modern",
    name: "Modern",
    slug: "modern",
    description: "Stories set in contemporary times with current technology and society",
    novelCount: 2143,
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1244&q=80",
    color: "#6366f1",
    category: "Setting",
    popular: false
  },
  {
    id: "apocalypse",
    name: "Apocalypse",
    slug: "apocalypse",
    description: "Stories set during or after the end of civilization",
    novelCount: 1654,
    image: "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    color: "#ef4444",
    category: "Setting",
    popular: true
  },
  {
    id: "virtual-reality",
    name: "Virtual Reality",
    slug: "virtual-reality",
    description: "Stories set in virtual worlds or games",
    novelCount: 1876,
    image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    color: "#0ea5e9",
    category: "Setting",
    popular: true
  },
  {
    id: "chinese",
    name: "Chinese",
    slug: "chinese",
    description: "Novels originally written in Chinese or set in Chinese-inspired worlds",
    novelCount: 4321,
    image: "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    color: "#ef4444",
    category: "Origin",
    popular: true
  },
  {
    id: "korean",
    name: "Korean",
    slug: "korean",
    description: "Novels originally written in Korean or set in Korean-inspired worlds",
    novelCount: 2765,
    image: "https://images.unsplash.com/photo-1534274867514-d5b47ef89ed7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
    color: "#3b82f6",
    category: "Origin",
    popular: true
  },
  {
    id: "japanese",
    name: "Japanese",
    slug: "japanese",
    description: "Novels originally written in Japanese or set in Japanese-inspired worlds",
    novelCount: 3254,
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    color: "#f43f5e",
    category: "Origin",
    popular: true
  },
  {
    id: "english",
    name: "English",
    slug: "english",
    description: "Novels originally written in English or set in Western-inspired worlds",
    novelCount: 2987,
    image: "https://images.unsplash.com/photo-1589395937772-f67057e233df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    color: "#0ea5e9",
    category: "Origin",
    popular: false
  }
];
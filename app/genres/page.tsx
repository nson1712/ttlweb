"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Grid,
  List,
  ChevronDown,
  X,
  BookOpen,
} from "lucide-react";
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
  const filteredGenres = genres.filter((genre) => {
    const matchesSearch =
      genre.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      genre.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      genre.category.toLowerCase() === selectedCategory.toLowerCase();

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
            <Image
              src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
              alt="Books background"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Genre Catalog
            </h1>
            <p className="text-gray-300 max-w-2xl">
              Explore our extensive collection of novels across various genres,
              themes, settings, and origins. Find your next favorite read by
              browsing categories that match your interests.
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
                onClick={() => setViewMode("grid")}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 transition-colors",
                  viewMode === "grid"
                    ? "bg-gradient-to-r from-emerald-400 to-teal-500 rounded-l-md hover:rounded-l-md text-white"
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
                    ? "bg-gradient-to-r from-emerald-400 to-teal-500 rounded-r-md hover:rounded-r-md hover:rounded-r-md text-white"
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
            <h2 className="text-2xl font-bold text-white mb-6">
              Popular Genres
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {genres
                .filter((genre) => genre.popular)
                .map((genre) => (
                  <GenreCard key={genre.id} genre={genre} />
                ))}
            </div>
          </div>
        )}


        {/* All Genres Section */}
        {viewMode === "grid" ? (
          <>
            <h2 className="text-2xl font-bold text-white mb-6">
              {searchQuery
                ? "Search Results"
                : selectedCategory !== "all"
                ? `${
                    selectedCategory.charAt(0).toUpperCase() +
                    selectedCategory.slice(1)
                  } Categories`
                : "All Genres"}
            </h2>


            {filteredGenres.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredGenres.map((genre) => (
                  <GenreCard key={genre.id} genre={genre} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="bg-gray-800 rounded-full p-4 mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium text-white">
                  No genres found
                </h3>
                <p className="mt-2 text-gray-400 max-w-md">
                  We couldn&#39;t find any genres matching your search criteria.
                  Try adjusting your filters or search term.
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
              {searchQuery
                ? "Search Results"
                : selectedCategory !== "all"
                ? `${
                    selectedCategory.charAt(0).toUpperCase() +
                    selectedCategory.slice(1)
                  } Categories`
                : "All Genres"}
            </h2>


            {Object.keys(genresByCategory).length > 0 ? (
              <div className="space-y-8">
                {Object.entries(genresByCategory).map(
                  ([category, categoryGenres]) => (
                    <div key={category} className="space-y-4">
                      <h3 className="text-xl font-semibold text-white">
                        {category}
                      </h3>
                      <div className="bg-gray-800/50 rounded-xl overflow-hidden">
                        <table className="w-full border-collapse">
                          <thead className="bg-gray-800">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Genre
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Description
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Novels
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-700">
                            {categoryGenres.map((genre) => (
                              <tr
                                key={genre.id}
                                className="hover:bg-gray-700/50 transition-colors"
                              >
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <Link
                                    href={`/genres/${genre.slug}`}
                                    className="flex items-center"
                                  >
                                    <div
                                      className={`w-3 h-3 rounded-full mr-2`}
                                      style={{ backgroundColor: genre.color }}
                                    ></div>
                                    <span className="font-medium text-emerald-400 hover:text-emerald-300">
                                      {genre.name}
                                    </span>
                                  </Link>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-300">
                                  {genre.description}
                                </td>
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
                  )
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="bg-gray-800 rounded-full p-4 mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium text-white">
                  No genres found
                </h3>
                <p className="mt-2 text-gray-400 max-w-md">
                  We couldn&#39;t find any genres matching your search criteria.
                  Try adjusting your filters or search term.
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
        <div className="absolute inset-0 opacity-90">
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
              <div
                className={`w-3 h-3 rounded-full mr-2`}
                style={{ backgroundColor: genre.color }}
              ></div>
              <span className="text-xs font-medium text-gray-400">
                {genre.category}
              </span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{genre.name}</h3>
            <p className="text-gray-400 text-sm mb-4 line-clamp-3">
              {genre.description}
            </p>
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
    id: "action",
    name: "Action",
    slug: "action",
    description:
      "A work typically depicting fighting, violence, chaos, and fast paced motion.",
    novelCount: 4582,
    image:
      "https://wallpapercave.com/wp/wp4534369.jpg",
    color: "#8b5cf6",
    category: "Genre",
    popular: true,
  },
  {
    id: "adventure",
    name: "Adventure",
    slug: "adventure",
    description:
      "Exploring new places, environments or situations. This is often associated with people on long journeys to places far away encountering amazing things.",
    novelCount: 3241,
    image:
      "https://chasinganime.com/wp-content/uploads/2020/11/HXH-Cover-image.jpg",
    color: "#3b82f6",
    category: "Genre",
    popular: true,
  },
  {
    id: "comedy",
    name: "Comedy",
    slug: "comedy",
    description: "Comedy",
    novelCount: 2876,
    image:
      "https://wallpapers.com/images/featured/funny-anime-background-w749pb5tp6nd3ouw.jpg",
    color: "#ef4444",
    category: "Genre",
    popular: true,
  },
  {
    id: "drama",
    name: "Drama",
    slug: "drama",
    description:
      "A work meant to bring on an emotional response, such as instilling sadness or tension. Novels that often show life or characters through conflict and emotions. In general, the different parts of the story tend to form a whole that is greater than the sum of the parts. In other words, the story has a message that is bigger than just the story line itself.",
    novelCount: 3987,
    image:
      "https://static1.srcdn.com/wordpress/wp-content/uploads/2024/12/anime-for-k-drama-lovers.png",
    color: "#ec4899",
    category: "Genre",
    popular: true,
  },
  {
    id: "ecchi",
    name: "Ecchi",
    slug: "ecchi",
    description:
      "Possibly the line between hentai and non-hentai, ecchi usually refers to fanservice put in to attract a certain group of fans.",
    novelCount: 1854,
    image:
      "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    color: "#6366f1",
    category: "Genre",
    popular: false,
  },
  {
    id: "fantasy",
    name: "Fantasy",
    slug: "fantasy",
    description:
      "Anything that involves, but not limited to, magic, dream world, and fairy tales.",
    novelCount: 1243,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLw4PhK1j3v7Ia1NhTxsZqhE-5os_EPI__Dw&s",
    color: "#1e293b",
    category: "Genre",
    popular: false,
  },
  {
    id: "game",
    name: "Game",
    slug: "game",
    description:
      "Novels related to game elements, or a similar system. For example: characters are immersed in VR, God closed people in space with the system, technologies like a game (RealRPG) descended into the world.",
    novelCount: 2567,
    image:
      "https://cdn-media.sforum.vn/storage/app/media/wp-content/uploads/2022/11/game-anime-thumb.jpg",
    color: "#f59e0b",
    category: "Genre",
    popular: true,
  },
  {
    id: "gen-ben",
    name: "Gender Bender",
    slug: "gen-ben",
    description:
      "Girls dressing up as guys, guys dressing up as girls. Guys turning into girls, girls turning into guys.",
    novelCount: 1432,
    image:
      "https://static1.srcdn.com/wordpress/wp-content/uploads/2023/12/mai-natsume-blazblue-cropped-1.jpg",
    color: "#b45309",
    category: "Genre",
    popular: false,
  },
  {
    id: "harem",
    name: "Harem",
    slug: "harem",
    description:
      "A series involving one male character and many female characters (usually attracted to the male character). A Reverse Harem is when the genders are reversed.",
    novelCount: 3421,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM9s2NlSfRzrwyMzFerP2v6x-xmSz_DcAPYQ&s",
    color: "#10b981",
    category: "Theme",
    popular: true,
  },
  {
    id: "josei",
    name: "Josei",
    slug: "josei",
    description:
      "Literally [Woman]. Targets women 18-30. Female equivalent to seinen. Unlike shoujo the romance is more realistic and less idealized. The storytelling is more explicit and mature.",
    novelCount: 2876,
    image:
      "https://static1.dualshockersimages.com/wordpress/wp-content/uploads/2023/10/10-best-josei-romances.jpg",
    color: "#6366f1",
    category: "Theme",
    popular: true,
  },
  {
    id: "historical",
    name: "Historical",
    slug: "historical",
    description:
      "Novels whose setting is in the past. Frequently these follow historical tales, sagas or facts. World with kingdom setting that are not from actual history saga, tales, are not included.",
    novelCount: 2543,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRItYSDl40BRg1psB-6TAk7SlQlrrj5qep6rA&s",
    color: "#0ea5e9",
    category: "Theme",
    popular: true,
  },
  {
    id: "horror",
    name: "Horror",
    slug: "horror",
    description: "Novels whose focus is to scare the audience.",
    novelCount: 1876,
    image:
      "https://backiee.com/static/wallpapers/560x315/324048.jpg",
    color: "#ec4899",
    category: "Theme",
    popular: false,
  },
  {
    id: "martial-arts",
    name: "Martial Arts",
    slug: "martial-arts",
    description:
      "The novel has a focus on any of several arts of combat or self-defense. These may include aikido, karate, judo, or tae kwon do, kendo, fencing, and so on and so forth.",
    novelCount: 1432,
    image:
      "https://static1.srcdn.com/wordpress/wp-content/uploads/2023/12/best-martial-arts-manhwa-featured-image-featuring-promotional-pictures-of-the-breaker-return-of-the-blossoming-blade-and-god-of-high-school-side-by-side.jpg",
    color: "#b45309",
    category: "Setting",
    popular: false,
  },
  {
    id: "mature",
    name: "Mature",
    slug: "mature",
    description:
      "Contains subject matter which may be too extreme for a younger audience. Content that deals with mature themes such as gore, sex, or violence.",
    novelCount: 2143,
    image:
      "https://media.moddb.com/images/downloads/1/77/76077/Wallpaper_-_047.jpg",
    color: "#6366f1",
    category: "Setting",
    popular: false,
  },
  {
    id: "mecha",
    name: "Mecha",
    slug: "mecha",
    description:
      "A work involving and usually concentrating on all types of large robotic machines.",
    novelCount: 1654,
    image:
      "https://cache.desktopnexus.com/thumbseg/1172/1172881-bigthumbnail.jpg",
    color: "#ef4444",
    category: "Setting",
    popular: true,
  },
];
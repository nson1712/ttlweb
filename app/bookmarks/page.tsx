"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Bookmark,
  Filter,
  SortAsc,
  SortDesc,
  Grid,
  List,
  X,
  Search,
} from "lucide-react";
import { NovelCard } from "../components/novels/novel-card";
import { cn } from "../lib/utils";
import { useSearchParams } from "next/navigation";
import { Novel } from "../lib/types";
import { PaginationWithLinks } from "../components/components/pagination";

export default function BookmarksPage() {
  const [novels, setNovels] = useState<Novel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") ?? "1", 10);

  const pageSize = parseInt(searchParams.get("pageSize") ?? "10", 10);

  const sort = searchParams.get("sort") ?? "recent";

  const view = searchParams.get("view") ?? "list";

  const category = searchParams.get("category");

  const query = searchParams.get("query");

  // Fetch bookmarked novels
  useEffect(() => {
    const fetchBookmarkedNovels = () => {
      setLoading(true);

      // In a real app, this would be an API call to get user's bookmarked novels
      // For now, we'll use mock data
      let filteredNovels = [...bookmarkedNovels];

      // Apply category filter if selected
      if (category) {
        filteredNovels = filteredNovels.filter((novel) =>
          novel.categories.some(
            (cat: string) => cat.toLowerCase() === category.toLowerCase()
          )
        );
        setSelectedCategory(category);
      } else {
        setSelectedCategory(null);
      }

      // Apply search query if provided
      if (query) {
        const lowerQuery = query.toLowerCase();
        filteredNovels = filteredNovels.filter(
          (novel) =>
            novel.title.toLowerCase().includes(lowerQuery) ||
            novel.author.toLowerCase().includes(lowerQuery)
        );
        setSearchQuery(query);
      } else {
        setSearchQuery("");
      }

      // Sort novels based on sort parameter
      const sortedNovels = [...filteredNovels].sort((a, b) => {
        if (sort === "popular") return b.totalRatings - a.totalRatings;
        if (sort === "rating") return b.rating - a.rating;
        if (sort === "recent")
          return (
            new Date(b.bookmarkedAt).getTime() -
            new Date(a.bookmarkedAt).getTime()
          );
        if (sort === "title") return a.title.localeCompare(b.title);
        return 0;
      });

      // Paginate novels
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const paginatedNovels = sortedNovels.slice(start, end);

      setNovels(paginatedNovels);
      setLoading(false);
    };

    fetchBookmarkedNovels();
  }, [page, pageSize, sort, view, category, query]);

  // Get all unique categories from bookmarked novels
  const allCategories = Array.from(
    new Set(bookmarkedNovels.flatMap((novel) => novel.categories))
  ).sort();

  // Get total count of bookmarked novels after filtering
  const totalCount = bookmarkedNovels.filter((novel) => {
    let matchesCategory = true;
    let matchesQuery = true;

    if (category) {
      matchesCategory = novel.categories.some(
        (cat: string) => cat.toLowerCase() === category.toLowerCase()
      );
    }

    if (query) {
      const lowerQuery = query.toLowerCase();
      matchesQuery =
        novel.title.toLowerCase().includes(lowerQuery) ||
        novel.author.toLowerCase().includes(lowerQuery);
    }

    return matchesCategory && matchesQuery;
  }).length;

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);

    if (searchQuery) {
      params.set("query", searchQuery);
    } else {
      params.delete("query");
    }

    params.set("page", "1"); // Reset to first page on new search
    window.location.href = `/bookmarks?${params.toString()}`;
  };

  // Handle bookmark removal
  const handleRemoveBookmark = (novelId: string) => {
    // In a real app, this would call an API to remove the bookmark
    // For now, we'll just update the local state
    setNovels(novels.filter((novel) => novel.id !== novelId));
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="mb-4 inline-flex items-center text-sm font-medium text-emerald-400 hover:text-emerald-300"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to home
          </Link>

          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-emerald-500/30 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 text-emerald-400">
              <Bookmark className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-bold text-white">Bookmarked Novels</h1>
            <span className="rounded-full bg-gray-800 px-3 py-1 text-sm font-medium text-gray-300">
              {totalCount} novels
            </span>
          </div>

          <p className="mt-2 text-gray-400">
            Your personal collection of saved novels for easy access
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 rounded-xl bg-gray-800/50 p-4 backdrop-blur-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Search */}
            <form
              onSubmit={handleSearch}
              className="relative w-full sm:max-w-xs"
            >
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search bookmarks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-gray-700 bg-gray-800 py-2 pl-10 pr-4 text-sm text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    if (query) {
                      const params = new URLSearchParams(
                        window.location.search
                      );
                      params.delete("query");
                      params.set("page", "1");
                      window.location.href = `/bookmarks?${params.toString()}`;
                    }
                  }}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </form>

            {/* Category Filter */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-white">Category:</span>
              <Link
                href={`/bookmarks?sort=${sort}&view=${view}${
                  query ? `&query=${query}` : ""
                }`}
                className={cn(
                  "rounded-full px-3 py-1 text-sm font-medium transition-colors",
                  !selectedCategory
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                )}
              >
                All
              </Link>
              {allCategories.slice(0, 5).map((cat) => (
                <Link
                  key={cat}
                  href={`/bookmarks?category=${cat.toLowerCase()}&sort=${sort}&view=${view}${
                    query ? `&query=${query}` : ""
                  }`}
                  className={cn(
                    "rounded-full px-3 py-1 text-sm font-medium transition-colors",
                    selectedCategory === cat.toLowerCase()
                      ? "bg-emerald-500 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  )}
                >
                  {cat}
                </Link>
              ))}
              {allCategories.length > 5 && (
                <div className="relative group">
                  <button className="rounded-full bg-gray-700 px-3 py-1 text-sm font-medium text-gray-300 hover:bg-gray-600">
                    More...
                  </button>
                  <div className="absolute right-0 z-10 mt-2 hidden w-48 origin-top-right rounded-md bg-gray-800 p-2 shadow-lg ring-1 ring-black ring-opacity-5 group-hover:block">
                    <div className="flex flex-col gap-1">
                      {allCategories.slice(5).map((cat) => (
                        <Link
                          key={cat}
                          href={`/bookmarks?category=${cat.toLowerCase()}&sort=${sort}&view=${view}${
                            query ? `&query=${query}` : ""
                          }`}
                          className={cn(
                            "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                            selectedCategory === cat.toLowerCase()
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "text-gray-300 hover:bg-gray-700"
                          )}
                        >
                          {cat}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sort and View Options */}
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
              <Filter className="h-5 w-5 text-gray-400" />
              <span className="text-sm font-medium text-white">Sort by:</span>
              <Link
                href={`/bookmarks?sort=recent${
                  category ? `&category=${category}` : ""
                }${query ? `&query=${query}` : ""}&view=${view}`}
                className={cn(
                  "rounded-full px-3 py-1 text-sm font-medium transition-colors whitespace-nowrap",
                  sort === "recent"
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                )}
              >
                <SortDesc className="mr-1 h-3 w-3 inline" />
                Recently Added
              </Link>
              <Link
                href={`/bookmarks?sort=popular${
                  category ? `&category=${category}` : ""
                }${query ? `&query=${query}` : ""}&view=${view}`}
                className={cn(
                  "rounded-full px-3 py-1 text-sm font-medium transition-colors whitespace-nowrap",
                  sort === "popular"
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                )}
              >
                Popular
              </Link>
              <Link
                href={`/bookmarks?sort=rating${
                  category ? `&category=${category}` : ""
                }${query ? `&query=${query}` : ""}&view=${view}`}
                className={cn(
                  "rounded-full px-3 py-1 text-sm font-medium transition-colors whitespace-nowrap",
                  sort === "rating"
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                )}
              >
                Rating
              </Link>
              <Link
                href={`/bookmarks?sort=title${
                  category ? `&category=${category}` : ""
                }${query ? `&query=${query}` : ""}&view=${view}`}
                className={cn(
                  "rounded-full px-3 py-1 text-sm font-medium transition-colors whitespace-nowrap",
                  sort === "title"
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                )}
              >
                <SortAsc className="mr-1 h-3 w-3 inline" />
                Title
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-white">View:</span>
              <Link
                href={`/bookmarks?sort=${sort}${
                  category ? `&category=${category}` : ""
                }${query ? `&query=${query}` : ""}&view=grid`}
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
                href={`/bookmarks?sort=${sort}${
                  category ? `&category=${category}` : ""
                }${query ? `&query=${query}` : ""}&view=list`}
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
        </div>

        {/* Novels Grid/List */}
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-emerald-500"></div>
          </div>
        ) : novels.length > 0 ? (
          <div
            className={cn(
              view === "grid"
                ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "space-y-6"
            )}
          >
            {novels.map((novel) => (
              <div key={novel.id} className="group relative">
                <NovelCard {...novel} />
                <button
                  onClick={() => handleRemoveBookmark(novel.id)}
                  className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-gray-900/80 text-gray-300 opacity-0 transition-opacity hover:bg-red-500/80 hover:text-white group-hover:opacity-100"
                  aria-label="Remove bookmark"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-64 flex-col items-center justify-center rounded-xl bg-gray-800/50 p-6 text-center backdrop-blur-sm">
            <Bookmark className="h-12 w-12 text-gray-500" />
            <h3 className="mt-4 text-xl font-medium text-white">
              No bookmarked novels
            </h3>
            <p className="mt-2 text-gray-400">
              {query || category
                ? "No bookmarks match your current filters. Try adjusting your search or category selection."
                : "You haven't bookmarked any novels yet. Browse novels and click the bookmark button to add them here."}
            </p>
            <Link
              href="/"
              className="mt-4 rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600"
            >
              Browse novels
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
  );
}

// Mock data for bookmarked novels
const bookmarkedNovels = [
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
    description:
      "In the waves of steam and machinery, who could achieve extraordinary? In the fogs of history and darkness, who was whispering? I woke up from the realm of mysteries and opened my eyes to the world.",
    updatedAt: "2025-04-15T10:30:00Z",
    chapterCount: 1430,
    bookmarkedAt: "2025-04-25T14:30:00Z",
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
    description:
      "Growing up in poverty, Sunny never expected anything good from life. However, even he did not anticipate being chosen by the Nightmare Spell and becoming one of the Awakened - an elite group of people gifted with supernatural powers.",
    updatedAt: "2025-04-22T09:15:00Z",
    chapterCount: 789,
    bookmarkedAt: "2025-04-26T09:15:00Z",
  },
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
    bookmarkedAt: "2025-04-22T18:45:00Z",
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
    description:
      "What would happen if a game's NPC possessed the player's mind? Han Xiao, a fateful NPC, got a second chance at life. As a lowly mechanic, he had managed to save a galaxy from destruction! But before he could savor his triumph, he had died. However, destiny had other plans.",
    updatedAt: "2025-04-18T14:45:00Z",
    chapterCount: 1465,
    bookmarkedAt: "2025-04-20T11:30:00Z",
  },
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
    description:
      "Xuan Xuan Continent, the Land of Magical Beasts, where the strong prey on the weak. After a college student on earth dies from an accident, his soul awakens in the body of an ordinary citizen.",
    updatedAt: "2025-04-10T16:20:00Z",
    chapterCount: 921,
    bookmarkedAt: "2025-04-15T20:10:00Z",
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
    bookmarkedAt: "2025-04-24T14:20:00Z",
  },
];

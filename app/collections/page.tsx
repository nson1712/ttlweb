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
  Heart,
  Clock,
  Plus,
} from "lucide-react";
import { cn } from "../lib/utils";

// Collection type definition
interface Collection {
  id: string;
  slug: string;
  title: string;
  description: string;
  coverImages: string[];
  creator: {
    name: string;
    avatar: string;
  };
  novelCount: number;
  likes: number;
  featured: boolean;
  category: string;
  createdAt: string;
  updatedAt: string;
}

// Novel type definition for collection items
// interface NovelItem {
//   id: string;
//   slug: string;
//   title: string;
//   coverImage: string;
//   author: string;
// }

export default function CollectionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<string>("popular");

  // Filter collections based on search query and category
  const filteredCollections = collections.filter((collection) => {
    const matchesSearch =
      collection.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collection.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      collection.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  // Sort collections
  const sortedCollections = [...filteredCollections].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.likes - a.likes;
      case "newest":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "updated":
        return (
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      case "novels":
        return b.novelCount - a.novelCount;
      default:
        return b.likes - a.likes;
    }
  });

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 p-8 mb-8">
          <div className="absolute inset-0 opacity-20">
            <Image
              src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80"
              alt="Collections background"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Novel Collections
            </h1>
            <p className="text-gray-300 max-w-2xl">
              Discover curated collections of novels organized by themes,
              series, authors, and more. Find your next reading journey or
              create your own collection to share with others.
            </p>
            <div className="mt-6">
              <Link href="/collections/create">
                <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Create Collection
                </button>
              </Link>
            </div>
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
                placeholder="Search collections..."
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

            {/* Sort By Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 pr-8 text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="popular">Most Popular</option>
                <option value="newest">Newest</option>
                <option value="updated">Recently Updated</option>
                <option value="novels">Most Novels</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>

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
                  onClick={() => setSelectedCategory("series")}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    selectedCategory === "series"
                      ? "bg-emerald-500 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  )}
                >
                  Series
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
                  onClick={() => setSelectedCategory("author")}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    selectedCategory === "author"
                      ? "bg-emerald-500 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  )}
                >
                  Authors
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
                  onClick={() => setSelectedCategory("personal")}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    selectedCategory === "personal"
                      ? "bg-emerald-500 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  )}
                >
                  Personal
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Featured Collections */}
        {searchQuery === "" && selectedCategory === "all" && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">
              Featured Collections
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {collections
                .filter((collection) => collection.featured)
                .slice(0, 2)
                .map((collection) => (
                  <FeaturedCollectionCard
                    key={collection.id}
                    collection={collection}
                  />
                ))}
            </div>
          </div>
        )}

        {/* All Collections */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">
            {searchQuery
              ? "Search Results"
              : selectedCategory !== "all"
              ? `${
                  selectedCategory.charAt(0).toUpperCase() +
                  selectedCategory.slice(1)
                } Collections`
              : "All Collections"}
          </h2>

          {sortedCollections.length > 0 ? (
            viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedCollections.map((collection) => (
                  <CollectionCard key={collection.id} collection={collection} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-y-2">
                {sortedCollections.map((collection) => (
                  <CollectionListItem
                    key={collection.id}
                    collection={collection}
                  />
                ))}
              </div>
            )
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-gray-800 rounded-full p-4 mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-white">
                No collections found
              </h3>
              <p className="mt-2 text-gray-400 max-w-md">
                We couldn&#39;t find any collections matching your search
                criteria. Try adjusting your filters or search term.
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

          {/* Pagination */}
          {sortedCollections.length > 0 && (
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
    </div>
  );
}

function FeaturedCollectionCard({ collection }: { collection: Collection }) {
  return (
    <Link href={`/collections/${collection.slug}`}>
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
        className="relative overflow-hidden rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 h-full"
      >
        <div className="absolute inset-0 opacity-30">
          <div className="grid grid-cols-2 h-full w-full">
            {collection.coverImages.slice(0, 4).map((image, index) => (
              <div key={index} className="relative">
                <Image
                  src={image}
                  alt={`Cover ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/90 to-gray-900/70"></div>
        <div className="relative p-6 flex flex-col h-full">
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <span className="bg-emerald-500 text-white text-xs font-medium px-2.5 py-0.5 rounded">
                Featured
              </span>
              <span className="bg-gray-700 text-gray-300 text-xs font-medium px-2.5 py-0.5 rounded ml-2">
                {collection.category}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              {collection.title}
            </h3>
            <p className="text-gray-400 mb-4">{collection.description}</p>

            <div className="flex items-center mb-4">
              <div className="relative h-8 w-8 rounded-full overflow-hidden mr-2">
                <Image
                  src={collection.creator.avatar}
                  alt={collection.creator.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-sm text-gray-300">
                Created by{" "}
                <span className="text-emerald-400">
                  {collection.creator.name}
                </span>
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-400">
            <div className="flex items-center">
              <BookOpen className="h-4 w-4 mr-1 text-gray-500" />
              <span>{collection.novelCount} novels</span>
            </div>
            <div className="flex items-center">
              <Heart className="h-4 w-4 mr-1 text-gray-500" />
              <span>{collection.likes.toLocaleString()} likes</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1 text-gray-500" />
              <span>Updated {collection.updatedAt}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

function CollectionCard({ collection }: { collection: Collection }) {
  return (
    <Link href={`/collections/${collection.slug}`}>
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
        className="relative overflow-hidden rounded-xl bg-gray-800 h-full"
      >
        <div className="relative h-40 overflow-hidden">
          <div className="grid grid-cols-2 h-full w-full">
            {collection.coverImages.slice(0, 4).map((image, index) => (
              <div key={index} className="relative">
                <Image
                  src={image}
                  alt={`Cover ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
          <div className="absolute bottom-2 right-2">
            <span className="bg-gray-700 text-gray-300 text-xs font-medium px-2.5 py-0.5 rounded">
              {collection.category}
            </span>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">
            {collection.title}
          </h3>
          <p className="text-gray-400 text-sm mb-3 line-clamp-2">
            {collection.description}
          </p>

          <div className="flex items-center mb-3">
            <div className="relative h-6 w-6 rounded-full overflow-hidden mr-2">
              <Image
                src={collection.creator.avatar}
                alt={collection.creator.name}
                fill
                className="object-cover"
              />
            </div>
            <span className="text-xs text-gray-300">
              {collection.creator.name}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center">
              <BookOpen className="h-3.5 w-3.5 mr-1 text-gray-500" />
              <span>{collection.novelCount}</span>
            </div>
            <div className="flex items-center">
              <Heart className="h-3.5 w-3.5 mr-1 text-gray-500" />
              <span>{collection.likes.toLocaleString()}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-3.5 w-3.5 mr-1 text-gray-500" />
              <span>{collection.updatedAt}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

function CollectionListItem({ collection }: { collection: Collection }) {
  return (
    <Link href={`/collections/${collection.slug}`}>
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
        className="relative overflow-hidden rounded-xl bg-gray-800/80 hover:bg-gray-800 transition-colors"
      >
        <div className="grid grid-cols-12 gap-4 p-4">
          {/* Cover Images */}
          <div className="col-span-3 sm:col-span-2 md:col-span-1">
            <div className="grid grid-cols-2 gap-0.5 aspect-square overflow-hidden rounded-lg">
              {collection.coverImages.slice(0, 4).map((image, index) => (
                <div key={index} className="relative">
                  <Image
                    src={image}
                    alt={`Cover ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Collection Info */}
          <div className="col-span-9 sm:col-span-10 md:col-span-11">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-emerald-400">
                    {collection.title}
                  </h3>
                  <span className="bg-gray-700 text-gray-300 text-xs font-medium px-2 py-0.5 rounded">
                    {collection.category}
                  </span>
                </div>
                <p className="text-sm text-gray-400 line-clamp-1 sm:line-clamp-2">
                  {collection.description}
                </p>
              </div>

              <div className="flex items-center mt-2 sm:mt-0">
                <div className="relative h-6 w-6 rounded-full overflow-hidden mr-2">
                  <Image
                    src={collection.creator.avatar}
                    alt={collection.creator.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-xs text-gray-300">
                  {collection.creator.name}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-400">
              <div className="flex items-center">
                <BookOpen className="mr-1 h-3.5 w-3.5 text-gray-500" />
                <span>{collection.novelCount} novels</span>
              </div>

              <div className="flex items-center">
                <Heart className="mr-1 h-3.5 w-3.5 text-gray-500" />
                <span>{collection.likes.toLocaleString()} likes</span>
              </div>

              <div className="flex items-center">
                <Clock className="mr-1 h-3.5 w-3.5 text-gray-500" />
                <span>Updated {collection.updatedAt}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

// Mock data for collections
const collections: Collection[] = [
  {
    id: "cultivation-classics",
    slug: "cultivation-classics",
    title: "Cultivation Classics",
    description:
      "The best cultivation novels that defined the genre and continue to inspire new stories.",
    coverImages: [
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80",
    ],
    creator: {
      name: "CultivationFan",
      avatar:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80",
    },
    novelCount: 12,
    likes: 8765,
    featured: true,
    category: "theme",
    createdAt: "2023-05-15T10:30:00Z",
    updatedAt: "2 weeks ago",
  },
  {
    id: "lord-of-mysteries-universe",
    slug: "lord-of-mysteries-universe",
    title: "Lord of Mysteries Universe",
    description:
      "All novels set in the Lord of Mysteries universe, including the main series and spin-offs.",
    coverImages: [
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80",
    ],
    creator: {
      name: "MysteriesLover",
      avatar:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80",
    },
    novelCount: 8,
    likes: 7654,
    featured: true,
    category: "series",
    createdAt: "2023-08-22T14:45:00Z",
    updatedAt: "3 days ago",
  },
  {
    id: "best-completed-novels",
    slug: "best-completed-novels",
    title: "Best Completed Novels",
    description:
      "A collection of the highest-rated completed novels that you can binge read without waiting for updates.",
    coverImages: [
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80",
    ],
    creator: {
      name: "CompletionistReader",
      avatar:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80",
    },
    novelCount: 24,
    likes: 6543,
    featured: false,
    category: "personal",
    createdAt: "2023-11-05T09:15:00Z",
    updatedAt: "1 month ago",
  },
  {
    id: "cuttlefish-works",
    slug: "cuttlefish-works",
    title: "Cuttlefish That Loves Diving's Works",
    description:
      "All novels by the acclaimed author Cuttlefish That Loves Diving, creator of Lord of Mysteries.",
    coverImages: [
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80",
    ],
    creator: {
      name: "CuttlefishFan",
      avatar:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80",
    },
    novelCount: 6,
    likes: 5432,
    featured: false,
    category: "author",
    createdAt: "2024-01-18T16:20:00Z",
    updatedAt: "1 week ago",
  },
  {
    id: "system-apocalypse",
    slug: "system-apocalypse",
    title: "System Apocalypse Novels",
    description:
      "Novels featuring system apocalypse scenarios where the world changes through game-like systems.",
    coverImages: [
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80",
    ],
    creator: {
      name: "SystemLover",
      avatar:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80",
    },
    novelCount: 15,
    likes: 4321,
    featured: false,
    category: "theme",
    createdAt: "2023-09-30T11:10:00Z",
    updatedAt: "2 months ago",
  },
  {
    id: "best-fantasy-novels",
    slug: "best-fantasy-novels",
    title: "Best Fantasy Novels",
    description:
      "A curated collection of the highest-rated fantasy novels across different subgenres.",
    coverImages: [
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80",
    ],
    creator: {
      name: "FantasyExplorer",
      avatar:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80",
    },
    novelCount: 30,
    likes: 3210,
    featured: false,
    category: "genre",
    createdAt: "2023-07-12T08:40:00Z",
    updatedAt: "3 months ago",
  },
  {
    id: "korean-novels",
    slug: "korean-novels",
    title: "Best Korean Novels",
    description:
      "Top-rated novels originally written in Korean or set in Korean-inspired worlds.",
    coverImages: [
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80",
    ],
    creator: {
      name: "KoreanNovelFan",
      avatar:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80",
    },
    novelCount: 18,
    likes: 2987,
    featured: false,
    category: "origin",
    createdAt: "2024-02-05T13:25:00Z",
    updatedAt: "5 days ago",
  },
  {
    id: "my-reading-list",
    slug: "my-reading-list",
    title: "My Reading List 2024",
    description:
      "Novels I plan to read this year, organized by priority and interest.",
    coverImages: [
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80",
    ],
    creator: {
      name: "BookwormReader",
      avatar:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80",
    },
    novelCount: 22,
    likes: 1876,
    featured: false,
    category: "personal",
    createdAt: "2024-01-01T00:05:00Z",
    updatedAt: "2 weeks ago",
  },
  {
    id: "progression-fantasy",
    slug: "progression-fantasy",
    title: "Progression Fantasy",
    description:
      "Novels focusing on character growth in power, abilities, and skills as a central narrative element.",
    coverImages: [
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80",
    ],
    creator: {
      name: "ProgressionLover",
      avatar:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80",
    },
    novelCount: 16,
    likes: 2345,
    featured: false,
    category: "genre",
    createdAt: "2023-10-10T15:30:00Z",
    updatedAt: "1 month ago",
  },
  {
    id: "virtual-reality-novels",
    slug: "virtual-reality-novels",
    title: "Virtual Reality Novels",
    description:
      "Stories set in virtual worlds, games, or simulations where characters navigate digital realities.",
    coverImages: [
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80",
    ],
    creator: {
      name: "VREnthusiast",
      avatar:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80",
    },
    novelCount: 14,
    likes: 3456,
    featured: false,
    category: "theme",
    createdAt: "2023-12-15T10:20:00Z",
    updatedAt: "3 weeks ago",
  },
];

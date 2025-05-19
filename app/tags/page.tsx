"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Tag, Search, Filter, X } from "lucide-react"
import { cn } from "../lib/utils"

interface TagProps {
  name: string
  count: number
  color: "blue" | "green" | "red" | "purple" | "orange" | "teal" | "pink" | "yellow"
}

export default function TagsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  
  // Filter tags based on search query and selected category
  const filteredTags = allTags
    .filter(tag => 
      tag.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!selectedCategory || tag.category === selectedCategory)
    )
    .sort((a, b) => b.count - a.count)
  
  // Extract unique categories from tags
  const categories = Array.from(new Set(allTags.map(tag => tag.category)))
  
  return (
    <div className="min-h-screen">
      <div className="mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
            <span className="block">Browse Novels by</span>
            <span className="block bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
              Tags & Categories
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-400">
            Discover stories that match your interests from our extensive collection
          </p>
        </motion.div>
        
        {/* Search and Filter */}
        <div className="mb-8 rounded-xl bg-gray-800/50 p-6 backdrop-blur-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Search */}
            <div className="relative flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-700 bg-gray-800 py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center mr-2">
                <Filter className="mr-2 h-5 w-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-300">Filter:</span>
              </div>
              <button
                onClick={() => setSelectedCategory(null)}
                className={cn(
                  "rounded-full px-3 py-1 text-sm font-medium transition-colors cursor-pointer",
                  selectedCategory === null
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                )}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "rounded-full px-3 py-1 text-sm font-medium transition-colors cursor-pointer",
                    selectedCategory === category
                      ? "bg-emerald-500 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Tags Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filteredTags.map((tag) => (
            <TagCard key={tag.name} {...tag} />
          ))}
        </div>
        
        {/* Empty State */}
        {filteredTags.length === 0 && (
          <div className="mt-12 text-center">
            <Tag className="mx-auto h-12 w-12 text-gray-500" />
            <h3 className="mt-2 text-lg font-medium text-white">No tags found</h3>
            <p className="mt-1 text-gray-400">
              Try adjusting your search or filter to find what you&#39;re looking for
            </p>
            <button
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory(null)
              }}
              className="mt-4 rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function TagCard({ name, count, color }: TagProps) {
  const colorClasses = {
    blue: "from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-400 hover:from-blue-500/30 hover:to-blue-600/30",
    green: "from-green-500/20 to-green-600/20 border-green-500/30 text-green-400 hover:from-green-500/30 hover:to-green-600/30",
    red: "from-red-500/20 to-red-600/20 border-red-500/30 text-red-400 hover:from-red-500/30 hover:to-red-600/30",
    purple: "from-purple-500/20 to-purple-600/20 border-purple-500/30 text-purple-400 hover:from-purple-500/30 hover:to-purple-600/30",
    orange: "from-orange-500/20 to-orange-600/20 border-orange-500/30 text-orange-400 hover:from-orange-500/30 hover:to-orange-600/30",
    teal: "from-teal-500/20 to-teal-600/20 border-teal-500/30 text-teal-400 hover:from-teal-500/30 hover:to-teal-600/30",
    pink: "from-pink-500/20 to-pink-600/20 border-pink-500/30 text-pink-400 hover:from-pink-500/30 hover:to-pink-600/30",
    yellow: "from-yellow-500/20 to-yellow-600/20 border-yellow-500/30 text-yellow-400 hover:from-yellow-500/30 hover:to-yellow-600/30",
  }
  
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {/* <Link href={`/tags/${name.toLowerCase()}`}> */}
      <Link href={`/tags/fantasy`}>
        <div className={cn(
          "flex h-24 flex-col items-center justify-center rounded-lg border bg-gradient-to-br p-3 text-center transition-all",
          colorClasses[color]
        )}>
          <span className="font-medium uppercase">{name}</span>
          <span className="mt-1 text-sm opacity-80">{count} novels</span>
        </div>
      </Link>
    </motion.div>
  )
}

// Mock data for all tags
const allTags: (TagProps & { category: string })[] = [
  { name: "Fantasy", count: 1250, color: "teal", category: "Genre" },
  { name: "Adventure", count: 987, color: "blue", category: "Genre" },
  { name: "Romance", count: 856, color: "pink", category: "Genre" },
  { name: "Sci-Fi", count: 723, color: "purple", category: "Genre" },
  { name: "Action", count: 645, color: "red", category: "Genre" },
  { name: "Mystery", count: 534, color: "yellow", category: "Genre" },
  { name: "Horror", count: 423, color: "orange", category: "Genre" },
  { name: "Comedy", count: 389, color: "green", category: "Genre" },
  { name: "Drama", count: 356, color: "pink", category: "Genre" },
  { name: "Historical", count: 289, color: "yellow", category: "Genre" },
  { name: "Supernatural", count: 267, color: "purple", category: "Genre" },
  { name: "Thriller", count: 245, color: "red", category: "Genre" },
  { name: "Cultivation", count: 578, color: "teal", category: "Theme" },
  { name: "Reincarnation", count: 432, color: "purple", category: "Theme" },
  { name: "System", count: 389, color: "blue", category: "Theme" },
  { name: "Magic", count: 367, color: "teal", category: "Theme" },
  { name: "Martial Arts", count: 345, color: "red", category: "Theme" },
  { name: "Harem", count: 312, color: "pink", category: "Theme" },
  { name: "GameLit", count: 298, color: "green", category: "Theme" },
  { name: "LitRPG", count: 276, color: "blue", category: "Theme" },
  { name: "Apocalypse", count: 254, color: "orange", category: "Setting" },
  { name: "Medieval", count: 243, color: "yellow", category: "Setting" },
  { name: "Modern", count: 231, color: "blue", category: "Setting" },
  { name: "Urban", count: 219, color: "purple", category: "Setting" },
  { name: "School", count: 208, color: "green", category: "Setting" },
  { name: "Military", count: 197, color: "red", category: "Setting" },
  { name: "Cyberpunk", count: 186, color: "purple", category: "Setting" },
  { name: "Steampunk", count: 175, color: "orange", category: "Setting" },
  { name: "Isekai", count: 432, color: "teal", category: "Origin" },
  { name: "Chinese", count: 387, color: "red", category: "Origin" },
  { name: "Korean", count: 342, color: "blue", category: "Origin" },
  { name: "Japanese", count: 321, color: "pink", category: "Origin" },
  { name: "Western", count: 298, color: "yellow", category: "Origin" },
  { name: "Fanfiction", count: 276, color: "purple", category: "Origin" },
  { name: "Original", count: 254, color: "green", category: "Origin" },
  { name: "Translated", count: 243, color: "orange", category: "Origin" },
];

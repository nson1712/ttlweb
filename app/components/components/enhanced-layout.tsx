import React from 'react';
import { BookOpen, Filter, Search, Star, Clock, BarChart4, ChevronDown, Sparkles } from 'lucide-react';
import { EnhancedNovelCard } from './enhanced-novel-card';

// This component represents the improved layout for the novels page
export const EnhancedLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white">
      {/* Hero Section with Parallax Effect */}
      <div className="relative h-[300px] md:h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/novels-hero-bg.jpg')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0f172a]"></div>
        
        {/* Floating particles effect (can be implemented with a library like particles.js) */}
        <div className="absolute inset-0 opacity-30" id="particles-container"></div>
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 md:px-8 max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-indigo-400 shimmer">
            Discover Enchanting Worlds
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl text-center mb-8">
            Explore our vast collection of captivating stories across genres and realms
          </p>
          
          {/* Quick Search Bar */}
          <div className="w-full max-w-2xl relative">
            <input 
              type="text" 
              placeholder="Search for novels, authors, or genres..." 
              className="w-full bg-gray-900/80 backdrop-blur-sm text-white border border-gray-700 hover:border-purple-500/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 rounded-full py-3 px-6 pl-12 transition-all"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400">
              <Search size={20} />
            </div>
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-full p-2 transition-all hover:shadow-[0_0_15px_rgba(139,92,246,0.5)]">
              <Filter size={16} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Featured Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 flex items-center">
              <Sparkles className="h-6 w-6 mr-2 text-purple-400" />
              Featured Novels
            </h2>
            <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors text-sm flex items-center">
              View All <ChevronDown className="h-4 w-4 ml-1" />
            </a>
          </div>
          
          {/* Featured Novels Carousel */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* This would be mapped from your novels data */}
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
                {/* Use placeholder data for demonstration */}
                <EnhancedNovelCard 
                  novel={{
                    id: index,
                    title: "The Chronicles of Mystical Realms",
                    author: "Alexandra Rivers",
                    coverImage: "/images/novel-cover.jpg",
                    rating: parseFloat("4.8"),
                    chapters: 256,
                    views: 1250000,
                    reviews: 4500,
                    lastUpdated: "2 days ago",
                    status: "Ongoing",
                    featured: true,
                    categories: ["Fantasy", "Adventure", "Magic", "Romance"],
                    description: "In a world where magic flows like water and dragons soar through the skies, a young apprentice discovers a power that could either save the realm or destroy it forever."
                  }} 
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Categories Section */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 mb-6">
            Browse by Category
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {/* Category Cards */}
            {["Fantasy", "Romance", "Sci-Fi", "Action", "Mystery", "Horror", "Historical", "Comedy", "Drama", "Slice of Life", "Martial Arts", "Adventure"].map((category, index) => (
              <div 
                key={index} 
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-purple-500/50 p-4 text-center transition-all duration-300 hover:bg-gray-700/50 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] cursor-pointer group"
              >
                <div className="h-12 w-12 mx-auto mb-3 bg-gray-700 rounded-full flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-purple-600 group-hover:to-indigo-600 transition-all duration-300">
                  <BookOpen className="h-6 w-6 text-gray-300 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-gray-300 group-hover:text-white font-medium transition-colors">{category}</h3>
                <p className="text-xs text-gray-500 mt-1">
                  {Math.floor(Math.random() * 1000) + 100} novels
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Latest Updates Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 flex items-center">
              <Clock className="h-6 w-6 mr-2 text-purple-400" />
              Latest Updates
            </h2>
            <div className="flex space-x-2">
              <button className="bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white px-3 py-1 rounded-full text-sm transition-colors border border-gray-700 hover:border-purple-500/50">
                Today
              </button>
              <button className="bg-purple-900/50 text-purple-300 px-3 py-1 rounded-full text-sm border border-purple-500/50">
                This Week
              </button>
              <button className="bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white px-3 py-1 rounded-full text-sm transition-colors border border-gray-700 hover:border-purple-500/50">
                This Month
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* This would be mapped from your novels data */}
            {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
              <div key={index} className="transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
                {/* Use placeholder data for demonstration */}
                <EnhancedNovelCard 
                  novel={{
                    id: index + 10,
                    title: `The ${["Hidden", "Lost", "Eternal", "Mystic", "Ancient", "Forgotten", "Celestial", "Arcane"][index % 8]} ${["Kingdom", "Legacy", "Chronicles", "Prophecy", "Artifact", "Grimoire", "Codex", "Realm"][index % 8]}`,
                    author: ["Emma Stone", "Michael Rivers", "Sophia Chen", "James Wilson", "Olivia Taylor", "Daniel Lee", "Isabella Martinez", "William Brown"][index % 8],
                    coverImage: "/images/novel-cover.jpg",
                    rating: parseFloat((4 + Math.random()).toFixed(1)),
                    chapters: Math.floor(Math.random() * 300) + 50,
                    views: Math.floor(Math.random() * 1000000) + 100000,
                    reviews: Math.floor(Math.random() * 5000) + 500,
                    lastUpdated: ["1 hour ago", "3 hours ago", "6 hours ago", "12 hours ago", "1 day ago", "2 days ago", "3 days ago", "5 days ago"][index % 8],
                    status: ["Ongoing", "Ongoing", "Completed", "Ongoing", "Hiatus", "Ongoing", "Completed", "Ongoing"][index % 8] as "Ongoing" | "Completed" | "Hiatus",
                    featured: index % 7 === 0,
                    categories: [
                      ["Fantasy", "Adventure", "Magic"],
                      ["Romance", "Drama", "Supernatural"],
                      ["Sci-Fi", "Mystery", "Thriller"],
                      ["Action", "Martial Arts", "Fantasy"],
                      ["Horror", "Psychological", "Mystery"],
                      ["Historical", "Romance", "Drama"],
                      ["Comedy", "Slice of Life", "School"],
                      ["Adventure", "Fantasy", "Action"]
                    ][index % 8],
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl."
                  }} 
                />
              </div>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-3 px-8 rounded-full transition-all hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]">
              Load More
            </button>
          </div>
        </div>
        
        {/* Popular This Week Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 flex items-center">
              <Star className="h-6 w-6 mr-2 text-purple-400" />
              Popular This Week
            </h2>
            <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors text-sm flex items-center">
              View All <ChevronDown className="h-4 w-4 ml-1" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* This would be mapped from your novels data */}
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
                {/* Use placeholder data for demonstration */}
                <EnhancedNovelCard 
                  novel={{
                    id: index + 20,
                    title: `The ${["Grand", "Epic", "Legendary", "Mythical"][index % 4]} ${["Adventure", "Journey", "Quest", "Tale"][index % 4]}`,
                    author: ["Robert Johnson", "Elizabeth Clark", "Thomas Wright", "Patricia Davis"][index % 4],
                    coverImage: "/images/novel-cover.jpg",
                    rating: parseFloat((4.5 + Math.random() * 0.5).toFixed(1)),
                    chapters: Math.floor(Math.random() * 500) + 100,
                    views: Math.floor(Math.random() * 2000000) + 500000,
                    reviews: Math.floor(Math.random() * 10000) + 1000,
                    lastUpdated: ["2 days ago", "3 days ago", "5 days ago", "1 week ago"][index % 4],
                    status: ["Ongoing", "Completed", "Ongoing", "Ongoing"][index % 4] as "Ongoing" | "Completed" | "Hiatus",
                    featured: true,
                    categories: [
                      ["Fantasy", "Adventure", "Magic", "Action"],
                      ["Romance", "Drama", "Fantasy", "Mystery"],
                      ["Sci-Fi", "Adventure", "Action", "Mystery"],
                      ["Fantasy", "Martial Arts", "Action", "Drama"]
                    ][index % 4],
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl."
                  }} 
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Statistics Section */}
        <div className="mb-16 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 mb-8 flex items-center">
            <BarChart4 className="h-6 w-6 mr-2 text-purple-400" />
            Novel Realm Statistics
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800 hover:border-purple-500/30 transition-all text-center group hover:bg-gray-900/80">
              <div className="text-4xl font-bold text-purple-400 group-hover:text-purple-300 transition-colors mb-2">10,000+</div>
              <div className="text-gray-400 group-hover:text-gray-300 transition-colors">Novels</div>
            </div>
            
            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800 hover:border-indigo-500/30 transition-all text-center group hover:bg-gray-900/80">
              <div className="text-4xl font-bold text-indigo-400 group-hover:text-indigo-300 transition-colors mb-2">2.5M+</div>
              <div className="text-gray-400 group-hover:text-gray-300 transition-colors">Chapters</div>
            </div>
            
            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800 hover:border-blue-500/30 transition-all text-center group hover:bg-gray-900/80">
              <div className="text-4xl font-bold text-blue-400 group-hover:text-blue-300 transition-colors mb-2">500K+</div>
              <div className="text-gray-400 group-hover:text-gray-300 transition-colors">Users</div>
            </div>
            
            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800 hover:border-pink-500/30 transition-all text-center group hover:bg-gray-900/80">
              <div className="text-4xl font-bold text-pink-400 group-hover:text-pink-300 transition-colors mb-2">1.2M+</div>
              <div className="text-gray-400 group-hover:text-gray-300 transition-colors">Reviews</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Stay Updated with New Releases</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Subscribe to our newsletter and never miss updates on new novels, chapters, and exclusive content
          </p>
          
          <div className="flex flex-col sm:flex-row max-w-lg mx-auto gap-4">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 bg-gray-900/80 backdrop-blur-sm text-white border border-gray-700 hover:border-purple-500/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 rounded-full py-3 px-6 transition-all"
            />
            <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-3 px-6 rounded-full transition-all hover:shadow-[0_0_15px_rgba(139,92,246,0.5)]">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

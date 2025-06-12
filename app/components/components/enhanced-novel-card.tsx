import React from 'react';
import { BookOpen, Heart, Star, Eye, Clock, ChevronRight } from 'lucide-react';
import Image from 'next/image';

// Enhanced Novel Card component with majestic styling
interface Novel {
  id: string | number;
  coverImage: string;
  title: string;
  featured?: boolean;
  rating: number;
  status: 'Completed' | 'Ongoing' | 'Hiatus';
  author: string;
  chapters: number;
  views: number;
  lastUpdated: string;
  reviews: number;
  categories: string[];
  description: string;
}

export const EnhancedNovelCard: React.FC<{ novel: Novel }> = ({ novel }) => {
  return (
    <div className="novel-card bg-gray-900/80 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800/50 hover:border-purple-500/30 transition-all duration-300 h-full flex flex-col">
      {/* Card Header with Cover Image */}
      <div className="relative">
        {/* Cover Image */}
        <div className="aspect-[2/3] overflow-hidden">

          <Image 
            src={novel.coverImage} 
            alt={novel.title}
            unoptimized
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80"></div>
        </div>
        
        {/* Featured Badge */}
        {novel.featured && (
          <div className="absolute top-3 left-0 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold py-1 px-3 rounded-r-full shadow-lg pulse">
            FEATURED
          </div>
        )}
        
        {/* Rating */}
        <div className="absolute top-3 right-3 bg-gray-900/80 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
          <Star className="h-3 w-3 text-yellow-400" />
          <span className="text-white text-xs font-medium">{novel.rating}</span>
        </div>
        
        {/* Status Badge */}
        <div className="absolute bottom-3 left-3 flex space-x-2">
          {novel.status === 'Completed' && (
            <div className="bg-green-900/80 backdrop-blur-sm text-green-400 text-xs font-medium px-2 py-1 rounded-full border border-green-700/50">
              Completed
            </div>
          )}
          
          {novel.status === 'Ongoing' && (
            <div className="bg-blue-900/80 backdrop-blur-sm text-blue-400 text-xs font-medium px-2 py-1 rounded-full border border-blue-700/50">
              Ongoing
            </div>
          )}
          
          {novel.status === 'Hiatus' && (
            <div className="bg-orange-900/80 backdrop-blur-sm text-orange-400 text-xs font-medium px-2 py-1 rounded-full border border-orange-700/50">
              Hiatus
            </div>
          )}
        </div>
        
        {/* Bookmark Button */}
        <button className="absolute bottom-3 right-3 bg-gray-900/80 backdrop-blur-sm rounded-full p-2 text-gray-400 hover:text-red-400 transition-colors">
          <Heart className="h-4 w-4" />
        </button>
      </div>
      
      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Title */}
        <h3 className="text-lg font-bold text-white mb-1 line-clamp-2 hover:text-purple-400 transition-colors">
          {novel.title}
        </h3>
        
        {/* Author */}
        <p className="text-sm text-gray-400 mb-3">
          by <span className="text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer">{novel.author}</span>
        </p>
        
        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
          <div className="flex items-center space-x-1 text-gray-400">
            <BookOpen className="h-3 w-3" />
            <span>{novel.chapters} Chapters</span>
          </div>
          
          <div className="flex items-center space-x-1 text-gray-400">
            <Eye className="h-3 w-3" />
            <span>{novel.views.toLocaleString()} Views</span>
          </div>
          
          <div className="flex items-center space-x-1 text-gray-400">
            <Clock className="h-3 w-3" />
            <span>{novel.lastUpdated}</span>
          </div>
          
          <div className="flex items-center space-x-1 text-gray-400">
            <Star className="h-3 w-3" />
            <span>{novel.reviews.toLocaleString()} Reviews</span>
          </div>
        </div>
        
        {/* Categories */}
        <div className="flex flex-wrap gap-1 mb-4">
          {novel.categories.slice(0, 3).map((category, index) => (
            <span 
              key={index} 
              className="text-xs bg-gray-800 hover:bg-purple-900/30 text-gray-300 hover:text-purple-300 px-2 py-1 rounded-full transition-colors cursor-pointer border border-gray-700 hover:border-purple-500/30"
            >
              {category}
            </span>
          ))}
          
          {novel.categories.length > 3 && (
            <span className="text-xs text-gray-500">+{novel.categories.length - 3}</span>
          )}
        </div>
        
        {/* Description */}
        <p className="text-sm text-gray-400 line-clamp-3 mb-4 flex-1">
          {novel.description}
        </p>
        
        {/* Read Button */}
        <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] flex items-center justify-center space-x-1 mt-auto">
          <span>Read Now</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

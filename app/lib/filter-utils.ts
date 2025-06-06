"use client";

import { Novel, FilterOptions } from "../lib/types";

/**
 * Filter novels based on provided filter options
 */
export function filterNovels(novels: Novel[], filterOptions: FilterOptions): Novel[] {
  return novels.filter(novel => {
    if (filterOptions.searchTerm && 
        !novel.title.toLowerCase().includes(filterOptions.searchTerm.toLowerCase())) {
      return false;
    }
    
    if (filterOptions.categories.length > 0 && 
        !filterOptions.categories.some(cate => novel.categories.includes(cate))) {
      return false;
    }
    
    if (filterOptions.hashtags.length > 0 && novel.hashtags &&
        !filterOptions.hashtags.some(tag => novel.hashtags?.includes(tag))) {
      return false;
    }
    
    if (filterOptions.status && filterOptions.status !== 'any' && 
        novel.status !== filterOptions.status) {
      return false;
    }

    // Filter by chapter count
    if (filterOptions.minChapters && novel.chapterCount && 
        novel.chapterCount < filterOptions.minChapters) {
      return false;
    }
    
    if (filterOptions.maxChapters && novel.chapterCount && 
        novel.chapterCount > filterOptions.maxChapters) {
      return false;
    }
    
    // Filter by rating count
    if (filterOptions.minRatings && novel.totalRatings < filterOptions.minRatings) {
      return false;
    }
    
    if (filterOptions.maxRatings && novel.totalRatings > filterOptions.maxRatings) {
      return false;
    }

    return true;
  });
}

/**
 * Sort novels based on sort option
 */
export function sortNovels(novels: Novel[], sortBy: string): Novel[] {
  const sortedNovels = [...novels];
  
  switch (sortBy) {
    case 'rating':
      return sortedNovels.sort((a, b) => b.rating - a.rating);
    case 'chapters':
      return sortedNovels.sort((a, b) => {
        if (!a.chapterCount) return 1;
        if (!b.chapterCount) return -1;
        return b.chapterCount - a.chapterCount;
      });
    case 'recent':
      // This is a simplified sort by update time
      // In a real app, you'd parse the dates properly
      return sortedNovels.sort((a, b) => {
        if (!a.updatedAt) return 1;
        if (!b.updatedAt) return -1;
        return a.updatedAt.localeCompare(b.updatedAt);
      });
    case 'title':
      return sortedNovels.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return sortedNovels;
  }
}

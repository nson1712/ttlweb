"use client";

import { Novel, FilterOptions } from "../lib/types";

/**
 * Filter novels based on provided filter options
 */
export function filterNovels(novels: Novel[], filterOptions: FilterOptions): Novel[] {
  return novels.filter(novel => {
    // Filter by search term
    if (filterOptions.searchTerm && 
        !novel.title.toLowerCase().includes(filterOptions.searchTerm.toLowerCase())) {
      return false;
    }
    
    // Filter by selected genres (if any)
    if (filterOptions.categories.length > 0 && 
        !filterOptions.categories.some(cate => novel.categories.includes(cate))) {
      return false;
    }
    
    // Filter out excluded genres
    if (filterOptions.excludedCategories.length > 0 && 
        filterOptions.excludedCategories.some(exCate => novel.categories.includes(exCate))) {
      return false;
    }
    
    // Filter by tags (if any)
    if (filterOptions.tags.length > 0 && novel.tags &&
        !filterOptions.tags.some(tag => novel.tags?.includes(tag))) {
      return false;
    }
    
    // Filter out excluded tags
    if (filterOptions.excludedTags.length > 0 && novel.tags &&
        filterOptions.excludedTags.some(tag => novel.tags?.includes(tag))) {
      return false;
    }
    
    // Filter by year range
    if (filterOptions.yearFrom && novel.yearOfRelease && 
        novel.yearOfRelease < filterOptions.yearFrom) {
      return false;
    }
    
    if (filterOptions.yearTo && novel.yearOfRelease && 
        novel.yearOfRelease > filterOptions.yearTo) {
      return false;
    }
    
    // Filter by languages
    if (filterOptions.languages.length > 0 && novel.language &&
        !filterOptions.languages.includes(novel.language)) {
      return false;
    }
    
    // Filter out excluded languages
    if (filterOptions.excludedLanguages.length > 0 && novel.language &&
        filterOptions.excludedLanguages.includes(novel.language)) {
      return false;
    }
    
    // Filter by translate status
    if (filterOptions.translateStatus && filterOptions.translateStatus !== 'any' && 
        novel.status !== filterOptions.translateStatus) {
      return false;
    }
    
    // Filter by status in COO
    if (filterOptions.statusInCOO && filterOptions.statusInCOO !== 'any' && 
        novel.status !== filterOptions.statusInCOO) {
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
    
    // Filter by authors
    if (filterOptions.authors && filterOptions.authors.length > 0 &&
        !filterOptions.authors.includes(novel.author)) {
      return false;
    }
    
    // Filter out excluded authors
    if (filterOptions.excludedAuthors && filterOptions.excludedAuthors.length > 0 &&
        filterOptions.excludedAuthors.includes(novel.author)) {
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

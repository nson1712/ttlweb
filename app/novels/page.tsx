"use client";

import { useState, useEffect } from "react";
import { NovelCard } from "../components/novels/novel-card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Novel, FilterOptions } from "../lib/types";
import { mockNovels, availableCategories, availableTags, languages } from "../lib/mock-data";
import { filterNovels, sortNovels } from "../lib/filter-utils";

export default function NovelsPage() {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [isClient, setIsClient] = useState(false);
  // const [novels, setNovels] = useState<Novel[]>(mockNovels);
  const [novels] = useState<Novel[]>(mockNovels);
  const [filteredNovels, setFilteredNovels] = useState<Novel[]>(mockNovels);
  
  // Filter state
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    categories: [],
    excludedCategories: [],
    tags: [],
    excludedTags: [],
    searchTerm: "",
    languages: [],
    excludedLanguages: [],
    sortBy: "default"
  });

  // Apply filters when filter options change
  useEffect(() => {
    const filtered = filterNovels(novels, filterOptions);
    const sorted = sortNovels(filtered, filterOptions.sortBy);
    setFilteredNovels(sorted);
  }, [novels, filterOptions]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Toggle cateogies selection
  const toggleCategories = (cate: string) => {
    setFilterOptions(prev => {
      if (prev.categories.includes(cate)) {
        return {
          ...prev,
          categories: prev.categories.filter(g => g !== cate)
        };
      } else {
        return {
          ...prev,
          categories: [...prev.categories, cate]
        };
      }
    });
  };

  // Toggle excluded cate
  const toggleExcludedCategories = (cate: string) => {
    setFilterOptions(prev => {
      if (prev.excludedCategories.includes(cate)) {
        return {
          ...prev,
          excludedCategories: prev.excludedCategories.filter(g => g !== cate)
        };
      } else {
        return {
          ...prev,
          excludedCategories: [...prev.excludedCategories, cate]
        };
      }
    });
  };

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    setFilterOptions(prev => {
      if (prev.tags.includes(tag)) {
        return {
          ...prev,
          tags: prev.tags.filter(t => t !== tag)
        };
      } else {
        return {
          ...prev,
          tags: [...prev.tags, tag]
        };
      }
    });
  };

  // Toggle excluded tag
  const toggleExcludedTag = (tag: string) => {
    setFilterOptions(prev => {
      if (prev.excludedTags.includes(tag)) {
        return {
          ...prev,
          excludedTags: prev.excludedTags.filter(t => t !== tag)
        };
      } else {
        return {
          ...prev,
          excludedTags: [...prev.excludedTags, tag]
        };
      }
    });
  };

  // Toggle language selection
  const toggleLanguage = (language: string) => {
    setFilterOptions(prev => {
      if (prev.languages.includes(language)) {
        return {
          ...prev,
          languages: prev.languages.filter(l => l !== language)
        };
      } else {
        return {
          ...prev,
          languages: [...prev.languages, language]
        };
      }
    });
  };

  // Toggle excluded language
  const toggleExcludedLanguage = (language: string) => {
    setFilterOptions(prev => {
      if (prev.excludedLanguages.includes(language)) {
        return {
          ...prev,
          excludedLanguages: prev.excludedLanguages.filter(l => l !== language)
        };
      } else {
        return {
          ...prev,
          excludedLanguages: [...prev.excludedLanguages, language]
        };
      }
    });
  };

  // Handle search term change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterOptions(prev => ({
      ...prev,
      searchTerm: e.target.value
    }));
  };

  // Handle sort change
  const handleSortChange = (value: string) => {
    setFilterOptions(prev => ({
      ...prev,
      sortBy: value
    }));
  };

  // Handle year range change
  const handleYearFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseInt(e.target.value) : undefined;
    setFilterOptions(prev => ({
      ...prev,
      yearFrom: value
    }));
  };

  const handleYearToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseInt(e.target.value) : undefined;
    setFilterOptions(prev => ({
      ...prev,
      yearTo: value
    }));
  };

  // Handle chapter range change
  const handleMinChaptersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseInt(e.target.value) : undefined;
    setFilterOptions(prev => ({
      ...prev,
      minChapters: value
    }));
  };

  const handleMaxChaptersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseInt(e.target.value) : undefined;
    setFilterOptions(prev => ({
      ...prev,
      maxChapters: value
    }));
  };

  // Handle ratings range change
  const handleMinRatingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseInt(e.target.value) : undefined;
    setFilterOptions(prev => ({
      ...prev,
      minRatings: value
    }));
  };

  const handleMaxRatingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseInt(e.target.value) : undefined;
    setFilterOptions(prev => ({
      ...prev,
      maxRatings: value
    }));
  };

  // Handle translate status change
  const handleTranslateStatusChange = (value: string) => {
    setFilterOptions(prev => ({
      ...prev,
      translateStatus: value
    }));
  };

  // Handle status in COO change
  const handleStatusInCOOChange = (value: string) => {
    setFilterOptions(prev => ({
      ...prev,
      statusInCOO: value
    }));
  };

  // Reset all filters
  const resetFilters = () => {
    setFilterOptions({
      categories: [],
      excludedCategories: [],
      tags: [],
      excludedTags: [],
      searchTerm: "",
      languages: [],
      excludedLanguages: [],
      sortBy: "default"
    });
  };

  // Apply search
  const applySearch = () => {
    // This function is mostly for UI feedback since filtering happens automatically via useEffect
    console.log("Applying search with filters:", filterOptions);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Novels</h1>
      
      {/* Search and Filter Section */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <Label htmlFor="categories">Categories</Label>
            <Input 
              id="categories" 
              placeholder="Slice of Life, Drama etc..." 
              value={filterOptions.categories.join(", ")}
              readOnly
              onClick={() => setShowAdvancedFilters(true)}
              className="bg-gray-700 text-white border-gray-600"
            />
          </div>
          
          <div className="flex-1">
            <Label htmlFor="exclude-categories">Exclude Categories</Label>
            <Input 
              id="exclude-categories" 
              placeholder="Yaoi, Josei, Shounen Ai, Gender Bender etc..." 
              value={filterOptions.excludedCategories.join(", ")}
              readOnly
              onClick={() => setShowAdvancedFilters(true)}
              className="bg-gray-700 text-white border-gray-600"
            />
          </div>
        </div>
        
        <div className="flex items-end gap-4">
          <div className="flex-1">
            <Label htmlFor="search">Novel title must contain</Label>
            <Input 
              id="search" 
              placeholder="Reincarn.." 
              value={filterOptions.searchTerm}
              onChange={handleSearchChange}
              className="bg-gray-700 text-white border-gray-600"
            />
          </div>
          
          <Button 
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            variant="outline"
          >
            {isClient && showAdvancedFilters ? "Hide options" : "More options"}
          </Button>
          
          <Button 
            className="bg-red-600 hover:bg-red-700"
            onClick={applySearch}
          >
            SEARCH
          </Button>
          
          <Button 
            variant="outline"
            onClick={resetFilters}
          >
            RESET
          </Button>
        </div>
        
        {/* Advanced Filters */}
        {showAdvancedFilters && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Categories Section */}
            <div>
              <Label className="block mb-2 text-purple-400">Categories</Label>
              <div className="grid grid-cols-2 gap-2 mt-2 max-h-40 overflow-y-auto">
                {availableCategories.map(cate => (
                  <div key={cate} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`cate-${cate}`} 
                      className="cursor-pointer border-gray-600 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                      checked={filterOptions.categories.includes(cate)}
                      onCheckedChange={() => toggleCategories(cate)}
                    />
                    <Label htmlFor={`cate-${cate}`} className="text-sm">{cate}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Exclude Categories Section */}
            <div>
              <Label className="block mb-2 text-red-400">Exclude Categories</Label>
              <div className="grid grid-cols-2 gap-2 mt-2 max-h-40 overflow-y-auto">
                {availableCategories.map(cate => (
                  <div key={`exclude-${cate}`} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`exclude-cate-${cate}`}
                      className="cursor-pointer border-gray-600 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                      checked={filterOptions.excludedCategories.includes(cate)}
                      onCheckedChange={() => toggleExcludedCategories(cate)}
                    />
                    <Label htmlFor={`exclude-cate-${cate}`} className="text-sm">{cate}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Tags Section */}
            <div>
              <Label className="block mb-2 text-blue-400">Tags (events)</Label>
              <div className="grid grid-cols-2 gap-2 mt-2 max-h-40 overflow-y-auto">
                {availableTags.map(tag => (
                  <div key={tag} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`tag-${tag}`}
                      className="cursor-pointer border-gray-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      checked={filterOptions.tags.includes(tag)}
                      onCheckedChange={() => toggleTag(tag)}
                    />
                    <Label htmlFor={`tag-${tag}`} className="text-sm">{tag}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Exclude Tags Section */}
            <div>
              <Label className="block mb-2 text-orange-400">Exclude tags</Label>
              <div className="grid grid-cols-2 gap-2 mt-2 max-h-40 overflow-y-auto">
                {availableTags.map(tag => (
                  <div key={`exclude-${tag}`} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`exclude-tag-${tag}`}
                      className="cursor-pointer border-gray-600 data-[state=checked]:bg-orange-600 data-[state=checked]:border-orange-600"
                      checked={filterOptions.excludedTags.includes(tag)}
                      onCheckedChange={() => toggleExcludedTag(tag)}
                    />
                    <Label htmlFor={`exclude-tag-${tag}`} className="text-sm">{tag}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Sort Results */}
            <div>
              <Label htmlFor="sort" className="text-indigo-400">Sort results</Label>
              <Select 
                value={filterOptions.sortBy} 
                onValueChange={handleSortChange}
              >
                <SelectTrigger className="bg-gray-700 text-white border-gray-600">
                  <SelectValue placeholder="Default" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="rating">Rating (High to Low)</SelectItem>
                  <SelectItem value="chapters">Chapters (High to Low)</SelectItem>
                  <SelectItem value="recent">Recently Updated</SelectItem>
                  <SelectItem value="title">Title (A-Z)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Year Range */}
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="year-from" className="text-green-400">Year of release from</Label>
                <Input 
                  id="year-from" 
                  placeholder="1990" 
                  type="number"
                  value={filterOptions.yearFrom || ""}
                  onChange={handleYearFromChange}
                  className="bg-gray-700 text-white border-gray-600"
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="year-to" className="text-cyan-400">Year of release up to</Label>
                <Input 
                  id="year-to" 
                  placeholder="2022" 
                  type="number"
                  value={filterOptions.yearTo || ""}
                  onChange={handleYearToChange}
                  className="bg-gray-700 text-white border-gray-600"
                />
              </div>
            </div>
            
            {/* Languages */}
            <div>
              <Label className="block mb-2 text-lime-400">Languages</Label>
              <div className="grid grid-cols-2 gap-2">
                {languages.map(language => (
                  <div key={language} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`lang-${language}`}
                      className="cursor-pointer border-gray-600 data-[state=checked]:bg-lime-600 data-[state=checked]:border-lime-600"
                      checked={filterOptions.languages.includes(language)}
                      onCheckedChange={() => toggleLanguage(language)}
                    />
                    <Label htmlFor={`lang-${language}`} className="text-sm">{language}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Exclude Languages */}
            <div>
              <Label className="block mb-2 text-pink-400">Exclude languages</Label>
              <div className="grid grid-cols-2 gap-2">
                {languages.map(language => (
                  <div key={`exclude-${language}`} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`exclude-lang-${language}`}
                      className="cursor-pointer border-gray-600 data-[state=checked]:bg-pink-600 data-[state=checked]:border-pink-600"
                      checked={filterOptions.excludedLanguages.includes(language)}
                      onCheckedChange={() => toggleExcludedLanguage(language)}
                    />
                    <Label htmlFor={`exclude-lang-${language}`} className="text-sm">{language}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Translate Status */}
            <div>
              <Label htmlFor="translate-status">Translate status</Label>
              <Select 
                value={filterOptions.translateStatus || "any"}
                onValueChange={handleTranslateStatusChange}
              >
                <SelectTrigger className="bg-gray-700 text-white border-gray-600">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="hiatus">Hiatus</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Status in COO */}
            <div>
              <Label htmlFor="status-coo">Status in COO</Label>
              <Select 
                value={filterOptions.statusInCOO || "any"}
                onValueChange={handleStatusInCOOChange}
              >
                <SelectTrigger className="bg-gray-700 text-white border-gray-600">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="hiatus">Hiatus</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Chapter Range */}
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="min-chapters">Minimum chapters</Label>
                <Input 
                  id="min-chapters" 
                  placeholder="50" 
                  type="number"
                  value={filterOptions.minChapters || ""}
                  onChange={handleMinChaptersChange}
                  className="bg-gray-700 text-white border-gray-600"
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="max-chapters">Maximum chapters</Label>
                <Input 
                  id="max-chapters" 
                  placeholder="12000" 
                  type="number"
                  value={filterOptions.maxChapters || ""}
                  onChange={handleMaxChaptersChange}
                  className="bg-gray-700 text-white border-gray-600"
                />
              </div>
            </div>
            
            {/* Ratings Range */}
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="min-ratings">Minimum ratings</Label>
                <Input 
                  id="min-ratings" 
                  placeholder="0" 
                  type="number"
                  value={filterOptions.minRatings || ""}
                  onChange={handleMinRatingsChange}
                  className="bg-gray-700 text-white border-gray-600"
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="max-ratings">Maximum ratings</Label>
                <Input 
                  id="max-ratings" 
                  placeholder="1000" 
                  type="number"
                  value={filterOptions.maxRatings || ""}
                  onChange={handleMaxRatingsChange}
                  className="bg-gray-700 text-white border-gray-600"
                />
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Novels Listing */}
      <div className="space-y-6">
        {filteredNovels.length > 0 ? (
          filteredNovels.map((novel) => (
            <NovelCard key={novel.slug} {...novel} />
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-400">No novels found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}

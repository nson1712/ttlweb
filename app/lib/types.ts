// Define types for the application

export interface Novel {
  id: string;
  slug: string;
  title: string;
  coverImage: string;
  author: string;
  rating: number;
  totalRatings: number;
  categories: string[];
  description?: string;
  updatedAt?: string;
  chapterCount?: number;
  language?: string;
  status?: 'ongoing' | 'completed' | 'hiatus';
  yearOfRelease?: number;
  tags?: string[];
}

export interface Chapter {
  slug: string;
  storySlug: string;
  title: string;
  number: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface FilterOptions {
  categories: string[];
  excludedCategories: string[];
  tags: string[];
  excludedTags: string[];
  searchTerm: string;
  yearFrom?: number;
  yearTo?: number;
  languages: string[];
  excludedLanguages: string[];
  translateStatus?: string;
  statusInCOO?: string;
  minChapters?: number;
  maxChapters?: number;
  minRatings?: number;
  maxRatings?: number;
  authors?: string[];
  excludedAuthors?: string[];
  translators?: string[];
  excludedTranslators?: string[];
  sortBy: string;
}

export interface Champion {
  id: string
  name: string
  title: string
  region: string
  description: string
  image: string
  tags: string[]
}

export interface Region {
  id: string
  name: string
  description: string
  image: string
  bannerImage: string
}

export interface Story {
  id: string
  title: string
  description: string
  image: string
  date: string
  author: string
}

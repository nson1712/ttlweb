// Define types for the application

export interface Novel {
  id: string;
  slug: string;
  title: string;
  coverImage: string;
  author: string;
  rating: number;
  totalRatings: number;
  genres: string[];
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
  genres: string[];
  excludedGenres: string[];
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

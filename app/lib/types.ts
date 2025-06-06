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
  status?: "ongoing" | "completed" | "hiatus";
  yearOfRelease?: number;
  hashtags?: string[];
  featuredReason?: string;
  views?: number;
}

export interface Chapter {
  id?: string;
  slug: string;
  novelSlug: string;
  title: string;
  views?: number;
  number: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  releaseDate?: string;
  isNew?: boolean;
}

export interface FilterOptions {
  [key: string]: string | string[] | number | undefined;
  categories: string[];
  hashtags: string[];
  searchTerm: string;
  status?: string;
  minChapters?: number;
  maxChapters?: number;
  minRatings?: number;
  maxRatings?: number;
  // sort: string;
}

export interface Story {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  author: string;
}

export type CategoryType = {
  id: number;
  name: string;
  slug: string;
};

export type AuthorType = {
  id: number;
  avatar: string;
  name?: string;
  slug?: string;
  status?: string;
  totalStory?: number
};

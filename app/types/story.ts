import { AuthorType, CategoryType } from "../lib/types";
import { TCategory } from "./category";

export type StoryType = {
  id: string;
  title: string;
  author?: AuthorType;
  coverImage: string;
  status?: string;
  slug: string;
  rate: number;
  totalView: number;
  totalChapter: number
  mainCategories: TCategory[];
  updatedAt: string;
  shortDescription: string;
  categories: TCategory[];
};

export type WeeklyStoryPropsType = {
  weeklyStory: StoryType;
};

export type PotenialStarletType = {
  id: string;
  author?: AuthorType;
  title: string;
  coverImage: string;
  status?: string;
  slug: string;
  rate: number;
  totalView: number;
  mainCategories: TCategory[];
  updatedAt: string;
  shortDescription: string;
  categories: TCategory[];
};

export type RankingNovelProps = {
  id: string;
  slug: string;
  title: string;
  coverImage: string;
  author: AuthorType;
  rate: number;
  categories: CategoryType[];
  rank: number;
};

export type RecentUpdatesType = {
  id: number;
  status: string;
  slug: string;
  chapterSlug: string;
  chapterId: number;
  coverImage: string;
  rate: number;
  title: string;
  chapterTitle: string;
  updatedAt: string;
};

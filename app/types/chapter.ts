export type ChapterType = {
  id: string;
  storyId: string;
  title: string;
  slug: string;
  order: number;
  seoTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  status: string;
  price: number;
  prevChapterId: number;
  nextChapterId: number;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
};

export type ChapterDetailType = {
  id: string;
  content: string;
  order: number;
};

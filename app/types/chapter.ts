export type ChapterType = {
  id: string;
  storyId: string;
  title: string;
  slug: string;
  order: number;
  status: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type ChapterDetailType = {
  id: string;
  content: string;
  order: number;
  chapterId: number;
  totalReport: number;
  totalComment: number;
};

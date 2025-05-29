import { ChapterDetailType, ChapterType } from "../types/chapter";
import {
  PotenialStarletType,
  RankingNovelProps,
  StoryType,
} from "../types/story";

export interface StoryApiResponse {
  data: {
    data: StoryType[];
    totalElements: number;
    totalPages: number;
    page: number;
    size: number;
    hasNext: boolean;
  };
}

export interface PotentialStarletApiResponse {
  data: {
    data: PotenialStarletType[];
    totalElements: number;
    totalPages: number;
    page: number;
    size: number;
    hasNext: boolean;
  };
}

export interface RankingNovelApiResponse {
  data: {
    data: RankingNovelProps[];
    totalElements: number;
    totalPages: number;
    page: number;
    size: number;
    hasNext: boolean;
  };
}

export interface StoryDetailsApiResponse {
  data: {
    data: StoryType;
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
  hasNext: boolean;
  }
}
export interface ChaptersApiResponse {
  data: {
    data: ChapterType[];
    totalElements: number;
    totalPages: number;
    page: number;
    size: number;
    hasNext: boolean;
  };
}

export interface ChapterApiResponse {
  data: ChapterType
}
export interface ChapterDetailsApiResponse {
    data: ChapterDetailType[];
}

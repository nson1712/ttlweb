import {
  ChapterApiResponse,
  ChapterDetailsApiResponse,
  ChaptersApiResponse,
  QuestionApiResponse,
  StoriesApiResponse,
  StoryDetailsApiResponse,
} from "../interfaces/story";
import { httpClient } from "../utils/httpClient";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

export const fetchStories = async ({
  page,
  pageSize,
  sort,
  filter,
  deviceId: deviceId,
}: {
  page: number | undefined;
  pageSize: number | undefined;
  sort?: string;
  filter?: string;
  deviceId?: string;
}): Promise<StoriesApiResponse> => {
  return await httpClient.get({
    url: "/api/story",
    params: {
      page: page || 0,
      size: pageSize || 20,
      sort: sort,
      filter: filter,
    },
    headers: {
      deviceId: deviceId ?? "",
    } as Record<string, string>,
  });
};

export const fetchStoryDetails = async ({
  slug,
  deviceId,
}: {
  slug: string;
  deviceId?: string;
}): Promise<StoryDetailsApiResponse> => {
  const res = await fetch(`${BASE_URL}/api/story/${slug}`, {
    next: { revalidate: 60 },
    headers: {
      deviceId: deviceId ?? "",
    } as Record<string, string>,
  });
  if (!res.ok) throw new Error("Failed to fetch story details");
  const json = await res.json();

  return {
    data: {
      data: json.data,
      totalElements: json?.totalElements ?? 0,
      totalPages: json?.totalPages ?? 0,
      page: json?.page ?? 0,
      size: json?.size ?? 0,
      hasNext: json?.hasNext ?? false,
    },
  };
};

export const fetchChapters = async ({
  storyId,
  page,
  pageSize,
  sortType = "ASC",
  deviceId,
}: {
  storyId: number;
  page: number;
  pageSize: number;
  sortType?: string;
  deviceId?: string;
}): Promise<ChaptersApiResponse> => {
  const params = new URLSearchParams({
    page: String(page || 0),
    size: String(pageSize || 20),
    filter: `storyId|eq|${storyId}`,
    sort: `createdAt:${sortType}`,
  });
  const res = await fetch(`${BASE_URL}/chapters?${params.toString()}`, {
    next: { revalidate: 60 },
    headers: {
      deviceId: deviceId ?? "",
    },
  });
  if (!res.ok) throw new Error("Failed to fetch chapters");
  return res.json();
};

export const fetchBySlug = async ({
  slug,
  chapterSlug,
  deviceId,
}: {
  slug: string;
  chapterSlug: string;
  deviceId: string;
}): Promise<ChapterApiResponse> => {
  const res = await fetch(`${BASE_URL}/chapter/${slug}/${chapterSlug}`, {
    next: { revalidate: 60 },
    headers: {
      deviceId: deviceId,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch chapter by slug");
  return res.json();
};

export const fetchById = async ({
  chapterId,
  deviceId,
}: {
  chapterId: number;
  deviceId: string;
}): Promise<ChapterApiResponse> => {
  const res = await fetch(`${BASE_URL}/chapter/${chapterId}`, {
    next: { revalidate: 60 },
    headers: {
      deviceId: deviceId,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch chapter by id");
  return res.json();
};

export const fetchContents = async ({
  chapterId,
  deviceId,
}: {
  chapterId: number;
  deviceId: string;
}): Promise<ChapterDetailsApiResponse> => {
  const res = await httpClient.get({
    url: "/chapter/details",
    params: { chapterId: chapterId.toString() },
    headers: {
      deviceId: deviceId,
    },
  });
  return res;
};

export const fetchQuestion = async (): Promise<QuestionApiResponse> => {
  return await httpClient.get({
    url: "/api/story/question",
  });
};

export const fetchLatestChapters = async ({
  page,
  pageSize,
  deviceId,
}: {
  page: number;
  pageSize: number;
  deviceId: string;
}) => {
  return (
    await httpClient.get({
      url: "/api/story/latest-chapter",
      params: { page: page ?? 0, size: pageSize ?? 20 },
      headers: {
        deviceId: deviceId,
      },
    })
  ).data;
};

export const fetchPotential = async ({
  page,
  pageSize,
  deviceId,
}: {
  page: number | undefined;
  pageSize: number | undefined;
  deviceId: string;
}): Promise<StoriesApiResponse | null> => {
  try {
    const res = await httpClient.get({
      url: "/api/story/potential/list",
      params: {
        page: page || 0,
        size: pageSize || 20,
      },
      headers: {
        deviceId: deviceId,
      },
    });
    return res;
  } catch (error) {
    console.error("error: ", error);
    return null;
  }
};

export const fetchWeekly = async ({ deviceId }: { deviceId: string }) => {
  return (
    await httpClient.get({
      url: "/api/story/weekly/list",
      params: { page: 0, size: 20 },
      headers: {
        deviceId: deviceId,
      },
    })
  ).data;
};

export const fetchRanking = async ({ deviceId }: { deviceId: string }) => {
  return (
    await httpClient.get({
      url: "/api/story/ranking/list",
      params: { page: 0, size: 10 },
      headers: {
        deviceId: deviceId,
      },
    })
  ).data;
};

export const fetchCategories = async ({ deviceId }: { deviceId: string }) => {
  return (
    await httpClient.get({
      url: "/api/category/list",
      headers: {
        deviceId: deviceId,
      },
    })
  ).data;
};

export const fetchFeature = async ({ deviceId }: { deviceId: string }) => {
  return await httpClient.get({
    url: "/api/story",
    params: {
      sort: "rate:DESC",
    },
    headers: {
      deviceId: deviceId,
    },
  });
};

export const fetchBestStories = async ({ deviceId }: { deviceId: string }) => {
  return await httpClient.get({
    url: "/api/story",
    params: {
      page: 0,
      size: 20,
      filter: "rate|gt|4.0",
    },
    headers: {
      deviceId: deviceId,
    },
  });
};

// export const fetchHashtag() {
//   return (
//     await httpClient.get({
//       url: "private/hash-tag/popular",
//       params: { page: 1, size: 20 },
//     })
//   ).data;
// }

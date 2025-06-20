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
}: {
  page: number | undefined;
  pageSize: number | undefined;
  sort?: string;
  filter?: string;
}): Promise<StoriesApiResponse> => {
  const res =  await httpClient.get({
    url: "/api/story",
    params: {
      page: page || 0,
      size: pageSize || 20,
      sort: sort,
      filter: filter,
    },
  });

  return res
};

// export const fetchStoryDetails = async (
//   slug: string
// ): Promise<StoryDetailsApiResponse> => {
//   const res = await httpClient.get({
//     url: `/api/story/${slug}`,
//   });
//   return {
//     data: {
//       data: res.data,
//       totalElements: res.data?.totalElements ?? 0,
//       totalPages: res.data?.totalPages ?? 0,
//       page: res.data?.page ?? 0,
//       size: res.data?.size ?? 0,
//       hasNext: res.data?.hasNext ?? false,
//     },
//   };
// };

// export const fetchChapters = async ({
//   storyId,
//   page,
//   pageSize,
//   sortType,
// }: {
//   storyId: number;
//   page: number;
//   pageSize: number;
//   sortType?: string;
// }): Promise<ChaptersApiResponse> => {
//   const res = await httpClient.get({
//     url: "/chapters",
//     params: {
//       page: page || 0,
//       size: pageSize || 20,
//       filter: `storyId|eq|${storyId}`,
//       sort: `createdAt:${sortType ?? "ASC"}`,
//     },
//   });
//   return res;
// };

// export const fetchBySlug = async (
//   {
//     slug,
//   chapterSlug
//   }: {
//     slug: string,
//   chapterSlug: string
//   }
// ): Promise<ChapterApiResponse> => {
//   const res = await httpClient.get({
//     url: `/chapter/${slug}/${chapterSlug}`,
//   });
//   return res;
// }

// export const fetchById = async (chapterId: number): Promise<ChapterApiResponse> => {
//   const res = await httpClient.get({
//     url: `/chapter/${chapterId}`,
//   });
//   return res;
// }

export const fetchStoryDetails = async (
  slug: string
): Promise<StoryDetailsApiResponse> => {
  const res = await fetch(
    `${BASE_URL}/api/story/${slug}`,
    {
      next: { revalidate: 60 },
    }
  );
  if (!res.ok) throw new Error("Failed to fetch story details");
  const json = await res.json();

  return {
    data: {
      data: json.data,
      totalElements: json?.totalElements ?? 0,
      totalPages:   json?.totalPages   ?? 0,
      page:         json?.page         ?? 0,
      size:         json?.size         ?? 0,
      hasNext:      json?.hasNext      ?? false,
    },
  };
};

export const fetchChapters = async ({
  storyId,
  page,
  pageSize,
  sortType = "ASC",
}: {
  storyId: number;
  page: number;
  pageSize: number;
  sortType?: string;
}): Promise<ChaptersApiResponse> => {
  const params = new URLSearchParams({
    page:  String(page || 0),
    size:  String(pageSize || 20),
    filter:`storyId|eq|${storyId}`,
    sort:  `createdAt:${sortType}`,
  });
  const res = await fetch(
    `${BASE_URL}/chapters?${params.toString()}`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) throw new Error("Failed to fetch chapters");
  return res.json();
};

export const fetchBySlug = async (
  { slug, chapterSlug }: { slug: string; chapterSlug: string }
): Promise<ChapterApiResponse> => {
  const res = await fetch(
    `${BASE_URL}/chapter/${slug}/${chapterSlug}`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) throw new Error("Failed to fetch chapter by slug");
  return res.json();
};

export const fetchById = async (
  chapterId: number
): Promise<ChapterApiResponse> => {
  const res = await fetch(
    `${BASE_URL}/chapter/${chapterId}`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) throw new Error("Failed to fetch chapter by id");
  return res.json();
};

export const  fetchContents = async (
  chapterId: number
): Promise<ChapterDetailsApiResponse> => {
  const res = await httpClient.get({
    url: "/chapter/details",
    params: { chapterId: chapterId.toString() },
  });
  return res;
}


export const fetchQuestion = async (): Promise<QuestionApiResponse> => {
  return await httpClient.get({
    url: "/api/story/question"
  })
}

export const fetchLatestChapters = async ({
  page,
  pageSize
}: {
  page: number,
  pageSize: number
}) => {
    return (
      await httpClient.get({
        url: "/api/story/latest-chapter",
        params: { page: page ?? 0, size: pageSize ?? 20 },
      })
    ).data;
  }

export const fetchPotential = async (
  {
    page,
  pageSize
  }: {
    page: number | undefined,
  pageSize: number | undefined
  }
): Promise<StoriesApiResponse | null> => {
  try {
    const res = await httpClient.get({
      url: "/api/story/potential/list",
      params: {
        page: page || 0,
        size: pageSize || 20,
      },
    });
    return res;
  } catch (error) {
    console.error("error: ", error);
    return null;
  }
};


export const fetchWeekly = async () => {
  return (
    await httpClient.get({
      url: "/api/story/weekly/list",
      params: { page: 0, size: 20 },
    })
  ).data;
};

export const fetchRanking = async () => {
  return (
    await httpClient.get({
      url: "/api/story/ranking/list",
      params: { page: 0, size: 10 },
    })
  ).data;
};

export const fetchCategories = async () => {
  return (
    await httpClient.get({
      url: "/api/category/list",
    })
  ).data;
};

export const fetchFeature = async () => {
  return await httpClient.get({
    url: "/api/story",
    params: {
      sort: "rate:DESC",
    },
  });
};

export const fetchBestStories = async () => {
  return await httpClient.get({
    url: "/api/story",
    params: {
      page: 0,
      size: 20,
      filter: "rate|gt|4.0",
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

// import { NovelCard } from "../components/novels/novel-card";
import { Filter } from "../components/components/filter";
import { PaginationWithLinks } from "../components/components/pagination";
import { NovelCard } from "../components/novels/novel-card";
import { StoriesApiResponse } from "../interfaces/story";
import { StoryType } from "../types/story";
import { httpClient } from "../utils/httpClient";

const fetchStories = async (
  page: number | undefined,
  pageSize: number | undefined,
  filter: string
): Promise<StoriesApiResponse> => {
  return await httpClient.get({
    url: "api/story",
    params: {
      page: page || 0,
      size: pageSize || 20,
      filter: filter,
    },
  });
};

async function fetchCategories() {
  return (
    await httpClient.get({
      url: "api/category/list",
    })
  ).data;
}

export default async function NovelsPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: number | undefined;
    pageSize?: number | undefined;
    filter: string;
  }>;
}) {
  const { page, pageSize, filter } = await searchParams;
  const parsedPage = typeof page === "string" ? parseInt(page, 10) : page ?? 0;
  const parsedPageSize = typeof pageSize === "string" ? parseInt(pageSize, 10) : pageSize ?? 20;
  const [storiesRes, categoriesRes] = await Promise.all([
    fetchStories(page ?? 0, pageSize ?? 20, filter),
    fetchCategories(),
  ]);

  const operators = new Map<string, string>([
    ["title", "like"],
    ["status", "eq"],
    ["categories.slug", "in"],
    ["hashtags.name", "in"],
    ["status", "eq"],
    ["from", "ge"],
    ["to", "le"],
  ]);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Danh sách truyện</h1>

      {/* Search and Filter Section */}
      <Filter
        categories={categoriesRes}
        operators={operators}
        searchKey="title"
      />

      {/* Novels Listing */}
      <div className="space-y-4">
        {storiesRes.data.totalElements > 0 ? (
          storiesRes.data.data.map((novel: StoryType) => {
            return <NovelCard key={novel.slug} {...novel} />;
          })
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-400">Không tìm thấy truyện</p>
          </div>
        )}
      </div>
      <PaginationWithLinks
          pageSearchParam="page"
          pageSizeSelectOptions={{
            pageSizeSearchParam: "pageSize",
            pageSizeOptions: [10, 20, 50, 100],
          }}
          page={parsedPage}
          pageSize={parsedPageSize}
          totalCount={
            storiesRes?.data?.totalElements
              ?  storiesRes.data.totalElements - parsedPageSize
              : 0
          }
        />
    </div>
  );
}

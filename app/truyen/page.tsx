import { cookies } from "next/headers";
import { Filter } from "../components/components/filter";
import { NotFound } from "../components/components/not-found";
import { PaginationWithLinks } from "../components/components/pagination";
import { NovelCard } from "../components/novels/novel-card";
import { fetchCategories, fetchStories } from "../lib/fetch-data";
import { StoryType } from "../types/story";
import { LSK_DEVICE_ID } from "../utils/storage";

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
  const parsedPageSize =
    typeof pageSize === "string" ? parseInt(pageSize, 10) : pageSize ?? 20;
  const deviceId = (await cookies()).get(LSK_DEVICE_ID)?.value ?? "";

  const [storiesRes, categoriesRes] = await Promise.all([
    fetchStories({
      page: page ?? 0,
      pageSize: pageSize ?? 0,
      filter: filter,
      deviceId: deviceId,
    }),
    fetchCategories({ deviceId: deviceId }),
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
        {storiesRes?.data?.data?.length ? (
          storiesRes.data.data.map((novel: StoryType) => {
            return <NovelCard key={novel.slug} {...novel} />;
          })
        ) : (
          <NotFound href="/truyen" title="Quay lại" />
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
        totalCount={storiesRes?.data?.totalElements}
      />
    </div>
  );
}

import { NotFound } from "../components/components/not-found";
import { PaginationWithLinks } from "../components/components/pagination";
import { NovelCard } from "../components/novels/novel-card";
import { fetchPotential, totalElementsCache } from "../lib/fetch-data";
import { StoryType } from "../types/story";

export default async function PotentialStarletsPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: number | undefined;
    pageSize?: number | undefined;
  }>;
}) {
  const { page, pageSize } = await searchParams;
  const parsedPage = typeof page === "string" ? parseInt(page, 10) : page ?? 0;
  const parsedPageSize =
    typeof pageSize === "string" ? parseInt(pageSize, 10) : pageSize ?? 20;

  const potentialRes = await fetchPotential({
    page: parsedPage,
    pageSize: parsedPageSize
  });

  const totalElements =
    potentialRes?.data?.totalElements ??
    totalElementsCache[parsedPageSize] ??
    0;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Danh sách truyện tiềm năng</h1>

      <div className="space-y-4">
        {potentialRes?.data &&
        typeof potentialRes.data.totalElements === "number" &&
        potentialRes.data.totalElements > 0 ? (
          potentialRes?.data?.data?.map((novel: StoryType, index) => {
            return novel && <NovelCard key={novel?.slug ?? index} {...novel} />;
          })
        ) : (
          <NotFound />
        )}
      </div>
      <PaginationWithLinks
        pageSearchParam="page"
        pageSizeSelectOptions={{
          pageSizeSearchParam: "pageSize",
          pageSizeOptions: [10, 20, 50, 100],
        }}
        page={parsedPage ?? 0}
        pageSize={parsedPageSize ?? 20}
        totalCount={totalElements - (parsedPageSize ?? 20)}
      />
    </div>
  );
}

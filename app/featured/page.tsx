import { Sparkles } from "lucide-react";
import { NovelCard } from "../components/novels/novel-card";
import { PaginationWithLinks } from "../components/components/pagination";
import { StoryType } from "../types/story";
import { NotFound } from "../components/components/not-found";
import { fetchStories } from "../lib/fetch-data";

export default async function FeaturedPage({
  searchParams,
}: {
  searchParams: Promise<{
    page: number | undefined;
    pageSize: number | undefined;
  }>;
}) {
  const { page, pageSize } = await searchParams;
  const parsedPage = typeof page === "string" ? parseInt(page, 10) : page ?? 0;
  const parsedPageSize =
    typeof pageSize === "string" ? parseInt(pageSize, 10) : pageSize ?? 20;

  const [featureStoriesRes] = await Promise.all([
    fetchStories({
      page: page ?? 0,
      pageSize: pageSize ?? 20,
      sort: "rate|gt|4.0"
    }),
  ]);

  return (
    <div className="min-h-screen">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-amber-500/30 bg-gradient-to-br from-amber-500/20 to-amber-600/20 text-amber-400">
              <Sparkles className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-bold text-white">Truyện đặc sắc</h1>
            <span className="rounded-full bg-gray-800 px-3 py-1 text-sm font-medium text-gray-300">
              {featureStoriesRes?.data?.totalElements} truyện
            </span>
          </div>

          {/* <p className="mt-2 text-gray-400">
            Browse our handpicked selection of outstanding novels, chosen by our editors and community for their exceptional quality and popularity.
          </p> */}
        </div>

        {/* Filters and Sort */}
        {/* <div className="mb-6 flex flex-col gap-4 rounded-xl bg-gray-800/50 p-4 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <span className="text-sm font-medium text-white">Sort by:</span>
            <Link
              href={`/featured`}
              className={cn(
                "rounded-full px-3 py-1 text-sm font-medium transition-colors",
                sort === "popular"
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              )}
            >
              Popular
            </Link>
            <Link
              href={`/featured`}
              className={cn(
                "rounded-full px-3 py-1 text-sm font-medium transition-colors",
                sort === "rating"
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              )}
            >
              Rating
            </Link>
            <Link
              href={`/featured?sort=newest&view=${view}`}
              className={cn(
                "rounded-full px-3 py-1 text-sm font-medium transition-colors",
                sort === "newest"
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              )}
            >
              <SortDesc className="mr-1 h-3 w-3 inline" />
              Newest
            </Link>
            <Link
              href={`/featured?sort=oldest&view=${view}`}
              className={cn(
                "rounded-full px-3 py-1 text-sm font-medium transition-colors",
                sort === "oldest"
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              )}
            >
              <SortAsc className="mr-1 h-3 w-3 inline" />
              Oldest
            </Link>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-white">View:</span>
            <Link
              href={`/featured?sort=${sort}&view=grid`}
              className={cn(
                "rounded-full p-1.5 transition-colors",
                view === "grid"
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              )}
            >
              <Grid className="h-4 w-4" />
            </Link>
            <Link
              href={`/featured?sort=${sort}&view=list`}
              className={cn(
                "rounded-full p-1.5 transition-colors",
                view === "list"
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              )}
            >
              <List className="h-4 w-4" />
            </Link>
          </div>
        </div> */}

        {featureStoriesRes.data?.totalElements > 0 ? (
          <div className="space-y-6">
            {featureStoriesRes?.data?.data?.map((novel: StoryType) => (
              <NovelCard key={novel?.id} {...novel} />
            ))}
          </div>
        ) : (
          <NotFound href="/" title="Quay lại trang chủ" />
        )}

        {featureStoriesRes.data?.totalElements > 0 && (
          <div className="mt-8">
            <PaginationWithLinks
              pageSearchParam="page"
              pageSizeSelectOptions={{
                pageSizeSearchParam: "pageSize",
                pageSizeOptions: [10, 20, 50, 100],
              }}
              page={parsedPage ?? 0}
              pageSize={parsedPageSize ?? 20}
              totalCount={featureStoriesRes.data?.totalElements}
            />
          </div>
        )}
      </div>
    </div>
  );
}

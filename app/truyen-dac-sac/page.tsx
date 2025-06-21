import { NovelCard } from "../components/novels/novel-card";
import { PaginationWithLinks } from "../components/components/pagination";
import { StoryType } from "../types/story";
import { NotFound } from "../components/components/not-found";
import { fetchStories } from "../lib/fetch-data";
import { MotionTitle } from "../components/components/motion-title";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import { cookies } from "next/headers";
import { LSK_DEVICE_ID } from "../utils/storage";

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
  const deviceId = (await cookies()).get(LSK_DEVICE_ID)?.value ?? "";

  const [featureStoriesRes] = await Promise.all([
    fetchStories({
      page: page ?? 0,
      pageSize: pageSize ?? 20,
      sort: "rate|gt|4.0",
      deviceId: deviceId,
    }),
  ]);

  return (
    <div className="min-h-screen">
      <div className="mx-auto">
        <Breadcrumb className="flex w-full mb-4 sm:mb-0">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                className="text-gray-400 hover:text-emerald-500"
                href="/"
              >
                Trang chủ
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="flex-1 line-clamp-1">
              <BreadcrumbLink
                className="text-emerald-500"
                href={`/truyen-dac-sac`}
              >
                Truyện đặc sắc
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <MotionTitle title="Truyện" subTitle="Đặc sắc" />

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

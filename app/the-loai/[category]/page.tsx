import Link from "next/link";
import {
  ChevronLeft,
  Tag as TagIcon,
  Filter,
  SortAsc,
  SortDesc,
} from "lucide-react";
import { NovelCard } from "../../components/novels/novel-card";
import { capitalizeFirstLetter, cn } from "../../lib/utils";
import { PaginationWithLinks } from "@/app/components/components/pagination";
import { colorClasses } from "@/app/lib/store-data";
import { CategoryType } from "@/app/lib/types";
import { Suspense } from "react";
import Loading from "../../components/components/loading";
import { NotFound } from "@/app/components/components/not-found";
import { fetchCategories, fetchStories } from "@/app/lib/fetch-data";

export default async function TagDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{
    page: number | undefined;
    pageSize: number | undefined;
    sort: string;
  }>;
}) {
  const { category } = await params;
  const { page, pageSize, sort } = await searchParams;

  const [categoriesRes, storiesRes] = await Promise.all([
    fetchCategories(),
    fetchStories({
      page: page,
      pageSize: pageSize,
      filter: `categories.slug|in|${category}`,
    }),
  ]);

  const colorKeys = Object.keys(colorClasses) as (keyof typeof colorClasses)[];

  const categoriesWithColors = categoriesRes.map(
    (cate: CategoryType, index: number) => ({
      ...cate,
      color: colorKeys[index % colorKeys.length],
    })
  );

  const getCategory = (categorySlug: string) => {
    const category = categoriesWithColors.find(
      (t: CategoryType) => t.slug.toLowerCase() === categorySlug.toLowerCase()
    );
    return category;
  };

  const selectedCategory = getCategory(category);

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: "from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-400",
      green:
        "from-green-500/20 to-green-600/20 border-green-500/30 text-green-400",
      red: "from-red-500/20 to-red-600/20 border-red-500/30 text-red-400",
      purple:
        "from-purple-500/20 to-purple-600/20 border-purple-500/30 text-purple-400",
      orange:
        "from-orange-500/20 to-orange-600/20 border-orange-500/30 text-orange-400",
      teal: "from-teal-500/20 to-teal-600/20 border-teal-500/30 text-teal-400",
      pink: "from-pink-500/20 to-pink-600/20 border-pink-500/30 text-pink-400",
      yellow:
        "from-yellow-500/20 to-yellow-600/20 border-yellow-500/30 text-yellow-400",
    };
    return colorMap[color] || colorMap.teal;
  };

  const finalColorClasses = getColorClasses(selectedCategory?.color as string);

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/the-loai"
            className="mb-4 inline-flex items-center text-sm font-medium text-emerald-400 hover:text-emerald-300"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Danh sách thể loại
          </Link>

          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-lg border bg-gradient-to-br",
                finalColorClasses
              )}
            >
              <TagIcon className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-bold text-white">
              {capitalizeFirstLetter(selectedCategory?.name)}
            </h1>
            <span className="rounded-full bg-gray-800 px-3 py-1 text-sm font-medium text-gray-300">
              {storiesRes.data.totalElements} truyện
            </span>
          </div>

          <p className="mt-2 text-gray-400">
            Danh sách truyện {capitalizeFirstLetter(selectedCategory?.name)}
          </p>
        </div>

        {/* Filters and Sort */}
        <div className="mb-6 flex flex-col gap-4 rounded-xl bg-gray-800/50 p-4 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <span className="text-sm font-medium text-white">
              Sắp xếp theo:
            </span>
            <Link
              href={`/the-loai/${category}?sort=rate:DESC`}
              className={cn(
                "rounded-full px-3 py-1 text-sm font-medium transition-colors",
                sort === "rate:DESC"
                  ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              )}
            >
              Đánh giá
            </Link>
            <Link
              href={`/the-loai/${category}?sort=updatedAt:DESC`}
              className={cn(
                "rounded-full px-3 py-1 text-sm font-medium transition-colors",
                sort === "updatedAt:DESC"
                  ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              )}
            >
              <SortDesc className="mr-1 h-3 w-3 inline" />
              Mới nhất
            </Link>
            <Link
              href={`/the-loai/${category}?sort=updatedAt:ASC`}
              className={cn(
                "rounded-full px-3 py-1 text-sm font-medium transition-colors",
                sort === "updatedAt:ASC"
                  ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              )}
            >
              <SortAsc className="mr-1 h-3 w-3 inline" />
              Cũ nhất
            </Link>
          </div>
        </div>

        {storiesRes.data.totalElements > 0 ? (
          <Suspense fallback={<Loading />}>
            <div className="space-y-4">
              {storiesRes.data.data?.map((novel) => (
                <NovelCard key={novel.id} {...novel} />
              ))}
            </div>
          </Suspense>
        ) : (
          <NotFound href="/the-loai" title="Danh sách thể loại" />
        )}

        {storiesRes.data?.totalElements > 0 && (
          <div className="mt-8">
            <PaginationWithLinks
              pageSearchParam="page"
              pageSizeSelectOptions={{
                pageSizeSearchParam: "pageSize",
                pageSizeOptions: [10, 20, 50, 100],
              }}
              page={page ?? 0}
              pageSize={pageSize ?? 20}
              totalCount={storiesRes.data?.totalElements - (pageSize ?? 20)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

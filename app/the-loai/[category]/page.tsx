import { NovelCard } from "../../components/novels/novel-card";
import { PaginationWithLinks } from "@/app/components/components/pagination";
import { colorClasses } from "@/app/lib/store-data";
import { CategoryType } from "@/app/lib/types";
import { NotFound } from "@/app/components/components/not-found";
import { fetchCategories, fetchStories } from "@/app/lib/fetch-data";
import { StoryByCategoryHeader } from "@/app/components/components/story-by-category-header";
import { StoryByCategoryFilter } from "@/app/components/components/story-by-category-filter";

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
        <StoryByCategoryHeader
          categoryName={selectedCategory?.name}
          finalColorClasses={finalColorClasses}
          totalStories={storiesRes.data?.totalElements}
        />

        <StoryByCategoryFilter category={category} sort={sort} />

        {storiesRes.data.totalElements > 0 ? (
          <div className="space-y-4">
            {storiesRes.data.data?.map((novel) => (
              <NovelCard key={novel.id} {...novel} />
            ))}
          </div>
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

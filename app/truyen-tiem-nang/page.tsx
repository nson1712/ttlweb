import { MotionTitle } from "../components/components/motion-title";
import { NotFound } from "../components/components/not-found";
import { PaginationWithLinks } from "../components/components/pagination";
import { NovelCard } from "../components/novels/novel-card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import { fetchPotential } from "../lib/fetch-data";
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
    page: page ?? 0,
    pageSize: pageSize ?? 20,
  });

  console.log("Potential Res:", potentialRes);
  return (
    <div className="space-y-8">
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
              href={`/truyen-tiem-nang`}
            >
              Truyện tiềm năng
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <MotionTitle title="Truyện" subTitle="Tiềm năng" />

      <div className="space-y-4">
        {potentialRes?.data &&
        typeof potentialRes.data.totalElements === "number" &&
        potentialRes?.data.data.length ? (
          potentialRes?.data?.data?.map((novel: StoryType, index) => {
            return novel && <NovelCard key={novel?.slug ?? index} {...novel} />;
          })
        ) : (
          <NotFound href="/truyen-tiem-nang" title="Quay lại" />
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
        totalCount={potentialRes?.data?.totalElements ?? 0}
      />
    </div>
  );
}

import { cookies } from "next/headers";
import { MotionTitle } from "../components/components/motion-title";
import { PaginationWithLinks } from "../components/components/pagination";
import { RecentUpdates } from "../components/components/recently-updated";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "../components/ui/breadcrumb";
import { fetchLatestChapters } from "../lib/fetch-data";
import { LSK_DEVICE_ID } from "../utils/storage";

export default async function UpdatesPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    pageSize?: string;
    filter?: string;
    timeframe?: string;
    keyword?: string;
  }>;
}) {
  const { page, pageSize } = await searchParams;
  const parsedPage = typeof page === "string" ? parseInt(page, 10) : page ?? 0;
  const parsedPageSize =
    typeof pageSize === "string" ? parseInt(pageSize, 10) : pageSize ?? 20;
  const deviceId = (await cookies()).get(LSK_DEVICE_ID)?.value ?? ""

  const [recentUpdatesRes] = await Promise.all([
    fetchLatestChapters({
      page: parsedPage ?? 0,
      pageSize: parsedPageSize ?? 20,
      deviceId: deviceId
    }),
  ]);

  console.log("Recent Updates Response:", recentUpdatesRes);

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl space-y-4">
        <div className="mb-8 text-center">
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
              <BreadcrumbLink className="text-emerald-500" href={`/moi-cap-nhat`}>
                Truyện mới cập nhật
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

          <MotionTitle title="Truyện" subTitle="Mới Cập Nhật" />
        </div>
        <RecentUpdates recentUpdates={recentUpdatesRes?.data ?? []} />
        <PaginationWithLinks
          pageSearchParam="page"
          pageSizeSelectOptions={{
            pageSizeSearchParam: "pageSize",
            pageSizeOptions: [10, 20, 50, 100],
          }}
          page={parsedPage}
          pageSize={parsedPageSize}
          totalCount={recentUpdatesRes?.totalElements}
        />
      </div>
    </div>
  );
}

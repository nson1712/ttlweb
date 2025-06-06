import { MotionTitle } from "../components/components/motion-title";
import { PaginationWithLinks } from "../components/components/pagination";
import { RecentUpdates } from "../components/components/recently-updated";
import { httpClient } from "../utils/httpClient";

export default async function UpdatesPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string | undefined;
    pageSize?: string | undefined;
    filter?: string;
    timeframe?: string;
    keyword?: string;
  }>;
}) {
  const { page, pageSize } = await searchParams;
  const parsedPage = typeof page === "string" ? parseInt(page, 10) : page ?? 0;
  const parsedPageSize = typeof pageSize === "string" ? parseInt(pageSize, 10) : pageSize ?? 20;

  async function fetchLatestChapters() {
    return (
      await httpClient.get({
        url: "/api/story/latest-chapter",
        params: { page: parsedPage, size: parsedPageSize },
      })
    ).data;
  }

  const [recentUpdatesRes] = await Promise.all([fetchLatestChapters()]);

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl space-y-4">
        <div className="mb-8 text-center responsive-margin">
          <MotionTitle title="Truyện" subTitle="Mới Cập Nhật"/>
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
          totalCount={
            recentUpdatesRes?.totalElements
              ? recentUpdatesRes.totalElements - parsedPageSize
              : 0
          }
        />
      </div>
    </div>
  );
}

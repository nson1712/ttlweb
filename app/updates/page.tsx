import { PaginationWithLinks } from "../components/components/pagination";
import { RecentUpdates } from "../components/components/recently-updated";
import { httpClient } from "../utils/httpClient";

export default async function UpdatesPage({
  searchParams,
}: {
  searchParams: {
    page?: string;
    pageSize?: string;
    filter?: string;
    timeframe?: string;
    keyword?: string;
  };
}) {
  const page = parseInt(searchParams.page ?? "0", 10);
  const pageSize = parseInt(searchParams.pageSize ?? "20", 10);

  async function fetchLatestChapters() {
    return (
      await httpClient.get({
        url: "/api/story/latest-chapter",
        params: { page: page ?? 0, size: pageSize ?? 20 },
      })
    ).data;
  }

  const [recentUpdatesRes] = await Promise.all([fetchLatestChapters()]);

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center responsive-margin">
          <h1 className="text-3xl font-serif font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl responsive-heading">
            <span className="block">Truyện</span>
            <span className="block bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
              Mới Cập Nhật
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-400">
            Stay up to date with the latest chapters from your favorite novels
          </p>
        </div>
        <RecentUpdates recentUpdates={recentUpdatesRes?.data ?? []} />
        <PaginationWithLinks
          pageSearchParam="page"
          pageSizeSelectOptions={{
            pageSizeSearchParam: "pageSize",
            pageSizeOptions: [10, 20, 50, 100],
          }}
          page={page}
          pageSize={pageSize}
          totalCount={
            recentUpdatesRes?.totalElements
              ? recentUpdatesRes.totalElements - pageSize
              : 0
          }
        />
      </div>
    </div>
  );
}

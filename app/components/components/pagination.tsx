"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { ReactNode, useCallback } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn } from "@/app/lib/utils";

interface PaginationWithLinksProps {
  pageSizeSelectOptions?: {
    pageSizeSearchParam?: string;
    pageSizeOptions: number[];
  };
  totalCount: number;
  pageSize: number;
  page: number;
  pageSearchParam?: string;
}
export function PaginationWithLinks({
  pageSize,
  pageSizeSelectOptions,
  totalCount,
  page,
  pageSearchParam,
}: PaginationWithLinksProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const totalPageCount = Math.ceil(totalCount / pageSize);
  const lastPageIndex = totalPageCount - 1;

  const buildLink = useCallback(
    (newPageIndex: number) => {
      const key = pageSearchParam || "page";
      const sp = new URLSearchParams(searchParams ?? undefined);
      sp.set(key, String(newPageIndex));
      return `${pathname}?${sp.toString()}`;
    },
    [searchParams, pathname, pageSearchParam]
  );

  const navToPageSize = useCallback(
    (newPageSize: number) => {
      const sizeKey = pageSizeSelectOptions?.pageSizeSearchParam || "pageSize";
      const pageKey = pageSearchParam || "page";
      const sp = new URLSearchParams(searchParams ?? undefined);
      sp.set(sizeKey, String(newPageSize));
      // reset page index to 0 on pageSize change
      sp.set(pageKey, "0");
      router.push(`${pathname}?${sp.toString()}`);
    },
    [
      searchParams,
      pathname,
      pageSizeSelectOptions?.pageSizeSearchParam,
      pageSearchParam,
      router,
    ]
  );

  const renderPageNumbers = () => {
    const items: ReactNode[] = [];
    const total = totalPageCount;

    if (total <= 5) {
      for (let idx = 0; idx < total; idx++) {
        items.push(
          <PaginationItem key={idx}>
            <PaginationLink href={buildLink(idx)} isActive={page === idx}>
              {idx + 1}
            </PaginationLink>
          </PaginationItem>
        );
      }
      return items;
    }

    let start = page - 1;
    let end = page + 1;
    if (page <= 1) {
      start = 1;
      end = 3;
    } else if (page >= lastPageIndex - 1) {
      start = lastPageIndex - 3;
      end = lastPageIndex - 1;
    }

    // First page
    items.push(
      <PaginationItem key={0}>
        <PaginationLink href={buildLink(0)} isActive={page === 0}>
          1
        </PaginationLink>
      </PaginationItem>
    );

    if (start > 1) {
      items.push(
        <PaginationItem key="ellipsis-start">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Middle pages
    for (let idx = start; idx <= end; idx++) {
      if (idx > 0 && idx < lastPageIndex) {
        items.push(
          <PaginationItem key={idx}>
            <PaginationLink href={buildLink(idx)} isActive={page === idx}>
              {idx + 1}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    if (end < lastPageIndex - 1) {
      items.push(
        <PaginationItem key="ellipsis-end">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Last page
    items.push(
      <PaginationItem key={lastPageIndex}>
        <PaginationLink
          href={buildLink(lastPageIndex)}
          isActive={page === lastPageIndex}
        >
          {lastPageIndex + 1}
        </PaginationLink>
      </PaginationItem>
    );

    return items;
  };

  const onJumpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      let valOneBased = Number((e.target as HTMLInputElement).value);
      if (!valOneBased || valOneBased < 1) valOneBased = 1;
      if (valOneBased > totalPageCount) valOneBased = totalPageCount;
      const newIndex = valOneBased - 1;
      router.push(buildLink(newIndex));
    }
  };

  return (
    <div className="xl:flex justify-end space-y-4 xl:space-y-0 items-center gap-3 w-full">
      <Pagination className={cn({ "justify-end": pageSizeSelectOptions })}>
        <PaginationContent className="max-sm:gap-0">
          <PaginationItem>
            <PaginationPrevious
              href={buildLink(Math.max(page - 1, 0))}
              aria-disabled={page === 0}
              tabIndex={page === 0 ? -1 : undefined}
            />
          </PaginationItem>

          {renderPageNumbers()}

          <PaginationItem>
            <PaginationNext
              href={buildLink(Math.min(page + 1, lastPageIndex))}
              aria-disabled={page === lastPageIndex}
              tabIndex={page === lastPageIndex ? -1 : undefined}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <div className="flex items-center justify-end">
        {pageSizeSelectOptions && (
          <SelectRowsPerPage
            options={pageSizeSelectOptions.pageSizeOptions}
            setPageSize={navToPageSize}
            pageSize={pageSize}
          />
        )}

        {totalPageCount > 1 && (
          <div className="flex items-center gap-2 min-w-32 justify-end w-auto ml-2">
            <div className="text-sm w-max">Tới trang</div>
            <input
              type="number"
              defaultValue={page + 1}
              min={1}
              max={totalPageCount}
              onKeyDown={onJumpKeyDown}
              className="w-16 border rounded-md p-2 text-sm"
              aria-label="Jump to page"
            />
          </div>
        )}
      </div>
    </div>
  );
}

const SelectRowsPerPage = ({
  options,
  setPageSize,
  pageSize,
}: {
  options: number[];
  setPageSize: (newSize: number) => void;
  pageSize: number;
}) => {
  return (
    <div className="flex items-center gap-2">
      <Select
        defaultValue={String(pageSize)}
        onValueChange={(v) => setPageSize(Number(v))}
      >
        <SelectTrigger className="min-w-24">
          <SelectValue placeholder="Select size" />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt} value={String(opt)}>
              {opt} / trang
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

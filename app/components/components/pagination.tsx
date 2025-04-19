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

  const buildLink = useCallback(
    (newPage: number) => {
      const key = pageSearchParam || "page";
      const sp = new URLSearchParams(searchParams ?? undefined);
      sp.set(key, String(newPage));
      return `${pathname}?${sp.toString()}`;
    },
    [searchParams, pathname, pageSearchParam]
  );

  const navToPageSize = useCallback(
    (newPageSize: number) => {
      const key = pageSizeSelectOptions?.pageSizeSearchParam || "pageSize";
      const sp = new URLSearchParams(searchParams ?? undefined);
      sp.set(key, String(newPageSize));
      router.push(`${pathname}?${sp.toString()}`);
    },
    [searchParams, pathname, pageSizeSelectOptions?.pageSizeSearchParam, router]
  );

  const renderPageNumbers = () => {
    const items: ReactNode[] = [];
    const total = totalPageCount;

    if (total <= 5) {
      for (let i = 1; i <= total; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink href={buildLink(i)} isActive={page === i}>
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
      return items;
    }

    let start = page - 1;
    let end = page + 1;
    if (page <= 3) {
      start = 2;
      end = 4;
    } else if (page >= total - 2) {
      start = total - 3;
      end = total - 1;
    }

    items.push(
      <PaginationItem key={1}>
        <PaginationLink href={buildLink(1)} isActive={page === 1}>
          1
        </PaginationLink>
      </PaginationItem>
    );

    if (start > 2) {
      items.push(
        <PaginationItem key="ellipsis-start">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    for (let i = start; i <= end; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink href={buildLink(i)} isActive={page === i}>
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (end < total - 1) {
      items.push(
        <PaginationItem key="ellipsis-end">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    items.push(
      <PaginationItem key={total}>
        <PaginationLink href={buildLink(total)} isActive={page === total}>
          {total}
        </PaginationLink>
      </PaginationItem>
    );

    return items;
  };

  // Handle quick‑jump
  const onJumpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      let val = Number((e.target as HTMLInputElement).value);
      if (!val || val < 1) val = 1;
      if (val > totalPageCount) val = totalPageCount;
      router.push(buildLink(val));
    }
  };

  return (
    <div className="xl:flex justify-end space-y-4 xl:space-y-0 items-center gap-3 w-full">
      <Pagination className={cn({ "justify-end": pageSizeSelectOptions })}>
        <PaginationContent className="max-sm:gap-0">
          <PaginationItem>
            <PaginationPrevious
              href={buildLink(Math.max(page - 1, 1))}
              aria-disabled={page === 1}
              tabIndex={page === 1 ? -1 : undefined}
              className={page === 1 ? "pointer-events-none opacity-50" : undefined}
            />
          </PaginationItem>

          {renderPageNumbers()}

          <PaginationItem>
            <PaginationNext
              href={buildLink(Math.min(page + 1, totalPageCount))}
              aria-disabled={page === totalPageCount}
              tabIndex={page === totalPageCount ? -1 : undefined}
              className={page === totalPageCount ? "pointer-events-none opacity-50" : undefined}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <div className="flex items-center justify-end">
        {/* Page Size Select */}
      {pageSizeSelectOptions && (
          <SelectRowsPerPage
            options={pageSizeSelectOptions.pageSizeOptions}
            setPageSize={navToPageSize}
            pageSize={pageSize}
          />
      )}

      {/* Quick‑Jumper */}
      {totalPageCount > 1 && (
        <div className="flex items-center gap-2 min-w-32 justify-end">
          <span className="text-sm">Go to</span>
          <input
            type="number"
            defaultValue={page}
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
          {/* self‑closing, value comes from defaultValue */}
          <SelectValue placeholder="Select size" />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt} value={String(opt)}>
              {opt} / page
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

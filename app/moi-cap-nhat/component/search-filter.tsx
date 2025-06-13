"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Filter, Calendar, Search, ChevronDown } from "lucide-react";
import Link from "next/link";
import { cn } from "../../lib/utils";
import { allRecentUpdates } from "../../lib/mock-data";

// Hook to debounce rapid input changes
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

export default function SearchFilters({
  filter,
  timeframe,
  keyword,
}: {
  filter: string;
  timeframe: string;
  keyword: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [searchQuery, setSearchQuery] = useState<string>(keyword);
  const debouncedSearchQuery = useDebounce<string>(searchQuery, 300);
  const [showCategoryFilter, setShowCategoryFilter] = useState<boolean>(false);
  const [showTimeframeFilter, setShowTimeframeFilter] = useState<boolean>(false);
  const [, startTransition] = useTransition();

  const categories = Array.from(
    new Set(allRecentUpdates.flatMap((u) => u.categories))
  );

  useEffect(() => {
    startTransition(() => {
      const params = new URLSearchParams();
      params.set("filter", filter);
      params.set("timeframe", timeframe);
      if (debouncedSearchQuery) params.set("keyword", debouncedSearchQuery);
      else params.delete("keyword");
      params.set("page", "1");

      // Build strict percent-encoded query string (spaces -> %20)
      const query = Array.from(params.entries())
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        )
        .join("&");

      router.replace(`${pathname}?${query}`, { scroll: false });
    });
  }, [debouncedSearchQuery, filter, timeframe, pathname, router]);

  const makeHref = (overrides: Record<string, string>) => {
    const p = {
      filter,
      timeframe,
      keyword: searchQuery || "",
      page: "1",
      ...overrides,
    };
    return (
      "?" +
      Object.entries(p)
        .filter(([, v]) => v !== undefined && v !== null)
        .map(
          ([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`
        )
        .join("&")
    );
  };

  return (
    <div className="mb-8 rounded-xl bg-gray-800/50 p-6 backdrop-blur-sm">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by title or chapter..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-700 bg-gray-800 py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="relative">
            <button
              onClick={() => {
                setShowCategoryFilter(!showCategoryFilter);
                setShowTimeframeFilter(false);
              }}
              className="flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm font-medium text-white"
            >
              <Filter className="h-4 w-4 text-gray-400" />
              <span>{filter === "all" ? "All Categories" : filter}</span>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </button>
            {showCategoryFilter && (
              <div className="absolute right-0 mt-2 w-56 rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5">
                <Link
                  href={makeHref({ filter: "all", page: "1" })}
                  className={cn(
                    "block px-4 py-2 text-sm",
                    filter === "all"
                      ? "bg-gray-700 text-emerald-400"
                      : "text-gray-300 hover:bg-gray-700"
                  )}
                  onClick={() => setShowCategoryFilter(false)}
                >
                  All Categories
                </Link>
                {categories.map((cat) => (
                  <Link
                    key={cat}
                    href={makeHref({ filter: cat, page: "1" })}
                    className={cn(
                      "block px-4 py-2 text-sm",
                      filter === cat
                        ? "bg-gray-700 text-emerald-400"
                        : "text-gray-300 hover:bg-gray-700"
                    )}
                    onClick={() => setShowCategoryFilter(false)}
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="relative">
            <button
              onClick={() => {
                setShowTimeframeFilter(!showTimeframeFilter);
                setShowCategoryFilter(false);
              }}
              className="flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm font-medium text-white"
            >
              <Calendar className="h-4 w-4 text-gray-400" />
              <span>
                {timeframe === "today"
                  ? "Today"
                  : timeframe === "week"
                  ? "This Week"
                  : timeframe === "month"
                  ? "This Month"
                  : "All Time"}
              </span>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </button>
            {showTimeframeFilter && (
              <div className="absolute right-0 mt-2 w-40 rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5">
                {["today", "week", "month", "all"].map((tf) => (
                  <Link
                    key={tf}
                    href={makeHref({ timeframe: tf, page: "1" })}
                    className={cn(
                      "block px-4 py-2 text-sm",
                      timeframe === tf
                        ? "bg-gray-700 text-emerald-400"
                        : "text-gray-300 hover:bg-gray-700"
                    )}
                    onClick={() => setShowTimeframeFilter(false)}
                  >
                    {tf === "today"
                      ? "Today"
                      : tf === "week"
                      ? "This Week"
                      : tf === "month"
                      ? "This Month"
                      : "All Time"}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

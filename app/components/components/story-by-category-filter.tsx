import { cn } from "@/app/lib/utils";
import { Filter, SortAsc, SortDesc } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

type StoryByCategoryFilterProps = {
  category: string;
  sort: string;
};
export const StoryByCategoryFilter: FC<StoryByCategoryFilterProps> = ({
  category,
  sort,
}) => {
  return (
    <div className="mb-6 flex flex-col gap-4 rounded-xl bg-gray-800/50 p-4 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2">
        <Filter className="h-5 w-5 text-gray-400" />
        <span className="text-sm font-medium text-white">Sắp xếp theo:</span>
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
  );
};

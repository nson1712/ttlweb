import { cn, formatDateTime } from "@/app/lib/utils";
import { ChapterType } from "@/app/types/chapter";
import { Calendar, ChevronRight, LockKeyhole } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

type ChapterListProps = {
  chapters: ChapterType[];
  storySlug: string;
};

export const ChapterList: FC<ChapterListProps> = ({ chapters, storySlug }) => {
  return (
    <div className={cn("mb-6 space-y-3")}>
      {chapters.map((chapter) => (
        <Link
          key={chapter?.id}
          href={`/truyen/${storySlug}/${chapter?.slug}`}
          className={cn(
            "group block rounded-lg bg-gray-700/50 p-3 hover:bg-gray-700"
          )}
        >
          <div className={cn("flex items-center justify-between")}>
            <div className="flex-1">
              <h3 className="font-medium text-emerald-400 group-hover:text-emerald-300 line-clamp-2">
                {chapter?.title}
              </h3>

              <div
                className={cn("flex items-center gap-3 text-xs text-gray-400")}
              >
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3 text-emerald-500" />
                  <span className="text-sm">
                    {formatDateTime(chapter?.createdAt)}
                  </span>
                </div>
              </div>
            </div>

            <div className="ml-4 flex items-center gap-2">
              {chapter?.price !== 0 && (
                <span className="p-0.5 text-xs font-medium text-emerald-400">
                  <LockKeyhole className="h-5 w-5 text-emerald-400" />
                </span>
              )}
              <ChevronRight className="h-5 w-5 text-gray-500 group-hover:text-emerald-400" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

"use client";

import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { SortAsc, SortDesc } from "lucide-react";
import { cn } from "@/app/lib/utils";
import { PaginationWithLinks } from "./pagination";
import { FC, useContext, useState } from "react";
import { StoryType } from "@/app/types/story";
import { ChaptersApiResponse } from "@/app/interfaces/story";
import { useSearchParams } from "next/navigation";
import { isEmpty } from "lodash";
import { ChapterList } from "./chapter-list";
import { SettingsContext, Theme } from "@/app/context/setting-context";
import { StoryDetailRate } from "./story-detail-rate";

type StoryInfoTabProps = {
  chapters: ChaptersApiResponse;
  storyDetails: StoryType;
};
export const StoryInfoTab: FC<StoryInfoTabProps> = ({
  chapters,
  storyDetails,
}) => {
  const [activeTab, setActiveTab] = useState("chapters");
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") ?? "0", 10);
  const pageSize = parseInt(searchParams.get("pageSize") ?? "20", 10);
  const sort = searchParams.get("sortType") ?? "ASC";
  const { theme } = useContext(SettingsContext);

  const panelBg: Record<Theme, string> = {
    light: "bg-gray-100/30",
    dark:  "bg-gray-800/50",
    sepia: "bg-[#e8d9c0]/80",
  };

  const headerText: Record<Theme, string> = {
    light: "text-gray-900",
    dark:  "text-white",
    sepia: "text-[#5f4b32]",
  };

  const subText: Record<Theme, string> = {
    light: "text-gray-700",
    dark:  "text-gray-400",
    sepia: "text-[#7a6f49]",
  };

  const buttonBg: Record<Theme, string> = {
    light: "bg-gray-200 hover:bg-gray-300",
    dark:  "bg-gray-700 hover:bg-gray-600",
    sepia: "bg-[#e8d9c0] hover:bg-[#d8c8b0]",
  };

  const activeLink: Record<Theme, string> = {
    light: "bg-gray-300 text-gray-900",
    dark:  "bg-gray-600 text-white",
    sepia: "bg-[#d1b97e] text-[#5f4b32]",
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
      <TabsList className="mb-6 w-full justify-start border-b border-gray-800 bg-transparent p-0">
        <TabsTrigger
          value="chapters"
          className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-emerald-500 data-[state=active]:bg-transparent data-[state=active]:text-white"
        >
          Danh sách chương
        </TabsTrigger>
        <TabsTrigger
          value="reviews"
          className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-emerald-500 data-[state=active]:bg-transparent data-[state=active]:text-white"
        >
          Đánh giá
        </TabsTrigger>
        <TabsTrigger
          value="similar"
          className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-emerald-500 data-[state=active]:bg-transparent data-[state=active]:text-white"
        >
          Truyện cùng thể loại
        </TabsTrigger>
      </TabsList>

      <TabsContent value="chapters" className="mt-0">
      <div className={cn("rounded-xl p-3 backdrop-blur-sm", panelBg[theme ?? "dark"])}>
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className={cn("text-xl font-bold", headerText[theme ?? "dark"])}>
            Danh sách chương
            <span className={cn("ml-2 text-sm font-normal", subText[theme ?? "dark"])}>
              ({chapters.data?.totalElements})
            </span>
          </h2>

          <div className="flex items-center gap-2">
            <div className={cn("flex items-center gap-2 rounded-lg p-1", buttonBg[theme ?? "dark"])}>
              <Link
                href={`/truyen/${storyDetails?.slug}?sortType=DESC`}
                className={cn(
                  "rounded-md px-3 py-1 text-sm transition",
                  sort === "DESC" ? activeLink[theme ?? "dark"] : subText[theme ?? "dark"]
                )}
              >
                <SortDesc className="mr-1 h-3 w-3 inline" />
                Mới nhất
              </Link>
              <Link
                href={`/truyen/${storyDetails?.slug}?sortType=ASC`}
                className={cn(
                  "rounded-md px-3 py-1 text-sm transition",
                  sort === "ASC" ? activeLink[theme ?? "dark"] : subText[theme ?? "dark"]
                )}
              >
                <SortAsc className="mr-1 h-3 w-3 inline" />
                Cũ nhất
              </Link>
            </div>
          </div>
        </div>

        {/* Chapters List */}
        <ChapterList
          chapters={chapters.data.data ?? []}
          storySlug={storyDetails?.slug}
        />

        {/* Pagination */}
        <PaginationWithLinks
          pageSearchParam="page"
          pageSizeSelectOptions={{
            pageSizeSearchParam: "pageSize",
            pageSizeOptions: [10, 20, 50, 100],
          }}
          page={page ?? 0}
          pageSize={pageSize ?? 20}
          totalCount={chapters?.data?.totalElements}
        />
      </div>
    </TabsContent>

      {/* Reviews Tab */}
      <TabsContent value="reviews" className="mt-0">
        <StoryDetailRate storyDetails={storyDetails} />
      </TabsContent>

      {/* Similar Novels Tab */}
      <TabsContent value="similar" className="mt-0">
        <div className="rounded-xl bg-gray-800/50 p-6 backdrop-blur-sm">
          <h2 className="mb-4 text-xl font-bold text-white">
            Truyện cùng thể loại
          </h2>

          {/* <div className="grid grid-cols-2 gap-6 sm:grid-cols-5">
                {relatedNovels.map((relatedNovel) => (
                  <Link
                    key={relatedNovel.id}
                    // href={`/truyen/${relatedNovel.slug}`}
                    href={`/truyen/lord-mysteries`}
                    className="group block"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                      <Image
                        src={relatedNovel.coverImage}
                        alt={relatedNovel.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <h3 className="font-medium text-white line-clamp-2 group-hover:text-emerald-400">
                          {relatedNovel.title}
                        </h3>
                        <p className="text-sm text-gray-300">
                          {relatedNovel.author}
                        </p>
                        <div className="mt-1 flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-white">
                            {relatedNovel.rating.toFixed(1)}
                          </span>
                          <span className="text-xs text-gray-400">
                            ({relatedNovel.totalRatings})
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div> */}

          {!isEmpty(storyDetails.categories) && (
            <div className="mt-6 text-center">
              <Link
                href={`/the-loai/${storyDetails.categories?.[0]?.slug}`}
                className="inline-block rounded-full bg-gray-700 px-6 py-2 text-sm font-medium text-white hover:bg-gray-600"
              >
                Xem thêm truyện {storyDetails.categories?.[0]?.name}
              </Link>
            </div>
          )}
        </div>
      </TabsContent>

      {/* <TabsContent value="similar">
            <SimilarNovelsSection novels={relatedNovels} primaryCategory={novel.categories[0]} />
          </TabsContent> */}
    </Tabs>
  );
};

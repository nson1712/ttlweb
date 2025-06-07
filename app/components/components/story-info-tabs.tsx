"use client";

import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { SortAsc, SortDesc, Star } from "lucide-react";
import { cn } from "@/app/lib/utils";
import { PaginationWithLinks } from "./pagination";
import { FC, useState } from "react";
import { StoryType } from "@/app/types/story";
import { ChaptersApiResponse } from "@/app/interfaces/story";
import { useSearchParams } from "next/navigation";
import { isEmpty } from "lodash";
import { ChapterList } from "./chapter-list";

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

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
      <TabsList className="mb-6 w-full justify-start border-b border-gray-800 bg-transparent p-0">
        <TabsTrigger
          value="chapters"
          className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-emerald-500 data-[state=active]:bg-transparent"
        >
          Danh sách chương
        </TabsTrigger>
        <TabsTrigger
          value="reviews"
          className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-emerald-500 data-[state=active]:bg-transparent"
        >
          Đánh giá
        </TabsTrigger>
        <TabsTrigger
          value="similar"
          className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-emerald-500 data-[state=active]:bg-transparent"
        >
          Truyện cùng thể loại
        </TabsTrigger>
      </TabsList>

      <TabsContent value="chapters" className="mt-0">
        <div className="rounded-xl bg-gray-800/50 p-3 backdrop-blur-sm">
          <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-bold text-white">
              Danh sách chương
              <span className="ml-2 text-sm font-normal text-gray-400">
                ({chapters.data?.totalElements})
              </span>
            </h2>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-lg bg-gray-700 p-1">
                <Link
                  href={`/novels/${storyDetails?.slug}?sortType=DESC`}
                  className={cn(
                    "rounded-md px-3 py-1 text-sm",
                    sort === "DESC"
                      ? "bg-gray-600 text-white"
                      : "text-gray-300 hover:bg-gray-600/50"
                  )}
                >
                  <SortDesc className="mr-1 h-3 w-3 inline" />
                  Mới nhất
                </Link>
                <Link
                  href={`/novels/${storyDetails?.slug}?sortType=ASC`}
                  className={cn(
                    "rounded-md px-3 py-1 text-sm",
                    sort === "ASC"
                      ? "bg-gray-600 text-white"
                      : "text-gray-300 hover:bg-gray-600/50"
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
            totalCount={
              chapters?.data?.totalElements
                ? chapters.data.totalElements - pageSize
                : 0
            }
          />
        </div>
      </TabsContent>

      {/* Reviews Tab */}
      <TabsContent value="reviews" className="mt-0">
        <div className="rounded-xl bg-gray-800/50 p-6 backdrop-blur-sm">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start">
            {/* Rating Summary */}
            <div className="flex flex-col items-center rounded-lg bg-gray-800 p-4 sm:w-64">
              <div className="text-5xl font-bold text-white">
                {(storyDetails.rate ?? 0).toFixed(1)}
              </div>
              <div className="mb-4 flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={cn(
                      "h-5 w-5",
                      star <= Math.round(storyDetails.rate)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-600"
                    )}
                  />
                ))}
              </div>
              <div className="text-sm text-gray-400">
                {/* {storyDetails.totalRatings} ratings */}
              </div>

              <div className="mt-4 w-full space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-400">{rating}</span>
                    </div>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-700">
                      {/* <div
                            className="h-full bg-yellow-400"
                            style={{
                              width: `${Math.round(
                                (storyDetails.ratingDistribution[
                                  rating as keyof typeof storyDetails.ratingDistribution
                                ] /
                                  storyDetails.totalRatings) *
                                  100
                              )}%%`,
                            }}
                          ></div> */}
                    </div>
                    {/* <div className="text-xs text-gray-400">
                          {Math.round(
                            (storyDetails.ratingDistribution[
                              rating as keyof typeof storyDetails.ratingDistribution
                            ] /
                              storyDetails.totalRatings) *
                              100
                          )}
                          %
                        </div> */}
                  </div>
                ))}
              </div>

              <button className="mt-4 w-full rounded-full bg-emerald-500 py-2 text-sm font-medium text-white hover:bg-emerald-600">
                Viết đánh giá
              </button>
            </div>

            {/* Reviews List */}
            {/* <div className="flex-1 space-y-4">
                  {storyDetails.reviews.length > 0 ? (
                    storyDetails.reviews.map((review) => (
                      <div
                        key={review.id}
                        className="rounded-lg bg-gray-800 p-4"
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-gray-700">
                              <User className="h-8 w-8 p-1.5 text-gray-400" />
                            </div>
                            <div>
                              <div className="font-medium text-white">
                                {review.username}
                              </div>
                              <div className="text-xs text-gray-400">
                                {review.date}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={cn(
                                  "h-4 w-4",
                                  star <= review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-600"
                                )}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-300">
                          {review.content}
                        </p>
                        <div className="mt-3 flex items-center gap-4 text-xs text-gray-400">
                          <button className="flex items-center gap-1 hover:text-emerald-400">
                            <ThumbsUp className="h-3.5 w-3.5" />
                            <span>Helpful ({review.likes})</span>
                          </button>
                          <button className="flex items-center gap-1 hover:text-emerald-400">
                            <MessageSquare className="h-3.5 w-3.5" />
                            <span>Reply</span>
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center rounded-lg bg-gray-800 p-8 text-center">
                      <MessageSquare className="h-12 w-12 text-gray-600" />
                      <h3 className="mt-2 text-lg font-medium text-white">
                        No reviews yet
                      </h3>
                      <p className="mt-1 text-gray-400">
                        Be the first to review this novel
                      </p>
                      <button className="mt-4 rounded-full bg-emerald-500 px-6 py-2 text-sm font-medium text-white hover:bg-emerald-600">
                        Write a Review
                      </button>
                    </div>
                  )}
                </div> */}
          </div>
        </div>
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
                    // href={`/novels/${relatedNovel.slug}`}
                    href={`/novels/lord-mysteries`}
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
                href={`/categories/${storyDetails.categories?.[0]?.slug}`}
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

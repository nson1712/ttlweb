"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  BookOpen,
  Heart,
  Share2,
  Bookmark,
  ChevronRight,
  // MessageSquare,
  User,
  Calendar,
  Eye,
  // ThumbsUp,
  SortAsc,
  SortDesc,
  Grid,
  List as ListIcon,
  LockKeyhole,
} from "lucide-react";
import { Badge } from "../../components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { cn } from "../../lib/utils";
import { useParams, useSearchParams } from "next/navigation";
import { PaginationWithLinks } from "@/app/components/components/pagination";
import { allChapters } from "@/app/lib/mock-data";
import { useResourceStore } from "@/app/stores/useResourceStore";
import {
  ChaptersApiResponse,
  StoryDetailsApiResponse,
} from "@/app/interfaces/story";

export default function NovelDetailPage() {
  const { fetchResource } = useResourceStore();
  const [activeTab, setActiveTab] = useState("chapters");
  const [isFollowing, setIsFollowing] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const params = useParams();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") ?? "0", 10);

  const pageSize = parseInt(searchParams.get("pageSize") ?? "20", 10);

  const sort = searchParams.get("sort") ?? "popular";

  const view = searchParams.get("view") ?? "list";

  const storyDetailsReponse = useResourceStore(
    (s) => s.resources?.storyDetails
  ) as StoryDetailsApiResponse;
  const chaptersReponse = useResourceStore(
    (s) => s.resources?.chapters
  ) as ChaptersApiResponse;
  const storyDetails = storyDetailsReponse?.data;

  useEffect(() => {
    fetchResource("storyDetails", "/api/story/detail", {
      slug: params.slug,
    });

    fetchResource("chapters", "/chapters", {
      page: page,
      size: pageSize,
      filter: `storyId|eq|${storyDetails?.id}`,
    });
  }, [fetchResource, params.slug, storyDetails?.id, page, pageSize]);

  if (!storyDetails) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-white">Novel not found</h1>
        <p className="mt-2 text-gray-400">
          The novel you&#39;re looking for doesn&#39;t exist or has been
          removed.
        </p>
        <Link
          href="/"
          className="mt-4 rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  // Get chapters for this novel
  const novelChapters = allChapters.filter(
    (chapter) => chapter.novelSlug === storyDetails.slug
  );

  // Sort chapters based on sort parameter
  // const sortedChapters = [...novelChapters].sort((a, b) => {
  //   if (sort === "newest") return b.number - a.number;
  //   if (sort === "oldest") return a.number - b.number;
  //   return 0;
  // });

  // Paginate chapters
  // const start = (page - 1) * pageSize;
  // const end = start + pageSize;
  // const paginatedChapters = sortedChapters.slice(start, end);

  // Get related novels (same categories)
  // const relatedNovels = allNovels
  //   .filter(
  //     (n) =>
  //       n.slug !== novel.slug &&
  //       n.categories.some((category) => novel.categories.includes(category))
  //   )
  //   .slice(0, 20);


  console.log("")

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex items-center text-sm text-gray-400">
            <Link href="/" className="hover:text-emerald-400">
              Home
            </Link>
            <ChevronRight className="mx-2 h-4 w-4" />
            <span className="text-emerald-400">{storyDetails.title}</span>
          </nav>
        </div>

        {/* Novel Header */}
        <div className="relative mb-8 overflow-hidden rounded-xl bg-gradient-to-br from-gray-800/90 to-gray-900 p-6 shadow-xl">
          <div className="absolute inset-0 overflow-hidden opacity-10">
            <Image
              src={storyDetails.coverImage}
              alt={storyDetails.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="relative z-10 flex flex-col gap-6 md:flex-row">
            {/* Cover Image */}
            <div className="relative mx-auto w-48 md:mx-0 md:w-56 flex-shrink-0">
              <div className="aspect-[3/4] overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={storyDetails.coverImage}
                  alt={storyDetails.title}
                  width={224}
                  height={336}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>

              <div className="absolute bottom-1 left-1  rounded-full bg-black/80 px-3 py-1 text-sm font-medium text-white shadow-md">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{storyDetails.rate.toFixed(1)}</span>
                  {/* <span className="text-gray-300">({storyDetails.totalRatings})</span> */}
                </div>
              </div>
            </div>

            {/* Novel Info */}
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-3xl font-bold text-white md:text-4xl">
                  {storyDetails.title}
                </h1>
                <div className="mt-2 flex items-center gap-3">
                  <div className="flex items-center gap-1 text-sm text-gray-300">
                    <User className="h-4 w-4 text-emerald-400" />
                    {/* <span>{storyDetails.author}</span> */}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-300">
                    <BookOpen className="h-4 w-4 text-emerald-400" />
                    {/* <span>{storyDetails.chapterCount} chapters</span> */}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-300">
                    <Eye className="h-4 w-4 text-emerald-400" />
                    <span>{storyDetails.totalView.toLocaleString()} views</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {storyDetails.categories.map((category) => (
                  <Link href={`/tags/${category.name}`} key={category.id}>
                    <Badge
                      variant="outline"
                      className="bg-gray-700/50 text-xs text-emerald-300 border-emerald-500/20 hover:bg-emerald-900/20"
                    >
                      {category.name}
                    </Badge>
                  </Link>
                ))}
              </div>

              <div
                className="line-clamp-5 text-gray-300"
                dangerouslySetInnerHTML={{
                  __html: storyDetails.shortDescription,
                }}
              />

              {/* <p className="text-gray-300 line-clamp-5">{storyDetails.shortDescription}</p> */}

              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/novels/${storyDetails.slug}/${
                    novelChapters[0]?.number || 1
                  }`}
                  className="rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 px-6 py-2 text-sm font-medium text-white hover:bg-emerald-600"
                >
                  Đọc ngay
                </Link>
                <Link
                  href={`/novels/${storyDetails.slug}/${
                    novelChapters[novelChapters.length - 1]?.number || 1
                  }`}
                  className="rounded-full bg-gray-700 px-6 py-2 text-sm font-medium text-white hover:bg-gray-600"
                >
                  Latest Chapter
                </Link>
                <button
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={cn(
                    "flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium",
                    isFollowing
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-gray-700 text-white hover:bg-gray-600"
                  )}
                >
                  <Heart
                    className={cn("h-4 w-4", isFollowing && "fill-emerald-400")}
                  />
                  <span>{isFollowing ? "Following" : "Follow"}</span>
                </button>
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={cn(
                    "flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium",
                    isBookmarked
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-gray-700 text-white hover:bg-gray-600"
                  )}
                >
                  <Bookmark
                    className={cn(
                      "h-4 w-4",
                      isBookmarked && "fill-emerald-400"
                    )}
                  />
                  <span>{isBookmarked ? "Bookmarked" : "Bookmark"}</span>
                </button>
                <button className="flex items-center gap-1 rounded-full bg-gray-700 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600">
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Novel Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="mb-6 w-full justify-start border-b border-gray-800 bg-transparent p-0">
            <TabsTrigger
              value="chapters"
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-emerald-500 data-[state=active]:bg-transparent"
            >
              Chapters
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-emerald-500 data-[state=active]:bg-transparent"
            >
              Reviews
            </TabsTrigger>
            <TabsTrigger
              value="similar"
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-emerald-500 data-[state=active]:bg-transparent"
            >
              Similar Novels
            </TabsTrigger>
          </TabsList>

          {/* Chapters Tab */}
          <TabsContent value="chapters" className="mt-0">
            <div className="rounded-xl bg-gray-800/50 p-3 backdrop-blur-sm">
              <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-xl font-bold text-white">
                  Danh sách chương
                  <span className="ml-2 text-sm font-normal text-gray-400">
                    ({novelChapters.length})
                  </span>
                </h2>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 rounded-lg bg-gray-700 p-1">
                    <Link
                      href={`/novels/${storyDetails.slug}?sort=DESC&view=${view}`}
                      className={cn(
                        "rounded-md px-3 py-1 text-sm",
                        sort === "DESC"
                          ? "bg-gray-600 text-white"
                          : "text-gray-300 hover:bg-gray-600/50"
                      )}
                    >
                      <SortDesc className="mr-1 h-3 w-3 inline" />
                      Newest
                    </Link>
                    <Link
                      href={`/novels/${storyDetails.slug}?sort=ASC&view=${view}`}
                      className={cn(
                        "rounded-md px-3 py-1 text-sm",
                        sort === "ASC"
                          ? "bg-gray-600 text-white"
                          : "text-gray-300 hover:bg-gray-600/50"
                      )}
                    >
                      <SortAsc className="mr-1 h-3 w-3 inline" />
                      Oldest
                    </Link>
                  </div>

                  <div className="flex items-center gap-1 rounded-lg bg-gray-700 p-1">
                    <Link
                      href={`/novels/${storyDetails.slug}?sort=${sort}&view=list`}
                      className={cn(
                        "rounded-md p-1.5",
                        view === "list"
                          ? "bg-gray-600 text-white"
                          : "text-gray-300 hover:bg-gray-600/50"
                      )}
                    >
                      <ListIcon className="h-4 w-4" />
                    </Link>
                    <Link
                      href={`/novels/${storyDetails.slug}?sort=${sort}&view=grid`}
                      className={cn(
                        "rounded-md p-1.5",
                        view === "grid"
                          ? "bg-gray-600 text-white"
                          : "text-gray-300 hover:bg-gray-600/50"
                      )}
                    >
                      <Grid className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Chapters List */}
              <div
                className={cn(
                  "mb-6",
                  view === "grid"
                    ? "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
                    : "space-y-3"
                )}
              >
                {chaptersReponse?.data?.data.map((chapter) => (
                  <Link
                    key={chapter.id}
                    href={`/novels/${storyDetails.slug}/${chapter.slug}`}
                    className={cn(
                      "group block",
                      view === "grid"
                        ? "rounded-lg bg-gray-700/50 p-4 hover:bg-gray-700"
                        : "rounded-lg bg-gray-700/50 p-3 hover:bg-gray-700"
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-center justify-between",
                        view === "grid" && "flex-col gap-2 text-center"
                      )}
                    >
                      <div
                        className={cn(view === "grid" ? "space-y-1" : "flex-1")}
                      >
                        <h3 className="font-medium text-emerald-400 group-hover:text-emerald-300">
                          {view === "grid" ? (
                            <>Chương {chapter.order}</>
                          ) : (
                            <>{chapter.title}</>
                          )}
                        </h3>

                        {view === "grid" && (
                          <p className="text-sm text-gray-300 line-clamp-1">
                            {chapter.title}
                          </p>
                        )}

                        <div
                          className={cn(
                            "flex items-center gap-3 text-xs text-gray-400",
                            view === "grid" && "justify-center"
                          )}
                        >
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{chapter.createdAt}</span>
                          </div>
                          {/* <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            <span>{chapter.views.toLocaleString()}</span>
                          </div> */}
                        </div>
                      </div>

                      {view === "list" && (
                        <div className="ml-4 flex items-center gap-2">
                          {/* {chapter.isNew && (
                            <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-medium text-emerald-400">
                              NEW
                            </span>
                          )} */}
                          {chapter.price !== 0 && (
                            <span className="p-0.5 text-xs font-medium text-emerald-400">
                              <LockKeyhole className="h-5 w-5 text-emerald-400" />
                            </span>
                          )}
                          <ChevronRight className="h-5 w-5 text-gray-500 group-hover:text-emerald-400" />
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              <PaginationWithLinks
                pageSearchParam="page"
                pageSizeSelectOptions={{
                  pageSizeSearchParam: "pageSize",
                  pageSizeOptions: [10, 20, 50, 100],
                }}
                page={page}
                pageSize={pageSize}
                totalCount={chaptersReponse?.data?.totalElements ? (chaptersReponse.data.totalElements - pageSize) : 0}
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
                    {storyDetails.rate.toFixed(1)}
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
                          <span className="text-xs text-gray-400">
                            {rating}
                          </span>
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
                    Write a Review
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
                Similar Novels
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

              <div className="mt-6 text-center">
                <Link
                  href={`/tags/${storyDetails.categories?.[0]?.name}`}
                  className="inline-block rounded-full bg-gray-700 px-6 py-2 text-sm font-medium text-white hover:bg-gray-600"
                >
                  View More {storyDetails.categories?.[0]?.name} Novels
                </Link>
              </div>
            </div>
          </TabsContent>

          {/* <TabsContent value="similar">
            <SimilarNovelsSection novels={relatedNovels} primaryCategory={novel.categories[0]} />
          </TabsContent> */}
        </Tabs>
      </div>
    </div>
  );
}

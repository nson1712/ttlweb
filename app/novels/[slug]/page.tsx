import Image from "next/image";
import Link from "next/link";
import {
  Star,
  BookOpen,
  ChevronRight,
  User,
  Eye,
  CheckCircle2Icon,
  Loader2Icon,
} from "lucide-react";

import { StoryDetailsApiResponse } from "@/app/interfaces/story";
import { BaseTag } from "@/app/components/components/base-tag";
import { httpClient } from "@/app/utils/httpClient";
import { StoryInfoTab } from "@/app/components/components/story-info-tabs";
import { NotFound } from "@/app/components/components/not-found";
import { fetchChapters, fetchStoryDetails } from "@/app/lib/fetch-data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const storyRes = await httpClient.get({
    url: `/api/story/${slug}`,
  });

  const metaDataRes = await httpClient.get({
    url: `/api/story/${slug}/meta-data`,
  });

  const storyData = storyRes.data;
  const metaData = metaDataRes.data;

  return {
    title: `Tàng Thư Lâu - ${storyData?.title}`,
    description:
      metaData?.metaDescription || "Đọc chương mới nhất trên Tàng Thư Lâu!",
      keywords: metaData?.metaKeywords
  };
}

export default async function NovelDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    page?: number | undefined;
    pageSize?: number | undefined;
    sortType: string;
  }>;
}) {
  const { slug } = await params;
  const { page, pageSize, sortType } = await searchParams;

  let storyDetailsRes: StoryDetailsApiResponse | null = null;
  try {
    storyDetailsRes = await fetchStoryDetails(slug);
  } catch (error) {
    console.error("Error fetching story details:", error);
    return <NotFound />;
  }

  const storyDetails = storyDetailsRes?.data?.data;

  if (!storyDetails || !storyDetails.id) {
    return <NotFound title="Quay lại trang chủ" />;
  }

  const chaptersRes = await fetchChapters({
    storyId: Number(storyDetails.id),
    page: page ?? 0,
    pageSize: pageSize ?? 20,
    sortType: sortType,
  });

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex items-center text-sm text-gray-400">
            <Link href="/" className="hover:text-emerald-400">
              Trang chủ
            </Link>
            <ChevronRight className="mx-2 h-5 w-5" />
            <a className="text-emerald-400">{storyDetails?.title}</a>
          </nav>
        </div>

        {/* Novel Header */}
        <div className="relative mb-8 overflow-hidden rounded-xl bg-gradient-to-br from-gray-800/90 to-gray-900 p-6 shadow-xl">
          <div className="absolute inset-0 overflow-hidden opacity-10">
            {storyDetails?.coverImage && (
              <Image
                src={storyDetails?.coverImage}
                alt={storyDetails?.title}
                fill
                unoptimized
                className="object-cover"
                priority
              />
            )}
          </div>

          <div className="relative z-10 flex flex-col gap-6 md:flex-row">
            {/* Cover Image */}
            <div className="relative mx-auto w-48 md:mx-0 md:w-56 flex-shrink-0">
              <div className="aspect-[3/4] overflow-hidden rounded-lg shadow-lg">
                {storyDetails?.coverImage && (
                  <Image
                    src={storyDetails?.coverImage}
                    alt={storyDetails?.title}
                    fill
                    unoptimized
                    className="object-cover"
                    priority
                  />
                )}
              </div>

              <div className="absolute bottom-1 left-1 rounded-full bg-black/80 px-3 py-1 text-sm font-medium text-white shadow-md">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span>{(storyDetails?.rate ?? 0).toFixed(1)}</span>
                  {/* <span className="text-gray-300">({storyDetailsRes.data.totalRatings})</span> */}
                </div>
              </div>
            </div>

            {/* Novel Info */}
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-3xl font-bold text-white md:text-4xl">
                  {storyDetails?.title}
                </h1>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1 text-base text-gray-300">
                    <User className="h-5 w-5 text-emerald-400" />
                    <span>{storyDetails?.author?.name}</span>
                  </div>
                  <div className="flex items-center gap-1 text-base text-gray-300">
                    <BookOpen className="h-5 w-5 text-emerald-400" />
                    <span>{chaptersRes.data?.totalElements} chương</span>
                  </div>
                  <div className="flex items-center gap-1 text-base text-gray-300">
                    <Eye className="h-5 w-5 text-emerald-400" />
                    <span>
                      {storyDetails?.totalView.toLocaleString()} lượt đọc
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-base text-gray-300">
                    {storyDetails.status === "COMPLETED" ? (
                      <div className="flex gap-x-1 text-gray-300">
                        <CheckCircle2Icon className="text-green-500 w-5 h-5 self-center" />{" "}
                        Hoàn thành
                      </div>
                    ) : (
                      <div className="flex gap-x-1 text-gray-300">
                        <Loader2Icon className="text-blue w-3.5 h-3.5 self-center" />
                        Đang ra
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {storyDetails?.categories.map((category) => (
                  <BaseTag
                    href={`/categories/${category.slug}`}
                    key={category.id}
                    name={category.name}
                  />
                ))}
              </div>

              <p
                className="max-h-36 overflow-y-auto text-gray-300"
                dangerouslySetInnerHTML={{
                  __html: storyDetails?.shortDescription || "",
                }}
              />

              <div className="flex flex-wrap gap-3">
                {/* <Link
                  href={`/novels/${storyDetailsRes.data?.data?.slug}/${chaptersRes.data.data?.[0]?.slug}`}
                  className="rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-2 text-sm font-medium text-white hover:bg-emerald-600"
                >
                  Đọc ngay
                </Link> */}
                {/* <button
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={cn(
                    "flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium",
                    isFollowing
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-gray-700 text-white hover:bg-gray-600"
                  )}
                >
                  <Heart
                    className={cn("h-5 w-5", isFollowing && "fill-emerald-400")}
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
                      "h-5 w-5",
                      isBookmarked && "fill-emerald-400"
                    )}
                  />
                  <span>{isBookmarked ? "Bookmarked" : "Bookmark"}</span>
                </button> */}
              </div>
            </div>
          </div>
        </div>

        <StoryInfoTab chapters={chaptersRes} storyDetails={storyDetails} />
      </div>
    </div>
  );
}

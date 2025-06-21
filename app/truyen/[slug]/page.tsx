import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { StoryDetailsApiResponse } from "@/app/interfaces/story";
import { httpClient } from "@/app/utils/httpClient";
import { StoryInfoTab } from "@/app/components/components/story-info-tabs";
import { NotFound } from "@/app/components/components/not-found";
import { fetchChapters, fetchStoryDetails } from "@/app/lib/fetch-data";
import { NovelDetailsHeader } from "@/app/components/components/novel-details-header";
import { cookies } from "next/headers";
import { LSK_DEVICE_ID } from "@/app/utils/storage";

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
    keywords: metaData?.metaKeywords,
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
  const deviceId = (await cookies()).get(LSK_DEVICE_ID)?.value ?? "";

  let storyDetailsRes: StoryDetailsApiResponse | null = null;
  try {
    storyDetailsRes = await fetchStoryDetails({
      slug: slug,
      deviceId: deviceId,
    });
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
    deviceId: deviceId
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

        <NovelDetailsHeader
          storyDetails={storyDetails}
          totalChapters={chaptersRes.data?.totalElements}
        />

        <StoryInfoTab chapters={chaptersRes} storyDetails={storyDetails} />
      </div>
    </div>
  );
}

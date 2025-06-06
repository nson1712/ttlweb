import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../app/components/ui/tabs";
import { NovelCard } from "../app/components/novels/novel-card";
import Image from "next/image";
import { CategoriesTagsSection } from "./components/components/categories-tags-section";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import Head from "next/head";
import Script from "next/script";
import { WeeklyStory } from "./components/components/weekly-story";
import { httpClient } from "./utils/httpClient";
import { PotentialStarletSection } from "./components/components/potential-starlet-section";
import { RankingSection } from "./components/components/ranking-section";
import { RecentUpdates } from "./components/components/recently-updated";
import { LinkButton } from "./components/components/link-btn";
import { GreenLineTitle } from "./components/components/green-line-title";
import { StoryType } from "./types/story";
import { StarRate } from "./components/components/star-rate";
import { MotionTitle } from "./components/components/motion-title";

export default async function HomePage() {
  async function fetchWeekly() {
    return (
      await httpClient.get({
        url: "/api/story/weekly/list",
        params: { page: 0, size: 20 },
      })
    ).data;
  }

  async function fetchPotential() {
  try {
    const response = await httpClient.get({
      url: "/api/story/potential/list",
      params: { page: 0, size: 10 },
    });
    return response.data;
  } catch (error) {
    console.error("fetch error:", error);
    throw error;
  }
}

  async function fetchRanking() {
    return (
      await httpClient.get({
        url: "/api/story/ranking/list",
        params: { page: 0, size: 20 },
      })
    ).data;
  }

  async function fetchLatestChapters() {
    return (
      await httpClient.get({
        url: "/api/story/latest-chapter",
        params: { page: 0, size: 20 },
      })
    ).data;
  }

  // async function fetchHashtag() {
  //   return (
  //     await httpClient.get({
  //       url: "private/hash-tag/popular",
  //       params: { page: 1, size: 20 },
  //     })
  //   ).data;
  // }

  async function fetchCategories() {
    return (
      await httpClient.get({
        url: "api/category/list",
      })
    ).data;
  }

  async function fetchFeature() {
    return await httpClient.get({
      url: "api/story",
      params: {
        sort: "rate:DESC",
      },
    });
  }

  async function fetchBestStories() {
    return await httpClient.get({
      url: "api/story",
      params: {
        page: 0,
        size: 20,
        filter: "rate|gt|4.0",
      },
    });
  }

  const [
    weeklyRes,
    potentialRes,
    rankingRes,
    recentUpdatesRes,
    featuredRes,
    bestStoriesRes,
    // hashtagRes,,
    categoriesRes,
  ] = await Promise.all([
    fetchWeekly(),
    fetchPotential(),
    fetchRanking(),
    fetchLatestChapters(),
    fetchFeature(),
    fetchBestStories(),
    // fetchHashtag(),
    fetchCategories(),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Discover Your Next Reading Adventure",
    description:
      "Explore thousands of novels across all your favorite genres. Start your reading journey today on TruyenABC!",
    url: "https://truyenabc.com/",
  };

  return (
    <>
      <Head>
        <link rel="canonical" href="https://truyenabc.site/" />
      </Head>
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="space-y-8">
        <MotionTitle title="Khám phá kho truyện" subTitle="Đầy mê hoặc" />
        <WeeklyStory weeklyStory={weeklyRes?.data?.[0]} />
        <PotentialStarletSection potentialStarlets={potentialRes?.data ?? []} />
        <RankingSection rankingNovels={rankingRes?.data ?? []} />

        <section className="md:grid md:grid-cols-6 gap-x-4 space-y-4 md:space-y-0">
          <div className="col-span-4">
            <GreenLineTitle title="Mới cập nhật" />
            <RecentUpdates recentUpdates={recentUpdatesRes?.data ?? []} />
            <LinkButton href="/updates" label="Xem thêm" />
          </div>
          <Tabs defaultValue="best-novels" className="w-full col-span-2">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="best-novels">Truyện hay nhất</TabsTrigger>
                <TabsTrigger value="most-discussed">
                  Thảo luận nhiều nhất
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="best-novels" className="space-y-4">
              {bestStoriesRes.data.data.map((novel: StoryType) => (
                <Link href={`/novels/${novel.slug}`} key={novel.id}>
                  <div
                    key={novel.id}
                    className="flex items-center gap-4 bg-gradient-to-br from-gray-800/90 to-gray-900 shadow-md hover:shadow-lg p-3 rounded-lg min-w-72 hover:scale-102 transition-transform duration-200"
                  >
                    <Image
                      src={novel.coverImage}
                      alt={novel.title}
                      className="object-cover rounded-md"
                      width={50}
                      height={50}
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-emerald-400 line-clamp-2">
                        {novel.title}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {novel.author?.name}
                      </p>
                      <StarRate rate={novel.rate} />
                    </div>
                  </div>
                </Link>
              ))}
            </TabsContent>

            <TabsContent value="most-discussed" className="space-y-4">
              {/* {bestNovels.map((novel) => (
                <Link href="/novels/lord-mysteries" key={novel.id}>
                  <div
                    key={novel.id}
                    className="flex items-center gap-4 bg-gradient-to-br from-gray-800/90 to-gray-900 shadow-md hover:shadow-lg p-3 rounded-lg min-w-72 hover:scale-102 transition-transform duration-200"
                  >
                    <Image
                      src={novel.coverImage}
                      alt={novel.title}
                      className="object-cover rounded-md"
                      width={50}
                      height={50}
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-emerald-400 line-clamp-2">
                        {novel.title}
                      </h3>
                      <p className="text-sm text-gray-400">{novel.author}</p>
                      <div className="flex"></div>
                      <p className="text-xs text-gray-500">
                        Rating: {novel.rating.toFixed(1)} / 5 from{" "}
                        {novel.totalRatings} ratings
                      </p>
                    </div>
                  </div>
                </Link>
              ))} */}
            </TabsContent>
          </Tabs>
        </section>

        <section>
          <div className="my-6 flex items-center">
            <Sparkles className="mr-2 h-5 w-5 text-emerald-400" />
            <h2 className="text-2xl font-bold text-white">Truyện đặc sắc</h2>
          </div>
          <div className="space-y-4">
            {featuredRes.data.data.map((novel: StoryType) => (
              <NovelCard key={novel.id} {...novel} />
            ))}
          </div>
          <LinkButton href="/featured" label="Xem thêm" />
        </section>

        <section className="mb-12">
          <CategoriesTagsSection
            categories={categoriesRes.slice(0, 12) ?? []}
          />
          <LinkButton href="/categories" label="Xem thêm" />
        </section>
      </div>
    </>
  );
}

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../app/components/ui/tabs";
import { CategoriesTagsSection } from "./components/components/categories-tags-section";
import { PotentialStarletSection } from "./components/components/potential-starlet-section";
import { RankingSection } from "./components/components/ranking-section";
import { RecentUpdates } from "./components/components/recently-updated";
import { LinkButton } from "./components/components/link-btn";
import { GreenLineTitle } from "./components/components/green-line-title";
import { StoryType } from "./types/story";
import { MotionTitle } from "./components/components/motion-title";
import {
  fetchBestStories,
  fetchCategories,
  fetchFeature,
  fetchLatestChapters,
  fetchPotential,
  fetchRanking,
  fetchWeekly,
} from "./lib/fetch-data";
import { TabCard } from "./components/components/tab-card";
import { FeaturedSection } from "./components/components/featured-section";
import { WeeklyStoryCarousel } from "./components/components/weekly-story-carousel";
import { cookies } from "next/headers";
import { LSK_DEVICE_ID } from "./utils/storage";

export default async function HomePage() {
  const deviceId = (await cookies()).get(LSK_DEVICE_ID)?.value ?? "";

  const [
    // weeklyRes,
    // potentialRes,
    // rankingRes,
    // recentUpdatesRes,
    // featuredRes,
    // bestStoriesRes,
    // hashtagRes,
    // categoriesRes,
  ] = await Promise.all([
    // fetchWeekly({ deviceId: deviceId }),
    // fetchPotential({
    //   page: 0,
    //   pageSize: 20,
    //   deviceId: deviceId,
    // }),
    // fetchRanking({ deviceId: deviceId }),
    // fetchLatestChapters({
    //   page: 0,
    //   pageSize: 20,
    //   deviceId: deviceId,
    // }),
    // fetchFeature({ deviceId: deviceId }),
    // fetchBestStories({ deviceId: deviceId }),
    // fetchHashtag(),
    // fetchCategories({ deviceId: deviceId }),
  ]);

  return (
    <div className="space-y-8">
      <MotionTitle title="Khám phá kho truyện" subTitle="Đầy mê hoặc" />
      {/* <WeeklyStoryCarousel weeklyStories={weeklyRes?.data ?? []} /> */}
      {/* <PotentialStarletSection
        potentialStarlets={potentialRes?.data?.data ?? []}
      /> */}
      {/* <RankingSection rankingNovels={rankingRes?.data ?? []} /> */}

      <section className="md:grid md:grid-cols-6 gap-x-4 space-y-4 md:space-y-0">
        <div className="col-span-4">
          <GreenLineTitle title="Mới cập nhật" />
          {/* <RecentUpdates recentUpdates={recentUpdatesRes?.data ?? []} /> */}
          <LinkButton href="/moi-cap-nhat" label="Xem thêm" />
        </div>
        <Tabs defaultValue="best-novels" className="w-full col-span-2">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger
                className="data-[state=active]:text-white"
                value="best-novels"
              >
                Truyện hay nhất
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:text-white"
                value="most-discussed"
              >
                Thảo luận nhiều nhất
              </TabsTrigger>
            </TabsList>
          </div>

          {/* <TabsContent value="best-novels">
            <div className="flex flex-col gap-y-2">
              {bestStoriesRes.data.data?.map((novel: StoryType) => (
                <TabCard key={novel?.id} novel={novel} />
              ))}
            </div>
          </TabsContent> */}

          <TabsContent value="most-discussed" className="space-y-4">
            {/* {bestNovels.map((novel) => (
                <Link href="/truyen/lord-mysteries" key={novel?.id}>
                  <div
                    key={novel?.id}
                    className="flex items-center gap-4 bg-gradient-to-br from-gray-800/90 to-gray-900 shadow-md hover:shadow-lg p-3 rounded-lg min-w-72 hover:scale-102 transition-transform duration-200"
                  >
                    <Image
                      src={novel?.coverImage}
                      alt={novel?.title}
                      className="object-cover rounded-md"
                      width={50}
                      height={50}
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-emerald-400 line-clamp-2">
                        {novel?.title}
                      </h3>
                      <p className="text-sm text-gray-400">{novel?.author}</p>
                      <div className="flex"></div>
                      <p className="text-xs text-gray-500">
                        Rating: {novel?.rating.toFixed(1)} / 5 from{" "}
                        {novel?.totalRatings} ratings
                      </p>
                    </div>
                  </div>
                </Link>
              ))} */}
          </TabsContent>
        </Tabs>
      </section>

      {/* <FeaturedSection feturedStories={featuredRes?.data?.data} /> */}
      <section className="mb-12">
        {/* <CategoriesTagsSection categories={categoriesRes.slice(0, 12) ?? []} /> */}
        <LinkButton href="/the-loai" label="Xem thêm" />
      </section>
    </div>
  );
}

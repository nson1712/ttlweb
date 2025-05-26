import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../app/components/ui/tabs";
import { NovelCard } from "../app/components/novels/novel-card";
import Image from "next/image";
import { UpdateCard } from "./components/novels/update-card";
import { CategoriesTagsSection } from "./components/components/categories-tags-section";
import { Eye, Sparkles } from "lucide-react";
import Link from "next/link";
import Head from "next/head";
import Script from "next/script";
import { HomePageTitle } from "./components/components/home-page-title";
import { WeeklyStory } from "./components/components/weekly-story";
import { httpClient } from "./utils/httpClient";
import { PotentialStarletSection } from "./components/components/potential-starlet-section";
import { RankingSection } from "./components/components/ranking-section";

// Mock data for featured novels
const featuredNovels = [
  {
    id: "madman-family",
    slug: "madman-family",
    title: "I Am The Madman Of This Family",
    coverImage: "/1742474407_the-empty-box-and-zeroth-maria.webp",
    author: "Solver Keter",
    rating: 4.5,
    totalRatings: 11,
    categories: ["Adventure", "Fantasy", "Action"],
    description:
      'Solver Keter, one of the Five Lunatics of Lawless City, regresses to when he was the illegitimate son of a doomed archery family. "If I regressed and couldn\'t even save my family, I might as well go kill myself." For my family? No, for my freedom!... Solver Keter, one of the Five Lunatics of Lawless City, regresses to when he was the illegitimate son of a doomed archery family. "If I regressed and couldn\'t even save my family, I might as well go kill myself." For my family? No, for my freedom!...Solver Keter, one of the Five Lunatics of Lawless City, regresses to when he was the illegitimate son of a doomed archery family. "If I regressed and couldn\'t even save my family, I might as well go kill myself." For my family? No, for my freedom!...Solver Keter, one of the Five Lunatics of Lawless City, regresses to when he was the illegitimate son of a doomed archery family. "If I regressed and couldn\'t even save my family, I might as well go kill myself." For my family? No, for my freedom!...Solver Keter, one of the Five Lunatics of Lawless City, regresses to when he was the illegitimate son of a doomed archery family. "If I regressed and couldn\'t even save my family, I might as well go kill myself." For my family? No, for my freedom!...Solver Keter, one of the Five Lunatics of Lawless City, regresses to when he was the illegitimate son of a doomed archery family. "If I regressed and couldn\'t even save my family, I might as well go kill myself." For my family? No, for my freedom!...Solver Keter, one of the Five Lunatics of Lawless City, regresses to when he was the illegitimate son of a doomed archery family. "If I regressed and couldn\'t even save my family, I might as well go kill myself." For my family? No, for my freedom!...Solver Keter, one of the Five Lunatics of Lawless City, regresses to when he was the illegitimate son of a doomed archery family. "If I regressed and couldn\'t even save my family, I might as well go kill myself." For my family? No, for my freedom!...Solver Keter, one of the Five Lunatics of Lawless City, regresses to when he was the illegitimate son of a doomed archery family. "If I regressed and couldn\'t even save my family, I might as well go kill myself." For my family? No, for my freedom!...',
    updatedAt: "8 hours ago",
    chapterCount: 46,
  },
  {
    id: "industrial-cthulhu",
    slug: "industrial-cthulhu",
    title: "Industrial Cthulhu: Starting as an Island Lord",
    coverImage: "/1742474407_the-empty-box-and-zeroth-maria.webp",
    author: "Unknown Author",
    rating: 4.2,
    totalRatings: 21,
    categories: [
      "Adventure",
      "Fantasy",
      "Historical",
      "Horror",
      "Mystery",
      "Supernatural",
      "Tragedy",
      "Action",
    ],
    description:
      '"I saw with my own eyes that they used the finest, rustproof refined steel to make utensils and cans, filling them with just a little food, then casually throwing them away after eating." "I saw with my own eyes that they used giant beasts as tall as mountains to devour soil and rocks, digging out..."',
    updatedAt: "8 hours ago",
    chapterCount: 42,
  },
  {
    id: "genius-cloning 1",
    slug: "genius-cloning 1",
    title: "The Genius of Cloning in the Academy City",
    coverImage: "/1742474407_the-empty-box-and-zeroth-maria.webp",
    author: "Unknown Author",
    rating: 4.7,
    totalRatings: 19,
    categories: [
      "Comedy",
      "Psychological",
      "Gender Bender",
      "Fantasy",
      "Supernatural",
      "Adventure",
      "Martial Arts",
    ],
    description:
      "I awoke as Violet, a familiar villainess trapped in a shady corporate research lab. Screw this! With my unstoppable cloning technique, I'm getting out of here and going to the Academy to live my own life!...",
    updatedAt: "3 hours ago",
    chapterCount: 23,
  },
  {
    id: "genius-cloning 2",
    slug: "genius-cloning 2",
    title: "The Genius of Cloning in the Academy City",
    coverImage: "/1742474407_the-empty-box-and-zeroth-maria.webp",
    author: "Unknown Author",
    rating: 4.7,
    totalRatings: 19,
    categories: [
      "Comedy",
      "Psychological",
      "Gender Bender",
      "Fantasy",
      "Supernatural",
      "Adventure",
      "Martial Arts",
    ],
    description:
      "I awoke as Violet, a familiar villainess trapped in a shady corporate research lab. Screw this! With my unstoppable cloning technique, I'm getting out of here and going to the Academy to live my own life!...",
    updatedAt: "3 hours ago",
    chapterCount: 23,
  },
];

// Mock data for best novels
const bestNovels = [
  {
    id: "lord-mysteries",
    slug: "lord-mysteries",
    title: "Lord of the Mysteries á dá ac ác xzc sxc xzc sa zxc zxc á á",
    coverImage: "/1744419978_blood-eagle.webp",
    author: "Cuttlefish That Loves Diving",
    rating: 4.7,
    totalRatings: 853,
    categories: ["Fantasy", "Mystery", "Supernatural"],
  },
  {
    id: "legendary-mechanic",
    slug: "legendary-mechanic",
    title: "The Legendary Mechanic",
    coverImage: "/1744419978_blood-eagle.webp",
    author: "Chocolion",
    rating: 4.7,
    totalRatings: 712,
    categories: ["Sci-Fi", "Adventure", "Fantasy"],
  },
  {
    id: "shadow-slave",
    slug: "shadow-slave",
    title: "Shadow Slave",
    coverImage: "/1744419978_blood-eagle.webp",
    author: "Guiltythree",
    rating: 4.1,
    totalRatings: 769,
    categories: ["Fantasy", "Action", "Adventure"],
  },
  {
    id: "circle-inevitability",
    slug: "circle-inevitability",
    title: "Circle of Inevitability",
    coverImage: "/1744419978_blood-eagle.webp",
    author: "Cuttlefish That Loves Diving",
    rating: 4.6,
    totalRatings: 528,
    categories: ["Fantasy", "Mystery", "Supernatural"],
  },
  {
    id: "circle-inevitability 2",
    slug: "circle-inevitability 2",
    title: "Circle of Inevitability",
    coverImage: "/1744419978_blood-eagle.webp",
    author: "Cuttlefish That Loves Diving",
    rating: 4.6,
    totalRatings: 528,
    categories: ["Fantasy", "Mystery", "Supernatural"],
  },
];

// Mock data for recent updates
const recentUpdates = [
  {
    id: "lord-void",
    slug: "lord-void",
    coverImage: "/1742474407_the-empty-box-and-zeroth-maria.webp",
    title: "The Lord of Void and Real",
    chapter: "Chapter 319: Three Stars Demolishing Demons",
    updatedAt: "9 minutes ago",
  },
  {
    id: "beast-taming",
    slug: "beast-taming",
    coverImage: "/1742474407_the-empty-box-and-zeroth-maria.webp",
    title: "Beast Taming Patrol",
    chapter: "Chapter 674: Youyou Advances!",
    updatedAt: "14 minutes ago",
  },
  {
    id: "disciple-simulator",
    slug: "disciple-simulator",
    coverImage: "/1742474407_the-empty-box-and-zeroth-maria.webp",
    title: "I Have A Disciple Simulator",
    chapter: "Chapter 911: The Humble Hallucinatory Dark Demon Venerable!",
    updatedAt: "14 minutes ago",
  },
  {
    id: "grinding-experience",
    slug: "grinding-experience",
    coverImage: "/1742474407_the-empty-box-and-zeroth-maria.webp",
    title: "I Am Grinding Experience In Another World",
    chapter: "Chapter 671: Return to Qingqiu",
    updatedAt: "15 minutes ago",
  },
  {
    id: "reversing-life",
    slug: "reversing-life",
    coverImage: "/1742474407_the-empty-box-and-zeroth-maria.webp",
    title: "Reversing Life With Item Copy",
    chapter: "Chapter 128: Not Quite Yet",
    updatedAt: "16 minutes ago",
  },
];

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
    return (
      await httpClient.get({
        url: "/api/story/potential/list",
        params: { page: 0, size: 20 },
      })
    ).data;
  }
  async function fetchRanking() {
    return (
      await httpClient.get({
        url: "/api/story/ranking/list",
        params: { page: 0, size: 20 },
      })
    ).data;
  }

  async function fetchHashtag() {
    return (
      await httpClient.get({
        url: "private/hash-tag/popular",
        params: { page: 0, size: 20 },
      })
    ).data;
  }

  async function fetchCategories() {
    return (
      await httpClient.get({
        url: "api/category/list",
        params: { page: 0, size: 20 },
      })
    ).data;
  }

  const [weeklyRes, potentialRes, rankingRes, hashtagRes, categoriesRes] =
    await Promise.all([
      fetchWeekly(),
      fetchPotential(),
      fetchRanking(),
      fetchHashtag(),
      fetchCategories(),
    ]);

  // const [previewChapter, setPreviewChapter] = useState<string | null>(null);

  // const getChapterPreviewData = (chapterId: string) => {
  //   return chapterPreviews.find((preview) => preview.id === chapterId) || null;
  // };

  // const selectedChapterPreview = previewChapter
  //   ? getChapterPreviewData(previewChapter)
  //   : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Discover Your Next Reading Adventure",
    description:
      "Explore thousands of novels across all your favorite genres. Start your reading journey today on YourSiteName!",
    url: "https://yoursite.com/",
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
        <HomePageTitle />
        <WeeklyStory weeklyStory={weeklyRes?.data?.[0]} />
        <PotentialStarletSection potentialStarlets={potentialRes?.data ?? []} />
        <RankingSection rankingNovels={rankingRes?.data ?? []} />

        {/* Featured Novels Section */}
        <section className="md:flex gap-x-4 space-y-4 md:space-y-0">
          <div>
            <section>
              <h2 className="flex items-center justify-center bg-gray-800 py-4 mb-4">
                <div className="flex items-center w-full max-w-screen-md px-4">
                  <div className="flex-grow h-0.5 bg-gradient-to-l from-green-300 to-transparent"></div>
                  <span className="mx-4 text-xl font-semibold text-gray-300">
                    Mới cập nhật
                  </span>
                  <div className="flex-grow h-0.5 bg-gradient-to-r from-green-300 to-transparent"></div>
                </div>
              </h2>
              <div className="space-y-4">
                {recentUpdates.map((update) => (
                  <div
                    key={`${update.id}-${update.chapter}`}
                    className="relative group"
                  >
                    <UpdateCard {...update} />
                    {/* <button
                    onClick={() => setPreviewChapter(`${update.id}`)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-gray-800/80 p-2 text-emerald-400 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-gray-700"
                    aria-label="Preview chapter"
                  >
                    <Eye className="h-4 w-4 cursor-pointer" />
                  </button> */}
                  </div>
                ))}
              </div>

              <div className="mt-4 text-center">
                <Link
                  href="/updates"
                  className="inline-block bg-gray-800 border border-slate-700 rounded-md w-full px-4 py-2 text-base font-medium text-emerald-400 transition-colors hover:bg-gray-800 hover:text-emerald-300"
                >
                  Xem thêm
                </Link>
              </div>
            </section>

            <div className="my-6 flex items-center">
              <Sparkles className="mr-2 h-5 w-5 text-emerald-400" />
              <h2 className="text-2xl font-bold text-white">Truyện đặc sắc</h2>
            </div>
            <div className="space-y-6">
              {featuredNovels.map((novel) => (
                <NovelCard key={novel.id} {...novel} />
              ))}
            </div>
            <div className="mt-4 text-center">
              <Link
                href="/featured"
                className="inline-block rounded-md w-full bg-gray-800 border border-slate-700 px-4 py-2 text-sm font-medium text-emerald-400 transition-colors hover:text-emerald-300"
              >
                View All Feature
              </Link>
            </div>
          </div>

          <Tabs defaultValue="best-novels" className="w-full">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="best-novels">Truyện hay nhất</TabsTrigger>
                <TabsTrigger value="most-discussed">Thảo luận nhiều nhất</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="best-novels" className="space-y-4">
              {bestNovels.map((novel) => (
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
                      <p className="text-xs text-gray-500">
                        Rating: {novel.rating.toFixed(1)} / 5 from{" "}
                        {novel.totalRatings} ratings
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </TabsContent>

            <TabsContent value="most-discussed" className="space-y-4">
              {bestNovels.map((novel) => (
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
                      <p className="text-xs text-gray-500">
                        Rating: {novel.rating.toFixed(1)} / 5 from{" "}
                        {novel.totalRatings} ratings
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </TabsContent>
          </Tabs>
        </section>

        <div className="mb-12">
          <CategoriesTagsSection />
        </div>

        {/* <AnimatePresence>
        {selectedChapterPreview && (
          <ChapterPreview
            {...selectedChapterPreview}
            onClose={() => setPreviewChapter(null)}
          />
        )}
      </AnimatePresence> */}
      </div>
    </>
  );
}

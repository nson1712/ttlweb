"use client";
// import { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../app/components/ui/tabs";
import { NovelCard } from "../app/components/novels/novel-card";
import Image from "next/image";
import { UpdateCard } from "./components/novels/update-card";
import { motion } from "framer-motion";
import { WeeklyFeaturedBook } from "./components/components/weekly-feature-books";
import { CategoriesTagsSection } from "./components/components/categories-tags-section";
import { PotentialStarletSection } from "./components/components/potential-starlet-section";
import { RankingSection } from "./components/components/ranking-section";
import { Sparkles } from "lucide-react";
import Link from "next/link";
// import { PaginationWithLinks } from "./components/components/pagination";
// import { useSearchParams } from "next/navigation";

// Mock data for featured novels
const featuredNovels = [
  {
    id: "madman-family",
    slug: "madman-family",
    title: "I Am The Madman Of This Family",
    coverImage:
      "https://ranobes.top/uploads/posts/2025-03/thumbs/1741679006_industrial-cthulhu-starting-as-an-island-lord.webp",
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
    coverImage:
      "https://ranobes.top/uploads/posts/2025-03/thumbs/1741679006_industrial-cthulhu-starting-as-an-island-lord.webp",
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
    coverImage:
      "https://ranobes.top/uploads/posts/2025-03/thumbs/1741679006_industrial-cthulhu-starting-as-an-island-lord.webp",
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
    coverImage:
      "https://ranobes.top/uploads/posts/2025-03/thumbs/1741679006_industrial-cthulhu-starting-as-an-island-lord.webp",
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
    coverImage:
      "https://ranobes.top/uploads/posts/2025-04/thumbs/1744879926_diary-of-a-dead-wizard.webp",
    author: "Cuttlefish That Loves Diving",
    rating: 4.7,
    totalRatings: 853,
    categories: ["Fantasy", "Mystery", "Supernatural"],
  },
  {
    id: "legendary-mechanic",
    slug: "legendary-mechanic",
    title: "The Legendary Mechanic",
    coverImage:
      "https://ranobes.top/uploads/posts/2025-04/thumbs/1744879926_diary-of-a-dead-wizard.webp",
    author: "Chocolion",
    rating: 4.7,
    totalRatings: 712,
    categories: ["Sci-Fi", "Adventure", "Fantasy"],
  },
  {
    id: "shadow-slave",
    slug: "shadow-slave",
    title: "Shadow Slave",
    coverImage:
      "https://ranobes.top/uploads/posts/2025-04/thumbs/1744879926_diary-of-a-dead-wizard.webp",
    author: "Guiltythree",
    rating: 4.1,
    totalRatings: 769,
    categories: ["Fantasy", "Action", "Adventure"],
  },
  {
    id: "circle-inevitability",
    slug: "circle-inevitability",
    title: "Circle of Inevitability",
    coverImage:
      "https://ranobes.top/uploads/posts/2025-04/thumbs/1744879926_diary-of-a-dead-wizard.webp",
    author: "Cuttlefish That Loves Diving",
    rating: 4.6,
    totalRatings: 528,
    categories: ["Fantasy", "Mystery", "Supernatural"],
  },
  {
    id: "circle-inevitability 2",
    slug: "circle-inevitability 2",
    title: "Circle of Inevitability",
    coverImage:
      "https://ranobes.top/uploads/posts/2025-04/thumbs/1744879926_diary-of-a-dead-wizard.webp",
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
    coverImage:
      "https://ranobes.top/uploads/posts/2025-03/thumbs/1741679006_industrial-cthulhu-starting-as-an-island-lord.webp",
    title: "The Lord of Void and Real",
    chapter: "Chapter 319: Three Stars Demolishing Demons",
    updatedAt: "9 minutes ago",
  },
  {
    id: "beast-taming",
    slug: "beast-taming",
    coverImage:
      "https://ranobes.top/uploads/posts/2025-03/thumbs/1741679006_industrial-cthulhu-starting-as-an-island-lord.webp",
    title: "Beast Taming Patrol",
    chapter: "Chapter 674: Youyou Advances!",
    updatedAt: "14 minutes ago",
  },
  {
    id: "disciple-simulator",
    slug: "disciple-simulator",
    coverImage:
      "https://ranobes.top/uploads/posts/2025-03/thumbs/1741679006_industrial-cthulhu-starting-as-an-island-lord.webp",
    title: "I Have A Disciple Simulator",
    chapter: "Chapter 911: The Humble Hallucinatory Dark Demon Venerable!",
    updatedAt: "14 minutes ago",
  },
  {
    id: "grinding-experience",
    slug: "grinding-experience",
    coverImage:
      "https://ranobes.top/uploads/posts/2025-03/thumbs/1741679006_industrial-cthulhu-starting-as-an-island-lord.webp",
    title: "I Am Grinding Experience In Another World",
    chapter: "Chapter 671: Return to Qingqiu",
    updatedAt: "15 minutes ago",
  },
  {
    id: "reversing-life",
    slug: "reversing-life",
    coverImage:
      "https://ranobes.top/uploads/posts/2025-03/thumbs/1741679006_industrial-cthulhu-starting-as-an-island-lord.webp",
    title: "Reversing Life With Item Copy",
    chapter: "Chapter 128: Not Quite Yet",
    updatedAt: "16 minutes ago",
  },
];

export default function HomePage() {
  // const [activeTab, setActiveTab] = useState("best-novels");
  // const searchParams = useSearchParams();
  // const page = parseInt(searchParams.get("page") ?? "1", 10);
  // const pageSize = parseInt(searchParams.get("pageSize") ?? "20", 10);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
          <span className="block">Discover Your Next</span>
          <span className="block bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
            Reading Adventure
          </span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-400">
          Explore thousands of novels across all your favorite genres
        </p>
      </motion.div>

      {/* Weekly Book Feature Section */}
      <WeeklyFeaturedBook />

      <div className="mt-12">
        <PotentialStarletSection />
      </div>

      <RankingSection />

      {/* Featured Novels Section */}
      <section className="md:flex gap-x-4 space-y-4 md:space-y-0">
        <div>
          <section>
            <h2 className="flex items-center justify-center bg-gray-800 py-4 mb-4">
              <div className="flex items-center w-full max-w-screen-md px-4">
                <div className="flex-grow h-0.5 bg-gradient-to-l from-green-300 to-transparent"></div>
                <span className="mx-4 text-xl font-semibold text-gray-300">
                  Recent Updates
                </span>
                <div className="flex-grow h-0.5 bg-gradient-to-r from-green-300 to-transparent"></div>
              </div>
            </h2>
            <div className="space-y-4">
              {recentUpdates.map((update) => (
                <UpdateCard key={update.id} {...update} />
              ))}

              {/* <PaginationWithLinks
                pageSearchParam="page"
                pageSizeSelectOptions={{
                  pageSizeSearchParam: "size",
                  pageSizeOptions: [10, 20, 50, 100],
                }}
                page={page}
                pageSize={pageSize}
                totalCount={300}
              /> */}
            </div>

            <div className="mt-4 text-center">
              <Link
                href="/updates"
                className="inline-block bg-gray-800 border border-slate-700 rounded-sm w-full px-4 py-2 text-base font-medium text-emerald-400 transition-colors hover:bg-gray-800 hover:text-emerald-300"
              >
                View All Updates
              </Link>
            </div>
          </section>

          <div className="mb-6 flex items-center">
            <Sparkles className="mr-2 h-5 w-5 text-emerald-400" />
            <h2 className="text-2xl font-bold text-white">Featured Novels</h2>
          </div>
          <div className="space-y-6">
            {featuredNovels.map((novel) => (
              <NovelCard key={novel.id} {...novel} />
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link
              href="/tags"
              className="inline-block rounded-full bg-gray-700 px-4 py-2 text-sm font-medium text-emerald-400 transition-colors hover:bg-gray-600 hover:text-emerald-300"
            >
              View All Feature
            </Link>
          </div>
        </div>

        <Tabs defaultValue="best-novels" className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="best-novels">Best novels</TabsTrigger>
              <TabsTrigger value="most-discussed">Most Discussed</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="best-novels" className="space-y-4">
            {bestNovels.map((novel) => (
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
            ))}
          </TabsContent>

          <TabsContent value="most-discussed" className="space-y-4">
            {bestNovels.map((novel) => (
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
            ))}
          </TabsContent>
        </Tabs>
      </section>

      <div className="mb-12">
        <CategoriesTagsSection />
      </div>
    </div>
  );
}

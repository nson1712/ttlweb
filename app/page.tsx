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
    genres: ["Adventure", "Fantasy", "Action"],
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
    genres: [
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
    genres: [
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
    genres: [
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
    title: "Lord of the Mysteries",
    coverImage:
      "https://ranobes.top/uploads/posts/2025-03/thumbs/1741679006_industrial-cthulhu-starting-as-an-island-lord.webp",
    author: "Cuttlefish That Loves Diving",
    rating: 4.7,
    totalRatings: 853,
    genres: ["Fantasy", "Mystery", "Supernatural"],
  },
  {
    id: "legendary-mechanic",
    slug: "legendary-mechanic",
    title: "The Legendary Mechanic",
    coverImage:
      "https://ranobes.top/uploads/posts/2025-03/thumbs/1741679006_industrial-cthulhu-starting-as-an-island-lord.webp",
    author: "Chocolion",
    rating: 4.7,
    totalRatings: 712,
    genres: ["Sci-Fi", "Adventure", "Fantasy"],
  },
  {
    id: "shadow-slave",
    slug: "shadow-slave",
    title: "Shadow Slave",
    coverImage:
      "https://ranobes.top/uploads/posts/2025-03/thumbs/1741679006_industrial-cthulhu-starting-as-an-island-lord.webp",
    author: "Guiltythree",
    rating: 4.1,
    totalRatings: 769,
    genres: ["Fantasy", "Action", "Adventure"],
  },
  {
    id: "circle-inevitability",
    slug: "circle-inevitability",
    title: "Circle of Inevitability",
    coverImage:
      "https://ranobes.top/uploads/posts/2025-03/thumbs/1741679006_industrial-cthulhu-starting-as-an-island-lord.webp",
    author: "Cuttlefish That Loves Diving",
    rating: 4.6,
    totalRatings: 528,
    genres: ["Fantasy", "Mystery", "Supernatural"],
  },
  {
    id: "circle-inevitability 2",
    slug: "circle-inevitability 2",
    title: "Circle of Inevitability",
    coverImage:
      "https://ranobes.top/uploads/posts/2025-03/thumbs/1741679006_industrial-cthulhu-starting-as-an-island-lord.webp",
    author: "Cuttlefish That Loves Diving",
    rating: 4.6,
    totalRatings: 528,
    genres: ["Fantasy", "Mystery", "Supernatural"],
  },
];

// Mock data for recent updates
const recentUpdates = [
  {
    id: "lord-void",
    slug: "lord-void",
    title: "The Lord of Void and Real",
    chapter: "Chapter 319: Three Stars Demolishing Demons",
    updatedAt: "9 minutes ago",
  },
  {
    id: "beast-taming",
    slug: "beast-taming",
    title: "Beast Taming Patrol",
    chapter: "Chapter 674: Youyou Advances!",
    updatedAt: "14 minutes ago",
  },
  {
    id: "disciple-simulator",
    slug: "disciple-simulator",
    title: "I Have A Disciple Simulator",
    chapter: "Chapter 911: The Humble Hallucinatory Dark Demon Venerable!",
    updatedAt: "14 minutes ago",
  },
  {
    id: "grinding-experience",
    slug: "grinding-experience",
    title: "I Am Grinding Experience In Another World",
    chapter: "Chapter 671: Return to Qingqiu",
    updatedAt: "15 minutes ago",
  },
  {
    id: "reversing-life",
    slug: "reversing-life",
    title: "Reversing Life With Item Copy",
    chapter: "Chapter 128: Not Quite Yet",
    updatedAt: "16 minutes ago",
  },
];

export default function HomePage() {
  // const [activeTab, setActiveTab] = useState("best-novels");

  return (
    <div className="space-y-8">
      {/* Featured Novels Section */}
      <section className="md:flex gap-x-4 space-y-4 md:space-y-0">
        
        <div>
        <section>
            <h2 className="flex items-center justify-center bg-gray-800 py-4 mb-4">
              <div className="flex items-center w-full max-w-screen-md px-4">
                <div className="flex-grow border-t border-gray-500"></div>
                <span className="mx-4 text-sm font-semibold text-gray-300">
                  UPDATE TAPE
                </span>
                <div className="flex-grow border-t border-gray-500"></div>
              </div>
            </h2>
            <div className="space-y-4">
              {recentUpdates.map((update) => (
                <div key={update.id} className="bg-gray-800 p-3 rounded-lg">
                  <h3 className="font-medium text-blue-400">{update.title}</h3>
                  <p className="text-sm text-gray-300">{update.chapter}</p>
                  <p className="text-xs text-gray-500">{update.updatedAt}</p>
                </div>
              ))}
            </div>
          </section>
          <h2 className="text-2xl font-bold my-4">Featured Novels</h2>
          <div className="space-y-6">
            {featuredNovels.map((novel) => (
              <NovelCard key={novel.id} {...novel} />
            ))}
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
                className="flex items-center gap-4 bg-gray-800 p-3 rounded-lg"
              >
                <Image
                  src={novel.coverImage}
                  alt={novel.title}
                  className="object-cover rounded-md"
                  width={64}
                  height={64}
                />
                <div className="flex-1">
                  <h3 className="font-medium text-blue-400">{novel.title}</h3>
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
            {/* This would contain most discussed novels, using same structure as best novels */}
            <p className="text-gray-400">
              Most discussed novels would appear here.
            </p>
          </TabsContent>
        </Tabs>
      </section>

      {/* Best Novels / Most Discussed Tabs */}
      <section>
        {/*<Tabs defaultValue="best-novels" className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="best-novels">Best novels</TabsTrigger>
              <TabsTrigger value="most-discussed">Most Discussed</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="best-novels" className="space-y-4">
            {bestNovels.map((novel) => (
              <div key={novel.id} className="flex items-center gap-4 bg-gray-800 p-3 rounded-lg">
                <Image
                  src={novel.coverImage}
                  alt={novel.title}
                  className="object-cover rounded-md"
                  width={64}
                  height={64}
                />
                <div className="flex-1">
                  <h3 className="font-medium text-blue-400">{novel.title}</h3>
                  <p className="text-sm text-gray-400">{novel.author}</p>
                  <p className="text-xs text-gray-500">
                    Rating: {novel.rating.toFixed(1)} / 5 from {novel.totalRatings} ratings
                  </p>
                </div>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="most-discussed" className="space-y-4">
            <p className="text-gray-400">Most discussed novels would appear here.</p>
          </TabsContent>
        </Tabs> */}
      </section>

      {/* Update Tape Section */}
      {/* <section>
        <h2 className="text-2xl font-bold mb-4 text-center">UPDATE TAPE</h2>
        <div className="space-y-4">
          {recentUpdates.map((update) => (
            <div key={update.id} className="bg-gray-800 p-3 rounded-lg">
              <h3 className="font-medium text-blue-400">{update.title}</h3>
              <p className="text-sm text-gray-300">{update.chapter}</p>
              <p className="text-xs text-gray-500">{update.updatedAt}</p>
            </div>
          ))}
        </div>
      </section> */}
    </div>
  );
}

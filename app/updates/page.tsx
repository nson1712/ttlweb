// "use client";

// import { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../app/components/ui/tabs";
import Image from "next/image";
import Link from "next/link";
// import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../components/ui/pagination";
// import { PaginationWithLinks } from "../components/components/pagination";

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
    id: "reversing-life-1",
    slug: "reversing-life-1",
    coverImage:
      "https://ranobes.top/uploads/posts/2025-03/thumbs/1741679006_industrial-cthulhu-starting-as-an-island-lord.webp",
    title: "Reversing Life With Item Copy",
    chapter: "Chapter 128: Not Quite Yet",
    updatedAt: "16 minutes ago",
  },
  {
    id: "reversing-life-2",
    slug: "reversing-life-2",
    coverImage:
      "https://ranobes.top/uploads/posts/2025-03/thumbs/1741679006_industrial-cthulhu-starting-as-an-island-lord.webp",
    title: "Reversing Life With Item Copy",
    chapter: "Chapter 128: Not Quite Yet",
    updatedAt: "16 minutes ago",
  },
  {
    id: "reversing-life-3",
    slug: "reversing-life-3",
    coverImage:
      "https://ranobes.top/uploads/posts/2025-03/thumbs/1741679006_industrial-cthulhu-starting-as-an-island-lord.webp",
    title: "Reversing Life With Item Copy",
    chapter: "Chapter 128: Not Quite Yet",
    updatedAt: "16 minutes ago",
  },
  {
    id: "reversing-life-4",
    slug: "reversing-life-4",
    coverImage:
      "https://ranobes.top/uploads/posts/2025-03/thumbs/1741679006_industrial-cthulhu-starting-as-an-island-lord.webp",
    title: "Reversing Life With Item Copy",
    chapter: "Chapter 128: Not Quite Yet",
    updatedAt: "16 minutes ago",
  },
];

export default function HomePage(
//   {
//   searchParams,
// }: {
//   searchParams: { [key: string]: string | string[] | undefined };
// }
) {
  // const [activeTab, setActiveTab] = useState("best-novels");
  // const page = parseInt(
  //   (Array.isArray(searchParams["page"])
  //     ? searchParams["page"][0]
  //     : searchParams["page"]) || "1"
  // );
  // const pageSize = parseInt(
  //   (Array.isArray(searchParams["pageSize"])
  //     ? searchParams["pageSize"][0]
  //     : searchParams["pageSize"]) || "20"
  // );

  return (
    <div className="space-y-4">
      {/* Featured Novels Section */}
      <div className="grid grid-cols-12 gap-x-4 space-y-4 md:space-y-0">
        <section className="col-span-12 md:col-span-8 space-y-4 gap-y-4 rounded-lg">
          <h2 className="flex items-center justify-center bg-gray-800 py-4 mb-4">
            <div className="flex items-center w-full max-w-screen-md px-4">
              <div className="flex-grow h-0.5 bg-gradient-to-l from-green-300 to-transparent"></div>
              <span className="mx-4 text-sm font-semibold text-gray-300">
                UPDATE TAPE
              </span>
              <div className="flex-grow h-0.5 bg-gradient-to-r from-green-300 to-transparent"></div>
            </div>
          </h2>
          <div className="space-y-4">
            {recentUpdates.map((update) => (
              <Link href={`/novels/${update.slug}`} key={update.id}>
                <div
                  key={update.id}
                  className="bg-gray-800 p-3 rounded-lg hover:scale-102 transition-transform duration-200 mb-2 flex gap-x-4"
                >
                  <Image
                    src={update.coverImage}
                    alt={update.title}
                    className="object-cover rounded-md"
                    width={50}
                    height={64}
                  />

                  <div>
                    <h3 className="font-medium text-blue-400">
                      {update.title}
                    </h3>
                    <p className="text-sm text-gray-300 line-clamp-1">
                      {update.chapter}
                    </p>
                    <p className="text-xs text-gray-500">{update.updatedAt}</p>
                  </div>
                </div>
              </Link>
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
        </section>

        <Tabs
          defaultValue="best-novels"
          className="w-full hidden sm:block sm:col-span-4"
        >
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
                className="flex items-center gap-4 bg-gray-800 p-3 rounded-lg min-w-72 hover:scale-102 transition-transform duration-200"
              >
                <Image
                  src={novel.coverImage}
                  alt={novel.title}
                  className="object-cover rounded-md"
                  width={50}
                  height={50}
                />
                <div className="flex-1">
                  <h3 className="font-medium text-blue-400 line-clamp-2">
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
                className="flex items-center gap-4 bg-gray-800 p-3 rounded-lg min-w-72 hover:scale-102 transition-transform duration-200"
              >
                <Image
                  src={novel.coverImage}
                  alt={novel.title}
                  className="object-cover rounded-md"
                  width={50}
                  height={50}
                />
                <div className="flex-1">
                  <h3 className="font-medium text-blue-400 line-clamp-2">
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
      </div>
    </div>
  );
}

// // "use client";

// // import { useState } from "react";
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from "../../app/components/ui/tabs";
// import Image from "next/image";
// import Link from "next/link";
// // import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../components/ui/pagination";
// // import { PaginationWithLinks } from "../components/components/pagination";

// // Mock data for best novels
// const bestNovels = [
//   {
//     id: "lord-mysteries",
//     slug: "lord-mysteries",
//     title: "Lord of the Mysteries á dá ac ác xzc sxc xzc sa zxc zxc á á",
//     coverImage:
//       "https://ranobes.top/uploads/posts/2025-04/thumbs/1744879926_diary-of-a-dead-wizard.webp",
//     author: "Cuttlefish That Loves Diving",
//     rating: 4.7,
//     totalRatings: 853,
//     categories: ["Fantasy", "Mystery", "Supernatural"],
//   },
//   {
//     id: "legendary-mechanic",
//     slug: "legendary-mechanic",
//     title: "The Legendary Mechanic",
//     coverImage:
//       "https://ranobes.top/uploads/posts/2025-04/thumbs/1744879926_diary-of-a-dead-wizard.webp",
//     author: "Chocolion",
//     rating: 4.7,
//     totalRatings: 712,
//     categories: ["Sci-Fi", "Adventure", "Fantasy"],
//   },
//   {
//     id: "shadow-slave",
//     slug: "shadow-slave",
//     title: "Shadow Slave",
//     coverImage:
//       "https://ranobes.top/uploads/posts/2025-04/thumbs/1744879926_diary-of-a-dead-wizard.webp",
//     author: "Guiltythree",
//     rating: 4.1,
//     totalRatings: 769,
//     categories: ["Fantasy", "Action", "Adventure"],
//   },
//   {
//     id: "circle-inevitability",
//     slug: "circle-inevitability",
//     title: "Circle of Inevitability",
//     coverImage:
//       "https://ranobes.top/uploads/posts/2025-04/thumbs/1744879926_diary-of-a-dead-wizard.webp",
//     author: "Cuttlefish That Loves Diving",
//     rating: 4.6,
//     totalRatings: 528,
//     categories: ["Fantasy", "Mystery", "Supernatural"],
//   },
//   {
//     id: "circle-inevitability 2",
//     slug: "circle-inevitability 2",
//     title: "Circle of Inevitability",
//     coverImage:
//       "https://ranobes.top/uploads/posts/2025-04/thumbs/1744879926_diary-of-a-dead-wizard.webp",
//     author: "Cuttlefish That Loves Diving",
//     rating: 4.6,
//     totalRatings: 528,
//     categories: ["Fantasy", "Mystery", "Supernatural"],
//   },
// ];

// // Mock data for recent updates
// const recentUpdates = [
//   {
//     id: "lord-void",
//     slug: "lord-void",
//     coverImage:
//       "https://ranobes.top/uploads/posts/2025-03/thumbs/1741679006_industrial-cthulhu-starting-as-an-island-lord.webp",
//     title: "The Lord of Void and Real",
//     chapter: "Chapter 319: Three Stars Demolishing Demons",
//     updatedAt: "9 minutes ago",
//   },
//   {
//     id: "beast-taming",
//     slug: "beast-taming",
//     coverImage:
//       "https://ranobes.top/uploads/posts/2025-03/thumbs/1741679006_industrial-cthulhu-starting-as-an-island-lord.webp",
//     title: "Beast Taming Patrol",
//     chapter: "Chapter 674: Youyou Advances!",
//     updatedAt: "14 minutes ago",
//   },
//   {
//     id: "disciple-simulator",
//     slug: "disciple-simulator",
//     coverImage:
//       "https://ranobes.top/uploads/posts/2025-03/thumbs/1741679006_industrial-cthulhu-starting-as-an-island-lord.webp",
//     title: "I Have A Disciple Simulator",
//     chapter: "Chapter 911: The Humble Hallucinatory Dark Demon Venerable!",
//     updatedAt: "14 minutes ago",
//   },
//   {
//     id: "grinding-experience",
//     slug: "grinding-experience",
//     coverImage:
//       "https://ranobes.top/uploads/posts/2025-03/thumbs/1741679006_industrial-cthulhu-starting-as-an-island-lord.webp",
//     title: "I Am Grinding Experience In Another World",
//     chapter: "Chapter 671: Return to Qingqiu",
//     updatedAt: "15 minutes ago",
//   },
//   {
//     id: "reversing-life-1",
//     slug: "reversing-life-1",
//     coverImage:
//       "https://ranobes.top/uploads/posts/2025-03/thumbs/1741679006_industrial-cthulhu-starting-as-an-island-lord.webp",
//     title: "Reversing Life With Item Copy",
//     chapter: "Chapter 128: Not Quite Yet",
//     updatedAt: "16 minutes ago",
//   },
//   {
//     id: "reversing-life-2",
//     slug: "reversing-life-2",
//     coverImage:
//       "https://ranobes.top/uploads/posts/2025-03/thumbs/1741679006_industrial-cthulhu-starting-as-an-island-lord.webp",
//     title: "Reversing Life With Item Copy",
//     chapter: "Chapter 128: Not Quite Yet",
//     updatedAt: "16 minutes ago",
//   },
//   {
//     id: "reversing-life-3",
//     slug: "reversing-life-3",
//     coverImage:
//       "https://ranobes.top/uploads/posts/2025-03/thumbs/1741679006_industrial-cthulhu-starting-as-an-island-lord.webp",
//     title: "Reversing Life With Item Copy",
//     chapter: "Chapter 128: Not Quite Yet",
//     updatedAt: "16 minutes ago",
//   },
//   {
//     id: "reversing-life-4",
//     slug: "reversing-life-4",
//     coverImage:
//       "https://ranobes.top/uploads/posts/2025-03/thumbs/1741679006_industrial-cthulhu-starting-as-an-island-lord.webp",
//     title: "Reversing Life With Item Copy",
//     chapter: "Chapter 128: Not Quite Yet",
//     updatedAt: "16 minutes ago",
//   },
// ];

// export default function HomePage(
// //   {
// //   searchParams,
// // }: {
// //   searchParams: { [key: string]: string | string[] | undefined };
// // }
// ) {
//   // const [activeTab, setActiveTab] = useState("best-novels");
//   // const page = parseInt(
//   //   (Array.isArray(searchParams["page"])
//   //     ? searchParams["page"][0]
//   //     : searchParams["page"]) || "1"
//   // );
//   // const pageSize = parseInt(
//   //   (Array.isArray(searchParams["pageSize"])
//   //     ? searchParams["pageSize"][0]
//   //     : searchParams["pageSize"]) || "20"
//   // );

//   return (
//     <div className="space-y-4">
//       {/* Featured Novels Section */}
//       <div className="grid grid-cols-12 gap-x-4 space-y-4 md:space-y-0">
//         <section className="col-span-12 md:col-span-8 space-y-4 gap-y-4 rounded-lg">
//           <h2 className="flex items-center justify-center bg-gray-800 py-4 mb-4">
//             <div className="flex items-center w-full max-w-screen-md px-4">
//               <div className="flex-grow h-0.5 bg-gradient-to-l from-green-300 to-transparent"></div>
//               <span className="mx-4 text-sm font-semibold text-gray-300">
//                 UPDATE TAPE
//               </span>
//               <div className="flex-grow h-0.5 bg-gradient-to-r from-green-300 to-transparent"></div>
//             </div>
//           </h2>
//           <div className="space-y-4">
//             {recentUpdates.map((update) => (
//               <Link href={`/novels/${update.slug}`} key={update.id}>
//                 <div
//                   key={update.id}
//                   className="bg-gray-800 p-3 rounded-lg hover:scale-102 transition-transform duration-200 mb-2 flex gap-x-4"
//                 >
//                   <Image
//                     src={update.coverImage}
//                     alt={update.title}
//                     className="object-cover rounded-md"
//                     width={50}
//                     height={64}
//                   />

//                   <div>
//                     <h3 className="font-medium text-blue-400">
//                       {update.title}
//                     </h3>
//                     <p className="text-sm text-gray-300 line-clamp-1">
//                       {update.chapter}
//                     </p>
//                     <p className="text-xs text-gray-500">{update.updatedAt}</p>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//             {/* <PaginationWithLinks
//               pageSearchParam="page"
//               pageSizeSelectOptions={{
//                 pageSizeSearchParam: "size",
//                 pageSizeOptions: [10, 20, 50, 100],
//               }}
//               page={page}
//               pageSize={pageSize}
//               totalCount={300}
//             /> */}
//           </div>
//         </section>

//         <Tabs
//           defaultValue="best-novels"
//           className="w-full hidden sm:block sm:col-span-4"
//         >
//           <div className="flex justify-between items-center mb-4">
//             <TabsList>
//               <TabsTrigger value="best-novels">Best novels</TabsTrigger>
//               <TabsTrigger value="most-discussed">Most Discussed</TabsTrigger>
//             </TabsList>
//           </div>

//           <TabsContent value="best-novels" className="space-y-4">
//             {bestNovels.map((novel) => (
//               <div
//                 key={novel.id}
//                 className="flex items-center gap-4 bg-gray-800 p-3 rounded-lg min-w-72 hover:scale-102 transition-transform duration-200"
//               >
//                 <Image
//                   src={novel.coverImage}
//                   alt={novel.title}
//                   className="object-cover rounded-md"
//                   width={50}
//                   height={50}
//                 />
//                 <div className="flex-1">
//                   <h3 className="font-medium text-blue-400 line-clamp-2">
//                     {novel.title}
//                   </h3>
//                   <p className="text-sm text-gray-400">{novel.author}</p>
//                   <p className="text-xs text-gray-500">
//                     Rating: {novel.rating.toFixed(1)} / 5 from{" "}
//                     {novel.totalRatings} ratings
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </TabsContent>

//           <TabsContent value="most-discussed" className="space-y-4">
//             {bestNovels.map((novel) => (
//               <div
//                 key={novel.id}
//                 className="flex items-center gap-4 bg-gray-800 p-3 rounded-lg min-w-72 hover:scale-102 transition-transform duration-200"
//               >
//                 <Image
//                   src={novel.coverImage}
//                   alt={novel.title}
//                   className="object-cover rounded-md"
//                   width={50}
//                   height={50}
//                 />
//                 <div className="flex-1">
//                   <h3 className="font-medium text-blue-400 line-clamp-2">
//                     {novel.title}
//                   </h3>
//                   <p className="text-sm text-gray-400">{novel.author}</p>
//                   <p className="text-xs text-gray-500">
//                     Rating: {novel.rating.toFixed(1)} / 5 from{" "}
//                     {novel.totalRatings} ratings
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Filter,
  Calendar,
  BookOpen,
  ChevronDown,
  Search,
  Eye,
} from "lucide-react";
import { UpdateCard } from "../components/novels/update-card";
// import { PaginationWithLinks } from "../components/ui/pagination"
import { cn } from "../lib/utils";
import { PaginationWithLinks } from "../components/components/pagination";
import { ChapterPreview } from "../components/components/chapter-preview";
import { allRecentUpdates, chapterPreviews } from "../lib/mock-data";
import { useSearchParams } from "next/navigation";

export default function UpdatesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [showTimeframeFilter, setShowTimeframeFilter] = useState(false);
  const [previewChapter, setPreviewChapter] = useState<string | null>(null);

  const searchParams = useSearchParams();
  // const params = useParams()

  const page = parseInt(searchParams.get("page") ?? "1", 10);

  const pageSize = parseInt(searchParams.get("pageSize") ?? "10", 10);

  const filter = searchParams.get("filter") ?? "all";

  const timeframe = searchParams.get("timeframe") ?? "today";

  // Filter updates based on search query, filter, and timeframe
  const filteredUpdates = allRecentUpdates
    .filter((update) => {
      // Search filter
      if (
        searchQuery &&
        !update.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !update.chapter.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Category filter
      if (filter !== "all" && !update.categories.includes(filter)) {
        return false;
      }

      // Timeframe filter
      if (
        timeframe === "today" &&
        !update.updatedAt.includes("minutes ago") &&
        !update.updatedAt.includes("hours ago") &&
        !update.updatedAt.includes("Today")
      ) {
        return false;
      }
      if (timeframe === "week" && update.updatedAt.includes("months ago")) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      // Sort by most recent first
      const aTime = parseTimeAgo(a.updatedAt);
      const bTime = parseTimeAgo(b.updatedAt);
      return aTime - bTime;
    });

  // Helper function to parse time ago strings into comparable numbers
  function parseTimeAgo(timeAgo: string): number {
    if (timeAgo.includes("minutes ago")) {
      const minutes = parseInt(timeAgo.split(" ")[0]);
      return minutes * 60;
    } else if (timeAgo.includes("hours ago")) {
      const hours = parseInt(timeAgo.split(" ")[0]);
      return hours * 3600;
    } else if (timeAgo.includes("days ago")) {
      const days = parseInt(timeAgo.split(" ")[0]);
      return days * 86400;
    } else if (timeAgo.includes("weeks ago")) {
      const weeks = parseInt(timeAgo.split(" ")[0]);
      return weeks * 604800;
    } else if (timeAgo.includes("months ago")) {
      const months = parseInt(timeAgo.split(" ")[0]);
      return months * 2592000;
    }
    return 0;
  }

  // Paginate updates
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedUpdates = filteredUpdates.slice(start, end);

  // Group updates by date
  const groupedUpdates: Record<string, typeof allRecentUpdates> = {};

  paginatedUpdates.forEach((update) => {
    let dateGroup = "Today";

    if (
      update.updatedAt.includes("minutes ago") ||
      update.updatedAt.includes("hours ago")
    ) {
      dateGroup = "Today";
    } else if (update.updatedAt.includes("Yesterday")) {
      dateGroup = "Yesterday";
    } else if (update.updatedAt.includes("days ago")) {
      const days = parseInt(update.updatedAt.split(" ")[0]);
      if (days <= 7) {
        dateGroup = "This Week";
      } else {
        dateGroup = "Earlier This Month";
      }
    } else if (update.updatedAt.includes("weeks ago")) {
      dateGroup = "Earlier This Month";
    } else if (update.updatedAt.includes("months ago")) {
      dateGroup = "Previous Months";
    }

    if (!groupedUpdates[dateGroup]) {
      groupedUpdates[dateGroup] = [];
    }

    groupedUpdates[dateGroup].push(update);
  });

  // Get all available categories from updates
  const categories = Array.from(
    new Set(allRecentUpdates.flatMap((update) => update.categories))
  );

  // Get chapter preview data
  const getChapterPreviewData = (chapterId: string) => {
    return chapterPreviews.find((preview) => preview.id === chapterId) || null;
  };

  const selectedChapterPreview = previewChapter
    ? getChapterPreviewData(previewChapter)
    : null;

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center responsive-margin"
        >
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl responsive-heading">
            <span className="block">Recent</span>
            <span className="block bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
              Chapter Updates
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-400">
            Stay up to date with the latest chapters from your favorite novels
          </p>
        </motion.div>

        {/* Search and Filters */}
        <div className="mb-8 rounded-xl bg-gray-800/50 p-6 backdrop-blur-sm responsive-padding search-filter-container">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            {/* Search */}
            <div className="relative flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by title or chapter..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-700 bg-gray-800 py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 touch-target"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 filter-buttons responsive-gap">
              {/* Category Filter */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowCategoryFilter(!showCategoryFilter);
                    setShowTimeframeFilter(false);
                  }}
                  className="flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm font-medium text-white touch-target cursor-pointer"
                >
                  <Filter className="h-4 w-4 text-gray-400 " />
                  <span>{filter === "all" ? "All Categories" : filter}</span>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </button>

                {showCategoryFilter && (
                  <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 dropdown-menu">
                    <div className="py-1 z-20">
                      <Link
                        href={`/updates?filter=all&timeframe=${timeframe}`}
                        className={cn(
                          "block px-4 py-2 text-sm",
                          filter === "all"
                            ? "bg-gray-700 text-emerald-400"
                            : "text-gray-300 hover:bg-gray-700"
                        )}
                        onClick={() => setShowCategoryFilter(false)}
                      >
                        All Categories
                      </Link>
                      {categories.map((category) => (
                        <Link
                          key={category}
                          href={`/updates?filter=${category}&timeframe=${timeframe}`}
                          className={cn(
                            "block px-4 py-2 text-sm",
                            filter === category
                              ? "bg-gray-700 text-emerald-400"
                              : "text-gray-300 hover:bg-gray-700"
                          )}
                          onClick={() => setShowCategoryFilter(false)}
                        >
                          {category}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Timeframe Filter */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowTimeframeFilter(!showTimeframeFilter);
                    setShowCategoryFilter(false);
                  }}
                  className="flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm font-medium text-white touch-target cursor-pointer"
                >
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span>
                    {timeframe === "today"
                      ? "Today"
                      : timeframe === "week"
                      ? "This Week"
                      : timeframe === "month"
                      ? "This Month"
                      : "All Time"}
                  </span>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </button>

                {showTimeframeFilter && (
                  <div className="absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-0 dropdown-menu">
                    <div className="py-1">
                      <Link
                        href={`/updates?filter=${filter}&timeframe=today`}
                        className={cn(
                          "block px-4 py-2 text-sm",
                          timeframe === "today"
                            ? "bg-gray-700 text-emerald-400"
                            : "text-gray-300 hover:bg-gray-700"
                        )}
                        onClick={() => setShowTimeframeFilter(false)}
                      >
                        Today
                      </Link>
                      <Link
                        href={`/updates?filter=${filter}&timeframe=week`}
                        className={cn(
                          "block px-4 py-2 text-sm",
                          timeframe === "week"
                            ? "bg-gray-700 text-emerald-400"
                            : "text-gray-300 hover:bg-gray-700"
                        )}
                        onClick={() => setShowTimeframeFilter(false)}
                      >
                        This Week
                      </Link>
                      <Link
                        href={`/updates?filter=${filter}&timeframe=month`}
                        className={cn(
                          "block px-4 py-2 text-sm",
                          timeframe === "month"
                            ? "bg-gray-700 text-emerald-400"
                            : "text-gray-300 hover:bg-gray-700"
                        )}
                        onClick={() => setShowTimeframeFilter(false)}
                      >
                        This Month
                      </Link>
                      <Link
                        href={`/updates?filter=${filter}&timeframe=all`}
                        className={cn(
                          "block px-4 py-2 text-sm",
                          timeframe === "all"
                            ? "bg-gray-700 text-emerald-400"
                            : "text-gray-300 hover:bg-gray-700"
                        )}
                        onClick={() => setShowTimeframeFilter(false)}
                      >
                        All Time
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Updates List */}
        {Object.keys(groupedUpdates).length > 0 ? (
          <div className="space-y-8">
            {Object.entries(groupedUpdates).map(([dateGroup, updates]) => (
              <div key={dateGroup} className="space-y-4 z-10">
                <h2 className="flex items-center text-xl font-bold text-white">
                  <Clock className="mr-2 h-5 w-5 text-emerald-400" />
                  {dateGroup}
                  <span className="ml-2 rounded-full bg-gray-800 px-2 py-0.5 text-sm font-medium text-gray-300">
                    {updates.length}
                  </span>
                </h2>

                <div className="space-y-3 z-10">
                  {updates.map((update) => (
                    <div
                      key={`${update.id}-${update.chapter}`}
                      className="relative group"
                    >
                      <UpdateCard {...update} />
                      <button
                        onClick={() =>
                          setPreviewChapter(
                            `${update.id}-${update.chapterNumber}`
                          )
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-gray-800/80 p-2 text-emerald-400 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-gray-700"
                        aria-label="Preview chapter"
                      >
                        <Eye className="h-4 w-4 cursor-pointer" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-64 flex-col items-center justify-center rounded-xl bg-gray-800/50 p-6 text-center backdrop-blur-sm">
            <BookOpen className="h-12 w-12 text-gray-500" />
            <h3 className="mt-4 text-xl font-medium text-white">
              No updates found
            </h3>
            <p className="mt-2 text-gray-400">
              {searchQuery
                ? `We couldn't find any updates matching "${searchQuery}"`
                : "We couldn't find any updates matching your filters"}
            </p>
            <Link
              href="/updates"
              className="mt-4 rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600"
            >
              Clear filters
            </Link>
          </div>
        )}

        {/* Pagination */}
        {filteredUpdates.length > pageSize && (
          <div className="mt-8">
            <PaginationWithLinks
              pageSearchParam="page"
              pageSizeSelectOptions={{
                pageSizeSearchParam: "pageSize",
                pageSizeOptions: [10, 20, 50, 100],
              }}
              page={page}
              pageSize={pageSize}
              totalCount={filteredUpdates.length}
            />
          </div>
        )}

        {/* Chapter Preview Modal */}
        <AnimatePresence>
          {selectedChapterPreview && (
            <ChapterPreview
              {...selectedChapterPreview}
              onClose={() => setPreviewChapter(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

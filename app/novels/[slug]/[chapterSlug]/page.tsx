// "use client";

// import React, { Suspense, useEffect, useState } from "react";
// import Link from "next/link";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   ChevronLeft,
//   ChevronRight,
//   Settings,
//   List,
//   MessageSquare,
//   ThumbsUp,
//   Share2,
//   Bookmark,
//   Eye,
//   Calendar,
//   ArrowLeft,
//   Lock,
//   Coins,
//   LoaderIcon, // Added Coins icon
// } from "lucide-react";
// import { Button } from "@/app/components/ui/button"; // Assuming this path is correct
// import { cn } from "@/app/lib/utils"; // Assuming this path is correct
// import { useParams } from "next/navigation";
// import { useResourceStore } from "@/app/stores/useResourceStore";
// import { ChapterApiResponse, ChapterDetailsApiResponse, ChaptersApiResponse } from "@/app/interfaces/story";
// import { ChapterType } from "@/app/types/chapter";

// // --- Mock Data --- (To be replaced with actual data fetching)
// const mockUserData = {
//   name: "Alex",
//   initialCoins: 500,
// };

// // const allNovels = [
// //   {
// //     slug: "lord-mysteries",
// //     title: "The Epic Fantasy Saga",
// //   },
// // ];

// // const allChapters = [
// //   {
// //     novelSlug: "lord-mysteries",
// //     order: 1,
// //     title: "The Beginning",
// //     isLocked: false,
// //     lockedCoinAmount: 0,
// //     releaseDate: "2024-01-01",
// //     views: 1200,
// //   },
// //   {
// //     novelSlug: "lord-mysteries",
// //     order: 2,
// //     title: "The First Trial",
// //     isLocked: true,
// //     lockedCoinAmount: 50,
// //     releaseDate: "2024-01-08",
// //     views: 850,
// //   },
// //   {
// //     novelSlug: "lord-mysteries",
// //     order: 3,
// //     title: "Secrets Unveiled",
// //     isLocked: true,
// //     lockedCoinAmount: 75,
// //     releaseDate: "2024-01-15",
// //     views: 600,
// //   },
// //   {
// //     novelSlug: "lord-mysteries",
// //     order: 4,
// //     title: "The Dragon's Lair",
// //     isLocked: true,
// //     lockedCoinAmount: 100,
// //     releaseDate: "2024-01-22",
// //     views: 950,
// //   },
// //   {
// //     novelSlug: "lord-mysteries",
// //     order: 5,
// //     title: "A Glimmer of Hope",
// //     isLocked: false,
// //     lockedCoinAmount: 0,
// //     releaseDate: "2024-01-29",
// //     views: 1500,
// //   },
// // ];

// // const allChapterContents = [
// //   {
// //     novelSlug: "lord-mysteries",
// //     order: 1,
// //     content:
// //       "This is the first chapter, and it's a long one. It sets the scene for the entire saga. Our hero is introduced, and the world is built. Dragons fly, magic is real, and adventure awaits. This chapter is free for everyone to read and enjoy. It provides a glimpse into the vast world and the challenges that lie ahead. The protagonist, a young farmhand, discovers a hidden talent that will change his life forever. He embarks on a journey filled with danger, friendship, and self-discovery. The ancient prophecies speak of a chosen one, and he might just be it. The fate of the kingdom rests on his shoulders.",
// //   },
// //   {
// //     novelSlug: "lord-mysteries",
// //     order: 2,
// //     content:
// //       "Chapter 2 delves deeper into the hero's first major challenge. He must navigate a treacherous forest, outsmart cunning foes, and make difficult choices. This chapter tests his courage and resolve. The stakes are high, and failure is not an option. New allies join his quest, while old enemies plot his downfall. The magic he possesses begins to awaken, but controlling it is another matter entirely. This chapter is locked and requires 50 coins to unlock. The full content reveals crucial plot points and character development. The hero learns that true strength comes not just from power, but from wisdom and compassion.",
// //   },
// //   {
// //     novelSlug: "lord-mysteries",
// //     order: 3,
// //     content:
// //       "In Chapter 3, long-hidden secrets are brought to light. The hero uncovers a conspiracy that threatens to tear the kingdom apart. He must race against time to expose the traitors and protect the innocent. This chapter is filled with intrigue, suspense, and unexpected twists. The narrative explores themes of trust, betrayal, and the corrupting influence of power. Unlocking this chapter costs 75 coins and provides access to critical information that shapes the future of the story. The hero's understanding of the world and his place in it is profoundly altered by these revelations.",
// //   },
// //   {
// //     novelSlug: "lord-mysteries",
// //     order: 4,
// //     content:
// //       "Chapter 4 takes our hero to the formidable Dragon's Lair. A legendary beast guards a powerful artifact, and our hero must confront it. This chapter is packed with action and adventure. The descriptions of the dragon and its lair are vivid and immersive. The battle tests the limits of the hero's abilities and courage. Unlocking this chapter for 100 coins reveals the outcome of this epic confrontation and the nature of the artifact. The hero learns a valuable lesson about the true meaning of bravery and sacrifice.",
// //   },
// //   {
// //     novelSlug: "lord-mysteries",
// //     order: 5,
// //     content:
// //       "The fifth chapter offers a moment of respite and hope. After facing numerous challenges, the hero and his companions find a safe haven. They reflect on their journey and prepare for the trials ahead. This chapter focuses on character interactions and emotional development. It explores themes of friendship, loss, and resilience. Even in the darkest of times, hope can be found. This chapter is unlocked and provides a breather before the story intensifies once more. New plans are forged, and the path forward becomes clearer, though fraught with peril.",
// //   },
// // ];
// // --- End Mock Data ---

// const themeClasses = {
//   light: "bg-gray-100 text-gray-900",
//   dark: "bg-gray-900 text-gray-100",
//   sepia: "bg-[#f8f1e3] text-[#5f4b32]",
// };

// type UnlockMap = Record<string, boolean>;

// export default function ChapterDetailPage() {
//   type Theme = keyof typeof themeClasses;
//   const params = useParams();
//   const { chapterSlug, slug: storySlug } = params;

//   // User and Chapter Unlock State
//   const [currentUserCoins, setCurrentUserCoins] = useState(
//     mockUserData.initialCoins
//   );
//   const [unlockedChaptersMap, setUnlockedChaptersMap] = useState<UnlockMap>({}); // Stores { 'novelSlug_chapterOrder': true }

//   // Reading settings state
//   // const [fontSize, setFontSize] = useState("medium");
//   const [theme] = useState<Theme>("dark");
//   const [showSettings, setShowSettings] = useState(false);
//   const [showChapterList, setShowChapterList] = useState(false);
//   const [showComments, setShowComments] = useState(false);
//   const [isBookmarked, setIsBookmarked] = useState(false);
//   const [isLiked, setIsLiked] = useState(false);

//   const { fetchResource } = useResourceStore();

// const chapterDetailsResponse = useResourceStore(
//   (s) => s.resources?.chapterDetails
// ) as ChapterApiResponse;

//   const chapterDetails = chapterDetailsResponse?.data

//   console.log("CHAPTER DETAILS", chapterDetails)

//   const chapterContents = useResourceStore(
//     (s) => s.resources?.chapterContents
//   ) as ChapterDetailsApiResponse;

//   useEffect(() => {
//     const fetchData = async () => {
//       await fetchResource("chapterDetails", `/chapter/${storySlug}/${chapterSlug}`);
//       fetchResource("chapterContents", "/chapter/details", {
//         chapterId: chapterDetails?.id,
//       });
//     };

//     fetchData();

//   }, [chapterSlug, fetchResource, chapterDetails?.id, storySlug]);

//   const allContents = chapterContents?.data.map((c) =>
//     Array.isArray(c.content) ? c.content.join("") : c.content
//   );

//   // console.log("CONTENTTTTT: ", allContents);

//   // Get all chapters for this novel

//   // if (!currentChapter) {
//   //   return (
//   //     <div className="flex h-[70vh] flex-col items-center justify-center">
//   //       <h1 className="text-2xl font-bold text-white">Chapter not found</h1>
//   //       <p className="mt-2 text-gray-400">
//   //         The chapter you&#39;re looking for doesn&#39;t exist or has been removed.
//   //       </p>
//   //       <Link
//   //         href={`/novels/${slug}`}
//   //         className="mt-4 rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600"
//   //       >
//   //         Return to Novel
//   //       </Link>
//   //     </div>
//   //   );
//   // }

//   // Find chapter content
//   // const chapterContent = allChapterContents.find(
//   //   (content) =>
//   //     content.novelSlug === slug && content.order === Number(chapterSlug)
//   // );

//   // Find previous and next chapters
//   // const currentIndex = novelChapters.findIndex(
//   //   (chapter) => chapter.order === Number(chapterSlug)
//   // );
//   // const previousChapter =
//   //   currentIndex > 0 ? novelChapters[currentIndex - 1] : null;
//   // const nextChapter =
//   //   currentIndex < novelChapters.length - 1
//   //     ? novelChapters[currentIndex + 1]
//   //     : null;

//   // // Progress calculation
//   // const progress = ((currentIndex + 1) / novelChapters.length) * 100;

//   // const chapterKey = `${currentChapter.novelSlug}_${currentChapter.order}`;
//   // const isEffectivelyLocked = currentChapter.isLocked && !unlockedChaptersMap[chapterKey];

//   // const handleUnlockChapter = () => {
//   //   if (!currentChapter || !currentChapter.isLocked) return;

//   //   if (currentUserCoins >= currentChapter.lockedCoinAmount) {
//   //     setCurrentUserCoins(currentUserCoins - currentChapter.lockedCoinAmount);
//   //     setUnlockedChaptersMap({
//   //       ...unlockedChaptersMap,
//   //       [chapterKey]: true,
//   //     });
//   //     // Potentially, you might want to persist this unlocked state and coin balance
//   //     // to a backend or localStorage here.
//   //     alert(`Chapter ${currentChapter.order} unlocked!`);
//   //   } else {
//   //     alert("Not enough coins to unlock this chapter.");
//   //   }
//   // };

//   function getDisplayedContent() {
//     // if (!chapterContent) return <p className="text-center italic">Chapter content not available.</p>;

//     // const paragraphs = chapterContent.content.split("\n\n");

//     // if (isEffectivelyLocked) {
//     //   const previewLength = Math.max(1, Math.ceil(paragraphs.length / 8));
//     //   return (
//     //     <>
//     //       {paragraphs.slice(0, previewLength).map((paragraph, index) => (
//     //         <p key={`preview-${index}`}>{paragraph}</p>
//     //       ))}
//     //       {paragraphs.length > previewLength && <p>...</p>}
//     //       <div className="text-center py-4 mt-4 border-t border-gray-700/50">
//     //         <Button
//     //           onClick={handleUnlockChapter}
//     //           disabled={currentUserCoins < (currentChapter?.lockedCoinAmount ?? 0)}
//     //           className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold rounded-md mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
//     //         >
//     //           <Lock className="mr-2 h-4 w-4" />
//     //           Unlock Chapter with {currentChapter?.lockedCoinAmount ?? 0} <Coins className="ml-1 h-4 w-4 text-yellow-400" />
//     //         </Button>
//     //         {currentChapter && currentUserCoins < currentChapter.lockedCoinAmount && (
//     //             <p className="text-sm text-red-400 mt-2">You need {currentChapter.lockedCoinAmount - currentUserCoins} more coins.</p>
//     //         )}
//     //       </div>
//     //     </>
//     //   );
//     // }
//     return allContents?.map((paragraph, index) => (
//         <p key={`full-${index}`}>{paragraph}</p>
//     ));
//   }

//   return (
//     <div
//       className={cn(
//         "min-h-screen transition-colors duration-300",
//         themeClasses[theme]
//       )}
//     >
//       {/* Top Navigation Bar */}
//       <header
//         className={cn(
//           "sticky top-0 z-40 border-b backdrop-blur transition-colors duration-300",
//           theme === "light"
//             ? "border-gray-200 bg-white/90"
//             : theme === "dark"
//             ? "border-gray-800 bg-gray-900/90"
//             : "border-[#e8d9c0] bg-[#f8f1e3]/90"
//         )}
//       >
//         <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4">
//           <div className="flex items-center gap-4">
//             <Link
//               href={`/novels/${storySlug}`}
//               className={cn(
//                 "flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
//                 theme === "light"
//                   ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                   : theme === "dark"
//                   ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
//                   : "bg-[#e8d9c0] text-[#5f4b32] hover:bg-[#e0ceb0]"
//               )}
//             >
//               <ArrowLeft className="h-4 w-4" />
//               <span className="hidden sm:inline">Back to Novel</span>
//             </Link>

//             <h1
//               className={cn(
//                 "truncate text-sm font-medium",
//                 theme === "light"
//                   ? "text-gray-700"
//                   : theme === "dark"
//                   ? "text-gray-300"
//                   : "text-[#5f4b32]"
//               )}
//             >
//               {/* <span className="hidden sm:inline">{novel.title}: </span>
//               <span>Chapter {currentChapter.order}</span> */}
//             </h1>
//           </div>

//           {/* Display User Coins in Header */}
//           <div
//             className={cn(
//               "flex items-center text-sm font-medium",
//               theme === "light"
//                 ? "text-gray-700"
//                 : theme === "dark"
//                 ? "text-gray-300"
//                 : "text-[#5f4b32]"
//             )}
//           >
//             <Coins className="h-5 w-5 mr-1 text-yellow-400" />{" "}
//             {currentUserCoins}
//           </div>

//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => setShowSettings(!showSettings)}
//               className={cn(
//                 "rounded-full p-2 transition-colors cursor-pointer",
//                 theme === "light"
//                   ? "hover:bg-gray-200"
//                   : theme === "dark"
//                   ? "hover:bg-gray-800"
//                   : "hover:bg-[#e8d9c0]",
//                 showSettings
//                   ? theme === "light"
//                     ? "bg-gray-200 text-gray-900"
//                     : theme === "dark"
//                     ? "bg-gray-800 text-white"
//                     : "bg-[#e8d9c0] text-[#5f4b32]"
//                   : theme === "light"
//                   ? "text-gray-700"
//                   : theme === "dark"
//                   ? "text-gray-300"
//                   : "text-[#5f4b32]"
//               )}
//               aria-label="Reading Settings"
//             >
//               <Settings className="h-5 w-5" />
//             </button>

//             <button
//               onClick={() => setShowChapterList(!showChapterList)}
//               className={cn(
//                 "rounded-full p-2 transition-colors cursor-pointer",
//                 theme === "light"
//                   ? "hover:bg-gray-200"
//                   : theme === "dark"
//                   ? "hover:bg-gray-800"
//                   : "hover:bg-[#e8d9c0]",
//                 showChapterList
//                   ? theme === "light"
//                     ? "bg-gray-200 text-gray-900"
//                     : theme === "dark"
//                     ? "bg-gray-800 text-white"
//                     : "bg-[#e8d9c0] text-[#5f4b32]"
//                   : theme === "light"
//                   ? "text-gray-700"
//                   : theme === "dark"
//                   ? "text-gray-300"
//                   : "text-[#5f4b32]"
//               )}
//               aria-label="Chapter List"
//             >
//               <List className="h-5 w-5" />
//             </button>

//             <button
//               onClick={() => setShowComments(!showComments)}
//               className={cn(
//                 "rounded-full p-2 transition-colors cursor-pointer",
//                 theme === "light"
//                   ? "hover:bg-gray-200"
//                   : theme === "dark"
//                   ? "hover:bg-gray-800"
//                   : "hover:bg-[#e8d9c0]",
//                 showComments
//                   ? theme === "light"
//                     ? "bg-gray-200 text-gray-900"
//                     : theme === "dark"
//                     ? "bg-gray-800 text-white"
//                     : "bg-[#e8d9c0] text-[#5f4b32]"
//                   : theme === "light"
//                   ? "text-gray-700"
//                   : theme === "dark"
//                   ? "text-gray-300"
//                   : "text-[#5f4b32]"
//               )}
//               aria-label="Comments"
//             >
//               <MessageSquare className="h-5 w-5" />
//             </button>
//           </div>
//         </div>

//         {/* Reading Progress Bar */}
//         {/* <div className="h-1 w-full bg-gray-200 dark:bg-gray-800">
//           <div
//             className="h-full bg-gradient-to-r from-emerald-500 to-teal-600"
//             style={{ width: `${progress}%` }}
//           ></div>
//         </div> */}
//       </header>

//       {/* Main Content */}
//       <main
//         className={cn(
//           "mx-auto max-w-5xl px-4 py-8 transition-colors duration-300",
//           theme === "light"
//             ? "text-gray-900"
//             : theme === "dark"
//             ? "text-gray-100"
//             : "text-[#5f4b32]"
//         )}
//       >
//         {/* Chapter Header */}
//         <div className="mb-8 text-center">
//           <h1 className="text-2xl font-bold sm:text-3xl">
//             {/* Chapter {currentChapter.order}: {currentChapter.title} */}
//           </h1>
//           <div className="mt-2 flex items-center justify-center gap-4 text-sm">
//             <div
//               className={cn(
//                 "flex items-center gap-1",
//                 theme === "light"
//                   ? "text-gray-600"
//                   : theme === "dark"
//                   ? "text-gray-400"
//                   : "text-[#8a7055]"
//               )}
//             >
//               <Calendar className="h-4 w-4" />
//               {/* <span>{currentChapter.releaseDate}</span> */}
//             </div>
//             <div
//               className={cn(
//                 "flex items-center gap-1",
//                 theme === "light"
//                   ? "text-gray-600"
//                   : theme === "dark"
//                   ? "text-gray-400"
//                   : "text-[#8a7055]"
//               )}
//             >
//               <Eye className="h-4 w-4" />
//               {/* <span>{currentChapter.views.toLocaleString()} views</span> */}
//             </div>
//           </div>
//         </div>

//         {/* Chapter Content */}
//         <Suspense fallback={<div>LOADINGGGGG</div>}>
//           <div
//           className={cn(
//             "prose max-w-none transition-colors duration-300 text-lg",
//             theme === "light"
//               ? "prose-gray"
//               : theme === "dark"
//               ? "prose-invert"
//               : "prose-stone"
//           )}
//         >
//           {getDisplayedContent()}
//         </div>
//         </Suspense>

//         {/* Chapter Navigation */}
//         <div className="mt-12 flex items-center justify-between">
//           {/* {previousChapter ? (
//             <Link
//               href={`/novels/${slug}/chapters/${previousChapter.order}`}
//               className={cn(
//                 "flex items-center gap-2 rounded-lg px-4 py-2 transition-colors",
//                 theme === "light"
//                   ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                   : theme === "dark"
//                   ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
//                   : "bg-[#e8d9c0] text-[#5f4b32] hover:bg-[#e0ceb0]"
//               )}
//             >
//               <ChevronLeft className="h-5 w-5" />
//               <div className="flex flex-col">
//                 <span className="text-xs">Previous</span>
//               </div>
//             </Link>
//           ) : (
//             <div></div>
//           )} */}

//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => setIsLiked(!isLiked)}
//               className={cn(
//                 "rounded-full p-2 transition-colors cursor-pointer",
//                 isLiked
//                   ? "text-emerald-500"
//                   : theme === "light"
//                   ? "text-gray-700 hover:bg-gray-100"
//                   : theme === "dark"
//                   ? "text-gray-300 hover:bg-gray-800"
//                   : "text-[#5f4b32] hover:bg-[#e8d9c0]"
//               )}
//               aria-label={isLiked ? "Unlike" : "Like"}
//             >
//               <ThumbsUp
//                 className={cn("h-5 w-5", isLiked && "fill-emerald-500")}
//               />
//             </button>

//             <button
//               onClick={() => setIsBookmarked(!isBookmarked)}
//               className={cn(
//                 "rounded-full p-2 transition-colors cursor-pointer",
//                 isBookmarked
//                   ? "text-emerald-500"
//                   : theme === "light"
//                   ? "text-gray-700 hover:bg-gray-100"
//                   : theme === "dark"
//                   ? "text-gray-300 hover:bg-gray-800"
//                   : "text-[#5f4b32] hover:bg-[#e8d9c0]"
//               )}
//               aria-label={isBookmarked ? "Remove Bookmark" : "Bookmark"}
//             >
//               <Bookmark
//                 className={cn("h-5 w-5", isBookmarked && "fill-emerald-500")}
//               />
//             </button>

//             <button
//               className={cn(
//                 "rounded-full p-2 transition-colors cursor-pointer",
//                 theme === "light"
//                   ? "text-gray-700 hover:bg-gray-100"
//                   : theme === "dark"
//                   ? "text-gray-300 hover:bg-gray-800"
//                   : "text-[#5f4b32] hover:bg-[#e8d9c0]"
//               )}
//               aria-label="Share"
//             >
//               <Share2 className="h-5 w-5" />
//             </button>
//           </div>

//           {/* {nextChapter ? (
//             <Link
//               href={`/novels/${slug}/chapters/${nextChapter.order}`}
//               className={cn(
//                 "flex items-center gap-2 rounded-lg px-4 py-2 transition-colors",
//                 theme === "light"
//                   ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                   : theme === "dark"
//                   ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
//                   : "bg-[#e8d9c0] text-[#5f4b32] hover:bg-[#e0ceb0]"
//               )}
//             >
//               <div className="flex flex-col items-end">
//                 <span className="text-xs">Next</span>
//               </div>
//               <ChevronRight className="h-5 w-5" />
//             </Link>
//           ) : (
//             <div></div>
//           )} */}
//         </div>
//       </main>

//       {/* Reading Settings Panel (and other panels) - Unchanged from original */}
//       <AnimatePresence>
//         {showSettings && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.2 }}
//             className={cn(
//               "fixed inset-x-0 top-16 z-50 border-b p-4 shadow-lg",
//               theme === "light"
//                 ? "border-gray-200 bg-white"
//                 : theme === "dark"
//                 ? "border-gray-700 bg-gray-800"
//                 : "border-[#e8d9c0] bg-[#f8f1e3]"
//             )}
//           >
//             {/* Settings content here - unchanged */}
//             <p>Font Size, Theme controls etc.</p>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <AnimatePresence>
//         {showChapterList && (
//           <motion.div /* ... Chapter List Panel ... */>
//             <p>Chapter List Panel Content</p>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <AnimatePresence>
//         {showComments && (
//           <motion.div /* ... Comments Panel ... */>
//             <p>Comments Panel Content</p>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

import { Suspense } from "react";
import ChapterContent from "./ChapterContent";
import type {
  ChapterApiResponse,
  ChapterDetailsApiResponse,
  ChaptersApiResponse,
  StoryDetailsApiResponse,
} from "@/app/interfaces/story";
import { httpClient } from "@/app/utils/httpClient";
import Loading from "@/app/components/components/loading";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; chapterSlug: string }>;
}) {
  const { slug, chapterSlug } = await params;

  const chapRes = await httpClient.get({
    url: `/chapter/${slug}/${chapterSlug}`,
  });

  const storyRes = await httpClient.get({
    url: "/api/story/detail",
    params: { slug: slug },
  });

  const chapterData = chapRes.data

  const storyData = storyRes.data

  return {
    title: `${chapterData?.seoTitle} - ${storyData?.title}`,
    description: chapterData?.metaDescription || "Đọc chương mới nhất trên Tàng Thư Lâu!",
  };
}

async function fetchBySlug(
  slug: string,
  chapterSlug: string
): Promise<ChapterApiResponse> {
  const res = await httpClient.get({
    url: `/chapter/${slug}/${chapterSlug}`,
  });
  return res;
}

async function fetchById(chapterId: number): Promise<ChapterApiResponse> {
  const res = await httpClient.get({
    url: `/chapter/${chapterId}`,
  });
  return res;
}

async function fetchContents(
  chapterId: number
): Promise<ChapterDetailsApiResponse> {
  const res = await httpClient.get({
    url: "/chapter/details",
    params: { chapterId: chapterId.toString() },
  });
  return res;
}

async function fetchChapters(
  storyId: number,
  page: number,
  size: number
): Promise<ChaptersApiResponse> {
  const res = await httpClient.get({
    url: "/chapters",
    params: {
      page: page || 0,
      size: size || 50,
      filter: `storyId|eq|${storyId}`,
    },
  });
  return res;
}

async function fetchStoryDetails(
  slug: string
): Promise<StoryDetailsApiResponse> {
  const res = await httpClient.get({
    url: "/api/story/detail",
    params: { slug: slug },
  });
  return {
    data: {
      data: res.data,
      totalElements: res.data?.totalElements ?? 0,
      totalPages: res.data?.totalPages ?? 0,
      page: res.data?.page ?? 0,
      size: res.data?.size ?? 0,
      hasNext: res.data?.hasNext ?? false,
    },
  };
}

export default async function ChapterDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string; chapterSlug: string }>;
  searchParams: Promise<{
    page?: number | undefined;
    pageSize?: number | undefined;
  }>;
}) {
  const { slug, chapterSlug } = await params;
  const { page, pageSize } = await searchParams;
  const isId = /^\d+$/.test(chapterSlug);
  const detailResp = isId
    ? await fetchById(Number(chapterSlug))
    : await fetchBySlug(slug, chapterSlug);
  const detail = detailResp.data;

  const prevSlug = detail.prevChapterId
    ? (await fetchById(detail.prevChapterId)).data.slug
    : null;
  const nextSlug = detail.nextChapterId
    ? (await fetchById(detail.nextChapterId)).data.slug
    : null;

  const contentsResp = await fetchContents(Number(detail.id));

  const chaptersList = await fetchChapters(
    Number(detail.storyId),
    page ?? 0,
    pageSize ?? 50
  );

  const storyDetailsRes = await fetchStoryDetails(slug);

  return (
    <Suspense fallback={<Loading />}>
      <ChapterContent
        storySlug={slug}
        storyTitle={storyDetailsRes?.data?.data?.title}
        chapterSlug={detail.slug}
        details={detail}
        contents={contentsResp.data}
        prevSlug={prevSlug}
        nextSlug={nextSlug}
        chaptersList={chaptersList}
      />
    </Suspense>
  );
}

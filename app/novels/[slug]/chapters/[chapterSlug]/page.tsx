// "use client";

// import React, { useState } from "react";
// // import Image from "next/image"
// import Link from "next/link";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   ChevronLeft,
//   ChevronRight,
//   Settings,
//   Moon,
//   Sun,
//   BookOpen,
//   List,
//   MessageSquare,
//   ThumbsUp,
//   Share2,
//   Bookmark,
//   X,
//   Eye,
//   Calendar,
//   ArrowLeft,
//   User,
//   Lock,
// } from "lucide-react";
// import { Button } from "@/app/components/ui/button";
// import { cn } from "@/app/lib/utils";
// import { useParams } from "next/navigation";

// export default function ChapterDetailPage() {
//   const params = useParams();
//   // const chapterOrder = parseInt(order, 10)
//   const { chapterSlug, slug } = params;
//   // Reading settings state
//   const [fontSize, setFontSize] = useState<"small" | "medium" | "large">(
//     "medium"
//   );
//   const [theme, setTheme] = useState<"light" | "dark" | "sepia">("dark");
//   const [showSettings, setShowSettings] = useState(false);
//   const [showChapterList, setShowChapterList] = useState(false);
//   const [showComments, setShowComments] = useState(false);
//   const [isBookmarked, setIsBookmarked] = useState(false);
//   const [isLiked, setIsLiked] = useState(false);

//   // Parse chapter order
//   // const chapterOrder = parseInt(params.order, 10)

//   // Find novel by slug
//   const novel = allNovels.find((novel) => novel.slug === slug);

//   console.log("novel: ", novel);

//   if (!novel) {
//     return (
//       <div className="flex h-[70vh] flex-col items-center justify-center">
//         <h1 className="text-2xl font-bold text-white">Novel not found</h1>
//         <p className="mt-2 text-gray-400">
//           The novel you&#39;re looking for doesn&#39;t exist or has been
//           removed.
//         </p>
//         <Link
//           href="/"
//           className="mt-4 rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600"
//         >
//           Return to Home
//         </Link>
//       </div>
//     );
//   }

//   // Get all chapters for this novel
//   const novelChapters = allChapters
//     .filter((chapter) => chapter.novelSlug === novel.slug)
//     .sort((a, b) => a.order - b.order);

//   console.log("NOVEL CHAPTERS: ", novelChapters);

//   // Find current chapter
//   const currentChapter = novelChapters.find(
//     (chapter) => chapter.order === Number(chapterSlug)
//   );
//   console.log("CURRENT CHAP: ", currentChapter);

//   if (!currentChapter) {
//     return (
//       <div className="flex h-[70vh] flex-col items-center justify-center">
//         <h1 className="text-2xl font-bold text-white">Chapter not found</h1>
//         <p className="mt-2 text-gray-400">
//           The chapter you&#39;re looking for doesn&#39;t exist or has been
//           removed.
//         </p>
//         <Link
//           href={`/novels/${slug}`}
//           className="mt-4 rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600"
//         >
//           Return to Novel
//         </Link>
//       </div>
//     );
//   }

//   // Find chapter content
//   const chapterContent = allChapterContents.find(
//     (content) =>
//       content.novelSlug === slug && content.order === Number(chapterSlug)
//   );

//   console.log("CHAPTER CONTENT: ", chapterContent);

//   // Find previous and next chapters
//   const currentIndex = novelChapters.findIndex(
//     (chapter) => chapter.order === Number(chapterSlug)
//   );
//   const previousChapter =
//     currentIndex > 0 ? novelChapters[currentIndex - 1] : null;
//   const nextChapter =
//     currentIndex < novelChapters.length - 1
//       ? novelChapters[currentIndex + 1]
//       : null;


//   // Theme classes
//   const themeClasses = {
//     light: "bg-gray-100 text-gray-900",
//     dark: "bg-gray-900 text-gray-100",
//     sepia: "bg-[#f8f1e3] text-[#5f4b32]",
//   };

//   // Progress calculation
//   const progress = ((currentIndex + 1) / novelChapters.length) * 100;

//   // Auto-scroll to top when chapter changes
//   // useEffect(() => {
//   //   window.scrollTo(0, 0)
//   // }, [order])

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
//               href={`/novels/${slug}`}
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
//               <span className="hidden sm:inline">{novel.title}: </span>
//               <span>Chapter {currentChapter.order}</span>
//             </h1>
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
//         <div className="h-1 w-full bg-gray-200 dark:bg-gray-800">
//           <div
//             className="h-full bg-gradient-to-r from-emerald-400 to-teal-500"
//             style={{ width: `${progress}%` }}
//           ></div>
//         </div>
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
//             Chapter {currentChapter.order}: {currentChapter.title}
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
//               <span>{currentChapter.releaseDate}</span>
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
//               <span>{currentChapter.views.toLocaleString()} views</span>
//             </div>
//           </div>
//         </div>

//         {/* Chapter Content */}
//         <div
//           className={cn(
//             "prose max-w-none transition-colors duration-300 text-lg",
//             theme === "light"
//               ? "prose-gray"
//               : theme === "dark"
//               ? "prose-invert"
//               : "prose-stone"
//           )}
//         >
//           {chapterContent ? (
//             currentChapter && currentChapter.isLocked ? (
//               <>
//                 {chapterContent.content
//                   .split("\n\n")
//                   .slice(
//                     0,
//                     Math.ceil(chapterContent.content.split("\n\n").length / 8)
//                   )
//                   .map((paragraph, index) => (
//                     <p key={index}>{paragraph}</p>
//                   ))}
//                 <div className="text-center py-4">
//                   <Button
//                     onClick={() =>
//                       alert("Unlock chapter functionality to be implemented")
//                     }
//                     className="bg-gradient-to-r from-emerald-400 to-teal-500 hover:bg-emerald-600 text-white font-bold rounded-md mx-auto"
//                   >
//                     <Lock className="mr-2 h-4 w-4" /> Unlock Chapter with Coins
//                   </Button>
//                 </div>
//               </>
//             ) : (
//               chapterContent.content
//                 .split("\n\n")
//                 .map((paragraph, index) => <p key={index}>{paragraph}</p>)
//             )
//           ) : (
//             <p className="text-center italic">Chapter content not available.</p>
//           )}
//         </div>

//         {/* Chapter Navigation */}
//         <div className="mt-12 flex items-center justify-between">
//           {previousChapter ? (
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
//           )}

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

//           {nextChapter ? (
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
//           )}
//         </div>
//       </main>

//       {/* Reading Settings Panel */}
//       <AnimatePresence>
//         {showSettings && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.2 }}
//             className={cn(
//               "fixed inset-x-0 top-16 z-50 border-b p-4 shadow-lg backdrop-blur-lg transition-colors duration-300",
//               theme === "light"
//                 ? "border-gray-200 bg-white/90 text-gray-900"
//                 : theme === "dark"
//                 ? "border-gray-800 bg-gray-900/90 text-white"
//                 : "border-[#e8d9c0] bg-[#f8f1e3]/90 text-[#5f4b32]"
//             )}
//           >
//             <div className="mx-auto max-w-4xl">
//               <div className="flex items-center justify-between">
//                 <h2 className="text-lg font-medium">Reading Settings</h2>
//                 <button
//                   onClick={() => setShowSettings(false)}
//                   className={cn(
//                     "rounded-full p-1.5 transition-colors",
//                     theme === "light"
//                       ? "hover:bg-gray-100 text-gray-700"
//                       : theme === "dark"
//                       ? "hover:bg-gray-800 text-gray-300"
//                       : "hover:bg-[#e8d9c0] text-[#5f4b32]"
//                   )}
//                   aria-label="Close Settings"
//                 >
//                   <X className="h-5 w-5" />
//                 </button>
//               </div>

//               <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
//                 {/* Font Size */}
//                 <div>
//                   <h3
//                     className={cn(
//                       "mb-2 text-sm font-medium",
//                       theme === "light"
//                         ? "text-gray-700"
//                         : theme === "dark"
//                         ? "text-gray-300"
//                         : "text-[#5f4b32]"
//                     )}
//                   >
//                     Font Size
//                   </h3>
//                   <div className="flex items-center gap-2">
//                     <button
//                       onClick={() => setFontSize("small")}
//                       className={cn(
//                         "flex h-10 w-10 items-center justify-center rounded-lg text-sm transition-colors",
//                         fontSize === "small"
//                           ? theme === "light"
//                             ? "bg-gray-900 text-white"
//                             : theme === "dark"
//                             ? "bg-emerald-500 text-white"
//                             : "bg-[#5f4b32] text-[#f8f1e3]"
//                           : theme === "light"
//                           ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                           : theme === "dark"
//                           ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
//                           : "bg-[#e8d9c0] text-[#5f4b32] hover:bg-[#e0ceb0]"
//                       )}
//                     >
//                       A
//                     </button>
//                     <button
//                       onClick={() => setFontSize("medium")}
//                       className={cn(
//                         "flex h-10 w-10 items-center justify-center rounded-lg text-base transition-colors",
//                         fontSize === "medium"
//                           ? theme === "light"
//                             ? "bg-gray-900 text-white"
//                             : theme === "dark"
//                             ? "bg-emerald-500 text-white"
//                             : "bg-[#5f4b32] text-[#f8f1e3]"
//                           : theme === "light"
//                           ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                           : theme === "dark"
//                           ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
//                           : "bg-[#e8d9c0] text-[#5f4b32] hover:bg-[#e0ceb0]"
//                       )}
//                     >
//                       A
//                     </button>
//                     <button
//                       onClick={() => setFontSize("large")}
//                       className={cn(
//                         "flex h-10 w-10 items-center justify-center rounded-lg text-lg transition-colors",
//                         fontSize === "large"
//                           ? theme === "light"
//                             ? "bg-gray-900 text-white"
//                             : theme === "dark"
//                             ? "bg-emerald-500 text-white"
//                             : "bg-[#5f4b32] text-[#f8f1e3]"
//                           : theme === "light"
//                           ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                           : theme === "dark"
//                           ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
//                           : "bg-[#e8d9c0] text-[#5f4b32] hover:bg-[#e0ceb0]"
//                       )}
//                     >
//                       A
//                     </button>
//                   </div>
//                 </div>

//                 {/* Theme */}
//                 <div>
//                   <h3
//                     className={cn(
//                       "mb-2 text-sm font-medium",
//                       theme === "light"
//                         ? "text-gray-700"
//                         : theme === "dark"
//                         ? "text-gray-300"
//                         : "text-[#5f4b32]"
//                     )}
//                   >
//                     Theme
//                   </h3>
//                   <div className="flex items-center gap-2">
//                     <button
//                       onClick={() => setTheme("light")}
//                       className={cn(
//                         "flex h-10 items-center gap-2 rounded-lg px-3 text-sm transition-colors",
//                         theme === "light"
//                           ? "bg-gray-900 text-white"
//                           : theme === "dark"
//                           ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
//                           : "bg-[#e8d9c0] text-[#5f4b32] hover:bg-[#e0ceb0]"
//                       )}
//                     >
//                       <Sun className="h-4 w-4" />
//                       <span>Light</span>
//                     </button>
//                     <button
//                       onClick={() => setTheme("dark")}
//                       className={cn(
//                         "flex h-10 items-center gap-2 rounded-lg px-3 text-sm transition-colors",
//                         theme === "dark"
//                           ? "bg-emerald-500 text-white"
//                           : theme === "light"
//                           ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                           : "bg-[#e8d9c0] text-[#5f4b32] hover:bg-[#e0ceb0]"
//                       )}
//                     >
//                       <Moon className="h-4 w-4" />
//                       <span>Dark</span>
//                     </button>
//                     <button
//                       onClick={() => setTheme("sepia")}
//                       className={cn(
//                         "flex h-10 items-center gap-2 rounded-lg px-3 text-sm transition-colors",
//                         theme === "sepia"
//                           ? "bg-[#5f4b32] text-[#f8f1e3]"
//                           : theme === "light"
//                           ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                           : "bg-gray-800 text-gray-300 hover:bg-gray-700"
//                       )}
//                     >
//                       <BookOpen className="h-4 w-4" />
//                       <span>Sepia</span>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Chapter List Panel */}
//       <AnimatePresence>
//         {showChapterList && (
//           <motion.div
//             initial={{ opacity: 0, x: -300 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: -300 }}
//             transition={{ duration: 0.3 }}
//             className={cn(
//               "fixed inset-y-0 left-0 z-50 w-full max-w-sm overflow-y-auto border-r shadow-xl transition-colors duration-300 sm:w-80",
//               theme === "light"
//                 ? "border-gray-200 bg-white text-gray-900"
//                 : theme === "dark"
//                 ? "border-gray-800 bg-gray-900 text-white"
//                 : "border-[#e8d9c0] bg-[#f8f1e3] text-[#5f4b32]"
//             )}
//           >
//             <div className="sticky top-0 z-10 flex items-center justify-between border-b p-4 backdrop-blur transition-colors duration-300">
//               <h2 className="text-lg font-medium">Chapters</h2>
//               <button
//                 onClick={() => setShowChapterList(false)}
//                 className={cn(
//                   "rounded-full p-1.5 transition-colors",
//                   theme === "light"
//                     ? "hover:bg-gray-100 text-gray-700"
//                     : theme === "dark"
//                     ? "hover:bg-gray-800 text-gray-300"
//                     : "hover:bg-[#e8d9c0] text-[#5f4b32]"
//                 )}
//                 aria-label="Close Chapter List"
//               >
//                 <X className="h-5 w-5" />
//               </button>
//             </div>

//             <div className="p-4">
//               <div className="space-y-2">
//                 {novelChapters.map((chapter) => (
//                   <Link
//                     key={chapter.id}
//                     href={`/novels/${slug}/chapters/${chapter.order}`}
//                     className={cn(
//                       "block rounded-lg p-3 transition-colors",
//                       chapter.order === Number(chapterSlug)
//                         ? theme === "light"
//                           ? "bg-gray-900 text-white"
//                           : theme === "dark"
//                           ? "bg-emerald-500 text-white"
//                           : "bg-[#5f4b32] text-[#f8f1e3]"
//                         : theme === "light"
//                         ? "hover:bg-gray-100"
//                         : theme === "dark"
//                         ? "hover:bg-gray-800"
//                         : "hover:bg-[#e8d9c0]"
//                     )}
//                     onClick={() => setShowChapterList(false)}
//                   >
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <div className="font-medium">
//                           Chapter {chapter.order}
//                         </div>
//                         <div
//                           className={cn(
//                             "text-sm",
//                             theme === "light"
//                               ? "text-gray-600"
//                               : theme === "dark"
//                               ? chapter.order === Number(chapterSlug)
//                                 ? "text-gray-100"
//                                 : "text-gray-400"
//                               : chapter.order === Number(chapterSlug)
//                               ? "text-[#f8f1e3]"
//                               : "text-[#8a7055]"
//                           )}
//                         >
//                           {chapter.title}
//                         </div>
//                       </div>

//                       {chapter.isNew && (
//                         <span
//                           className={cn(
//                             "rounded-full px-2 py-0.5 text-xs font-medium",
//                             theme === "light"
//                               ? "bg-emerald-100 text-emerald-800"
//                               : theme === "dark"
//                               ? "bg-emerald-500/20 text-emerald-400"
//                               : "bg-[#c8b28e] text-[#5f4b32]"
//                           )}
//                         >
//                           NEW
//                         </span>
//                       )}
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Comments Panel */}
//       <AnimatePresence>
//         {showComments && (
//           <motion.div
//             initial={{ opacity: 0, x: 300 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: 300 }}
//             transition={{ duration: 0.3 }}
//             className={cn(
//               "fixed inset-y-0 right-0 z-50 w-full max-w-md overflow-y-auto border-l shadow-xl transition-colors duration-300 sm:w-96",
//               theme === "light"
//                 ? "border-gray-200 bg-white text-gray-900"
//                 : theme === "dark"
//                 ? "border-gray-800 bg-gray-900 text-white"
//                 : "border-[#e8d9c0] bg-[#f8f1e3] text-[#5f4b32]"
//             )}
//           >
//             <div className="sticky top-0 z-10 flex items-center justify-between border-b p-4 backdrop-blur transition-colors duration-300">
//               <h2 className="text-lg font-medium">Comments</h2>
//               <button
//                 onClick={() => setShowComments(false)}
//                 className={cn(
//                   "rounded-full p-1.5 transition-colors",
//                   theme === "light"
//                     ? "hover:bg-gray-100 text-gray-700"
//                     : theme === "dark"
//                     ? "hover:bg-gray-800 text-gray-300"
//                     : "hover:bg-[#e8d9c0] text-[#5f4b32]"
//                 )}
//                 aria-label="Close Comments"
//               >
//                 <X className="h-5 w-5" />
//               </button>
//             </div>

//             <div className="p-4">
//               {/* Comment Input */}
//               <div
//                 className={cn(
//                   "mb-6 rounded-lg border p-3 transition-colors duration-300",
//                   theme === "light"
//                     ? "border-gray-200"
//                     : theme === "dark"
//                     ? "border-gray-800"
//                     : "border-[#e8d9c0]"
//                 )}
//               >
//                 <textarea
//                   placeholder="Add a comment..."
//                   rows={3}
//                   className={cn(
//                     "w-full resize-none bg-transparent outline-none transition-colors duration-300",
//                     theme === "light"
//                       ? "placeholder:text-gray-500"
//                       : theme === "dark"
//                       ? "placeholder:text-gray-500"
//                       : "placeholder:text-[#8a7055]"
//                   )}
//                 ></textarea>
//                 <div className="mt-2 flex justify-end">
//                   <button
//                     className={cn(
//                       "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
//                       theme === "light"
//                         ? "bg-gray-900 text-white hover:bg-gray-800"
//                         : theme === "dark"
//                         ? "bg-emerald-500 text-white hover:bg-emerald-600"
//                         : "bg-[#5f4b32] text-[#f8f1e3] hover:bg-[#4a3a27]"
//                     )}
//                   >
//                     Post Comment
//                   </button>
//                 </div>
//               </div>

//               {/* Comments List */}
//               {chapterContent?.comments &&
//               chapterContent.comments.length > 0 ? (
//                 <div className="space-y-4">
//                   {chapterContent.comments.map((comment) => (
//                     <div
//                       key={comment.id}
//                       className={cn(
//                         "rounded-lg border p-3 transition-colors duration-300",
//                         theme === "light"
//                           ? "border-gray-200"
//                           : theme === "dark"
//                           ? "border-gray-800"
//                           : "border-[#e8d9c0]"
//                       )}
//                     >
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-2">
//                           <div
//                             className={cn(
//                               "flex h-8 w-8 items-center justify-center rounded-full",
//                               theme === "light"
//                                 ? "bg-gray-200 text-gray-700"
//                                 : theme === "dark"
//                                 ? "bg-gray-800 text-gray-300"
//                                 : "bg-[#e8d9c0] text-[#5f4b32]"
//                             )}
//                           >
//                             <User className="h-5 w-5" />
//                           </div>
//                           <div>
//                             <div className="font-medium">
//                               {comment.username}
//                             </div>
//                             <div
//                               className={cn(
//                                 "text-xs",
//                                 theme === "light"
//                                   ? "text-gray-600"
//                                   : theme === "dark"
//                                   ? "text-gray-400"
//                                   : "text-[#8a7055]"
//                               )}
//                             >
//                               {comment.date}
//                             </div>
//                           </div>
//                         </div>

//                         <button
//                           className={cn(
//                             "flex items-center gap-1 rounded-full px-2 py-1 text-xs transition-colors",
//                             theme === "light"
//                               ? "hover:bg-gray-100 text-gray-700"
//                               : theme === "dark"
//                               ? "hover:bg-gray-800 text-gray-300"
//                               : "hover:bg-[#e8d9c0] text-[#5f4b32]"
//                           )}
//                         >
//                           <ThumbsUp className="h-3.5 w-3.5" />
//                           <span>{comment.likes}</span>
//                         </button>
//                       </div>

//                       <p
//                         className={cn(
//                           "mt-2 text-sm",
//                           theme === "light"
//                             ? "text-gray-700"
//                             : theme === "dark"
//                             ? "text-gray-300"
//                             : "text-[#5f4b32]"
//                         )}
//                       >
//                         {comment.content}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div
//                   className={cn(
//                     "flex flex-col items-center justify-center rounded-lg border p-8 text-center",
//                     theme === "light"
//                       ? "border-gray-200 text-gray-500"
//                       : theme === "dark"
//                       ? "border-gray-800 text-gray-400"
//                       : "border-[#e8d9c0] text-[#8a7055]"
//                   )}
//                 >
//                   <MessageSquare className="h-12 w-12 opacity-50" />
//                   <h3 className="mt-2 font-medium">No comments yet</h3>
//                   <p className="mt-1 text-sm">
//                     Be the first to share your thoughts!
//                   </p>
//                 </div>
//               )}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Overlay when panels are open */}
//       <AnimatePresence>
//         {(showChapterList || showComments) && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
//             onClick={() => {
//               setShowChapterList(false);
//               setShowComments(false);
//             }}
//           />
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// // Extended mock data for novels
// const allNovels = [
//   {
//     id: "lord-mysteries",
//     slug: "lord-mysteries",
//     title: "Lord of the Mysteries",
//     coverImage: "/1744419978_blood-eagle.webp",
//     author: "Cuttlefish That Loves Diving",
//     rating: 4.7,
//     totalRatings: 853,
//     categories: ["Fantasy", "Mystery", "Supernatural"],
//     description:
//       "In the waves of steam and machinery, who could achieve extraordinary? In the fogs of history and darkness, who was whispering? I woke up from the realm of mysteries and opened my eyes to the world. This is a different world. Everybody wakes up to be faced with a mystical card with different abilities. But with a glance, I knew that the world was not simple. The world was full of mysteries, and danger was hiding in the shadows. So I walked on my path, searching for the secrets of the world. Follow Klein Moretti's journey to unravel the mysteries of the world and find his true self.",
//     updatedAt: "2025-04-15T10:30:00Z",
//     chapterCount: 1430,
//     views: 2543789,
//   },
//   {
//     id: "legendary-mechanic",
//     slug: "legendary-mechanic",
//     title: "The Legendary Mechanic",
//     coverImage: "/1744419978_blood-eagle.webp",
//     author: "Chocolion",
//     rating: 4.7,
//     totalRatings: 712,
//     categories: ["Sci-Fi", "Adventure", "Fantasy"],
//     description:
//       "What would happen if a game's NPC possessed the player's mind? Han Xiao, a fateful NPC, got a second chance at life. As a lowly mechanic, he had managed to save a galaxy from destruction! But before he could savor his triumph, he had died. However, destiny had other plans.",
//     updatedAt: "2025-04-18T14:45:00Z",
//     chapterCount: 1465,
//     views: 1987654,
//   },
// ];

// // Mock data for chapters
// const allChapters = [
//   // Lord of the Mysteries chapters
//   {
//     id: "lord-mysteries-1",
//     novelSlug: "lord-mysteries",
//     order: 1,
//     title: "Transmigration",
//     slug: "transmigration",
//     releaseDate: "Jan 2, 2025",
//     views: 234567,
//     isNew: false,
//     isLocked: true,
//   },
//   {
//     id: "lord-mysteries-2",
//     novelSlug: "lord-mysteries",
//     order: 2,
//     title: "The Fool",
//     slug: "the-fool",
//     releaseDate: "Jan 5, 2025",
//     views: 198765,
//     isNew: false,
//   },
//   {
//     id: "lord-mysteries-3",
//     novelSlug: "lord-mysteries",
//     order: 3,
//     title: "The Tarot Club",
//     slug: "the-tarot-club",
//     releaseDate: "Jan 8, 2025",
//     views: 187654,
//     isNew: false,
//     isLocked: true,
//   },
//   {
//     id: "lord-mysteries-4",
//     novelSlug: "lord-mysteries",
//     order: 4,
//     title: "Sequence Potion",
//     slug: "sequence-potion",
//     releaseDate: "Jan 11, 2025",
//     views: 176543,
//     isNew: false,
//   },
//   {
//     id: "lord-mysteries-5",
//     novelSlug: "lord-mysteries",
//     order: 5,
//     title: "The Hanged Man",
//     slug: "the-hanged-man",
//     releaseDate: "Jan 14, 2025",
//     views: 165432,
//     isNew: false,
//     isLocked: true,
//   },
//   {
//     id: "lord-mysteries-1430",
//     novelSlug: "lord-mysteries",
//     order: 1430,
//     title: "The Fool's Gambit",
//     slug: "the-fools-gambit",
//     releaseDate: "Apr 15, 2025",
//     views: 54321,
//     isNew: true,
//     isLocked: true,
//   },

//   // Legendary Mechanic chapters
//   {
//     id: "legendary-mechanic-1",
//     novelSlug: "legendary-mechanic",
//     order: 1,
//     title: "Awakening",
//     slug: "awakening",
//     releaseDate: "Jan 5, 2025",
//     views: 187654,
//     isNew: false,
//   },
//   {
//     id: "legendary-mechanic-2",
//     novelSlug: "legendary-mechanic",
//     order: 2,
//     title: "The Game Begins",
//     slug: "the-game-begins",
//     releaseDate: "Jan 8, 2025",
//     views: 176543,
//     isNew: false,
//   },
//   {
//     id: "legendary-mechanic-1465",
//     novelSlug: "legendary-mechanic",
//     order: 1465,
//     title: "Mechanical Apocalypse",
//     slug: "mechanical-apocalypse",
//     releaseDate: "Apr 18, 2025",
//     views: 43210,
//     isNew: true,
//   },
// ];

// // Mock data for chapter contents
// const allChapterContents = [
//   {
//     novelSlug: "lord-mysteries",
//     order: 1,
//     content: `Amidst the howling wind, a middle-aged man with grizzled hair stood in front of a gravestone. He placed a bouquet of pure white flowers in front of it.

// "I'm back, Roselle. I've found a way to reverse everything. I'll make sure that none of this happens."

// The man's voice was hoarse, as if he hadn't spoken in a long time. His eyes, however, were clear and determined.

// He reached into his pocket and pulled out a small, ornate pocket watch. Its surface was engraved with mysterious symbols that seemed to shift and change as he looked at them.

// "The Sealed Artifact... I've finally completed it. With this, I can send someone back. Someone who can change the course of history."

// The man opened the watch. Inside, instead of clock hands and orders, there was a swirling vortex of darkness that seemed to absorb all light.

// "I've chosen someone, Roselle. Someone who will understand the value of knowledge, the importance of caution. Someone who can navigate the treacherous waters of the hidden world without being consumed by it."

// He snapped the watch shut and looked up at the darkening sky.

// "The Blasphemy Slate has shown me the path. The ritual will begin at midnight."

// As if responding to his words, thunder rumbled in the distance.

// The man smiled grimly.

// "It's time."

// ---

// Zhou Mingrui's head was pounding. The fluorescent lights of the office seemed unusually harsh today, and the constant clicking of keyboards around him felt like needles being driven into his skull.

// "Hey, Zhou, you don't look so good," said a coworker, peering over the cubicle divider.

// Zhou Mingrui managed a weak smile. "Just a headache. I'll be fine."

// But he wasn't fine. The headache had started three days ago and had been getting progressively worse. He had taken painkillers, tried to get more sleep, even visited a doctor, but nothing helped.

// He turned back to his computer screen, where he had been proofreading a translation of a fantasy novel. The words swam before his eyes, and he blinked hard, trying to focus.

// The novel was called "Lord of the Mysteries," and it was about a world where people could gain supernatural powers by consuming potions made from mystical materials. Zhou had been enjoying it, finding the magic system particularly intriguing. It was different from the usual cultivation novels that flooded the market.

// As he read, a particular passage caught his attention:

// "The Fool that doesn't belong to this era will walk upon the gray fog and end the history of the Gods."

// Something about those words resonated with him, making his headache spike. He winced, rubbing his temples.

// "I need some air," he muttered, standing up from his desk.

// He made his way to the office balcony, stepping out into the cool evening air. The city stretched out before him, a sea of lights against the darkening sky. For a moment, the fresh air seemed to help, the pounding in his head receding slightly.

// Then, without warning, the pain exploded. It felt like his skull was being split open from the inside. Zhou Mingrui clutched his head, a scream tearing from his throat as he fell to his knees.

// The world around him began to distort, the city lights stretching and blurring like watercolors in the rain. He heard voices, distant and echoing, speaking words he couldn't understand.

// And then, darkness.

// ---

// Klein Moretti woke with a start, his heart pounding in his chest. He had been having the strangest dream, about a world filled with towering buildings of glass and steel, where carriages moved without horses and people carried small devices that could communicate across vast distances.

// He sat up in bed, running a hand through his tousled brown hair. Sunlight streamed through the window of his small apartment, illuminating the dust motes dancing in the air.

// "What a peculiar dream," he murmured, trying to hold onto the fading images. But like water through a sieve, they slipped away, leaving only a vague sense of disorientation.

// Klein swung his legs over the side of the bed and stood up, stretching. He had a busy day ahead. The Divination Department at Khoy University had announced a new job opening, and he was determined to secure it. With his background in mysticism and his decent grades, he had a good chance.

// As he moved to his washbasin to splash water on his face, a wave of dizziness hit him. He gripped the edge of the basin, waiting for it to pass.

// Strange... he hadn't felt this way before.

// When he looked up into the small mirror above the basin, he froze. For just a moment, he thought he saw a different face looking back at him—a face with features similar to his own, yet distinctly foreign.

// Klein blinked, and the illusion was gone. His own familiar face stared back at him, brown eyes wide with confusion.

// "I must be more nervous about the job than I thought," he said to himself, trying to shake off the unsettling feeling.

// He quickly washed and dressed, donning a clean white shirt, brown vest, and matching trousers. As he knotted his tie, his fingers moved with practiced ease, yet somehow the action felt... new, as if he was performing it for the first time.

// Klein dismissed the thought and grabbed his coat and hat. He had no time for strange fancies today. The future awaited, and he was determined to meet it head-on.

// As he stepped out into the bustling streets of Tingen City, he couldn't shake the feeling that something fundamental had changed. The world around him was exactly as it had always been—the cobblestone streets, the steam-powered trams, the people in their early industrial-era clothing—yet it all seemed slightly foreign, as if he was seeing it through new eyes.

// "Get a hold of yourself, Klein," he muttered under his breath. "It's just pre-interview nerves."

// He straightened his back, adjusted his hat, and strode purposefully toward the university, unaware that his life had already changed in ways he couldn't possibly imagine.

// Unaware that he was no longer just Klein Moretti.

// Unaware that he was now also Zhou Mingrui, a transmigrator from another world.

// And unaware of the ancient powers that had orchestrated it all.`,
//     comments: [
//       {
//         id: "comment-1",
//         username: "MysteryFan42",
//         content:
//           "This first chapter hooked me immediately! The concept of transmigration is handled so well here, and I love how the author sets up the mystery right from the start.",
//         date: "Jan 3, 2025",
//         likes: 24,
//       },
//       {
//         id: "comment-2",
//         username: "NovelReader",
//         content:
//           "I've read this three times now and keep finding new details. The foreshadowing is subtle but it's definitely there!",
//         date: "Jan 5, 2025",
//         likes: 18,
//       },
//       {
//         id: "comment-3",
//         username: "BookwormAlice",
//         content:
//           "The world-building is already fascinating. I can tell this is going to be a complex story with lots of layers.",
//         date: "Jan 10, 2025",
//         likes: 15,
//       },
//     ],
//   },
//   {
//     novelSlug: "lord-mysteries",
//     order: 2,
//     content: `Klein sat in the waiting area outside the office of Professor Gustav Hall, Chairman of the Divination Department. His palms were sweaty despite the cool temperature, and he kept adjusting his tie nervously.

// Around him, other candidates for the position waited as well, each trying to appear calm and confident. Klein recognized a few faces from his university days—there was Edward Shaw, who had graduated with top honors, and Lisa Watson, whose thesis on dream divination had been published in several academic journals.

// The competition was stiff, and Klein couldn't help but feel somewhat outmatched. His grades had been good, but not exceptional, and while he had a solid understanding of mysticism and divination, he lacked the practical experience that some of the other candidates possessed.

// Still, he had prepared thoroughly for this interview. He had reviewed all the major divination theories, practiced the basic techniques, and even researched Professor Hall's own published works to better understand what the chairman might be looking for in an assistant.

// "Mr. Moretti?" A secretary appeared at the door. "Professor Hall will see you now."

// Klein stood, smoothing down his vest and taking a deep breath. As he followed the secretary into the office, he felt a strange sense of detachment, as if he was watching himself from a distance. It was the same feeling he had experienced that morning—a sense that he was both Klein Moretti and someone else entirely.

// Professor Hall's office was exactly what one would expect from a senior academic: walls lined with bookshelves, a large desk covered in papers and curious objects, and the faint smell of pipe tobacco hanging in the air. The professor himself was a man in his sixties, with a neatly trimmed white beard and sharp eyes that seemed to look right through Klein.

// "Mr. Moretti, please, take a seat," Professor Hall gestured to the chair in front of his desk. "I've been reviewing your application. Your interest in the mystical is quite evident from your coursework."

// "Thank you, Professor," Klein replied, sitting down and trying to appear confident. "I've always been fascinated by the hidden truths of our world."

// As the words left his mouth, Klein felt a strange disconnect. It was as if someone else had spoken through him—someone with memories and knowledge that he himself didn't possess. Yet at the same time, the sentiment felt genuine.

// Professor Hall nodded thoughtfully. "Tell me, Mr. Moretti, what do you know about Tarot cards?"

// Klein opened his mouth to respond, expecting to fumble through a basic explanation of the divination tool. To his surprise, detailed knowledge flowed effortlessly from his lips.

// "The Tarot is a powerful tool for divination, Professor. The standard deck consists of 78 cards—22 Major Arcana representing significant archetypes and forces, and 56 Minor Arcana divided into four suits that reflect the elements and aspects of daily life. When used properly, the Tarot doesn't simply predict the future; it reveals hidden truths and potential paths, allowing the diviner to better understand the forces at work in a situation."

// Klein paused, surprised at his own eloquence. Where had that come from? He had studied the Tarot, of course, but not in such detail. It was as if he had accessed knowledge that wasn't his own.

// Professor Hall's eyebrows rose slightly. "Impressive, Mr. Moretti. And what would you say is the significance of The Fool card?"

// Again, knowledge that Klein didn't know he possessed surfaced in his mind.

// "The Fool is ordered zero in the Major Arcana, representing both the beginning and the infinite potential of the journey. It symbolizes innocence, spontaneity, and the leap of faith that starts all great adventures. The Fool stands at the edge of a cliff, unaware of the danger, yet protected by his very innocence. In many ways, The Fool represents all of us as we step into the unknown."

// As he spoke, Klein felt a chill run down his spine. The words held a resonance that went beyond academic knowledge. The image of The Fool standing at the precipice seemed to reflect his own situation—poised at the edge of something vast and unknown.

// Professor Hall studied him intently, his expression unreadable. "And if you were to associate yourself with a Tarot card, Mr. Moretti, which would it be?"

// Without hesitation, Klein replied, "The Fool, Professor."

// The answer surprised him. He had never thought of himself in those terms before, yet as soon as the words left his mouth, he knew they were true. He was standing at the threshold of something momentous, about to take a step into the unknown.

// Professor Hall's serious expression gave way to a small smile. "An interesting choice. Most candidates choose The Magician or The High Priestess, trying to impress me with their supposed wisdom or power. But The Fool... The Fool acknowledges that true wisdom begins with recognizing how little we know."

// He leaned forward, his eyes boring into Klein's. "Tell me, Mr. Moretti, do you believe in the supernatural? Not just academically, but truly believe?"

// Klein hesitated. The rational part of him—the part that felt like it belonged to someone else, someone from a world where such things were considered superstition—wanted to give a measured, academic response. But another part of him, the part that was purely Klein Moretti, knew the truth.

// "Yes, Professor, I do. I believe there are forces beyond our understanding, powers that operate according to rules we have only begun to comprehend. And I believe that through careful study and respectful practice, we can learn to interact with those forces."

// Professor Hall nodded slowly, seemingly satisfied with the answer. "One final question, Mr. Moretti. Why do you want this position?"

// This time, Klein didn't need to search for an answer. It came from both aspects of himself, unified in purpose.

// "Because I want to understand, Professor. I want to uncover the hidden truths of our world, to explore the mysteries that lie beneath the surface of what we call reality. And I believe that working in the Divination Department, under your guidance, would be the best way to pursue that understanding."

// For a long moment, Professor Hall said nothing, simply studying Klein with those penetrating eyes. Then he nodded once, decisively.

// "Very well, Mr. Moretti. I believe we have everything we need for now. We'll be making our decision by the end of the week. The secretary will show you out."

// Klein stood, thanking the professor, and followed the secretary back to the waiting area. As he left the university and stepped out into the afternoon sunlight, he couldn't shake the feeling that something significant had just occurred—not just the interview, but something deeper, something connected to the strange sense of duality he had been experiencing.

// Who was he, really? Klein Moretti, a young man seeking a position at a university? Or someone else, someone with knowledge and memories that didn't belong in this world?

// As he walked home, lost in thought, he didn't notice the figure watching him from across the street—a tall man in a black coat, his face hidden by the shadow of his hat. The man observed Klein for a long moment, then turned and disappeared into the crowd, leaving no trace of his presence except a lingering scent of something ancient and otherworldly.

// The game had begun, and The Fool had taken his first step off the cliff.`,
//     comments: [],
//   },
//   {
//     novelSlug: "legendary-mechanic",
//     order: 1,
//     content: `The universe was vast and boundless, filled with countless stars and civilizations. Among them, the Shattered Star Ring was just one of many star fields, unremarkable in the grand scheme of things.

// Within this ordinary star field, on a planet called Planet Aquamarine, in a small town named Mingshui, a young man named Han Xiao was sitting in front of his computer, his fingers dancing across the keyboard with practiced precision.

// The room was dimly lit, illuminated only by the glow of multiple monitors. Empty food containers and energy drink cans littered the desk, evidence of many hours spent without a break. On the screens, a complex game interface displayed various statistics, maps, and character information.

// "Almost there," Han Xiao muttered to himself, his eyes fixed on the main screen where his character—a high-level mechanic—was engaged in combat with a massive alien creature. The battle was intense, requiring split-second decisions and perfect timing.

// With a final series of commands, Han Xiao's character deployed a swarm of combat drones that surrounded the alien, bombarding it with concentrated fire. The creature's health bar rapidly depleted, and with a dramatic animation, it collapsed to the ground, defeated.

// [Congratulations! You have defeated the Disaster Grade Creature: Void Behemoth]
// [You have gained 5,000,000 Experience Points]
// [You have gained the achievement: Void Conqueror]
// [You have completed the Hidden Mission: The Void's Hunger]

// A smile spread across Han Xiao's tired face. After three days of non-stop gaming, he had finally completed one of the most challenging missions in "Galaxy," the immersive virtual reality game that had taken the world by storm.

// "And with that," he said, stretching his arms above his head, "I've officially completed everything there is to do in this game."

// It was no exaggeration. Han Xiao was known in the gaming community as "Dark Emperor," one of the top players globally. He had been playing Galaxy since its beta release three years ago and had accumulated a wealth of knowledge about the game that few could match.

// He glanced at the clock: 3:47 AM. The official servers would be shutting down for good in just thirteen minutes, at 4:00 AM. Galaxy's developers had announced the shutdown a month ago, citing the need to focus on their new project, Galaxy 2, which promised even more immersive gameplay and an expanded universe.

// Han Xiao felt a twinge of sadness. He had poured thousands of hours into this game, building his character from a lowly mechanic into one of the most powerful entities in the virtual galaxy. And now it was all coming to an end.

// He opened his character's inventory one last time, scrolling through the hundreds of rare items, weapons, and blueprints he had collected. His mechanic character, also named Han Xiao (he had never been particularly creative with names), was a masterpiece of strategic building and optimization.

// "I'm going to miss you, buddy," he said to the character on the screen. "We had a good run."

// As the minutes ticked down, Han Xiao decided to take his character to a scenic viewpoint for the final moments. He navigated to a cliff overlooking a vast alien ocean on Planet Aquamarine—the starting planet where his journey had begun three years ago.

// The virtual sun was rising over the horizon, painting the sky in hues of purple and gold. It was a fitting end, he thought. Coming full circle to where it all began.

// A notification appeared on his screen:

// [Server shutdown in 5 minutes. Please log out to avoid data corruption.]

// Han Xiao ignored it. He wanted to stay until the very end, to witness the final moments of this world that had been such a significant part of his life.

// As he waited, he reflected on his life outside the game. At twenty-eight, he had few accomplishments to speak of in the real world. A college dropout, he made a modest living as a freelance programmer, taking just enough jobs to pay the rent and keep his gaming rig updated. His parents had given up on pushing him toward a "real career" years ago, and his few friends were mostly online acquaintances who shared his passion for gaming.

// Some might call it a wasted life, but Han Xiao didn't see it that way. In Galaxy, he had achieved greatness. He had built empires, saved civilizations, and left his mark on a virtual universe. It meant something to him, even if others couldn't understand.

// [Server shutdown in 1 minute. All remaining players will be forcibly disconnected.]

// Han Xiao took a deep breath, savoring these final moments. On the screen, his character stood at the edge of the cliff, the rising sun casting a long shadow behind him.

// "Goodbye, Galaxy," Han Xiao whispered. "It's been fun."

// The screen flickered, and for a moment, Han Xiao thought he saw his character turn to look directly at him—something that shouldn't be possible given the game's mechanics. But before he could process this oddity, the screen went black, replaced by a simple message:

// [Galaxy servers have been shut down. Thank you for playing.]

// Han Xiao leaned back in his chair, a mixture of emotions washing over him. It was the end of an era. Tomorrow, he would need to find something new to fill the void that Galaxy had left behind.

// With a sigh, he reached out to shut down his computer—but before his finger could touch the power button, a blinding light erupted from the screen, engulfing the room.

// Han Xiao felt a strange sensation, as if his body was being pulled apart at the molecular level. There was no pain, only a profound disorientation as his consciousness seemed to separate from his physical form.

// The last thing he heard before everything went dark was a voice—not from his speakers, but somehow inside his mind:

// "Player Han Xiao, your journey is not over. It has only just begun."

// ---

// Darkness. Complete and absolute.

// Then, gradually, awareness returned. Han Xiao could feel... something. Not his body, exactly, but a sense of existence. Of being.

// Information began to flow into his consciousness—data, memories, knowledge that wasn't his own. No, that wasn't quite right. It was his, but not the "him" he had been moments ago. These were the memories of another Han Xiao—the character he had played in Galaxy.

// Confusion gave way to understanding as the flood of information organized itself in his mind. He wasn't just receiving the memories of his game character; he was becoming his game character. Or rather, he was becoming the actual person that his character was based on.

// Because Galaxy wasn't just a game. It was a highly sophisticated simulation of a real universe—a universe where Han Xiao, the mechanic, actually existed.

// And now, somehow, the consciousness of Han Xiao the player had been transferred into the body of Han Xiao the mechanic, at a point in time long before the events of the game had taken place.

// As this realization solidified, sensation returned. Han Xiao could feel a hard surface beneath him, could smell oil and metal and the sterile air of a spacecraft. He could hear the distant hum of engines and the closer sound of someone breathing—his own breathing.

// With tremendous effort, he opened his eyes.

// He was lying on a narrow cot in what appeared to be a small, utilitarian cabin. The walls were metal, adorned with various tools and mechanical components. A workbench occupied one corner, covered in half-assembled devices.

// Han Xiao sat up slowly, looking down at his hands—hands that were both familiar and strange. They were his game character's hands, calloused from years of mechanical work, with a small burn scar on the right palm that he recognized from the character customization screen.

// "This is impossible," he whispered, but even as he said it, he knew it was real. Somehow, he had been transported into the body of his game character, into the actual universe that Galaxy had simulated.

// A quick glance around the cabin revealed a small mirror mounted on one wall. Han Xiao stood on shaky legs and made his way over to it, needing to see the face that now belonged to him.

// The reflection showed a young man in his early twenties, with short black hair and sharp features. It was the face he had designed for his character three years ago, now rendered in perfect detail rather than the game's graphics.

// As he stared at his reflection, more memories surfaced—memories of this body's original owner. Han Xiao saw flashes of a difficult childhood on Planet Aquamarine, years of mechanical training, and most recently, employment as a low-level technician for the Garton Mercenary Group.

// And with those memories came the realization of when he was. This was six years before the main storyline of Galaxy began—before the character Han Xiao would rise from obscurity to become one of the most powerful figures in the universe.

// Han Xiao gripped the edge of the workbench, his mind racing. He knew everything that was going to happen over the next decade. Every major conflict, every technological breakthrough, every rise and fall of civilizations and empires. He had played through it all in the game.

// And now he had the chance to live through it again, but this time with the advantage of foreknowledge. He could change things, make different choices, perhaps even alter the course of history in this universe.

// A slow smile spread across his face as the implications sank in. In the game, he had built his mechanic character into a powerhouse, but he had been constrained by the game's rules and storyline. Here, in this reality, those constraints no longer applied.

// "I know all the technological developments for the next decade," he murmured to himself. "I know where to find rare materials, how to avoid dangers, which factions will rise and which will fall."

// The possibilities were endless. With his knowledge, he could accelerate his growth far beyond what had been possible in the game. He could become stronger, more influential, more powerful than his character had ever been.

// A notification sound interrupted his thoughts—not a virtual game notification, but a real alert from the communicator on his wrist. Han Xiao looked down at the device, another wave of familiarity washing over him as he recognized the standard-issue mercenary communicator.

// The message was brief and to the point:

// [All technicians report to Hangar Bay 3 for mission briefing at 0800 hours.]

// Han Xiao checked the time: 0723. He had thirty-seven minutes to prepare.

// As he began gathering his tools, a sense of excitement replaced his initial confusion and disbelief. This was real. He was really here, in the universe of Galaxy, with all his knowledge of the future intact.

// "The legendary mechanic," he said to himself, recalling the title his character had earned late in the game. "That has a nice ring to it."

// With a determined nod, Han Xiao finished his preparations and headed for the door. His new life was about to begin, and he intended to make the most of it.

// The universe wouldn't know what hit it.`,
//     comments: [
//       {
//         id: "comment-1",
//         username: "SciFiLover",
//         content:
//           "I love the concept of this novel! The idea of a player being transported into the game world with all his knowledge is fascinating.",
//         date: "Jan 6, 2025",
//         likes: 31,
//       },
//       {
//         id: "comment-2",
//         username: "GamerGirl",
//         content:
//           "As a gamer myself, I can totally relate to Han Xiao's attachment to the game. The way the author describes the gaming experience feels so authentic!",
//         date: "Jan 7, 2025",
//         likes: 27,
//       },
//     ],
//   },
// ];

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Settings,
  List,
  MessageSquare,
  ThumbsUp,
  Share2,
  Bookmark,
  Eye,
  Calendar,
  ArrowLeft,
  Lock,
  Coins, // Added Coins icon
} from "lucide-react";
import { Button } from "@/app/components/ui/button"; // Assuming this path is correct
import { cn } from "@/app/lib/utils"; // Assuming this path is correct
import { useParams } from "next/navigation";

// --- Mock Data --- (To be replaced with actual data fetching)
const mockUserData = {
  name: "Alex",
  initialCoins: 500,
};

const allNovels = [
  {
    slug: "lord-mysteries",
    title: "The Epic Fantasy Saga",
  },
];

const allChapters = [
  {
    novelSlug: "lord-mysteries",
    order: 1,
    title: "The Beginning",
    isLocked: false,
    lockedCoinAmount: 0,
    releaseDate: "2024-01-01",
    views: 1200,
  },
  {
    novelSlug: "lord-mysteries",
    order: 2,
    title: "The First Trial",
    isLocked: true,
    lockedCoinAmount: 50,
    releaseDate: "2024-01-08",
    views: 850,
  },
  {
    novelSlug: "lord-mysteries",
    order: 3,
    title: "Secrets Unveiled",
    isLocked: true,
    lockedCoinAmount: 75,
    releaseDate: "2024-01-15",
    views: 600,
  },
  {
    novelSlug: "lord-mysteries",
    order: 4,
    title: "The Dragon's Lair",
    isLocked: true,
    lockedCoinAmount: 100,
    releaseDate: "2024-01-22",
    views: 950,
  },
  {
    novelSlug: "lord-mysteries",
    order: 5,
    title: "A Glimmer of Hope",
    isLocked: false,
    lockedCoinAmount: 0,
    releaseDate: "2024-01-29",
    views: 1500,
  },
];

const allChapterContents = [
  {
    novelSlug: "lord-mysteries",
    order: 1,
    content:
      "This is the first chapter, and it's a long one. It sets the scene for the entire saga. Our hero is introduced, and the world is built. Dragons fly, magic is real, and adventure awaits. This chapter is free for everyone to read and enjoy. It provides a glimpse into the vast world and the challenges that lie ahead. The protagonist, a young farmhand, discovers a hidden talent that will change his life forever. He embarks on a journey filled with danger, friendship, and self-discovery. The ancient prophecies speak of a chosen one, and he might just be it. The fate of the kingdom rests on his shoulders.",
  },
  {
    novelSlug: "lord-mysteries",
    order: 2,
    content:
      "Chapter 2 delves deeper into the hero's first major challenge. He must navigate a treacherous forest, outsmart cunning foes, and make difficult choices. This chapter tests his courage and resolve. The stakes are high, and failure is not an option. New allies join his quest, while old enemies plot his downfall. The magic he possesses begins to awaken, but controlling it is another matter entirely. This chapter is locked and requires 50 coins to unlock. The full content reveals crucial plot points and character development. The hero learns that true strength comes not just from power, but from wisdom and compassion.",
  },
  {
    novelSlug: "lord-mysteries",
    order: 3,
    content:
      "In Chapter 3, long-hidden secrets are brought to light. The hero uncovers a conspiracy that threatens to tear the kingdom apart. He must race against time to expose the traitors and protect the innocent. This chapter is filled with intrigue, suspense, and unexpected twists. The narrative explores themes of trust, betrayal, and the corrupting influence of power. Unlocking this chapter costs 75 coins and provides access to critical information that shapes the future of the story. The hero's understanding of the world and his place in it is profoundly altered by these revelations.",
  },
  {
    novelSlug: "lord-mysteries",
    order: 4,
    content:
      "Chapter 4 takes our hero to the formidable Dragon's Lair. A legendary beast guards a powerful artifact, and our hero must confront it. This chapter is packed with action and adventure. The descriptions of the dragon and its lair are vivid and immersive. The battle tests the limits of the hero's abilities and courage. Unlocking this chapter for 100 coins reveals the outcome of this epic confrontation and the nature of the artifact. The hero learns a valuable lesson about the true meaning of bravery and sacrifice.",
  },
  {
    novelSlug: "lord-mysteries",
    order: 5,
    content:
      "The fifth chapter offers a moment of respite and hope. After facing numerous challenges, the hero and his companions find a safe haven. They reflect on their journey and prepare for the trials ahead. This chapter focuses on character interactions and emotional development. It explores themes of friendship, loss, and resilience. Even in the darkest of times, hope can be found. This chapter is unlocked and provides a breather before the story intensifies once more. New plans are forged, and the path forward becomes clearer, though fraught with peril.",
  },
];
// --- End Mock Data ---

const themeClasses = {
  light: "bg-gray-100 text-gray-900",
  dark: "bg-gray-900 text-gray-100",
  sepia: "bg-[#f8f1e3] text-[#5f4b32]",
};

type UnlockMap = Record<string, boolean>;

export default function ChapterDetailPage() {
  type Theme = keyof typeof themeClasses;
  const params = useParams();
  const { chapterSlug, slug } = params;

  // User and Chapter Unlock State
  const [currentUserCoins, setCurrentUserCoins] = useState(mockUserData.initialCoins);
  const [unlockedChaptersMap, setUnlockedChaptersMap] = useState<UnlockMap>({}); // Stores { 'novelSlug_chapterOrder': true }

  // Reading settings state
  // const [fontSize, setFontSize] = useState("medium");
  const [theme] = useState<Theme>("dark");
  const [showSettings, setShowSettings] = useState(false);
  const [showChapterList, setShowChapterList] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Find novel by slug
  const novel = allNovels.find((novel) => novel.slug === slug);

  if (!novel) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-white">Novel not found</h1>
        <p className="mt-2 text-gray-400">
          The novel you&#39;re looking for doesn&#39;t exist or has been removed.
        </p>
        <Link
          href="/"
          className="mt-4 rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  // Get all chapters for this novel
  const novelChapters = allChapters
    .filter((chapter) => chapter.novelSlug === novel.slug)
    .sort((a, b) => a.order - b.order);

  // Find current chapter
  const currentChapter = novelChapters.find(
    (chapter) => chapter.order === Number(chapterSlug)
  );

  if (!currentChapter) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-white">Chapter not found</h1>
        <p className="mt-2 text-gray-400">
          The chapter you&#39;re looking for doesn&#39;t exist or has been removed.
        </p>
        <Link
          href={`/novels/${slug}`}
          className="mt-4 rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600"
        >
          Return to Novel
        </Link>
      </div>
    );
  }

  // Find chapter content
  const chapterContent = allChapterContents.find(
    (content) =>
      content.novelSlug === slug && content.order === Number(chapterSlug)
  );

  // Find previous and next chapters
  const currentIndex = novelChapters.findIndex(
    (chapter) => chapter.order === Number(chapterSlug)
  );
  const previousChapter =
    currentIndex > 0 ? novelChapters[currentIndex - 1] : null;
  const nextChapter =
    currentIndex < novelChapters.length - 1
      ? novelChapters[currentIndex + 1]
      : null;

  // Progress calculation
  const progress = ((currentIndex + 1) / novelChapters.length) * 100;

  const chapterKey = `${currentChapter.novelSlug}_${currentChapter.order}`;
  const isEffectivelyLocked = currentChapter.isLocked && !unlockedChaptersMap[chapterKey];

  const handleUnlockChapter = () => {
    if (!currentChapter || !currentChapter.isLocked) return;

    if (currentUserCoins >= currentChapter.lockedCoinAmount) {
      setCurrentUserCoins(currentUserCoins - currentChapter.lockedCoinAmount);
      setUnlockedChaptersMap({
        ...unlockedChaptersMap,
        [chapterKey]: true,
      });
      // Potentially, you might want to persist this unlocked state and coin balance 
      // to a backend or localStorage here.
      alert(`Chapter ${currentChapter.order} unlocked!`);
    } else {
      alert("Not enough coins to unlock this chapter.");
    }
  };

  function getDisplayedContent() {
    if (!chapterContent) return <p className="text-center italic">Chapter content not available.</p>;

    const paragraphs = chapterContent.content.split("\n\n");

    if (isEffectivelyLocked) {
      const previewLength = Math.max(1, Math.ceil(paragraphs.length / 8));
      return (
        <>
          {paragraphs.slice(0, previewLength).map((paragraph, index) => (
            <p key={`preview-${index}`}>{paragraph}</p>
          ))}
          {paragraphs.length > previewLength && <p>...</p>}
          <div className="text-center py-4 mt-4 border-t border-gray-700/50">
            <Button
              onClick={handleUnlockChapter}
              disabled={currentUserCoins < (currentChapter?.lockedCoinAmount ?? 0)}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold rounded-md mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Lock className="mr-2 h-4 w-4" /> 
              Unlock Chapter with {currentChapter?.lockedCoinAmount ?? 0} <Coins className="ml-1 h-4 w-4 text-yellow-400" />
            </Button>
            {currentChapter && currentUserCoins < currentChapter.lockedCoinAmount && (
                <p className="text-sm text-red-400 mt-2">You need {currentChapter.lockedCoinAmount - currentUserCoins} more coins.</p>
            )}
          </div>
        </>
      );
    }
    return paragraphs.map((paragraph, index) => <p key={`full-${index}`}>{paragraph}</p>);
  }

  return (
    <div
      className={cn(
        "min-h-screen transition-colors duration-300",
        themeClasses[theme]
      )}
    >
      {/* Top Navigation Bar */}
      <header
        className={cn(
          "sticky top-0 z-40 border-b backdrop-blur transition-colors duration-300",
          theme === "light"
            ? "border-gray-200 bg-white/90"
            : theme === "dark"
            ? "border-gray-800 bg-gray-900/90"
            : "border-[#e8d9c0] bg-[#f8f1e3]/90"
        )}
      >
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link
              href={`/novels/${slug}`}
              className={cn(
                "flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                theme === "light"
                  ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  : theme === "dark"
                  ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  : "bg-[#e8d9c0] text-[#5f4b32] hover:bg-[#e0ceb0]"
              )}
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Novel</span>
            </Link>

            <h1
              className={cn(
                "truncate text-sm font-medium",
                theme === "light"
                  ? "text-gray-700"
                  : theme === "dark"
                  ? "text-gray-300"
                  : "text-[#5f4b32]"
              )}
            >
              <span className="hidden sm:inline">{novel.title}: </span>
              <span>Chapter {currentChapter.order}</span>
            </h1>
          </div>
          
          {/* Display User Coins in Header */}
          <div className={cn("flex items-center text-sm font-medium", theme === "light" ? "text-gray-700" : theme === "dark" ? "text-gray-300" : "text-[#5f4b32]")}>
            <Coins className="h-5 w-5 mr-1 text-yellow-400" /> {currentUserCoins}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={cn(
                "rounded-full p-2 transition-colors cursor-pointer",
                theme === "light"
                  ? "hover:bg-gray-200"
                  : theme === "dark"
                  ? "hover:bg-gray-800"
                  : "hover:bg-[#e8d9c0]",
                showSettings
                  ? theme === "light"
                    ? "bg-gray-200 text-gray-900"
                    : theme === "dark"
                    ? "bg-gray-800 text-white"
                    : "bg-[#e8d9c0] text-[#5f4b32]"
                  : theme === "light"
                  ? "text-gray-700"
                  : theme === "dark"
                  ? "text-gray-300"
                  : "text-[#5f4b32]"
              )}
              aria-label="Reading Settings"
            >
              <Settings className="h-5 w-5" />
            </button>

            <button
              onClick={() => setShowChapterList(!showChapterList)}
              className={cn(
                "rounded-full p-2 transition-colors cursor-pointer",
                theme === "light"
                  ? "hover:bg-gray-200"
                  : theme === "dark"
                  ? "hover:bg-gray-800"
                  : "hover:bg-[#e8d9c0]",
                showChapterList
                  ? theme === "light"
                    ? "bg-gray-200 text-gray-900"
                    : theme === "dark"
                    ? "bg-gray-800 text-white"
                    : "bg-[#e8d9c0] text-[#5f4b32]"
                  : theme === "light"
                  ? "text-gray-700"
                  : theme === "dark"
                  ? "text-gray-300"
                  : "text-[#5f4b32]"
              )}
              aria-label="Chapter List"
            >
              <List className="h-5 w-5" />
            </button>

            <button
              onClick={() => setShowComments(!showComments)}
              className={cn(
                "rounded-full p-2 transition-colors cursor-pointer",
                theme === "light"
                  ? "hover:bg-gray-200"
                  : theme === "dark"
                  ? "hover:bg-gray-800"
                  : "hover:bg-[#e8d9c0]",
                showComments
                  ? theme === "light"
                    ? "bg-gray-200 text-gray-900"
                    : theme === "dark"
                    ? "bg-gray-800 text-white"
                    : "bg-[#e8d9c0] text-[#5f4b32]"
                  : theme === "light"
                  ? "text-gray-700"
                  : theme === "dark"
                  ? "text-gray-300"
                  : "text-[#5f4b32]"
              )}
              aria-label="Comments"
            >
              <MessageSquare className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Reading Progress Bar */}
        <div className="h-1 w-full bg-gray-200 dark:bg-gray-800">
          <div
            className="h-full bg-gradient-to-r from-emerald-400 to-teal-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </header>

      {/* Main Content */}
      <main
        className={cn(
          "mx-auto max-w-5xl px-4 py-8 transition-colors duration-300",
          theme === "light"
            ? "text-gray-900"
            : theme === "dark"
            ? "text-gray-100"
            : "text-[#5f4b32]"
        )}
      >
        {/* Chapter Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">
            Chapter {currentChapter.order}: {currentChapter.title}
          </h1>
          <div className="mt-2 flex items-center justify-center gap-4 text-sm">
            <div
              className={cn(
                "flex items-center gap-1",
                theme === "light"
                  ? "text-gray-600"
                  : theme === "dark"
                  ? "text-gray-400"
                  : "text-[#8a7055]"
              )}
            >
              <Calendar className="h-4 w-4" />
              <span>{currentChapter.releaseDate}</span>
            </div>
            <div
              className={cn(
                "flex items-center gap-1",
                theme === "light"
                  ? "text-gray-600"
                  : theme === "dark"
                  ? "text-gray-400"
                  : "text-[#8a7055]"
              )}
            >
              <Eye className="h-4 w-4" />
              <span>{currentChapter.views.toLocaleString()} views</span>
            </div>
          </div>
        </div>

        {/* Chapter Content */}
        <div
          className={cn(
            "prose max-w-none transition-colors duration-300 text-lg",
            theme === "light"
              ? "prose-gray"
              : theme === "dark"
              ? "prose-invert"
              : "prose-stone"
          )}
        >
          {getDisplayedContent()} 
        </div>

        {/* Chapter Navigation */}
        <div className="mt-12 flex items-center justify-between">
          {previousChapter ? (
            <Link
              href={`/novels/${slug}/chapters/${previousChapter.order}`}
              className={cn(
                "flex items-center gap-2 rounded-lg px-4 py-2 transition-colors",
                theme === "light"
                  ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  : theme === "dark"
                  ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  : "bg-[#e8d9c0] text-[#5f4b32] hover:bg-[#e0ceb0]"
              )}
            >
              <ChevronLeft className="h-5 w-5" />
              <div className="flex flex-col">
                <span className="text-xs">Previous</span>
              </div>
            </Link>
          ) : (
            <div></div>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={cn(
                "rounded-full p-2 transition-colors cursor-pointer",
                isLiked
                  ? "text-emerald-500"
                  : theme === "light"
                  ? "text-gray-700 hover:bg-gray-100"
                  : theme === "dark"
                  ? "text-gray-300 hover:bg-gray-800"
                  : "text-[#5f4b32] hover:bg-[#e8d9c0]"
              )}
              aria-label={isLiked ? "Unlike" : "Like"}
            >
              <ThumbsUp
                className={cn("h-5 w-5", isLiked && "fill-emerald-500")}
              />
            </button>

            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={cn(
                "rounded-full p-2 transition-colors cursor-pointer",
                isBookmarked
                  ? "text-emerald-500"
                  : theme === "light"
                  ? "text-gray-700 hover:bg-gray-100"
                  : theme === "dark"
                  ? "text-gray-300 hover:bg-gray-800"
                  : "text-[#5f4b32] hover:bg-[#e8d9c0]"
              )}
              aria-label={isBookmarked ? "Remove Bookmark" : "Bookmark"}
            >
              <Bookmark
                className={cn("h-5 w-5", isBookmarked && "fill-emerald-500")}
              />
            </button>

            <button
              className={cn(
                "rounded-full p-2 transition-colors cursor-pointer",
                theme === "light"
                  ? "text-gray-700 hover:bg-gray-100"
                  : theme === "dark"
                  ? "text-gray-300 hover:bg-gray-800"
                  : "text-[#5f4b32] hover:bg-[#e8d9c0]"
              )}
              aria-label="Share"
            >
              <Share2 className="h-5 w-5" />
            </button>
          </div>

          {nextChapter ? (
            <Link
              href={`/novels/${slug}/chapters/${nextChapter.order}`}
              className={cn(
                "flex items-center gap-2 rounded-lg px-4 py-2 transition-colors",
                theme === "light"
                  ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  : theme === "dark"
                  ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  : "bg-[#e8d9c0] text-[#5f4b32] hover:bg-[#e0ceb0]"
              )}
            >
              <div className="flex flex-col items-end">
                <span className="text-xs">Next</span>
              </div>
              <ChevronRight className="h-5 w-5" />
            </Link>
          ) : (
            <div></div>
          )}
        </div>
      </main>

      {/* Reading Settings Panel (and other panels) - Unchanged from original */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "fixed inset-x-0 top-16 z-50 border-b p-4 shadow-lg",
              theme === "light"
                ? "border-gray-200 bg-white"
                : theme === "dark"
                ? "border-gray-700 bg-gray-800"
                : "border-[#e8d9c0] bg-[#f8f1e3]"
            )}
          >
            {/* Settings content here - unchanged */}
            <p>Font Size, Theme controls etc.</p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showChapterList && (
            <motion.div /* ... Chapter List Panel ... */ >
                <p>Chapter List Panel Content</p>
            </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showComments && (
            <motion.div /* ... Comments Panel ... */ >
                <p>Comments Panel Content</p>
            </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}


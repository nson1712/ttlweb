// "use client";

// import { useEffect } from "react";
// import { BookmarkButton } from "../../components/novels/bookmark-button";
// import { CommentForm } from "../../components/novels/comment-form";
// import Image from "next/image";
// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { Badge } from "../../components/ui/badge";
// import { Button } from "../../components/ui/button";
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from "../../components/ui/tabs";
// import { StarIcon } from "lucide-react";
// import { mockNovels } from "../../lib/mock-data";
// // import { Novel } from "../../lib/types";
// import { useAuth } from "../../lib/auth-context";
// import { useState } from "react";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/app/components/ui/pagination";

// // Define the Chapter type
// interface Chapter {
//   slug: string;
//   title: string;
//   order: number;
//   createdAt: string;
// }

// // Mock chapters data
// const mockChapters: Chapter[] = [
//   {
//     slug: "ch1",
//     title: "Chapter 1: The Beginning",
//     order: 1,
//     createdAt: "2023-01-01",
//   },
//   {
//     slug: "ch2",
//     title: "Chapter 2: The Journey",
//     order: 2,
//     createdAt: "2023-01-05",
//   },
//   {
//     slug: "ch3",
//     title: "Chapter 3: The Challenge",
//     order: 3,
//     createdAt: "2023-01-10",
//   },
//   {
//     slug: "ch4",
//     title: "Chapter 4: The Revelation",
//     order: 4,
//     createdAt: "2023-01-15",
//   },
//   {
//     slug: "ch5",
//     title: "Chapter 5: The Confrontation",
//     order: 5,
//     createdAt: "2023-01-20",
//   },
//   {
//     slug: "ch6",
//     title: "Chapter 6: The Resolution",
//     order: 6,
//     createdAt: "2023-01-25",
//   },
//   {
//     slug: "ch7",
//     title: "Chapter 7: The New Beginning",
//     order: 7,
//     createdAt: "2023-01-30",
//   },
//   {
//     slug: "ch8",
//     title: "Chapter 8: The Adventure Continues",
//     order: 8,
//     createdAt: "2023-02-05",
//   },
//   {
//     slug: "ch9",
//     title: "Chapter 9: The Unexpected Turn",
//     order: 9,
//     createdAt: "2023-02-10",
//   },
//   {
//     slug: "ch10",
//     title: "Chapter 10: The Final Battle",
//     order: 10,
//     createdAt: "2023-02-15",
//   },
// ];

// // Mock comments data
// const mockComments = [
//   {
//     id: "c1",
//     user: "HarweeS",
//     text: "Not Ruby being treated like a Pokemon lmao...",
//     createdAt: "2023-02-20",
//     novelSlug: "madman-family",
//   },
//   {
//     id: "c2",
//     user: "Lost from sight",
//     text: "I wonder what sort of enchantements this charm will have.....",
//     createdAt: "2023-02-18",
//     novelSlug: "madman-family",
//   },
//   {
//     id: "c3",
//     user: "vbolneo",
//     text: "6000y+ 339ch still stock in golden core I don't really...",
//     createdAt: "2023-02-15",
//     novelSlug: "madman-family",
//   },
//   {
//     id: "c4",
//     user: "here4mysteries",
//     text: "And Thales is one who repays favors manifold. Of course....",
//     createdAt: "2023-02-12",
//     novelSlug: "madman-family",
//   },
// ];

// export default function NovelDetailPage() {
//   const params = useParams();
//   const novelSlug = params.slug as string;
//   const { isLoggedIn, user } = useAuth();

//   // Find the novel from mock data
//   const novel = mockNovels.find((n) => n.slug === novelSlug) || mockNovels[0];

//   const [activeTab, setActiveTab] = useState("info");
//   console.log("ACTIVE TAB", activeTab);
//   const [userRating, setUserRating] = useState<number | null>(null);
//   const [comments, setComments] = useState(mockComments);
//   const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
//   const [chapters, setChapters] = useState<Chapter[]>([...mockChapters].sort((a, b) => b.order - a.order));

//   // Load comments from localStorage if available
//   useEffect(() => {
//     const storedComments = localStorage.getItem("comments");
//     if (storedComments) {
//       try {
//         const parsedComments = JSON.parse(storedComments);
//         interface Comment {
//           id: string;
//           user: string;
//           text: string;
//           createdAt: string;
//           novelSlug: string;
//         }

//         const novelComments = parsedComments.filter(
//           (comment: Comment) => comment.novelSlug === novelSlug
//         );
//         if (novelComments.length > 0) {
//           setComments([...mockComments, ...novelComments]);
//         }
//       } catch (error) {
//         console.error("Failed to parse comments:", error);
//       }
//     }
//   }, [novelSlug]);

//   const sortAsc = () => {
//     setSortOrder("oldest")
//     setChapters((prev: Chapter[]) => [...prev].sort((a, b) => a.order - b.order));
//   };

//   const sortDesc = () => {
//     setSortOrder("newest")
//     setChapters((prev: Chapter[]) => [...prev].sort((a, b) => b.order - a.order));
//   };

//   // Handle rating click
//   const handleRatingClick = (rating: number) => {
//     if (!isLoggedIn) {
//       // Show login dialog or redirect to login
//       return;
//     }
//     setUserRating(rating);
//   };

//   // Handle new comment submission
//   const handleCommentSubmit = (commentText: string) => {
//     if (!isLoggedIn || !user) return;

//     const newComment = {
//       id: `c${comments.length + 1}`,
//       user: user.username || "Anonymous",
//       text: commentText,
//       createdAt: new Date().toISOString(),
//       novelSlug: novelSlug,
//     };

//     setComments([...comments, newComment]);
//   };

//   return (
//     <div className="space-y-8">
//       {/* Novel Header */}
//       <div className="flex flex-col md:flex-row gap-6 bg-gray-800 p-6 rounded-lg">
//         <div className="relative w-full md:w-64 h-80 flex-shrink-0">
//           <Image
//             src={novel.coverImage}
//             alt={novel.title}
//             fill
//             className="object-cover rounded-md"
//             sizes="(max-width: 768px) 100vw, 256px"
//           />
//         </div>

//         <div className="flex-1 flex flex-col">
//           <h1 className="text-2xl md:text-3xl font-bold text-emerald-400">
//             {novel.title}
//           </h1>
//           <p className="text-gray-400 mt-1">{novel.author}</p>

//           <div className="flex items-center mt-2">
//             <div className="flex">
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <svg
//                   key={star}
//                   className={`w-5 h-5 ${
//                     star <= Math.round(novel.rating)
//                       ? "text-yellow-400"
//                       : "text-gray-600"
//                   }`}
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                 </svg>
//               ))}
//             </div>
//             <span className="ml-2 text-gray-400">
//               {novel.rating.toFixed(1)} / 5 from {novel.totalRatings} ratings
//             </span>
//           </div>

//           <div className="flex flex-wrap gap-2 my-4">
//             {novel.categories.map((cate) => (
//               <Badge key={cate} variant="default" className="bg-gray-700">
//                 {cate}
//               </Badge>
//             ))}
//           </div>

//           <p className="text-gray-300 mt-2 max-h-44 overflow-y-auto">
//             {novel.description}
//           </p>

//           <div className="mt-auto pt-4 flex flex-wrap gap-3">
//             <Link href={`/novels/${novel.slug}/chapters`}>
//               <Button className="bg-gradient-to-r from-emerald-500 to-teal-600">
//                 Start Reading
//               </Button>
//             </Link>

//             <BookmarkButton novelSlug={novel.slug} novelTitle={novel.title} />
//           </div>
//         </div>
//       </div>

//       {/* Tabs Section */}
//       <Tabs defaultValue="chapters" className="w-full">
//         <TabsList className="w-full justify-start">
//           <TabsTrigger value="info" onClick={() => setActiveTab("info")}>
//             Information
//           </TabsTrigger>
//           <TabsTrigger
//             value="chapters"
//             onClick={() => setActiveTab("chapters")}
//           >
//             Chapters ({mockChapters.length})
//           </TabsTrigger>
//           <TabsTrigger
//             value="comments"
//             onClick={() => setActiveTab("comments")}
//           >
//             Comments ({comments.length})
//           </TabsTrigger>
//         </TabsList>

//         <TabsContent value="info" className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="bg-gray-800 p-4 rounded-lg">
//               <h3 className="text-lg font-semibold mb-3">Novel Information</h3>
//               <div className="space-y-2">
//                 <div className="flex justify-between">
//                   <span className="text-gray-400">Status:</span>
//                   <span className="text-gray-200 capitalize">
//                     {novel.status || "Ongoing"}
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-400">Language:</span>
//                   <span className="text-gray-200">
//                     {novel.language || "English"}
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-400">Year of Release:</span>
//                   <span className="text-gray-200">
//                     {novel.yearOfRelease || "Unknown"}
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-400">Chapters:</span>
//                   <span className="text-gray-200">
//                     {novel.chapterCount || mockChapters.length}
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-400">Last Updated:</span>
//                   <span className="text-gray-200">
//                     {novel.updatedAt || "Recently"}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-gray-800 p-4 rounded-lg">
//               <h3 className="text-lg font-semibold mb-3">Rate this Novel</h3>
//               <div className="flex items-center space-x-1 mb-4">
//                 {[1, 2, 3, 4, 5].map((rating) => (
//                   <button
//                     key={rating}
//                     onClick={() => handleRatingClick(rating)}
//                     className="focus:outline-none"
//                     disabled={!isLoggedIn}
//                   >
//                     <StarIcon
//                       className={`w-8 h-8 ${
//                         userRating && rating <= userRating
//                           ? "text-yellow-400 fill-current"
//                           : "text-gray-600"
//                       }`}
//                     />
//                   </button>
//                 ))}
//               </div>
//               {userRating ? (
//                 <p className="text-gray-300">
//                   You rated this novel {userRating} out of 5 stars.
//                 </p>
//               ) : isLoggedIn ? (
//                 <p className="text-gray-400">
//                   Click on a star to rate this novel.
//                 </p>
//               ) : (
//                 <p className="text-gray-400">
//                   Please{" "}
//                   <Link href="/login" className="text-blue-400 hover:underline">
//                     login
//                   </Link>{" "}
//                   to rate this novel.
//                 </p>
//               )}
//             </div>
//           </div>

//           <div className="bg-gray-800 p-4 rounded-lg">
//             <h3 className="text-lg font-semibold mb-3">Tags</h3>
//             <div className="flex flex-wrap gap-2">
//               {novel.tags?.map((tag) => (
//                 <Badge key={tag} variant="outline" className="bg-gray-700">
//                   {tag}
//                 </Badge>
//               )) || (
//                 <p className="text-gray-400">
//                   No tags available for this novel.
//                 </p>
//               )}
//             </div>
//           </div>
//         </TabsContent>

//         <TabsContent value="chapters" className="space-y-4">
//           <div className="bg-gray-800 p-4 rounded-lg">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-semibold">All Chapters</h3>
//               <div className="flex gap-2">
//                 <Button
//                   className={
//                     sortOrder === "newest"
//                       ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
//                       : "bg-gray-700 text-gray-300"
//                   }
//                   size="sm"
//                   onClick={sortDesc}
//                 >
//                   Newest First
//                 </Button>
//                 <Button
//                   className={
//                     sortOrder === "oldest"
//                       ? "bg-gradient-to-r from-emerald-500 to-teal-600"
//                       : "bg-gray-700 text-gray-300"
//                   }
//                   size="sm"
//                   onClick={sortAsc}
//                 >
//                   Oldest First
//                 </Button>
//               </div>
//             </div>

//             <div className="space-y-2">
//               {chapters.map((chapter) => (
//                 <Link
//                   key={chapter.slug}
//                   href={`/novels/${novel.slug}/chapters/${chapter.slug}`}
//                   className="block bg-gray-700 hover:bg-gray-600 p-3 rounded-md transition-colors"
//                 >
//                   <div className="flex justify-between items-center">
//                     <span className="text-emerald-500 hover:text-emerald-400">
//                       {chapter.title}
//                     </span>
//                     <span className="text-gray-400 text-sm">
//                       {chapter.createdAt}
//                     </span>
//                   </div>
//                 </Link>
//               ))}
//                <Pagination>
//               <PaginationContent>
//                 <PaginationItem>
//                   <PaginationPrevious href="#" />
//                 </PaginationItem>
//                 <PaginationItem>
//                   <PaginationLink href="#">1</PaginationLink>
//                 </PaginationItem>
//                 <PaginationItem>
//                   <PaginationEllipsis />
//                 </PaginationItem>
//                 <PaginationItem>
//                   <PaginationNext href="#" />
//                 </PaginationItem>
//               </PaginationContent>
//             </Pagination>
//             </div>

//           </div>
//         </TabsContent>

//         <TabsContent value="comments" className="space-y-4">
//           <div className="bg-gray-800 p-4 rounded-lg">
//             <h3 className="text-lg font-semibold mb-4">Comments</h3>

//             <CommentForm
//               novelSlug={novel.slug}
//               onCommentSubmit={handleCommentSubmit}
//             />

//             <div className="space-y-4">
//               {comments.length > 0 ? (
//                 comments.map((comment) => (
//                   <div key={comment.id} className="bg-gray-700 p-3 rounded-md">
//                     <div className="flex justify-between items-center mb-2">
//                       <span className="font-medium text-blue-400">
//                         {comment.user}
//                       </span>
//                       <span className="text-gray-400 text-sm">
//                         {typeof comment.createdAt === "string" &&
//                         comment.createdAt.includes("T")
//                           ? new Date(comment.createdAt).toLocaleDateString()
//                           : comment.createdAt}
//                       </span>
//                     </div>
//                     <p className="text-gray-300">{comment.text}</p>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-gray-400 text-center">
//                   No comments yet. Be the first to comment!
//                 </p>
//               )}
//             </div>
//           </div>
//         </TabsContent>
//       </Tabs>

//       {/* Similar Novels Section */}
//       <div className="bg-gray-800 p-4 rounded-lg">
//         <h3 className="text-lg font-semibold mb-4">Similar Novels</h3>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {mockNovels
//             .filter(
//               (n) =>
//                 n.slug !== novel.slug &&
//                 n.categories.some((g) => novel.categories.includes(g))
//             )
//             .slice(0, 4)
//             .map((similarNovel) => (
//               <Link
//                 key={similarNovel.slug}
//                 href={`/novels/${similarNovel.slug}`}
//               >
//                 <div className="bg-gray-700 rounded-md overflow-hidden hover:bg-gray-600 transition-colors">
//                   <div className="relative w-full h-48">
//                     <Image
//                       src={similarNovel.coverImage}
//                       alt={similarNovel.title}
//                       fill
//                       className="object-cover"
//                       sizes="(max-width: 768px) 100vw, 200px"
//                     />
//                   </div>
//                   <div className="p-3">
//                     <h4 className="font-medium text-blue-400 line-clamp-1">
//                       {similarNovel.title}
//                     </h4>
//                     <p className="text-sm text-gray-400">
//                       {similarNovel.author}
//                     </p>
//                     <div className="flex items-center mt-1">
//                       <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
//                       <span className="ml-1 text-xs text-gray-400">
//                         {similarNovel.rating.toFixed(1)} (
//                         {similarNovel.totalRatings})
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  BookOpen,
  Heart,
  Share2,
  Bookmark,
  ChevronRight,
  MessageSquare,
  User,
  Calendar,
  Eye,
  ThumbsUp,
  SortAsc,
  SortDesc,
  Grid,
  List as ListIcon,
} from "lucide-react";
import { Badge } from "../../components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
// import { PaginationWithLinks } from "../../components/ui/pagination"
import { cn } from "../../lib/utils";
import { useParams, useSearchParams } from "next/navigation";
import { PaginationWithLinks } from "@/app/components/components/pagination";
import { allChapters, allNovels } from "@/app/lib/mock-data";

interface NovelDetailPageProps {
  params: {
    slug: string;
  };
  searchParams?: {
    page?: string;
    pageSize?: string;
    sort?: string;
    view?: string;
  };
}

export default function NovelDetailPage({}: // params,
// searchParams = { page: "1", pageSize: "20", sort: "newest", view: "list" }
NovelDetailPageProps) {
  const [activeTab, setActiveTab] = useState("chapters");
  const [isFollowing, setIsFollowing] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const params = useParams();
  const searchParams = useSearchParams();
  // const tag = decodeURIComponent(Array.isArray(rawTag) ? rawTag[0] : rawTag ?? "")

  const page = parseInt(searchParams.get("page") ?? "1", 10);

  const pageSize = parseInt(searchParams.get("pageSize") ?? "10", 10);

  const sort = searchParams.get("sort") ?? "popular";

  const view = searchParams.get("view") ?? "list";

  // Find novel by slug
  const novel = allNovels.find((novel) => novel.slug === params.slug);

  if (!novel) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-white">Novel not found</h1>
        <p className="mt-2 text-gray-400">
          The novel you&#39;re looking for doesn&#39;t exist or has been
          removed.
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

  // Get chapters for this novel
  const novelChapters = allChapters.filter(
    (chapter) => chapter.novelSlug === novel.slug
  );

  // Sort chapters based on sort parameter
  const sortedChapters = [...novelChapters].sort((a, b) => {
    if (sort === "newest") return b.number - a.number;
    if (sort === "oldest") return a.number - b.number;
    return 0;
  });

  // Paginate chapters
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedChapters = sortedChapters.slice(start, end);

  // Get related novels (same categories)
  const relatedNovels = allNovels
    .filter(
      (n) =>
        n.slug !== novel.slug &&
        n.categories.some((category) => novel.categories.includes(category))
    )
    .slice(0, 20);

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex items-center text-sm text-gray-400">
            <Link href="/" className="hover:text-emerald-400">
              Home
            </Link>
            <ChevronRight className="mx-2 h-4 w-4" />
            <Link href="/browse" className="hover:text-emerald-400">
              Browse
            </Link>
            <ChevronRight className="mx-2 h-4 w-4" />
            <span className="text-emerald-400">{novel.title}</span>
          </nav>
        </div>

        {/* Novel Header */}
        <div className="relative mb-8 overflow-hidden rounded-xl bg-gradient-to-br from-gray-800/90 to-gray-900 p-6 shadow-xl">
          <div className="absolute inset-0 overflow-hidden opacity-10">
            <Image
              src={novel.coverImage}
              alt={novel.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="relative z-10 flex flex-col gap-6 md:flex-row">
            {/* Cover Image */}
            <div className="relative mx-auto w-48 md:mx-0 md:w-56 flex-shrink-0">
              <div className="aspect-[3/4] overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={novel.coverImage}
                  alt={novel.title}
                  width={224}
                  height={336}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>

              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-gray-800 px-3 py-1 text-sm font-medium text-white shadow-md">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{novel.rating.toFixed(1)}</span>
                  <span className="text-gray-300">({novel.totalRatings})</span>
                </div>
              </div>
            </div>

            {/* Novel Info */}
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-3xl font-bold text-white md:text-4xl">
                  {novel.title}
                </h1>
                <div className="mt-2 flex items-center gap-3">
                  <div className="flex items-center gap-1 text-sm text-gray-300">
                    <User className="h-4 w-4 text-emerald-400" />
                    <span>{novel.author}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-300">
                    <BookOpen className="h-4 w-4 text-emerald-400" />
                    <span>{novel.chapterCount} chapters</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-300">
                    <Eye className="h-4 w-4 text-emerald-400" />
                    <span>{novel.views.toLocaleString()} views</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {novel.categories.map((category) => (
                  <Link href={`/tags/${category.toLowerCase()}`} key={category}>
                    <Badge
                      variant="outline"
                      className="bg-gray-700/50 text-xs text-emerald-300 border-emerald-500/20 hover:bg-emerald-900/20"
                    >
                      {category}
                    </Badge>
                  </Link>
                ))}
              </div>

              <p className="text-gray-300">{novel.description}</p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/novels/${novel.slug}/chapters/${
                    novelChapters[0]?.number || 1
                  }`}
                  className="rounded-full bg-emerald-500 px-6 py-2 text-sm font-medium text-white hover:bg-emerald-600"
                >
                  Start Reading
                </Link>
                <Link
                  href={`/novels/${novel.slug}/chapters/${
                    novelChapters[novelChapters.length - 1]?.number || 1
                  }`}
                  className="rounded-full bg-gray-700 px-6 py-2 text-sm font-medium text-white hover:bg-gray-600"
                >
                  Latest Chapter
                </Link>
                <button
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={cn(
                    "flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium",
                    isFollowing
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-gray-700 text-white hover:bg-gray-600"
                  )}
                >
                  <Heart
                    className={cn("h-4 w-4", isFollowing && "fill-emerald-400")}
                  />
                  <span>{isFollowing ? "Following" : "Follow"}</span>
                </button>
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={cn(
                    "flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium",
                    isBookmarked
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-gray-700 text-white hover:bg-gray-600"
                  )}
                >
                  <Bookmark
                    className={cn(
                      "h-4 w-4",
                      isBookmarked && "fill-emerald-400"
                    )}
                  />
                  <span>{isBookmarked ? "Bookmarked" : "Bookmark"}</span>
                </button>
                <button className="flex items-center gap-1 rounded-full bg-gray-700 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600">
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Novel Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="mb-6 w-full justify-start border-b border-gray-800 bg-transparent p-0">
            <TabsTrigger
              value="chapters"
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-emerald-500 data-[state=active]:bg-transparent"
            >
              Chapters
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-emerald-500 data-[state=active]:bg-transparent"
            >
              Reviews
            </TabsTrigger>
            <TabsTrigger
              value="similar"
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-emerald-500 data-[state=active]:bg-transparent"
            >
              Similar Novels
            </TabsTrigger>
          </TabsList>

          {/* Chapters Tab */}
          <TabsContent value="chapters" className="mt-0">
            <div className="rounded-xl bg-gray-800/50 p-3 backdrop-blur-sm">
              <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-xl font-bold text-white">
                  All Chapters
                  <span className="ml-2 text-sm font-normal text-gray-400">
                    ({novelChapters.length})
                  </span>
                </h2>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 rounded-lg bg-gray-700 p-1">
                    <Link
                      href={`/novels/${novel.slug}?sort=newest&view=${view}`}
                      className={cn(
                        "rounded-md px-3 py-1 text-sm",
                        sort === "newest"
                          ? "bg-gray-600 text-white"
                          : "text-gray-300 hover:bg-gray-600/50"
                      )}
                    >
                      <SortDesc className="mr-1 h-3 w-3 inline" />
                      Newest
                    </Link>
                    <Link
                      href={`/novels/${novel.slug}?sort=oldest&view=${view}`}
                      className={cn(
                        "rounded-md px-3 py-1 text-sm",
                        sort === "oldest"
                          ? "bg-gray-600 text-white"
                          : "text-gray-300 hover:bg-gray-600/50"
                      )}
                    >
                      <SortAsc className="mr-1 h-3 w-3 inline" />
                      Oldest
                    </Link>
                  </div>

                  <div className="flex items-center gap-1 rounded-lg bg-gray-700 p-1">
                    <Link
                      href={`/novels/${novel.slug}?sort=${sort}&view=list`}
                      className={cn(
                        "rounded-md p-1.5",
                        view === "list"
                          ? "bg-gray-600 text-white"
                          : "text-gray-300 hover:bg-gray-600/50"
                      )}
                    >
                      <ListIcon className="h-4 w-4" />
                    </Link>
                    <Link
                      href={`/novels/${novel.slug}?sort=${sort}&view=grid`}
                      className={cn(
                        "rounded-md p-1.5",
                        view === "grid"
                          ? "bg-gray-600 text-white"
                          : "text-gray-300 hover:bg-gray-600/50"
                      )}
                    >
                      <Grid className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Chapters List */}
              <div
                className={cn(
                  "mb-6",
                  view === "grid"
                    ? "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
                    : "space-y-3"
                )}
              >
                {paginatedChapters.map((chapter) => (
                  <Link
                    key={chapter.id}
                    href={`/novels/${novel.slug}/chapters/${chapter.number}`}
                    className={cn(
                      "group block",
                      view === "grid"
                        ? "rounded-lg bg-gray-700/50 p-4 hover:bg-gray-700"
                        : "rounded-lg bg-gray-700/50 p-3 hover:bg-gray-700"
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-center justify-between",
                        view === "grid" && "flex-col gap-2 text-center"
                      )}
                    >
                      <div
                        className={cn(view === "grid" ? "space-y-1" : "flex-1")}
                      >
                        <h3 className="font-medium text-emerald-400 group-hover:text-emerald-300">
                          {view === "grid" ? (
                            <>Chapter {chapter.number}</>
                          ) : (
                            <>
                              Chapter {chapter.number}: {chapter.title}
                            </>
                          )}
                        </h3>

                        {view === "grid" && (
                          <p className="text-sm text-gray-300 line-clamp-1">
                            {chapter.title}
                          </p>
                        )}

                        <div
                          className={cn(
                            "flex items-center gap-3 text-xs text-gray-400",
                            view === "grid" && "justify-center"
                          )}
                        >
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{chapter.releaseDate}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            <span>{chapter.views.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      {view === "list" && (
                        <div className="ml-4 flex items-center gap-2">
                          {chapter.isNew && (
                            <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-medium text-emerald-400">
                              NEW
                            </span>
                          )}
                          <ChevronRight className="h-5 w-5 text-gray-500 group-hover:text-emerald-400" />
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              <PaginationWithLinks
                pageSearchParam="page"
                pageSizeSelectOptions={{
                  pageSizeSearchParam: "pageSize",
                  pageSizeOptions: [10, 20, 50, 100],
                }}
                page={page}
                pageSize={pageSize}
                totalCount={novelChapters.length}
              />
            </div>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="mt-0">
            <div className="rounded-xl bg-gray-800/50 p-6 backdrop-blur-sm">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start">
                {/* Rating Summary */}
                <div className="flex flex-col items-center rounded-lg bg-gray-800 p-4 sm:w-64">
                  <div className="text-5xl font-bold text-white">
                    {novel.rating.toFixed(1)}
                  </div>
                  <div className="mb-4 flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={cn(
                          "h-5 w-5",
                          star <= Math.round(novel.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-600"
                        )}
                      />
                    ))}
                  </div>
                  <div className="text-sm text-gray-400">
                    {novel.totalRatings} ratings
                  </div>

                  <div className="mt-4 w-full space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-gray-400">
                            {rating}
                          </span>
                        </div>
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-700">
                          <div
                            className="h-full bg-yellow-400"
                            style={{
                              width: `${Math.round(
                                (novel.ratingDistribution[
                                  rating as keyof typeof novel.ratingDistribution
                                ] /
                                  novel.totalRatings) *
                                  100
                              )}%%`,
                            }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-400">
                          {Math.round(
                            (novel.ratingDistribution[
                              rating as keyof typeof novel.ratingDistribution
                            ] /
                              novel.totalRatings) *
                              100
                          )}
                          %
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="mt-4 w-full rounded-full bg-emerald-500 py-2 text-sm font-medium text-white hover:bg-emerald-600">
                    Write a Review
                  </button>
                </div>

                {/* Reviews List */}
                <div className="flex-1 space-y-4">
                  {novel.reviews.length > 0 ? (
                    novel.reviews.map((review) => (
                      <div
                        key={review.id}
                        className="rounded-lg bg-gray-800 p-4"
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-gray-700">
                              <User className="h-8 w-8 p-1.5 text-gray-400" />
                            </div>
                            <div>
                              <div className="font-medium text-white">
                                {review.username}
                              </div>
                              <div className="text-xs text-gray-400">
                                {review.date}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={cn(
                                  "h-4 w-4",
                                  star <= review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-600"
                                )}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-300">
                          {review.content}
                        </p>
                        <div className="mt-3 flex items-center gap-4 text-xs text-gray-400">
                          <button className="flex items-center gap-1 hover:text-emerald-400">
                            <ThumbsUp className="h-3.5 w-3.5" />
                            <span>Helpful ({review.likes})</span>
                          </button>
                          <button className="flex items-center gap-1 hover:text-emerald-400">
                            <MessageSquare className="h-3.5 w-3.5" />
                            <span>Reply</span>
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center rounded-lg bg-gray-800 p-8 text-center">
                      <MessageSquare className="h-12 w-12 text-gray-600" />
                      <h3 className="mt-2 text-lg font-medium text-white">
                        No reviews yet
                      </h3>
                      <p className="mt-1 text-gray-400">
                        Be the first to review this novel
                      </p>
                      <button className="mt-4 rounded-full bg-emerald-500 px-6 py-2 text-sm font-medium text-white hover:bg-emerald-600">
                        Write a Review
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Similar Novels Tab */}
          <TabsContent value="similar" className="mt-0">
            <div className="rounded-xl bg-gray-800/50 p-6 backdrop-blur-sm">
              <h2 className="mb-4 text-xl font-bold text-white">
                Similar Novels
              </h2>

              <div className="grid grid-cols-2 gap-6 sm:grid-cols-5">
                {relatedNovels.map((relatedNovel) => (
                  <Link
                    key={relatedNovel.id}
                    href={`/novels/${relatedNovel.slug}`}
                    className="group block"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                      <Image
                        src={relatedNovel.coverImage}
                        alt={relatedNovel.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <h3 className="font-medium text-white line-clamp-2 group-hover:text-emerald-400">
                          {relatedNovel.title}
                        </h3>
                        <p className="text-sm text-gray-300">
                          {relatedNovel.author}
                        </p>
                        <div className="mt-1 flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-white">
                            {relatedNovel.rating.toFixed(1)}
                          </span>
                          <span className="text-xs text-gray-400">
                            ({relatedNovel.totalRatings})
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-6 text-center">
                <Link
                  href={`/tags/${novel.categories[0].toLowerCase()}`}
                  className="inline-block rounded-full bg-gray-700 px-6 py-2 text-sm font-medium text-white hover:bg-gray-600"
                >
                  View More {novel.categories[0]} Novels
                </Link>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Extended mock data for a single novel

// Mock data for chapters


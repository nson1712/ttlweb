"use client";

import { useEffect } from "react";
import { BookmarkButton } from "../../components/novels/bookmark-button";
import { CommentForm } from "../../components/novels/comment-form";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { StarIcon } from "lucide-react";
import { mockNovels } from "../../lib/mock-data";
// import { Novel } from "../../lib/types";
import { useAuth } from "../../lib/auth-context";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/app/components/ui/pagination";

// Define the Chapter type
interface Chapter {
  slug: string;
  title: string;
  order: number;
  createdAt: string;
}

// Mock chapters data
const mockChapters: Chapter[] = [
  {
    slug: "ch1",
    title: "Chapter 1: The Beginning",
    order: 1,
    createdAt: "2023-01-01",
  },
  {
    slug: "ch2",
    title: "Chapter 2: The Journey",
    order: 2,
    createdAt: "2023-01-05",
  },
  {
    slug: "ch3",
    title: "Chapter 3: The Challenge",
    order: 3,
    createdAt: "2023-01-10",
  },
  {
    slug: "ch4",
    title: "Chapter 4: The Revelation",
    order: 4,
    createdAt: "2023-01-15",
  },
  {
    slug: "ch5",
    title: "Chapter 5: The Confrontation",
    order: 5,
    createdAt: "2023-01-20",
  },
  {
    slug: "ch6",
    title: "Chapter 6: The Resolution",
    order: 6,
    createdAt: "2023-01-25",
  },
  {
    slug: "ch7",
    title: "Chapter 7: The New Beginning",
    order: 7,
    createdAt: "2023-01-30",
  },
  {
    slug: "ch8",
    title: "Chapter 8: The Adventure Continues",
    order: 8,
    createdAt: "2023-02-05",
  },
  {
    slug: "ch9",
    title: "Chapter 9: The Unexpected Turn",
    order: 9,
    createdAt: "2023-02-10",
  },
  {
    slug: "ch10",
    title: "Chapter 10: The Final Battle",
    order: 10,
    createdAt: "2023-02-15",
  },
];

// Mock comments data
const mockComments = [
  {
    id: "c1",
    user: "HarweeS",
    text: "Not Ruby being treated like a Pokemon lmao...",
    createdAt: "2023-02-20",
    novelSlug: "madman-family",
  },
  {
    id: "c2",
    user: "Lost from sight",
    text: "I wonder what sort of enchantements this charm will have.....",
    createdAt: "2023-02-18",
    novelSlug: "madman-family",
  },
  {
    id: "c3",
    user: "vbolneo",
    text: "6000y+ 339ch still stock in golden core I don't really...",
    createdAt: "2023-02-15",
    novelSlug: "madman-family",
  },
  {
    id: "c4",
    user: "here4mysteries",
    text: "And Thales is one who repays favors manifold. Of course....",
    createdAt: "2023-02-12",
    novelSlug: "madman-family",
  },
];

export default function NovelDetailPage() {
  const params = useParams();
  const novelSlug = params.slug as string;
  const { isLoggedIn, user } = useAuth();

  // Find the novel from mock data
  const novel = mockNovels.find((n) => n.slug === novelSlug) || mockNovels[0];

  const [activeTab, setActiveTab] = useState("info");
  console.log("ACTIVE TAB", activeTab);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [comments, setComments] = useState(mockComments);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [chapters, setChapters] = useState<Chapter[]>([...mockChapters].sort((a, b) => b.order - a.order));

  // Load comments from localStorage if available
  useEffect(() => {
    const storedComments = localStorage.getItem("comments");
    if (storedComments) {
      try {
        const parsedComments = JSON.parse(storedComments);
        interface Comment {
          id: string;
          user: string;
          text: string;
          createdAt: string;
          novelSlug: string;
        }

        const novelComments = parsedComments.filter(
          (comment: Comment) => comment.novelSlug === novelSlug
        );
        if (novelComments.length > 0) {
          setComments([...mockComments, ...novelComments]);
        }
      } catch (error) {
        console.error("Failed to parse comments:", error);
      }
    }
  }, [novelSlug]);

  const sortAsc = () => {
    setSortOrder("oldest")
    setChapters((prev: Chapter[]) => [...prev].sort((a, b) => a.order - b.order));
  };

  const sortDesc = () => {
    setSortOrder("newest")
    setChapters((prev: Chapter[]) => [...prev].sort((a, b) => b.order - a.order));
  };

  // Handle rating click
  const handleRatingClick = (rating: number) => {
    if (!isLoggedIn) {
      // Show login dialog or redirect to login
      return;
    }
    setUserRating(rating);
  };

  // Handle new comment submission
  const handleCommentSubmit = (commentText: string) => {
    if (!isLoggedIn || !user) return;

    const newComment = {
      id: `c${comments.length + 1}`,
      user: user.username || "Anonymous",
      text: commentText,
      createdAt: new Date().toISOString(),
      novelSlug: novelSlug,
    };

    setComments([...comments, newComment]);
  };

  return (
    <div className="space-y-8">
      {/* Novel Header */}
      <div className="flex flex-col md:flex-row gap-6 bg-gray-800 p-6 rounded-lg">
        <div className="relative w-full md:w-64 h-80 flex-shrink-0">
          <Image
            src={novel.coverImage}
            alt={novel.title}
            fill
            className="object-cover rounded-md"
            sizes="(max-width: 768px) 100vw, 256px"
          />
        </div>

        <div className="flex-1 flex flex-col">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-400">
            {novel.title}
          </h1>
          <p className="text-gray-400 mt-1">{novel.author}</p>

          <div className="flex items-center mt-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-5 h-5 ${
                    star <= Math.round(novel.rating)
                      ? "text-yellow-400"
                      : "text-gray-600"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-2 text-gray-400">
              {novel.rating.toFixed(1)} / 5 from {novel.totalRatings} ratings
            </span>
          </div>

          <div className="flex flex-wrap gap-2 my-4">
            {novel.categories.map((cate) => (
              <Badge key={cate} variant="secondary" className="bg-gray-700">
                {cate}
              </Badge>
            ))}
          </div>

          <p className="text-gray-300 mt-2 max-h-44 overflow-y-auto">
            {novel.description}
          </p>

          <div className="mt-auto pt-4 flex flex-wrap gap-3">
            <Link href={`/novels/${novel.slug}/chapters`}>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Start Reading
              </Button>
            </Link>

            <BookmarkButton novelSlug={novel.slug} novelTitle={novel.title} />
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="chapters" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="info" onClick={() => setActiveTab("info")}>
            Information
          </TabsTrigger>
          <TabsTrigger
            value="chapters"
            onClick={() => setActiveTab("chapters")}
          >
            Chapters ({mockChapters.length})
          </TabsTrigger>
          <TabsTrigger
            value="comments"
            onClick={() => setActiveTab("comments")}
          >
            Comments ({comments.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Novel Information</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Status:</span>
                  <span className="text-gray-200 capitalize">
                    {novel.status || "Ongoing"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Language:</span>
                  <span className="text-gray-200">
                    {novel.language || "English"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Year of Release:</span>
                  <span className="text-gray-200">
                    {novel.yearOfRelease || "Unknown"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Chapters:</span>
                  <span className="text-gray-200">
                    {novel.chapterCount || mockChapters.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Last Updated:</span>
                  <span className="text-gray-200">
                    {novel.updatedAt || "Recently"}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Rate this Novel</h3>
              <div className="flex items-center space-x-1 mb-4">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => handleRatingClick(rating)}
                    className="focus:outline-none"
                    disabled={!isLoggedIn}
                  >
                    <StarIcon
                      className={`w-8 h-8 ${
                        userRating && rating <= userRating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-600"
                      }`}
                    />
                  </button>
                ))}
              </div>
              {userRating ? (
                <p className="text-gray-300">
                  You rated this novel {userRating} out of 5 stars.
                </p>
              ) : isLoggedIn ? (
                <p className="text-gray-400">
                  Click on a star to rate this novel.
                </p>
              ) : (
                <p className="text-gray-400">
                  Please{" "}
                  <Link href="/login" className="text-blue-400 hover:underline">
                    login
                  </Link>{" "}
                  to rate this novel.
                </p>
              )}
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {novel.tags?.map((tag) => (
                <Badge key={tag} variant="outline" className="bg-gray-700">
                  {tag}
                </Badge>
              )) || (
                <p className="text-gray-400">
                  No tags available for this novel.
                </p>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="chapters" className="space-y-4">
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">All Chapters</h3>
              <div className="flex gap-2">
                <Button
                  className={
                    sortOrder === "newest"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-700 text-gray-300"
                  }
                  size="sm"
                  onClick={sortDesc}
                >
                  Newest First
                </Button>
                <Button
                  className={
                    sortOrder === "oldest"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-700 text-gray-300"
                  }
                  size="sm"
                  onClick={sortAsc}
                >
                  Oldest First
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              {chapters.map((chapter) => (
                <Link
                  key={chapter.slug}
                  href={`/novels/${novel.slug}/chapters/${chapter.slug}`}
                  className="block bg-gray-700 hover:bg-gray-600 p-3 rounded-md transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-blue-400 hover:text-blue-300">
                      {chapter.title}
                    </span>
                    <span className="text-gray-400 text-sm">
                      {chapter.createdAt}
                    </span>
                  </div>
                </Link>
              ))}
               <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
            </div>
            
           
          </div>
        </TabsContent>

        <TabsContent value="comments" className="space-y-4">
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Comments</h3>

            <CommentForm
              novelSlug={novel.slug}
              onCommentSubmit={handleCommentSubmit}
            />

            <div className="space-y-4">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment.id} className="bg-gray-700 p-3 rounded-md">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-blue-400">
                        {comment.user}
                      </span>
                      <span className="text-gray-400 text-sm">
                        {typeof comment.createdAt === "string" &&
                        comment.createdAt.includes("T")
                          ? new Date(comment.createdAt).toLocaleDateString()
                          : comment.createdAt}
                      </span>
                    </div>
                    <p className="text-gray-300">{comment.text}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-center">
                  No comments yet. Be the first to comment!
                </p>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Similar Novels Section */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Similar Novels</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mockNovels
            .filter(
              (n) =>
                n.slug !== novel.slug &&
                n.categories.some((g) => novel.categories.includes(g))
            )
            .slice(0, 4)
            .map((similarNovel) => (
              <Link
                key={similarNovel.slug}
                href={`/novels/${similarNovel.slug}`}
              >
                <div className="bg-gray-700 rounded-md overflow-hidden hover:bg-gray-600 transition-colors">
                  <div className="relative w-full h-48">
                    <Image
                      src={similarNovel.coverImage}
                      alt={similarNovel.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 200px"
                    />
                  </div>
                  <div className="p-3">
                    <h4 className="font-medium text-blue-400 line-clamp-1">
                      {similarNovel.title}
                    </h4>
                    <p className="text-sm text-gray-400">
                      {similarNovel.author}
                    </p>
                    <div className="flex items-center mt-1">
                      <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-xs text-gray-400">
                        {similarNovel.rating.toFixed(1)} (
                        {similarNovel.totalRatings})
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useAuth } from "../../lib/auth-context";
import { BookmarkIcon } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  // DialogTrigger,
} from "../../components/ui/dialog";

interface BookmarkButtonProps {
  novelSlug: string;
  novelTitle: string;
}

export function BookmarkButton({ novelSlug, novelTitle }: BookmarkButtonProps) {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  // In a real app, we would check if the novel is already bookmarked
  // For now, we'll just use local state

  const toggleBookmark = () => {
    if (!isLoggedIn) {
      setShowLoginDialog(true);
      return;
    }

    // In a real app, we would make an API call to add/remove bookmark
    setIsBookmarked(!isBookmarked);
    
    // Mock saving to localStorage for demo purposes
    interface Bookmark {
      id: string;
      title: string;
      date: string;
    }

    const bookmarks: Bookmark[] = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    
    if (isBookmarked) {
      // Remove bookmark
      const updatedBookmarks = bookmarks.filter((bookmark: Bookmark) => bookmark.id !== novelSlug);
      localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
    } else {
      // Add bookmark
      bookmarks.push({ id: novelSlug, title: novelTitle, date: new Date().toISOString() });
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }
  };

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  return (
    <>
      <Button 
        className={isBookmarked ? "bg-green-400" : "bg-slate-600"}
        onClick={toggleBookmark}
      >
        <BookmarkIcon className="h-4 w-4 mr-2" />
        {isBookmarked ? "Bookmarked" : "Bookmark"}
      </Button>

      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="bg-gray-800 text-white border-gray-700">
          <DialogHeader>
            <DialogTitle>Login Required</DialogTitle>
            <DialogDescription className="text-gray-400">
              You need to be logged in to bookmark novels.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2 mt-4">
            <Button className="bg-red-500 hover:bg-red-600" onClick={() => setShowLoginDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-slate-600 hover:bg-slate-700" onClick={handleLoginRedirect}>
              Login
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

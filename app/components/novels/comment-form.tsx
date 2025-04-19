"use client";

import { useState } from "react";
import { useAuth } from "../../lib/auth-context";
import { Button } from "../../components/ui/button";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";

interface CommentFormProps {
  novelSlug: string;
  chapterId?: string;
  onCommentSubmit?: (comment: string) => void;
}

export function CommentForm({ novelSlug, chapterId, onCommentSubmit }: CommentFormProps) {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const [comment, setComment] = useState("");
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLoggedIn) {
      setShowLoginDialog(true);
      return;
    }

    if (!comment.trim()) {
      return;
    }

    setIsSubmitting(true);

    // In a real app, we would make an API call to submit the comment
    // For now, we'll just simulate a successful submission
    setTimeout(() => {
      if (onCommentSubmit) {
        onCommentSubmit(comment);
      }
      
      // Mock saving to localStorage for demo purposes
      const comments = JSON.parse(localStorage.getItem("comments") || "[]");
      comments.push({
        id: `comment-${Date.now()}`,
        novelSlug,
        chapterId,
        text: comment,
        user: JSON.parse(localStorage.getItem("user") || "{}")?.username || "Anonymous",
        createdAt: new Date().toISOString()
      });
      localStorage.setItem("comments", JSON.stringify(comments));
      
      setComment("");
      setIsSubmitting(false);
    }, 500);
  };

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          placeholder="Add your comment..."
          className="w-full bg-gray-700 text-white border-gray-600 rounded-md p-3 min-h-24"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          disabled={isSubmitting}
        ></textarea>
        <div className="flex justify-end mt-2">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Posting..." : "Post Comment"}
          </Button>
        </div>
      </form>

      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="bg-gray-800 text-white border-gray-700">
          <DialogHeader>
            <DialogTitle>Login Required</DialogTitle>
            <DialogDescription className="text-gray-400">
              You need to be logged in to post comments.
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

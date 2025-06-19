"use client";
import { SettingsContext, Theme } from "@/app/context/setting-context";
import { cn } from "@/app/lib/utils";
import { StoryType } from "@/app/types/story";
import { Star } from "lucide-react";
import { FC, useContext } from "react";

type StoryDetailRateProps = {
  storyDetails: StoryType;
};
export const StoryDetailRate: FC<StoryDetailRateProps> = ({ storyDetails }) => {
  const { theme } = useContext(SettingsContext);

  const wrapperBg: Record<Theme, string> = {
    light: "bg-white/80",
    dark: "bg-gray-800/50",
    sepia: "bg-[#f8f1e3]/80",
  };

  const summaryBg: Record<Theme, string> = {
    light: "bg-white p-4",
    dark: "bg-gray-900 p-4",
    sepia: "bg-[#bfae8c]/50 p-4",
  };

  const panelBg: Record<Theme, string> = {
    light: "bg-gray-100 p-4",
    dark: "bg-gray-800 p-4",
    sepia: "bg-[#efe2c7] p-4",
  };

  const starRange: Record<Theme, string> = {
    light: "bg-gray-100",
    dark: "bg-gray-800",
    sepia: "bg-[#efe2c7]",
  };

  const titleColor: Record<Theme, string> = {
    light: "text-gray-900",
    dark: "text-white",
    sepia: "text-[#5f4b32]",
  };

  const starFilled: Record<Theme, string> = {
    light: "fill-yellow-500 text-yellow-500",
    dark: "fill-yellow-400 text-yellow-400",
    sepia: "fill-yellow-400 text-yellow-400",
  };

  const starEmpty: Record<Theme, string> = {
    light: "text-gray-300",
    dark: "text-gray-600",
    sepia: "text-[#bfae8c]",
  };

  const rateRounded = Math.round(storyDetails.rate);
  return (
    <div className={cn("rounded-xl p-6 mb-6", wrapperBg[theme ?? "dark"])}>
      <div className={cn("rounded-lg", panelBg[theme ?? "dark"])}>
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start">
        {/* Rating Summary */}
        <div className={cn(
              "flex flex-col items-center rounded-lg sm:w-64",
              summaryBg[theme ?? "dark"]
            )}>
          <div className={cn("text-5xl font-bold mb-2", titleColor[theme ?? "dark"])}>
            {(storyDetails.rate ?? 0).toFixed(1)}
          </div>
          <div className="flex items-center gap-1 mb-2">
              {[1,2,3,4,5].map((n) => (
                <Star
                  key={n}
                  className={cn(
                    "h-5 w-5",
                    n <= rateRounded ? starFilled[theme ?? "dark"] : starEmpty[theme ?? "dark"]
                  )}
                />
              ))}
            </div>
          <div className="text-sm text-gray-400">
            {/* {storyDetails.totalRatings} ratings */}
          </div>

          <div className="mt-4 w-full space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-gray-400">{rating}</span>
                </div>
                <div className={cn("h-2 flex-1 overflow-hidden rounded-full ", starRange[theme ?? "dark"])}>
                  {/* <div
                            className="h-full bg-yellow-400"
                            style={{
                              width: `${Math.round(
                                (storyDetails.ratingDistribution[
                                  rating as keyof typeof storyDetails.ratingDistribution
                                ] /
                                  storyDetails.totalRatings) *
                                  100
                              )}%%`,
                            }}
                          ></div> */}
                </div>
                {/* <div className="text-xs text-gray-400">
                          {Math.round(
                            (storyDetails.ratingDistribution[
                              rating as keyof typeof storyDetails.ratingDistribution
                            ] /
                              storyDetails.totalRatings) *
                              100
                          )}
                          %
                        </div> */}
              </div>
            ))}
          </div>

          <button className="mt-4 w-full rounded-full bg-emerald-500 py-2 text-sm font-medium text-white hover:bg-emerald-600">
            Viết đánh giá
          </button>
        </div>

        {/* Reviews List */}
        {/* <div className="flex-1 space-y-4">
                  {storyDetails.reviews.length > 0 ? (
                    storyDetails.reviews.map((review) => (
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
                </div> */}
      </div>
      </div>
    </div>
  );
};

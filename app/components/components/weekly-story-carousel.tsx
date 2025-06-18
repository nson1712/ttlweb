"use client";

import * as React from "react";
import autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../../components/ui/carousel";
import { WeeklyStory } from "../../components/components/weekly-story";
import { StoryType } from "../../types/story";

interface WeeklyStoryCarouselProps {
  weeklyStories: StoryType[];
}

export function WeeklyStoryCarousel({
  weeklyStories,
}: WeeklyStoryCarouselProps) {
  if (!weeklyStories?.length) return null;

  return (
    <Carousel
      opts={{ loop: true, duration: 50 }}
      plugins={[autoplay({ delay: 4000, stopOnInteraction: false, stopOnFocusIn: true  })]}
      className="relative cursor-grabbing"
    >
      <CarouselPrevious />
      <CarouselNext />

      <CarouselContent className="flex">
        {weeklyStories.map((story) => (
          <CarouselItem key={story.id}>
            <WeeklyStory weeklyStory={story} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

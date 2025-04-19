"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "../../../../components/ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  BookmarkIcon,
  HomeIcon,
  ListIcon,
} from "lucide-react";
import { mockNovels } from "../../../../lib/mock-data";

// Mock chapter content
const mockChapterContent = `
<h1>Chapter 1: The Beginning</h1>

<p>The cold wind howled through the narrow streets of Lawless City, carrying with it the scent of impending rain and the whispers of countless secrets. Solver Keter pulled his worn cloak tighter around his shoulders, his eyes scanning the shadows with practiced wariness. He was one of the Five Lunatics, feared and respected in equal measure, but tonight he felt none of that power coursing through his veins.</p>

<p>Tonight, he felt only the bitter sting of failure.</p>

<p>"If I regressed and couldn't even save my family, I might as well go kill myself," he muttered, the words tasting like ash on his tongue.</p>

<p>The regression had been unexpected—a cosmic joke perhaps, or the universe's way of offering redemption. One moment he had been standing at the pinnacle of his power, the next he was thrust back into the body of his younger self, the illegitimate son of a doomed archery family.</p>

<p>His family. The thought sent a pang of grief through his chest. In his previous life, he had been too late to save them, too weak to protect them from the forces that sought their destruction. Now, armed with the knowledge of what was to come, he had a second chance.</p>

<p>But was it truly a chance for redemption? Or merely an opportunity to witness their demise once more, this time with the cruel awareness of his own helplessness?</p>

<p>"For my family?" Solver laughed, a hollow sound that echoed in the empty alleyway. "No, for my freedom!"</p>

<p>He had made his decision. This time would be different. This time, he would harness the power he knew lay dormant within him, would rise faster and stronger than before. This time, he would rewrite the story—not just for his family, but for himself.</p>

<p>The first drops of rain began to fall, cold against his skin. Solver tilted his face upward, letting the water wash away the doubt and fear. In its place, determination took root, growing stronger with each passing moment.</p>

<p>He was Solver Keter, one of the Five Lunatics of Lawless City. And this time, he would not fail.</p>

<p>The manor loomed ahead, its windows dark save for a single light burning in the eastern wing. His father would be there, poring over ledgers and accounts, unaware of the forces gathering against their family. Unaware that his illegitimate son had returned from a future that would never come to pass.</p>

<p>Solver's hand moved to the hilt of his dagger, a reassuring weight against his hip. He had been weak before, hesitant and unsure. But no longer.</p>

<p>"Time to change destiny," he whispered, and stepped out of the shadows toward the manor gates.</p>

<p>The guards recognized him despite his late arrival, offering respectful nods as he passed. They did not see the difference in his eyes, the weight of years that had never happened, the knowledge of tragedies yet to unfold.</p>

<p>As he crossed the threshold into the manor, Solver felt a strange sensation wash over him—a tingling awareness that spread from his core to his fingertips. The power that had taken him years to develop in his previous life stirred within him, responding to his will far earlier than it should have.</p>

<p>A smile curved his lips. Perhaps regression had its advantages after all.</p>

<p>"Young master," a servant bowed as he entered, "your father has been asking for you."</p>

<p>"Has he now?" Solver replied, his voice carrying a confidence that made the servant look at him with surprise. "Then I shouldn't keep him waiting."</p>

<p>The path to his father's study was familiar, yet strange. The corridors seemed narrower than he remembered, the ceilings lower. Or perhaps it was simply that he had grown beyond this place, beyond the constraints of the life he had once lived.</p>

<p>He paused outside the heavy oak door, listening to the scratch of a quill against parchment from within. His father, always working, always striving to secure their family's position despite the stigma attached to his illegitimate son.</p>

<p>Solver's hand hovered over the door handle. In his previous life, he had entered this room countless times, head bowed, voice respectful, seeking approval he never quite received. But that was before. Before he had seen the fall of their family, before he had risen from the ashes to become one of the most feared men in Lawless City.</p>

<p>This time would be different.</p>

<p>He pushed open the door without knocking.</p>
`;

// Mock chapters data
const mockChapters = [
  {
    id: "ch1",
    slug: "ch1",
    title: "Chapter 1: The Beginning",
    number: 1,
    createdAt: "2023-01-01",
  },
  {
    id: "ch2",
    slug: "ch2",
    title: "Chapter 2: The Journey",
    number: 2,
    createdAt: "2023-01-05",
  },
  {
    id: "ch3",
    slug: "ch3",
    title: "Chapter 3: The Challenge",
    number: 3,
    createdAt: "2023-01-10",
  },
  {
    id: "ch4",
    slug: "ch4",
    title: "Chapter 4: The Revelation",
    number: 4,
    createdAt: "2023-01-15",
  },
  {
    id: "ch5",
    slug: "ch5",
    title: "Chapter 5: The Confrontation",
    number: 5,
    createdAt: "2023-01-20",
  },
  {
    id: "ch6",
    slug: "ch6",
    title: "Chapter 6: The Resolution",
    number: 6,
    createdAt: "2023-01-25",
  },
  {
    id: "ch7",
    slug: "ch7",
    title: "Chapter 7: The New Beginning",
    number: 7,
    createdAt: "2023-01-30",
  },
  {
    id: "ch8",
    slug: "ch8",
    title: "Chapter 8: The Adventure Continues",
    number: 8,
    createdAt: "2023-02-05",
  },
  {
    id: "ch9",
    slug: "ch9",
    title: "Chapter 9: The Unexpected Turn",
    number: 9,
    createdAt: "2023-02-10",
  },
  {
    id: "ch10",
    slug: "ch10",
    title: "Chapter 10: The Final Battle",
    number: 10,
    createdAt: "2023-02-15",
  },
];

export default function ReadChapterPage() {
  const params = useParams();
  const router = useRouter();
  const novelSlug = params.slug as string;
  const chapterSlug = (params.chapterSlug as string) || "ch1";

  // Find the novel from mock data
  interface LocalNovel {
    id: string;
    slug: string;
    title: string;
    author: string;
    description?: string;
    coverImage: string;
  }

  const novel: LocalNovel =
    mockNovels.find((n: LocalNovel) => n.slug === novelSlug) || mockNovels[0];

  // Find the current chapter
  const currentChapterIndex = mockChapters.findIndex(
    (ch) => ch.slug === chapterSlug
  );
  const currentChapter =
    currentChapterIndex >= 0
      ? mockChapters[currentChapterIndex]
      : mockChapters[0];

  // Determine previous and next chapters
  const prevChapter =
    currentChapterIndex > 0 ? mockChapters[currentChapterIndex - 1] : null;

  const nextChapter =
    currentChapterIndex < mockChapters.length - 1
      ? mockChapters[currentChapterIndex + 1]
      : null;

  const [fontSize, setFontSize] = useState(16);
  const [showChapterList, setShowChapterList] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Increase font size
  const increaseFontSize = () => {
    if (fontSize < 24) {
      setFontSize(fontSize + 2);
    }
  };

  // Decrease font size
  const decreaseFontSize = () => {
    if (fontSize > 12) {
      setFontSize(fontSize - 2);
    }
  };

  // Toggle bookmark
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  // Navigate to previous chapter
  const goToPrevChapter = () => {
    if (prevChapter) {
      router.push(`/novels/${novelSlug}/chapters/${prevChapter.slug}`);
    }
  };

  // Navigate to next chapter
  const goToNextChapter = () => {
    if (nextChapter) {
      router.push(`/novels/${novelSlug}/chapters/${nextChapter.slug}`);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && prevChapter) {
        goToPrevChapter();
      } else if (e.key === "ArrowRight" && nextChapter) {
        goToNextChapter();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevChapter, nextChapter]);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Reading Controls */}
      <div className="bg-gray-800 p-4 rounded-lg mb-6 sticky top-16 z-10">
        <div className="sm:flex items-center justify-between gap-2 space-y-2 sm:space-y-0">
          <div className="flex items-center gap-2">
            <Link href={`/novels/${novelSlug}`}>
              <Button className="bg-transparent sm:text-base" size="sm">
                <HomeIcon className="h-4 w-4 mr-1" />
                Novel Page
              </Button>
            </Link>

            <Button
              className="sm:text-base"
              size="sm"
              onClick={() => setShowChapterList(!showChapterList)}
            >
              <ListIcon className="h-4 w-4 mr-1" />
              Chapters
            </Button>

            <Button
              size="sm"
              className={`sm:text-base ${isBookmarked ? "bg-gray-700" : ""}`}
              onClick={toggleBookmark}
            >
              <BookmarkIcon className="h-4 w-4 mr-1" />
              {isBookmarked ? "Bookmarked" : "Bookmark"}
            </Button>
          </div>

          <div className="flex items-center gap-2 justify-center">
            <Button
              size="lg"
              onClick={decreaseFontSize}
              disabled={fontSize <= 12}
            >
              A-
            </Button>

            <span className="text-gray-300">{fontSize}</span>

            <Button
              size="lg"
              onClick={increaseFontSize}
              disabled={fontSize >= 24}
            >
              A+
            </Button>
          </div>
        </div>

        {/* Chapter List (Collapsible) */}
        {showChapterList && (
          <div className="mt-4 bg-gray-700 p-3 rounded-md max-h-96 overflow-y-auto">
            <h3 className="font-medium mb-2">Chapters</h3>
            <div className="space-y-1">
              {mockChapters.map((chapter) => (
                <Link
                  key={chapter.id}
                  href={`/novels/${novelSlug}/chapters/${chapter.id}`}
                  className={`block p-2 rounded ${
                    chapter.id === chapterSlug
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-600"
                  }`}
                >
                  {chapter.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Chapter Title */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-blue-400">{novel.title}</h1>
        <h2 className="text-xl mt-2">{currentChapter.title}</h2>
      </div>

      {/* Chapter Navigation - Top */}
      <div className="flex justify-between mb-6">
        <Button
          onClick={goToPrevChapter}
          variant="outline"
          disabled={!prevChapter}
        >
          <ChevronLeftIcon className="h-4 w-4 mr-1" />
          Previous Chapter
        </Button>

        <Button
          variant="outline"
          onClick={goToNextChapter}
          disabled={!nextChapter}
        >
          Next Chapter
          <ChevronRightIcon className="h-4 w-4 ml-1" />
        </Button>
      </div>

      {/* Chapter Content */}
      <div
        className="bg-gray-800 p-6 rounded-lg mb-6"
        style={{ fontSize: `${fontSize}px` }}
      >
        <div
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: mockChapterContent }}
        />
      </div>

      {/* Chapter Navigation - Bottom */}
      <div className="flex justify-between mb-6">
        <Button
          variant="outline"
          onClick={goToPrevChapter}
          disabled={!prevChapter}
        >
          <ChevronLeftIcon className="h-4 w-4 mr-1" />
          Previous Chapter
        </Button>

        <Button
          variant="outline"
          onClick={goToNextChapter}
          disabled={!nextChapter}
        >
          Next Chapter
          <ChevronRightIcon className="h-4 w-4 ml-1" />
        </Button>
      </div>

      {/* Comments Section */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Chapter Comments</h3>

        <div className="mb-6">
          <textarea
            placeholder="Add your comment..."
            className="w-full bg-gray-700 text-white border-gray-600 rounded-md p-3 min-h-24"
          ></textarea>
          <div className="flex justify-end mt-2">
            <Button variant="outline">Post Comment</Button>
          </div>
        </div>

        <p className="text-gray-400 text-center">
          No comments yet for this chapter.
        </p>
      </div>
    </div>
  );
}

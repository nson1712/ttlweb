"use client";
import { useParams } from "next/navigation";
import Link from "next/link";

const mockChapters = [
  { slug: "ch1", title: "Chapter 1" },
  { slug: "ch2", title: "Chapter 2" },
  { slug: "ch3", title: "Chapter 1" },
  { slug: "ch4", title: "Chapter 2" },
  { slug: "ch5", title: "Chapter 1" },
  { slug: "ch6", title: "Chapter 2" },
  { slug: "ch7", title: "Chapter 1" },
  { slug: "ch8", title: "Chapter 2" },
  { slug: "ch9", title: "Chapter 1" },
  { slug: "ch10", title: "Chapter 2" },
  { slug: "ch11", title: "Chapter 1" },
  { slug: "ch12", title: "Chapter 2" },
  { slug: "ch13", title: "Chapter 1" },
  { slug: "ch14", title: "Chapter 2" },
  { slug: "ch15", title: "Chapter 1" },
  { slug: "ch16", title: "Chapter 2" },
  { slug: "ch17", title: "Chapter 1" },
  { slug: "ch18", title: "Chapter 2" },
  { slug: "ch19", title: "Chapter 1" },
  { slug: "ch20", title: "Chapter 2" },
  { slug: "ch21", title: "Chapter 1" },
  { slug: "ch22", title: "Chapter 2" },
  { slug: "ch23", title: "Chapter 1" },
  { slug: "ch24", title: "Chapter 2" },
];

export default function ChapterListPage() {
  const params = useParams();
  const novelSlug = params.slug as string;

  return (
    <div className="p-6 text-white">
      <h1 className="text-xl font-bold mb-4">Chapters of Novel {novelSlug}</h1>
      <ul className="space-y-2">
        {mockChapters.map((chapter) => (
          <li key={chapter.slug}>
            <Link
              href={`/novels/${novelSlug}/chapters/${chapter.slug}`}
              className="text-blue-400 hover:underline"
            >
              {chapter.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

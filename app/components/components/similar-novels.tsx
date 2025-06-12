import { Novel } from "@/app/lib/types";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface SimilarNovelsSectionProps {
  novels: Novel[];
  primaryCategory: string;
}

export function SimilarNovelsSection({
  novels,
  primaryCategory,
}: SimilarNovelsSectionProps) {
  return (
    <div className="rounded-xl bg-gray-800/50 p-6 backdrop-blur-sm">
      <h2 className="mb-4 text-xl font-bold text-white">Similar Novels</h2>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-5">
        {novels.map((n) => (
          <Link key={n.id} href={`/novels/${n.slug}`} className="group block">
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-black/30">
              <Image
                src={n.coverImage}
                alt={n.title}
                fill
                unoptimized
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                <h3 className="font-medium text-white line-clamp-2 group-hover:text-emerald-400">
                  {n.title}
                </h3>
                <p className="text-sm text-gray-300">{n.author}</p>
                <div className="mt-1 flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-white">
                    {n.rating.toFixed(1)}
                  </span>
                  <span className="text-xs text-gray-400">
                    ({n.totalRatings})
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-6 text-center">
        <Link
          href={`/tags/${primaryCategory.toLowerCase()}`}
          className="inline-block rounded-full bg-gray-700 px-6 py-2 text-sm font-medium text-white hover:bg-gray-600"
        >
          View More {primaryCategory} Novels
        </Link>
      </div>
    </div>
  );
}

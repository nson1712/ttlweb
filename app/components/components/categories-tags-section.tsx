"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface CategoriesTagProps {
  name: string;
  count?: number;
  color?:
    | "blue"
    | "green"
    | "red"
    | "purple"
    | "orange"
    | "teal"
    | "pink"
    | "yellow";
}

export function CategoriesTagsSection() {
  return (
    <section className="rounded-xl bg-gray-800/50 p-6 backdrop-blur-sm">
      <h2 className="mb-6 text-2xl font-bold text-white">Hashtags Nổi Bật</h2>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {popularTags.map((tag) => (
          <CategoriesTag key={tag.name} {...tag} />
        ))}
      </div>

      <div className="mt-4 text-center">
        <Link
          href="/tags"
          className="inline-block w-full rounded-md bg-gray-800 border border-slate-700 px-4 py-2 text-sm font-medium text-emerald-400 transition-colors hover:text-emerald-300"
        >
          View All Tags
        </Link>
      </div>
    </section>
  );
}

function CategoriesTag({ name, count, color = "blue" }: CategoriesTagProps) {
  const colorClasses = {
    blue: "from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-400 hover:from-blue-500/30 hover:to-blue-600/30",
    green:
      "from-green-500/20 to-green-600/20 border-green-500/30 text-green-400 hover:from-green-500/30 hover:to-green-600/30",
    red: "from-red-500/20 to-red-600/20 border-red-500/30 text-red-400 hover:from-red-500/30 hover:to-red-600/30",
    purple:
      "from-purple-500/20 to-purple-600/20 border-purple-500/30 text-purple-400 hover:from-purple-500/30 hover:to-purple-600/30",
    orange:
      "from-orange-500/20 to-orange-600/20 border-orange-500/30 text-orange-400 hover:from-orange-500/30 hover:to-orange-600/30",
    teal: "from-teal-500/20 to-teal-600/20 border-teal-500/30 text-teal-400 hover:from-teal-500/30 hover:to-teal-600/30",
    pink: "from-pink-500/20 to-pink-600/20 border-pink-500/30 text-pink-400 hover:from-pink-500/30 hover:to-pink-600/30",
    yellow:
      "from-yellow-500/20 to-yellow-600/20 border-yellow-500/30 text-yellow-400 hover:from-yellow-500/30 hover:to-yellow-600/30",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {/* <Link href={`/tags/${name.toLowerCase()}`}> */}
      <Link href={`/tags/fantasy`}>
        <div
          className={cn(
            "flex h-12 items-center justify-between rounded-lg border bg-gradient-to-br p-3 transition-all",
            colorClasses[color]
          )}
        >
          <span className="font-medium uppercase">{name}</span>
          {count && <span className="text-sm opacity-80">{count}+</span>}
        </div>
      </Link>
    </motion.div>
  );
}

// Mock data for popular tags
const popularTags: CategoriesTagProps[] = [
  { name: "Fantasy", count: 1250, color: "teal" },
  { name: "Adventure", count: 987, color: "blue" },
  { name: "Romance", count: 856, color: "pink" },
  { name: "Sci-Fi", count: 723, color: "purple" },
  { name: "Action", count: 645, color: "red" },
  { name: "Mystery", count: 534, color: "yellow" },
  { name: "Horror", count: 423, color: "orange" },
  { name: "Comedy", count: 389, color: "green" },
  { name: "Drama", count: 356, color: "pink" },
  { name: "Historical", count: 289, color: "yellow" },
  { name: "Supernatural", count: 267, color: "purple" },
  { name: "Thriller", count: 245, color: "red" },
];

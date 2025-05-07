"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface PotentialStarletProps {
  id: string;
  slug: string;
  title: string;
  coverImage: string;
  author: string;
  categories: string[];
}

export function PotentialStarletSection() {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Sparkles className="mr-2 h-5 w-5 text-emerald-400" />
          <h2 className="text-2xl font-bold text-white">Potential Starlets</h2>
        </div>
        <Link
          href="/new-talents"
          className="text-sm font-medium text-emerald-400 hover:text-emerald-300"
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-4 gap-4 md:grid-cols-5 lg:grid-cols-10">
        {potentialStarlets.map((novel) => (
          <PotentialStarletCard key={novel.id} {...novel} />
        ))}
      </div>
    </section>
  );
}

function PotentialStarletCard({
  id,
  slug,
  title,
  coverImage,
  author,
  categories,
}: PotentialStarletProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Link href={`/novels/${slug}`} className="block" id={id}>
        <div className="group space-y-2">
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
            <Image
              src={coverImage}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

            <div className="absolute bottom-0 left-0 w-full p-2 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0">
              <div className="flex flex-wrap gap-1">
                {categories.slice(0, 1).map((category) => (
                  <span
                    key={category}
                    className="rounded-full bg-emerald-500/80 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-white line-clamp-2 group-hover:text-emerald-400">
              {title}
            </h3>
            <p className="text-xs text-gray-400">{author}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// Mock data for potential starlet novels
const potentialStarlets = [
  {
    id: "zenith-game",
    slug: "zenith-game",
    title: "Mount Zenith: Creating the best game",
    coverImage:
      "/1721988242_devils-music.webp",
    author: "Game Creator",
    categories: ["Fantasy", "LitRPG"],
  },
  {
    id: "stella-khaos",
    slug: "stella-khaos",
    title: "Stella & Khaos: The tale of duality",
    coverImage:
      "/1721988242_devils-music.webp",
    author: "Dual Writer",
    categories: ["Fantasy", "Adventure"],
  },
  {
    id: "awakening-star",
    slug: "awakening-star",
    title: "Awakening: Path of the Star Soul",
    coverImage:
      "/1721988242_devils-music.webp",
    author: "Star Walker",
    categories: ["Fantasy", "Cultivation"],
  },
  {
    id: "reincarnated-trait",
    slug: "reincarnated-trait",
    title: "Reincarnated with SSS-Rank Trait",
    coverImage:
      "/1721988242_devils-music.webp",
    author: "Reincarnation Master",
    categories: ["Fantasy", "Reincarnation"],
  },
  {
    id: "rudrastra",
    slug: "rudrastra",
    title: "RUDRASTRA: THE CREATION OF DISTRUCTION",
    coverImage:
      "/1721988242_devils-music.webp",
    author: "Mythic Writer",
    categories: ["Fantasy", "Mythology"],
  },
  {
    id: "limitless-sovereign-216523146",
    slug: "limitless-sovereign",
    title: "The Limitless Sovereign",
    coverImage:
      "/1721988242_devils-music.webp",
    author: "Sovereign Writer",
    categories: ["Fantasy", "Cultivation"],
  },
  {
    id: "limitless-sovereign-123123213",
    slug: "limitless-sovereign",
    title: "The Limitless Sovereign",
    coverImage:
      "/1721988242_devils-music.webp",
    author: "Sovereign Writer",
    categories: ["Fantasy", "Cultivation"],
  },
  {
    id: "limitless-sovereign-99",
    slug: "limitless-sovereign",
    title: "The Limitless Sovereign",
    coverImage:
      "/1721988242_devils-music.webp",
    author: "Sovereign Writer",
    categories: ["Fantasy", "Cultivation"],
  },
  {
    id: "limitless-sovereign-123",
    slug: "limitless-sovereign",
    title: "The Limitless Sovereign",
    coverImage:
      "/1721988242_devils-music.webp",
    author: "Sovereign Writer",
    categories: ["Fantasy", "Cultivation"],
  },
  {
    id: "limitless-sovereign-123123",
    slug: "limitless-sovereign",
    title: "The Limitless Sovereign",
    coverImage:
      "/1721988242_devils-music.webp",
    author: "Sovereign Writer",
    categories: ["Fantasy", "Cultivation"],
  },
  {
    id: "limitless-sovereign-235235",
    slug: "limitless-sovereign",
    title: "The Limitless Sovereign",
    coverImage:
      "/1721988242_devils-music.webp",
    author: "Sovereign Writer",
    categories: ["Fantasy", "Cultivation"],
  },
  {
    id: "limitless-sovereign-1",
    slug: "limitless-sovereign",
    title: "The Limitless Sovereign",
    coverImage:
      "/1721988242_devils-music.webp",
    author: "Sovereign Writer",
    categories: ["Fantasy", "Cultivation"],
  },
  {
    id: "limitless-sovereign-2",
    slug: "limitless-sovereign",
    title: "The Limitless Sovereign",
    coverImage:
      "/1721988242_devils-music.webp",
    author: "Sovereign Writer",
    categories: ["Fantasy", "Cultivation"],
  },
  {
    id: "limitless-sovereign-3",
    slug: "limitless-sovereign",
    title: "The Limitless Sovereign",
    coverImage:
      "/1721988242_devils-music.webp",
    author: "Sovereign Writer",
    categories: ["Fantasy", "Cultivation"],
  },
  {
    id: "limitless-sovereign-4",
    slug: "limitless-sovereign",
    title: "The Limitless Sovereign",
    coverImage:
      "/1721988242_devils-music.webp",
    author: "Sovereign Writer",
    categories: ["Fantasy", "Cultivation"],
  },
  {
    id: "limitless-sovereign-5",
    slug: "limitless-sovereign",
    title: "The Limitless Sovereign",
    coverImage:
      "/1721988242_devils-music.webp",
    author: "Sovereign Writer",
    categories: ["Fantasy", "Cultivation"],
  },
  {
    id: "limitless-sovereign-6",
    slug: "limitless-sovereign",
    title: "The Limitless Sovereign",
    coverImage:
      "/1721988242_devils-music.webp",
    author: "Sovereign Writer",
    categories: ["Fantasy", "Cultivation"],
  },
  {
    id: "limitless-sovereign-7",
    slug: "limitless-sovereign",
    title: "The Limitless Sovereign",
    coverImage:
      "/1721988242_devils-music.webp",
    author: "Sovereign Writer",
    categories: ["Fantasy", "Cultivation"],
  },
  {
    id: "limitless-sovereign-8",
    slug: "limitless-sovereign",
    title: "The Limitless Sovereign",
    coverImage:
      "/1721988242_devils-music.webp",
    author: "Sovereign Writer",
    categories: ["Fantasy", "Cultivation"],
  },
  {
    id: "limitless-sovereign-9",
    slug: "limitless-sovereign",
    title: "The Limitless Sovereign",
    coverImage:
      "/1721988242_devils-music.webp",
    author: "Sovereign Writer",
    categories: ["Fantasy", "Cultivation"],
  },
];

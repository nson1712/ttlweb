"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { FC } from "react";
import { PotenialStarletType } from "@/app/types/story";

export type PotenialStarletPropsType = {
  potentialStarlets: PotenialStarletType[];
};
export const PotentialStarletSection: FC<PotenialStarletPropsType> = ({
  potentialStarlets,
}) => {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Sparkles className="mr-2 h-5 w-5 text-emerald-400" />
          <h2 className="text-2xl font-bold text-white">Truyện tiềm năng</h2>
        </div>
        {/* <Link
          href="/new-talents"
          className="text-sm font-medium text-emerald-400 hover:text-emerald-300"
        >
          View All
        </Link> */}
      </div>

      <div className="grid grid-cols-4 gap-4 md:grid-cols-5 lg:grid-cols-10">
        {(potentialStarlets ?? []).map((novel) => (
          <PotentialStarletCard key={novel.id} {...novel} />
        ))}
      </div>
    </section>
  );
};

function PotentialStarletCard({
  id,
  slug,
  title,
  coverImage,
  // author,
  categories,
}: PotenialStarletType) {
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
                {categories?.slice(0, 1).map((category) => (
                  <span
                    key={category.id}
                    className="rounded-full bg-emerald-500/80 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm"
                  >
                    {category?.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-white line-clamp-2 group-hover:text-emerald-400">
              {title}
            </h3>
            {/* <p className="text-xs text-gray-400">{author}</p> */}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

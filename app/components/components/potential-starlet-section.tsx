"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { FC, useContext } from "react";
import { PotenialStarletType, StoryType } from "@/app/types/story";
import { SettingsContext, Theme } from "@/app/context/setting-context";
import { cn } from "@/app/lib/utils";

export type PotenialStarletPropsType = {
  potentialStarlets: StoryType[];
};
export const PotentialStarletSection: FC<PotenialStarletPropsType> = ({
  potentialStarlets,
}) => {
  const { theme } = useContext(SettingsContext);

  // Map màu cho section heading
  const headingColorMap: Record<Theme, string> = {
    light: "text-gray-900",
    dark: "text-white",
    sepia: "text-[#5f4b32]",
  };
  const sparklesColorMap: Record<Theme, string> = {
    light: "text-emerald-600",
    dark: "text-emerald-400",
    sepia: "text-emerald-500",
  };
  const linkAllColorMap: Record<Theme, string> = {
    light: "text-emerald-600 hover:text-emerald-500",
    dark: "text-emerald-400 hover:text-emerald-300",
    sepia: "text-emerald-500 hover:text-emerald-400",
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Sparkles
            className={cn("mr-2 h-5 w-5", sparklesColorMap[theme ?? "dark"])}
          />
          <h2
            className={cn(
              "text-2xl font-bold",
              headingColorMap[theme ?? "dark"]
            )}
          >
            Truyện tiềm năng
          </h2>
        </div>
        <Link
          href="/truyen-tiem-nang"
          className={cn(
            "text-base font-medium transition-colors duration-150",
            linkAllColorMap[theme ?? "dark"]
          )}
        >
          Xem tất cả
        </Link>
      </div>

      <div className="grid grid-cols-4 gap-4 md:grid-cols-5 lg:grid-cols-10">
        {(potentialStarlets ?? []).map(
          (novel, idx) =>
            novel && <PotentialStarletCard key={novel?.id ?? idx} {...novel} />
        )}
      </div>
    </section>
  );
};

function PotentialStarletCard({
  author,
  slug,
  title,
  coverImage,
  categories,
}: PotenialStarletType) {
  const { theme } = useContext(SettingsContext);

  const overlayGradientMap: Record<Theme, string> = {
    light: "from-white/80 via-transparent to-transparent",
    dark: "from-black/70 via-transparent to-transparent",
    sepia: "from-[#f8f1e3]/80 via-transparent to-transparent",
  };

  const tagBgMap: Record<Theme, string> = {
    light: "bg-emerald-600/80",
    dark: "bg-emerald-500/80",
    sepia: "bg-emerald-500/80",
  };

  const titleMap: Record<Theme, string> = {
    light: "text-gray-900",
    dark: "text-white",
    sepia: "text-[#5f4b32]",
  };

  const titleHoverMap: Record<Theme, string> = {
    light: "group-hover:text-emerald-600",
    dark: "group-hover:text-emerald-400",
    sepia: "group-hover:text-emerald-500",
  };

  const authorMap: Record<Theme, string> = {
    light: "text-gray-700",
    dark: "text-gray-400",
    sepia: "text-[#7a6f49]",
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Link href={`/truyen/${slug}`} className="block">
        <div className="group space-y-2">
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
            <Image
              src={coverImage ?? "/default-image.jpg"}
              alt={title ?? "potential-starlet"}
              fill
              unoptimized
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
            />
            <div
              className={cn(
                "absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                "bg-gradient-to-t",
                overlayGradientMap[theme ?? "dark"]
              )}
            />

            <div className="absolute bottom-0 left-0 w-full p-2 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0">
              <div className="flex flex-wrap gap-1">
                {categories?.slice(0, 1)?.map((category) => (
                  <span
                    key={category?.id}
                    className={cn(
                      "rounded-full px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm",
                      tagBgMap[theme ?? "dark"]
                    )}
                  >
                    {category?.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3
              className={cn(
                "text-sm font-semibold line-clamp-2 transition-colors duration-150",
                titleMap[theme ?? "dark"],
                titleHoverMap[theme ?? "dark"]
              )}
            >
              {title}
            </h3>
            <p className={cn("text-xs", authorMap[theme ?? "dark"])}>
              {author?.name}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

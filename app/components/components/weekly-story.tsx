// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { Star, BookOpen, Clock, User } from "lucide-react";
// import { FC } from "react";
// import { WeeklyStoryPropsType } from "@/app/types/story";
// import { formatDateTime } from "@/app/lib/utils";
// import { BaseTag } from "./base-tag";

// export const WeeklyStory: FC<WeeklyStoryPropsType> = ({ weeklyStory }) => {
//   return (
//     <section className="relative mb-12 overflow-hidden rounded-xl">
//       <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800/95 to-transparent z-0"></div>

//       <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 p-6">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5 }}
//           className="relative w-full max-w-[200px] aspect-[3/4] overflow-hidden rounded-lg shadow-2xl  hover:scale-105 transition-all duration-200"
//         >
//           <Link href={`/truyen/${weeklyStory?.slug}`} passHref>
//             <Image
//               src={weeklyStory?.coverImage ?? "/placeholder-cover.jpg"}
//               alt={weeklyStory?.title ?? "Truyện đặc sắc trong tuần"}
//               fill
//               unoptimized
//               className="object-cover"
//               sizes="(max-width: 768px) 200px, 200px"
//               priority
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
//             <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-sm font-medium text-white backdrop-blur-sm">
//               <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//               <span>{(weeklyStory?.rate ?? 0).toFixed(1)}</span>
//               {/* <span className="text-gray-300">({weeklyStory.totalRatings})</span> */}
//             </div>
//           </Link>
//         </motion.div>

//         <div className="flex-1 space-y-4">
//           <div className="space-y-1">
//             <h2 className="text-sm font-medium uppercase tracking-wider text-emerald-400">
//               Truyện đặc sắc trong tuần
//             </h2>
//             <Link href={`/truyen/${weeklyStory?.slug}`} passHref>
//               <h1 className="text-3xl font-bold text-white md:text-4xl hover:text-emerald-500 transition-colors duration-150">
//                 {weeklyStory?.title}
//               </h1>
//             </Link>
//             <p className="text-lg text-gray-300 flex gap-x-1">
//               {" "}
//               <User className="w-5 h-5 self-center text-emerald-500" />{" "}
//               {weeklyStory.author?.name}
//             </p>
//           </div>

//           <div className="flex flex-wrap gap-2">
//             {[
//               ...weeklyStory.mainCategories,
//               ...weeklyStory?.categories.filter(
//                 (item) => item.slug !== weeklyStory.mainCategories?.[0].slug
//               ),
//             ]?.map((category, idx) => (
//               <BaseTag
//                 key={category?.id}
//                 href={`the-loai/${category?.slug}`}
//                 name={category?.name}
//                 variant={idx === 0 && weeklyStory.mainCategories?.length ? "mainCategories" : "categories"}
//               />
//             ))}
//           </div>

//           <p
//             className="text-gray-400 line-clamp-3"
//             dangerouslySetInnerHTML={{
//               __html: weeklyStory?.shortDescription,
//             }}
//           ></p>

//           <div className="flex items-center gap-4 text-sm text-gray-400">
//             <div className="flex items-center gap-1">
//               <BookOpen className="h-4 w-4 text-emerald-500" />
//               <span>{weeklyStory?.totalChapter ?? 0} chương</span>
//             </div>
//             <div className="flex gap-x-1">
//               <Clock className="w-4 h-4 self-center text-emerald-500" />
//               <span>Cập nhật: {formatDateTime(weeklyStory?.updatedAt)}</span>
//             </div>
//           </div>

//           <div className="flex flex-wrap gap-3">
//             <Link href={`/truyen/${weeklyStory?.slug}`}>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-2.5 text-sm font-medium text-white shadow-lg transition-all hover:shadow-emerald-500/20 cursor-pointer"
//               >
//                 Thông tin truyện
//               </motion.button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };


"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, BookOpen, Clock, User } from "lucide-react";
import { FC, useContext } from "react";
import { WeeklyStoryPropsType } from "@/app/types/story";
import { formatDateTime } from "@/app/lib/utils";
import { BaseTag } from "./base-tag";
import { SettingsContext, Theme } from "@/app/context/setting-context";
import { cn } from "@/app/lib/utils";

export const WeeklyStory: FC<WeeklyStoryPropsType> = ({ weeklyStory }) => {
  const { theme } = useContext(SettingsContext);

  // 1. Các map lớp
  const overlayGradientMap: Record<Theme, string> = {
    light: "bg-gradient-to-r from-white via-gray-100 to-transparent",
    dark:  "bg-gradient-to-r from-gray-900 via-gray-800/95 to-transparent",
    sepia: "bg-gradient-to-r from-[#f8f1e3] via-[#e6d4b0]/95 to-transparent",
  };

  const titleColorMap: Record<Theme, string> = {
    light: "text-gray-900",
    dark:  "text-white",
    sepia: "text-[#5f4b32]",
  };

  const subtitleColorMap: Record<Theme, string> = {
    light: "text-emerald-600",
    dark:  "text-emerald-400",
    sepia: "text-emerald-500",
  };

  const textColorMap: Record<Theme, string> = {
    light: "text-gray-700",
    dark:  "text-gray-300",
    sepia: "text-[#7a6f49]",
  };

  return (
    <section className="relative mb-12 overflow-hidden rounded-xl">
      {/* Overlay nền */}
      <div
        className={cn(
          "absolute inset-0 z-0",
          overlayGradientMap[theme ?? "dark"]
        )}
      ></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 p-6">
        {/* Ảnh bìa */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-[200px] aspect-[3/4] overflow-hidden rounded-lg shadow-2xl hover:scale-105 transition-all duration-200"
        >
          <Link href={`/truyen/${weeklyStory?.slug}`} passHref>
            <Image
              src={weeklyStory?.coverImage ?? "/placeholder-cover.jpg"}
              alt={weeklyStory?.title ?? "Truyện đặc sắc trong tuần"}
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 768px) 200px, 200px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-sm font-medium text-white backdrop-blur-sm">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{(weeklyStory?.rate ?? 0).toFixed(1)}</span>
            </div>
          </Link>
        </motion.div>

        {/* Nội dung chính */}
        <div className="flex-1 space-y-4">
          <div className="space-y-1">
            <h2 className={cn(
              "text-sm font-medium uppercase tracking-wider",
              subtitleColorMap[theme ?? "dark"]
            )}>
              Truyện đặc sắc trong tuần
            </h2>

            <Link href={`/truyen/${weeklyStory?.slug}`} passHref>
              <h1 className={cn(
                "text-3xl font-bold md:text-4xl hover:underline transition-colors duration-150",
                titleColorMap[theme ?? "dark"]
              )}>
                {weeklyStory?.title}
              </h1>
            </Link>

            <p className={cn(
              "text-lg flex gap-x-1 items-center",
              textColorMap[theme ?? "dark"]
            )}>
              <User className={cn("w-5 h-5", subtitleColorMap[theme ?? "dark"])} />
              {weeklyStory.author?.name}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {[...weeklyStory?.mainCategories, ...weeklyStory?.categories?.filter((item) => item.slug !== weeklyStory.mainCategories?.[0].slug)]
              .map((category, idx) => (
                <BaseTag
                  key={category.id ?? idx}
                  href={`the-loai/${category.slug}`}
                  name={category.name}
                  variant={idx === 0 ? "mainCategories" : "categories"}
                />
              ))}
          </div>

          <p className={cn("line-clamp-3", textColorMap[theme ?? "dark"])}
             dangerouslySetInnerHTML={{ __html: weeklyStory.shortDescription }}
          />

          <div className={cn("flex items-center gap-4 text-sm", textColorMap[theme ?? "dark"])}>
            <div className="flex items-center gap-1">
              <BookOpen className={cn("h-4 w-4", subtitleColorMap[theme ?? "dark"])}/>
              <span>{weeklyStory.totalChapter} chương</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className={cn("w-4 h-4", subtitleColorMap[theme ?? "dark"])}/>
              <span>Cập nhật: {formatDateTime(weeklyStory.updatedAt)}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href={`/truyen/${weeklyStory.slug}`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "rounded-full px-6 py-2.5 text-sm font-medium text-white shadow-lg transition-all cursor-pointer",
                  `bg-gradient-to-r from-emerald-500 to-teal-600`,
                  `hover:shadow-${theme === "dark" ? "emerald-500" : "emerald-300"}/20`
                )}
              >
                Thông tin truyện
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

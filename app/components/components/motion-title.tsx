// "use client";
// import { motion } from "framer-motion";
// import { Nunito } from "next/font/google";

// const nunito = Nunito({
//   subsets: ["vietnamese"],
//   display: "swap",
//   weight: ["1000"],
// });

// type MotionTitleProps = {
//   title?: string;
//   subTitle?: string;
//   shortDescription?: string;
//   className?: string;
// };
// export const MotionTitle = ({
//   title,
//   subTitle,
//   shortDescription,
//   className = "",
// }: MotionTitleProps) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="mb-8 text-center"
//     >
//       <h1
//         className={`${nunito.className} text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl h-fit ${className}`}
//       >
//         <span className="block">{title}</span>
//         <span className="block bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent pb-2">
//           {subTitle}
//         </span>
//       </h1>
//       <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-400">
//         {shortDescription}
//       </p>
//     </motion.div>
//   );
// };


"use client";
import { motion } from "framer-motion";
import { Nunito } from "next/font/google";
import { useContext } from "react";
import { SettingsContext, Theme } from "@/app/context/setting-context";
import { cn } from "@/app/lib/utils";

const nunito = Nunito({
  subsets: ["vietnamese"],
  display: "swap",
  weight: ["900"],
});

type MotionTitleProps = {
  title?: string;
  subTitle?: string;
  shortDescription?: string;
  className?: string;
};

export const MotionTitle = ({
  title,
  subTitle,
  shortDescription,
  className = "",
}: MotionTitleProps) => {
  const { theme } = useContext(SettingsContext);

  // Bản đồ màu cho mỗi theme
  const titleColorMap: Record<Theme, string> = {
    light: "text-gray-900",
    dark:  "text-white",
    sepia: "text-[#5f4b32]",
  };
  const subtitleGradientMap: Record<Theme, string> = {
    light: "from-emerald-600 to-teal-600",
    dark:  "from-emerald-400 to-teal-500",
    sepia: "from-emerald-500 to-teal-600",
  };
  const descColorMap: Record<Theme, string> = {
    light: "text-gray-600",
    dark:  "text-gray-400",
    sepia: "text-[#7a6f49]",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8 text-center"
    >
      <h1
        className={cn(
          nunito.className,
          "tracking-tight sm:text-5xl md:text-6xl h-fit",
          "text-4xl font-extrabold",
          titleColorMap[theme ?? "dark"],
          className
        )}
      >
        <span className="block">{title}</span>
        <span
          className={cn(
            "block bg-gradient-to-r bg-clip-text text-transparent pb-2",
            subtitleGradientMap[theme ?? "dark"]
          )}
        >
          {subTitle}
        </span>
      </h1>
      {shortDescription && (
        <p
          className={cn(
            "mx-auto mt-4 max-w-2xl text-xl",
            descColorMap[theme ?? "dark"]
          )}
        >
          {shortDescription}
        </p>
      )}
    </motion.div>
  );
};

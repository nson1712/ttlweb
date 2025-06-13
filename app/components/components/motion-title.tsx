"use client";
import { motion } from "framer-motion";
import { Nunito } from "next/font/google";

const nunito = Nunito({
  subsets: ["vietnamese"],
  display: "swap",
  weight: ["1000"],
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8 text-center"
    >
      <h1
        className={`${nunito.className} text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl h-fit ${className}`}
      >
        <span className="block">{title}</span>
        <span className="block bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent pb-2">
          {subTitle}
        </span>
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-400">
        {shortDescription}
      </p>
    </motion.div>
  );
};

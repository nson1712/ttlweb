"use client";
import { motion } from "framer-motion";

type MotionTitleProps = {
  title?: string;
  subTitle?: string;
  shortDescription?: string;
};
export const MotionTitle = ({
  title,
  subTitle,
  shortDescription,
}: MotionTitleProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8 text-center"
    >
      <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
        <span className="block">{title}</span>
        <span className="block bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
          {subTitle}
        </span>
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-400">
        {shortDescription}
      </p>
    </motion.div>
  );
};

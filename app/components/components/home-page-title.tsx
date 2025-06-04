"use client";
import { motion } from "framer-motion";
export const HomePageTitle = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="mb-12 text-center"
  >
    <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
      <span className="block">Discover Your Next</span>
      <span className="block bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
        Reading Adventure
      </span>
    </h1>
    <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-400">
      Explore thousands of novels across all your favorite genres
    </p>
  </motion.div>
);

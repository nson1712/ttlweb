"use client";
import { colorClasses } from "@/app/lib/store-data";
import { cn } from "@/app/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";

type CategoriesProps = {
  name: string;
  slug: string;
  color?:
    | "blue"
    | "green"
    | "red"
    | "purple"
    | "orange"
    | "teal"
    | "pink"
    | "yellow"
    | "emerald";
};

export const CategoriesTag = ({
  name,
  // slug,
  color = "blue",
}: CategoriesProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Link href={`/categories/${name.toLowerCase()}`}>
        <div
          className={cn(
            "flex h-12 items-center justify-between rounded-lg border bg-gradient-to-br p-3 transition-all",
            colorClasses[color]
          )}
        >
          <span className="font-medium uppercase">{name}</span>
        </div>
      </Link>
    </motion.div>
  );
}
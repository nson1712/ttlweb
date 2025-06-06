// "use client";
import { FC } from "react";
import { colorClasses } from "@/app/lib/store-data";
import { CategoriesTag } from "./categories-card";

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

type CategoriesSectionProps = {
  categories: CategoriesProps[];
};

export const CategoriesTagsSection: FC<CategoriesSectionProps> = ({
  categories,
}) => {
  const colorKeys = Object.keys(colorClasses) as (keyof typeof colorClasses)[];
  const categoriesWithColors = categories.map((cate, index) => ({
    ...cate,
    color: colorKeys[index % colorKeys.length],
  }));

  return (
    <div className="rounded-xl bg-gray-800/50 p-6 backdrop-blur-sm">
      <h2 className="mb-6 text-2xl font-bold text-white">Thể Loại Nổi Bật</h2>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {categoriesWithColors.map((cate) => (
          <CategoriesTag key={cate.name} {...cate} />
        ))}
      </div>
    </div>
  );
};

// function CategoriesTag({
//   name,
//   // slug,
//   color = "blue",
// }: CategoriesProps) {
//   return (
//     <motion.div
//       whileHover={{ scale: 1.03 }}
//       transition={{ type: "spring", stiffness: 400, damping: 17 }}
//     >
//       <Link href={`/categories/${name.toLowerCase()}`}>
//         <div
//           className={cn(
//             "flex h-12 items-center justify-between rounded-lg border bg-gradient-to-br p-3 transition-all",
//             colorClasses[color]
//           )}
//         >
//           <span className="font-medium uppercase">{name}</span>
//         </div>
//       </Link>
//     </motion.div>
//   );
// }

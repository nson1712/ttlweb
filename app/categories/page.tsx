import { colorClasses } from "../lib/store-data";
import { httpClient } from "../utils/httpClient";
import { CategoriesTag } from "../components/components/categories-card";
import { MotionTitle } from "../components/components/motion-title";

interface Category {
  name: string;
  slug: string;
}

async function fetchCategories() {
  return (
    await httpClient.get({
      url: "api/category/list",
    })
  ).data;
}

export default async function CategoriesPage() {
  const [categoriesRes] = await Promise.all([fetchCategories()]);
  const colorKeys = Object.keys(colorClasses) as (keyof typeof colorClasses)[];

  interface CategoryWithColor extends Category {
    color: keyof typeof colorClasses;
  }

  const categoriesWithColors: CategoryWithColor[] = categoriesRes.map(
    (cate: Category, index: number): CategoryWithColor => ({
      ...cate,
      color: colorKeys[index % colorKeys.length],
    })
  );
  return (
    <div className="min-h-screen">
      <div className="mx-auto">
        {/* Header */}
        <MotionTitle
          title="Browse Novels by"
          subTitle="Tags & Categories"
          shortDescription="Discover stories that match your interests from our extensive collection"
        />

        {/* Search and Filter */}

        {/* Tags Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {categoriesWithColors.map((tag) => (
            <CategoriesTag key={tag.name} {...tag} />
          ))}
        </div>

        {/* Empty State */}
        {/* {filteredTags.length === 0 && (
          <div className="mt-12 text-center">
            <Tag className="mx-auto h-12 w-12 text-gray-500" />
            <h3 className="mt-2 text-lg font-medium text-white">
              No tags found
            </h3>
            <p className="mt-1 text-gray-400">
              Try adjusting your search or filter to find what you&#39;re
              looking for
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory(null);
              }}
              className="mt-4 rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600"
            >
              Clear filters
            </button>
          </div>
        )} */}
      </div>
    </div>
  );
}

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

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
        <MotionTitle title="Danh sách" subTitle="thể loại" />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {categoriesWithColors.map((tag) => (
            <CategoriesTag key={tag.name} {...tag} />
          ))}
        </div>
      </div>
    </div>
  );
}

import { colorClasses } from "../lib/store-data";
import { CategoriesTag } from "../components/components/categories-card";
import { MotionTitle } from "../components/components/motion-title";
import { fetchCategories } from "../lib/fetch-data";

interface Category {
  name: string;
  slug: string;
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

  const updatedCategories = categoriesWithColors.filter(tag => tag.slug !== 'nu-cuong');
  return (
    <div className="min-h-screen">
      <div className="mx-auto">
        {/* Header */}
        <MotionTitle title="Danh sách" subTitle="thể loại" />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {updatedCategories.map((tag) => (
            <CategoriesTag key={tag.name} {...tag} />
          ))}
        </div>
      </div>
    </div>
  );
}

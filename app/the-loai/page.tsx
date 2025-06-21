import { colorClasses } from "../lib/store-data";
import { CategoriesTag } from "../components/components/categories-card";
import { MotionTitle } from "../components/components/motion-title";
import { fetchCategories } from "../lib/fetch-data";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import { cookies } from "next/headers";
import { LSK_DEVICE_ID } from "../utils/storage";

interface Category {
  name: string;
  slug: string;
}

export default async function CategoriesPage() {
  const deviceId = (await cookies()).get(LSK_DEVICE_ID)?.value ?? "";
  const [categoriesRes] = await Promise.all([
    fetchCategories({ deviceId: deviceId }),
  ]);
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

  const updatedCategories = categoriesWithColors.filter(
    (tag) => tag.slug !== "nu-cuong"
  );
  return (
    <div className="min-h-screen">
      <div className="mx-auto">
        <Breadcrumb className="flex w-full mb-4 sm:mb-0">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                className="text-gray-400 hover:text-emerald-500"
                href="/"
              >
                Trang chủ
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="flex-1 line-clamp-1">
              <BreadcrumbLink className="text-emerald-500" href={`/the-loai`}>
                Thể loại
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

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

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { FC, useContext, useEffect, useState } from "react";
import { CategoryType, FilterOptions } from "@/app/lib/types";
import {
  createFilter,
  normalizeFilterPayload,
  parseFilterString,
} from "@/app/lib/utils";
import { useSearch } from "@/app/context/search-context";
import { SettingsContext, Theme } from "@/app/context/setting-context";

const getInitialFilterOptions = (
  searchParams: URLSearchParams
): FilterOptions => {
  const filterQuery = searchParams.get("filter");
  if (!filterQuery) {
    return {
      categories: [],
      hashtags: [],
      searchTerm: "",
    };
  }

  const parsed = parseFilterString(filterQuery);
  return {
    categories: [],
    hashtags: [],
    searchTerm: "",
    ...parsed,
  };
};

type FilterProps = {
  operators: Map<string, string>;
  searchKey?: string;
  categories?: CategoryType[];
};

export const Filter: FC<FilterProps> = ({
  operators,
  searchKey = "searchTerm",
  categories,
}) => {
  const { theme } = useContext(SettingsContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { searchTerm, setSearchTerm } = useSearch();

  const wrapperBg: Record<Theme, string> = {
    light: "bg-white",
    dark: "bg-gray-800",
    sepia: "bg-[#f8f1e3]",
  };
  const inputBg: Record<Theme, string> = {
    light: "bg-gray-100 placeholder-gray-500",
    dark: "bg-gray-700 placeholder-gray-400",
    sepia: "bg-[#efe2c7] placeholder-[#7a6f49]",
  };
  const inputText: Record<Theme, string> = {
    light: "text-gray-900",
    dark: "text-white",
    sepia: "text-[#5f4b32]",
  };
  const borderColor: Record<Theme, string> = {
    light: "border-gray-300",
    dark: "border-gray-600",
    sepia: "border-[#d1b97e]",
  };
  const labelText: Record<Theme, string> = {
    light: "text-gray-700",
    dark: "text-gray-300",
    sepia: "text-[#7a6f49]",
  };

  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(
    () => {
      return searchParams.get("adv") === "true";
    }
  );

  const [isClient, setIsClient] = useState(false);

  const [filterOptions, setFilterOptions] = useState<FilterOptions>(() =>
    getInitialFilterOptions(searchParams)
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleAdvanced = () => {
    const next = !showAdvancedFilters;
    setShowAdvancedFilters(next);

    const currentFilter = searchParams.get("filter") ?? "";
    const newParams = new URLSearchParams();
    if (currentFilter) {
      newParams.set("filter", currentFilter);
    }
    newParams.set("adv", next ? "true" : "false");

    router.push(`/truyen?${newParams.toString()}`);
  };

  const toggleCategories = (slug: string) => {
    setFilterOptions((prev) => {
      if (prev.categories.includes(slug)) {
        return {
          ...prev,
          categories: prev.categories.filter((g) => g !== slug),
        };
      } else {
        return {
          ...prev,
          categories: [...prev.categories, slug],
        };
      }
    });
  };

  // const toggleTag = (tag: string) => {
  //   setFilterOptions((prev) => {
  //     if (prev.hashtags.includes(tag)) {
  //       return {
  //         ...prev,
  //         hashtags: prev.hashtags.filter((t) => t !== tag),
  //       };
  //     } else {
  //       return {
  //         ...prev,
  //         hashtags: [...prev.hashtags, tag],
  //       };
  //     }
  //   });
  // };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilterOptions((prev) => ({
      ...prev,
      searchTerm: e.target.value,
    }));
    setSearchTerm(value);
  };

  useEffect(() => {
    setFilterOptions((prev) => ({
      ...prev,
      searchTerm: searchTerm,
    }));
  }, [searchTerm]);

  // const handleSortChange = (value: string) => {
  //   setFilterOptions((prev) => ({
  //     ...prev,
  //     sortBy: value,
  //   }));
  // };

  // const handleMinChaptersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const v = e.target.value ? parseInt(e.target.value) : undefined;
  //   setFilterOptions((prev) => ({
  //     ...prev,
  //     minChapters: v,
  //   }));
  // };

  // const handleMaxChaptersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const v = e.target.value ? parseInt(e.target.value) : undefined;
  //   setFilterOptions((prev) => ({
  //     ...prev,
  //     maxChapters: v,
  //   }));
  // };

  // const handleMinRatingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const v = e.target.value ? parseInt(e.target.value) : undefined;
  //   setFilterOptions((prev) => ({
  //     ...prev,
  //     minRatings: v,
  //   }));
  // };

  // const handleMaxRatingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const v = e.target.value ? parseInt(e.target.value) : undefined;
  //   setFilterOptions((prev) => ({
  //     ...prev,
  //     maxRatings: v,
  //   }));
  // };

  const handleTranslateStatusChange = (value: string) => {
    setFilterOptions((prev) => ({
      ...prev,
      status: value,
    }));
  };

  const resetFilters = () => {
    setFilterOptions({
      categories: [],
      hashtags: [],
      searchTerm: "",
      // reset thêm field khác nếu có
    });
    setSearchTerm("");
    const newParams = new URLSearchParams();
    if (showAdvancedFilters) {
      newParams.set("adv", "true");
    }
    router.push(`/truyen?${newParams.toString()}`);
  };

  const applySearch = () => {
    const raw: Record<string, unknown> = { ...filterOptions };

    if (searchKey !== "searchTerm") {
      raw[searchKey] = raw.searchTerm;
      delete raw.searchTerm;
    }

    const payload = normalizeFilterPayload(raw, operators);

    const filterString = createFilter(payload, operators);
    const newParams = new URLSearchParams();
    newParams.set("filter", filterString);
    if (showAdvancedFilters) newParams.set("adv", "true");
    router.push(`/truyen?${newParams.toString()}`);
  };
  const getCategoryNamesFromSlugs = (slugs: string[]): string => {
    return slugs
      .map((slug) => {
        const found = categories?.find((c) => c.slug === slug);
        return found ? found.name : slug;
      })
      .join(", ");
  };

  return (
    <div className={`${wrapperBg[theme ?? "dark"]} p-4 rounded-lg`}>
      <div className="w-full lg:flex space-y-4 lg:space-y-0 items-end gap-4 mb-4">
        <div className="w-full">
          <Label className={labelText[theme ?? "dark"]} htmlFor="search">
            Tìm kiếm
          </Label>
          <Input
            id="search"
            placeholder="Nhập từ khóa..."
            value={filterOptions.searchTerm}
            onChange={handleSearchChange}
            className={`
              ${inputBg[theme ?? "dark"]} ${inputText[theme ?? "dark"]} 
              border ${borderColor[theme ?? "dark"]}
            `}
          />
        </div>
        <div className="w-full">
          <Label className={labelText[theme ?? "dark"]} htmlFor="categories">
            Thể loại
          </Label>
          <Input
            id="categories"
            placeholder="Tiên hiệp, Kiếm hiệp,..."
            value={getCategoryNamesFromSlugs(filterOptions.categories)}
            readOnly
            onClick={() => setShowAdvancedFilters(true)}
            className={`
              ${inputBg[theme ?? "dark"]} ${inputText[theme ?? "dark"]}
              border ${borderColor[theme ?? "dark"]}
            `}
          />
        </div>

        {/* <div className="flex-1">
          <Label htmlFor="hashtags">Hashtags</Label>
          <Input
            id="hashtags"
            placeholder="hashtag1, hashtag2..."
            value={filterOptions.hashtags.join(", ")}
            readOnly
            onClick={() => setShowAdvancedFilters(true)}
            className="bg-gray-700 text-white border-gray-600"
          />
        </div> */}

        <div className="flex gap-x-4">
          <Button
            onClick={toggleAdvanced}
            className="bg-gradient-to-br from-blue-500 to-blue-600 text-white"
          >
            {isClient && showAdvancedFilters ? "ẨN BỚT" : "HIỆN THÊM"}
          </Button>

          <Button
            className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
            onClick={applySearch}
          >
            TÌM KIẾM
          </Button>

          <Button
            className="bg-gradient-to-br from-red-400 to-red-500 text-white"
            onClick={resetFilters}
          >
            ĐẶT LẠI
          </Button>
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div className="mt-6 lg:grid lg:grid-cols-6 gap-6 space-y-4">
          {/* Categories */}
          <div className="lg:col-span-4">
            <Label className="block mb-2 text-emerald-400">Thể loại</Label>
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 mt-2 max-h-52 overflow-y-auto">
              {categories
                ?.filter((item) => item.slug !== "nu-cuong")
                ?.map((cate) => {
                  const checkboxId = `cate-${cate.slug}`;
                  return (
                    <div key={cate.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={checkboxId}
                        className="cursor-pointer border-gray-600 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-emerald-400 data-[state=checked]:to-teal-500"
                        checked={filterOptions.categories.includes(cate.slug)}
                        onCheckedChange={() => toggleCategories(cate.slug)}
                      />
                      <Label
                        htmlFor={checkboxId}
                        className="text-sm cursor-pointer"
                      >
                        {cate.name}
                      </Label>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Hashtags */}
          {/* <div>
            <Label className="block mb-2 text-blue-400">Hashtags</Label>
            <div className="grid grid-cols-2 gap-2 mt-2 max-h-40 overflow-y-auto">
              {availableTags.map((tag) => (
                <div key={tag} className="flex items-center space-x-2">
                  <Checkbox
                    id={`tag-${tag}`}
                    className="cursor-pointer border-gray-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    checked={filterOptions.hashtags.includes(tag)}
                    onCheckedChange={() => toggleTag(tag)}
                  />
                  <Label htmlFor={`tag-${tag}`} className="text-sm">
                    {tag}
                  </Label>
                </div>
              ))}
            </div>
          </div> */}

          {/* Status */}
          <div className="col-span-2">
            <Label className="text-red-400" htmlFor="translate-status">
              Trạng thái
            </Label>
            <Select
              value={filterOptions.status || "COMPLETED"}
              onValueChange={handleTranslateStatusChange}
            >
              <SelectTrigger
                className={`
                  ${inputBg[theme ?? "dark"]} ${inputText[theme ?? "dark"]}
                  border ${borderColor[theme ?? "dark"]}
                `}
              >
                <SelectValue placeholder="HOÀN THÀNH" />
              </SelectTrigger>
              <SelectContent className={`bg-${wrapperBg[theme ?? "dark"]}`}>
                {["COMPLETED", "ONGOING", "DROP"].map((val) => (
                  <SelectItem
                    className={`${
                      labelText[theme ?? "dark"]
                    } data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-emerald-400 data-[state=checked]:to-teal-500 data-[state=checked]:text-white`}
                    key={val}
                    value={val}
                  >
                    {val === "COMPLETED"
                      ? "HOÀN THÀNH"
                      : val === "ONGOING"
                      ? "ĐANG RA"
                      : "DROP"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Số chương */}
          {/* <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="min-chapters">Min Chapters</Label>
              <Input
                id="min-chapters"
                placeholder="50"
                type="number"
                value={filterOptions.minChapters || ""}
                onChange={handleMinChaptersChange}
                className="bg-gray-700 text-white border-gray-600"
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="max-chapters">Max Chapters</Label>
              <Input
                id="max-chapters"
                placeholder="10000"
                type="number"
                value={filterOptions.maxChapters || ""}
                onChange={handleMaxChaptersChange}
                className="bg-gray-700 text-white border-gray-600"
              />
            </div>
          </div> */}

          {/* Ratings */}
          {/* <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="min-ratings">Min Ratings</Label>
              <Input
                id="min-ratings"
                placeholder="0"
                type="number"
                value={filterOptions.minRatings || ""}
                onChange={handleMinRatingsChange}
                className="bg-gray-700 text-white border-gray-600"
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="max-ratings">Max Ratings</Label>
              <Input
                id="max-ratings"
                placeholder="1000"
                type="number"
                value={filterOptions.maxRatings || ""}
                onChange={handleMaxRatingsChange}
                className="bg-gray-700 text-white border-gray-600"
              />
            </div>
          </div> */}
        </div>
      )}
    </div>
  );
};

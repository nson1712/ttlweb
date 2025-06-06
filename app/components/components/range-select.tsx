"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select";

interface RangeSelectProps {
  totalCount: number;
  pageSize?: number;
  pageSearchParam?: string;
}

export function RangeSelect({ totalCount, pageSize = 50, pageSearchParam }: RangeSelectProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const totalPages = Math.ceil(totalCount / pageSize);
  const currentPageIndex = Number(searchParams.get(pageSearchParam || "page") || 0);

  // build option list
  const options = Array.from({ length: totalPages }, (_, idx) => {
    const start = idx * pageSize + 1;
    const end = Math.min(totalCount, (idx + 1) * pageSize);
    return { value: idx, label: `${start}-${end}` };
  });

  const handleChange = (val: string) => {
    const sp = new URLSearchParams(searchParams?.toString());
    sp.set(pageSearchParam || "page", val);
    router.push(`${pathname}?${sp.toString()}`);
  };

  return (
    <Select defaultValue={String(currentPageIndex)} onValueChange={handleChange}>
      <SelectTrigger className="max-w-60 text-base mx-auto">
        <SelectValue placeholder="Chọn khoảng" />
      </SelectTrigger>
      <SelectContent >
        {options.map((opt) => (
          <SelectItem className="text-base" key={opt.value} value={String(opt.value)}>
            Chương {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

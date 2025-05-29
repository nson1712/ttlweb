import Link from "next/link";
import { Badge } from "../ui/badge";
import { FC } from "react";

type BaseTagProps = {
  href: string;
  name: string;
};
export const BaseTag: FC<BaseTagProps> = ({ href, name }) => {
  return (
    <Link href={href}>
      <Badge
        variant="outline"
        className="bg-gray-700/50 text-xs text-emerald-300 border-emerald-500/20 hover:bg-emerald-900/20"
      >
        {name}
      </Badge>
    </Link>
  );
};

import Link from "next/link";
import { Badge } from "../ui/badge";
import { FC } from "react";

type BaseTagProps = {
  href: string;
  name: string;
  variant: "default" | "secondary" | "outline" | "destructive" | "categories" | "mainCategories";
};
export const BaseTag: FC<BaseTagProps> = ({ href, name, variant }) => {
  return (
    <Link href={href}>
      <Badge
        variant={variant}
      >
        {name}
      </Badge>
    </Link>
  );
};

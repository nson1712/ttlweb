import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

type NotFoundProps = {
  href?: string;
  title?: string;
};
export const NotFound: FC<NotFoundProps> = ({ href, title }) => {
  return (
    <div className="flex flex-col items-center justify-center backdrop-blur-sm">
      <Image
        className="aspect-square"
        src="/swordsman.png"
        alt="swordsman"
        width={350}
        height={350}
      />
      {title && (
        <Link
          href={href ?? "/"}
          className="mt-4 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-2 text-sm font-medium text-white"
        >
          {title}
        </Link>
      )}
    </div>
  );
};

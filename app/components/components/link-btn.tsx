import Link from "next/link";
import { FC } from "react";

type LinkButtonProps = {
  href: string;
  label: string;
}
export const LinkButton: FC<LinkButtonProps> = ({href, label}) => {
  return(
    <div className="mt-4 text-center">
        <Link
          href={href}
          className="inline-block bg-gray-800 border border-slate-700 rounded-md w-full px-4 py-2 text-base font-medium text-emerald-400 transition-colors hover:bg-gray-800 hover:text-emerald-300"
        >
          {label}
        </Link>
      </div>
  )
}
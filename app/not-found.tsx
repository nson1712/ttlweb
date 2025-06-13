import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center backdrop-blur-sm">
      <Image
        className="aspect-square"
        src="/page-not-found.png"
        alt="swordsman"
        width={350}
        height={350}
      />
      <Link
        href="/"
        className="mt-4 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-2 text-sm font-medium text-white"
      >
        Quay lại trang chủ
      </Link>
    </div>
  );
}

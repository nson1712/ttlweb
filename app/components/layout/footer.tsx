"use client";

import { FC, useState, useEffect, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  Clock,
  Home,
  Compass,
  Headphones,
  FileQuestion,
  Facebook,
  BookMarked,
  ArrowUp,
  Heart,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { SettingsContext, Theme } from "@/app/context/setting-context";

export const Footer: FC = () => {
  const { theme } = useContext(SettingsContext);

  // MAPS
  const bgMap: Record<Theme, string> = {
    light: "bg-gray-100",
    dark: "bg-gray-900",
    sepia: "bg-[#f4ead2]",
  };
  const borderMap: Record<Theme, string> = {
    light: "border-gray-200",
    dark: "border-gray-800",
    sepia: "border-[#e8d9c0]",
  };
  const textMap: Record<Theme, string> = {
    light: "text-gray-700",
    dark: "text-gray-400",
    sepia: "text-[#7a6f49]",
  };
  const logoGradient: Record<Theme, string> = {
    light: "from-gray-900 to-gray-700",
    dark: "from-white to-gray-300",
    sepia: "from-[#5f4b32] to-[#7a6f49]",
  };
  const scrollBtnGradient: Record<Theme, string> = {
    light: "from-green-600 to-cyan-600",
    dark: "from-emerald-500 to-teal-600",
    sepia: "from-emerald-400 to-teal-500",
  };
  const scrollBtnRing: Record<Theme, string> = {
    light: "focus:ring-green-400",
    dark: "focus:ring-emerald-400",
    sepia: "focus:ring-emerald-300",
  };

  const [showScrollTop, setShowScrollTop] = useState(false);
  const year = new Date().getFullYear();

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative">
      {/* Scroll-to-top */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={cn(
          "fixed bottom-6 right-6 z-50 p-3 rounded-full bg-gradient-to-br text-white shadow-lg transition-all duration-300 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2",
          scrollBtnGradient[theme ?? "dark"]
            ? `bg-gradient-to-br ${scrollBtnGradient[theme ?? "dark"]}`
            : "",
          scrollBtnRing[theme ?? "dark"],
          showScrollTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        )}
      >
        <ArrowUp className="h-5 w-5" />
      </button>

      {/* Main Footer */}
      <div
        className={cn(
          "pt-16 pb-12 border-t",
          bgMap[theme ?? "dark"],
          borderMap[theme ?? "dark"]
        )}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Branding */}
            <div>
              <Link href="/" className="flex items-center gap-2 mb-4">
                <Image
                  src="/favicon.ico"
                  alt="favicon"
                  width={60}
                  height={50}
                  className="rounded"
                />
                <span
                  className={cn(
                    "text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r",
                    logoGradient[theme ?? "dark"]
                  )}
                >
                  Tàng Thư Lâu
                </span>
              </Link>
              <p className={textMap[theme ?? "dark"]}>
                Nền tảng số 1 dành cho những độc giả yêu thích thể loại truyện
                Nam Chủ
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h3
                className={cn(
                  "flex items-center mb-6 text-lg font-semibold",
                  textMap[theme ?? "dark"]
                )}
              >
                <Compass className="mr-2 h-5 w-5 text-emerald-400" />
                Điều hướng
              </h3>
              <div className="space-y-3">
                <FooterLink
                  href="/"
                  icon={<Home size={16} />}
                  theme={theme ?? "dark"}
                >
                  Trang chủ
                </FooterLink>
                <FooterLink
                  href="/truyen"
                  icon={<BookOpen size={16} />}
                  theme={theme ?? "dark"}
                >
                  Danh sách truyện
                </FooterLink>
                <FooterLink
                  href="/moi-cap-nhat"
                  icon={<Clock size={16} />}
                  theme={theme ?? "dark"}
                >
                  Truyện mới cập nhật
                </FooterLink>
                <FooterLink
                  href="/the-loai"
                  icon={<BookMarked size={16} />}
                  theme={theme ?? "dark"}
                >
                  Thể loại truyện
                </FooterLink>
              </div>
            </div>

            {/* Support */}
            <div>
              <h3
                className={cn(
                  "flex items-center mb-6 text-lg font-semibold",
                  textMap[theme ?? "dark"]
                )}
              >
                <Headphones className="mr-2 h-5 w-5 text-emerald-400" />
                Hỗ trợ
              </h3>
              <div className="space-y-3">
                <FooterLink
                  href="https://m.me/620462677825010"
                  icon={<Facebook size={16} />}
                  target="_blank"
                  theme={theme ?? "dark"}
                >
                  Chat với chúng tôi
                </FooterLink>
                <FooterLink
                  href="/faq"
                  icon={<FileQuestion size={16} />}
                  theme={theme ?? "dark"}
                >
                  FAQ
                </FooterLink>
              </div>
            </div>
          </div>

          <p
            className={cn(
              "mb-6 text-sm leading-relaxed",
              textMap[theme ?? "dark"]
            )}
          >
            Người dùng phải tuân thủ đầy đủ mọi quy định pháp luật và quy định
            quốc gia khi chia sẻ nội dung trên nền tảng. Bất kỳ bài viết, hình
            ảnh hay bình luận nào vi phạm thuần phong mỹ tục, chứa nội dung bạo
            lực hoặc không hợp pháp sẽ bị xóa bỏ ngay lập tức. Mọi quyền sở hữu
            trí tuệ đối với tiểu thuyết, bài bình luận, ảnh hoặc tư liệu khác
            trên trang này đều thuộc về tác giả gốc. Nền tảng chỉ đóng vai trò
            làm công cụ lưu trữ và hiển thị—mọi nội dung đều do người dùng tải
            lên. Trong trường hợp có đơn khiếu nại liên quan đến bất kỳ cá nhân
            hay tổ chức nào, chúng tôi sẽ phối hợp xác minh và gỡ bỏ nội dung vi
            phạm ngay khi nhận được yêu cầu.
          </p>

          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className={cn("text-sm", textMap[theme ?? "dark"])}>
              &copy; {year} TangThuLau. All rights reserved.
            </p>
            <span
              className={cn(
                "text-sm flex items-center",
                textMap[theme ?? "dark"]
              )}
            >
              Made with
              <Heart className="mx-1 h-4 w-4 text-red-500" />
              by Tàng Thư Lâu
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Footer link helper
type FooterLinkProps = {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  target?: string;
  theme: Theme;
};
const FooterLink: FC<FooterLinkProps> = ({
  href,
  icon,
  children,
  target,
}) => (
  <Link
    href={href}
    target={target}
    className={cn(
      "flex items-center gap-2 transition-colors hover:text-emerald-500"
    )}
  >
    {icon}
    {children}
  </Link>
);

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
// import Image from "next/image";
// import { motion } from "framer-motion";
import {
  BookOpen,
  Clock,
  Home,
  Compass,
  // Mail,
  // FileText,
  // Lightbulb,
  // Facebook,
  // Twitter,
  // Instagram,
  Heart,
  ArrowUp,
  // Globe,
  // Shield,
  BookMarked,
  Headphones,
  Facebook,
  FileQuestion,
} from "lucide-react";
import { cn } from "../../lib/utils";
import Image from "next/image";

export function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [year] = useState(new Date().getFullYear());

  // Handle scroll effect for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 300;
      if (isScrolled !== showScrollTop) {
        setShowScrollTop(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showScrollTop]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative">
      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className={cn(
          "fixed bottom-6 right-6 z-50 p-3 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg transition-all duration-300 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2",
          showScrollTop
            ? "opacity-100 translate-y-0 cursor-pointer"
            : "opacity-0 translate-y-10 pointer-events-none"
        )}
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5" />
      </button>

      {/* Newsletter section */}
      {/* <div className="bg-gradient-to-r from-gray-800 to-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Stay Updated with Latest Novels</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter and never miss new chapter releases, novel announcements, and exclusive content.
            </p>
            <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                required
              />
              <button 
                type="submit" 
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 shadow-md"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div> */}

      {/* Main footer content */}
      <div className="bg-gray-900 pt-16 pb-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* About section */}
            <div>
              <Link href="/" className="relative z-10 flex">
            <Image className="aspect-[6/5]" src="/favicon.ico" alt="favicon-ttl" width={60} height={50} />
            <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent self-center">
                Tàng Thư Lâu
              </span>
          </Link>
              <p className="text-gray-400 mb-6">
                Nền tảng số 1 dành cho những độc giả yêu thích thể loại truyện
                Nam Chủ
              </p>

              {/* <div className="flex space-x-4">
                <SocialLink href="https://facebook.com" icon={<Facebook size={18} />} label="Facebook" />
                <SocialLink href="https://twitter.com" icon={<Twitter size={18} />} label="Twitter" />
                <SocialLink href="https://instagram.com" icon={<Instagram size={18} />} label="Instagram" />
              </div> */}
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white text-lg font-semibold mb-6 flex items-center">
                <Compass className="mr-2 h-5 w-5 text-emerald-400" />
                Điều hướng
              </h3>
              <div className="space-y-3">
                <FooterLink href="/" icon={<Home size={16} />}>
                  Trang chủ
                </FooterLink>
                <FooterLink href="/truyen" icon={<BookOpen size={16} />}>
                  Danh sách truyện
                </FooterLink>
                <FooterLink href="/moi-cap-nhat" icon={<Clock size={16} />}>
                  Truyện mới cập nhật
                </FooterLink>
                {/* <FooterLink href="/popular" icon={<Flame size={16} />}>Truyện nổi bật</FooterLink> */}
                <FooterLink href="/the-loai" icon={<BookMarked size={16} />}>
                  Thể loại truyện
                </FooterLink>
              </div>
            </div>

            <div>
              <h3 className="text-white text-lg font-semibold mb-6 flex items-center">
                <Headphones className="mr-2 h-5 w-5 text-emerald-400" />
                Hỗ trợ
              </h3>
              <div className="space-y-3">
                <FooterLink
                  href="https://m.me/620462677825010"
                  target="_blank"
                  icon={<Facebook size={16} />}
                >
                  Chat với chúng tôi
                </FooterLink>
                <FooterLink href="/faq" icon={<FileQuestion size={16} />}>
                  FAQ
                </FooterLink>
              </div>
            </div>

            {/* Information */}
            {/* <div>
              <h3 className="text-white text-lg font-semibold mb-6 flex items-center">
                <FileText className="mr-2 h-5 w-5 text-emerald-400" />
                Thông tin
              </h3>
              <ul className="space-y-3">
                <FooterLink href="/contacts" icon={<Mail size={16} />}>Liên hệ</FooterLink>
                <FooterLink href="/rules" icon={<Shield size={16} />}>Chính sách</FooterLink>
                <FooterLink href="/faq" icon={<Globe size={16} />}>FAQ</FooterLink>
                <FooterLink href="/about" icon={<Heart size={16} />}>Về chúng tôi</FooterLink>
              </ul>
            </div> */}
          </div>
          <p className="text-gray-400 mb-6">
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

          {/* Bottom section */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 mb-4 md:mb-0">
              <p className="text-sm text-gray-400">
                &copy; {year} TangThuLau. All rights reserved.
              </p>
              {/* <div className="flex space-x-4 text-sm text-gray-500">
                <Link href="/privacy" className="hover:text-emerald-400 transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-emerald-400 transition-colors">
                  Terms of Service
                </Link>
                <Link href="/dmca" className="hover:text-emerald-400 transition-colors">
                  DMCA
                </Link>
              </div> */}
            </div>

            <div className="text-sm text-gray-500">
              <span className="flex items-center">
                Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> by
                Tàng Thư Lâu
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Helper Components
// function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
//   return (
//     <Link
//       href={href}
//       className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-emerald-500 hover:text-white transition-all duration-200"
//       aria-label={label}
//     >
//       {icon}
//     </Link>
//   );
// }

function FooterLink({
  href,
  children,
  icon,
  target
}: {
  href: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  target?: string
}) {
  return (
    <Link
      href={href}
      target={target}
      className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center group"
    >
      <span className="mr-2 text-gray-500 group-hover:text-emerald-400 transition-colors">
        {icon}
      </span>
      {children}
    </Link>
  );
}

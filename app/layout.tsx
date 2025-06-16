import { ThemeProvider } from "next-themes";
import { MainLayout } from "../app/components/layout/main-layout";
import { ReactNode, Suspense } from "react";
import "./globals.css";
import { Metadata } from "next";
import Loading from "./components/components/loading";
import AntiTamper from "./components/layout/anti-tamper";

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.ico",
  },
  title:
    "Tàng Thư Lâu – Nơi hội tụ của đạo sĩ, kiếm khách, ma tôn và những độc giả không chịu sống đời phàm tục!",
  description:
    "Tàng Thư Lâu – Thư viện truyện tiên hiệp, kiếm hiệp đặc sắc dành cho nam giới. Cập nhật truyện mới mỗi ngày, đa dạng thể loại: tiên hiệp, đô thị, lịch sử, huyền huyễn. Trải nghiệm đọc mượt mà, không quảng cáo gây phiền.",
  keywords:
    "truyện tiên hiệp, truyện kiếm hiệp, truyện full, truyện hoàn thành, truyện convert, truyện dịch, đọc truyện online, truyện đô thị, truyện huyền huyễn, truyện lịch sử, truyện nam",
  openGraph: {
    title:
      "Tàng Thư Lâu – Kho truyện tiên hiệp, kiếm hiệp dành cho độc giả đam mê tu tiên!",
    description:
      "Khám phá kho truyện tiên hiệp, kiếm hiệp đặc sắc – Nơi anh hùng xuất thế, đạo sĩ vấn đạo, ma tôn xưng bá! Truyện mới cập nhật liên tục, đọc miễn phí không giới hạn.",
    url: "https://tangthulau.com",
    siteName: "Tàng Thư Lâu",
    images: [
      {
        url: "/tang-thu-lau.jpg",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
    locale: "vi_VN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tàng Thư Lâu – Thư viện truyện tiên hiệp, kiếm hiệp đỉnh cao!",
    description:
      "Cập nhật nhanh các bộ truyện hot nhất thể loại tiên hiệp, kiếm hiệp, đô thị, lịch sử. Trải nghiệm đọc mượt mà, không quảng cáo. Truyện dành cho nam giới đam mê tu tiên và xưng bá thiên hạ.",
    images: ["/tang-thu-lau.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* <AntiTamper /> */}
      </head>

      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={<Loading />}>
            <MainLayout>{children}</MainLayout>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}

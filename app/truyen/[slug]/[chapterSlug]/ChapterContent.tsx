"use client";
import React, { useContext } from "react";
import Link from "next/link";
// import { Button } from "@/app/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  // Coins,
  List,
  // Lock,
} from "lucide-react";
import { cn } from "@/app/lib/utils";
import type { ChapterDetailType, ChapterType } from "@/app/types/chapter";
import { RangeSelect } from "@/app/components/components/range-select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { ChaptersApiResponse } from "@/app/interfaces/story";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/app/components/ui/breadcrumb";
import Loading from "@/app/components/components/loading";
import { ChapterList } from "@/app/components/components/chapter-list";
import { SettingsContext, Theme } from "@/app/context/setting-context";

interface Props {
  storySlug: string;
  storyTitle: string;
  chapterSlug: string;
  details: ChapterType;
  contents: ChapterDetailType[];
  prevSlug: string | null;
  nextSlug: string | null;
  chaptersList: ChaptersApiResponse;
}

export default function ChapterContent({
  storySlug,
  storyTitle,
  // chapterSlug,
  details,
  contents,
  prevSlug,
  nextSlug,
  chaptersList,
}: Props) {
  const { fontSize, paragraphSpacing, theme } = useContext(SettingsContext);

  const themeClasses: Record<Theme, string> = {
    light: "bg-white text-gray-900",
    dark: "bg-gray-900 text-gray-100",
    sepia: "bg-[#f8f1e3] text-[#5f4b32]",
  };

  const dialogBg: Record<Theme, string> = {
    light: "bg-white text-gray-900",
    dark: "bg-slate-900 text-white",
    sepia: "bg-[#f8f1e3] text-[#5f4b32]",
  };

  return (
    <div className={`${themeClasses[theme ?? "dark"]}`}>
      <div
        className={`relative mx-auto max-w-4xl py-8 space-y-6 text-lg break-words`}
      >
        <Breadcrumb className="flex w-full">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                className="text-gray-400 hover:text-emerald-500"
                href="/"
              >
                Trang chủ
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="max-w-36 sm:flex-none line-clamp-1">
              <BreadcrumbLink
                className="text-gray-400 hover:text-emerald-500"
                href={`/truyen/${storySlug}`}
              >
                {storyTitle}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="flex-1 line-clamp-1">
              <BreadcrumbPage className="text-emerald-500">
                {details.title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-2xl sm:text-3xl font-bold flex justify-center">
          {details.title}
        </h1>
        <div
          className={cn("prose max-w-none dark:prose-invert")}
          style={{ fontSize: `${fontSize}px` }}
        >
          {contents.map((c, idx) => (
            <p key={idx} style={{ marginBottom: `${paragraphSpacing}px` }}>
              {c.content}
            </p>
          ))}
        </div>
        {/* {details.price !== 0 ? (
        <div className="text-center py-10">
          <p className="mb-6 italic">Nội dung chương này đang bị khóa.</p>
          <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
            <Lock className="mr-2" />
            <Coins className="inline h-4 w-4 text-yellow-400" /> Mở khóa
          </Button>
        </div>
      ) : (
        <div>
          {contents.map((c, idx) => (
            <p key={idx}>{c.content}</p>
          ))}
        </div>
      )} */}

        <div className="mt-10 flex justify-between">
          <Link
            href={prevSlug ? `/truyen/${storySlug}/${prevSlug}` : "#"}
            className={cn(
              "hidden sm:flex items-center py-2 px-3 rounded font-medium select-none bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:scale-110 transition-transform duration-200",
              "transform transition-transform duration-100",
              "active:scale-95 active:shadow-inner",
              !prevSlug && "pointer-events-none opacity-50"
            )}
          >
            <ChevronLeft /> Chương trước
          </Link>

          <Link
            href={prevSlug ? `/truyen/${storySlug}/${prevSlug}` : "#"}
            className={cn(
              "flex sm:hidden items-center py-2 px-3 rounded font-medium select-none bg-gradient-to-r from-emerald-500 to-teal-600",
              !prevSlug && "pointer-events-none opacity-50"
            )}
          >
            <ChevronLeft className="text-white" />
          </Link>

          <Dialog>
            <DialogTrigger>
              <div className="cursor-pointer border-1 rounded-md p-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:scale-110 transition-transform duration-200 active:scale-95 active:shadow-inner">
                <List className="w-8 h-8" />
              </div>
            </DialogTrigger>
            <DialogContent
              className={cn(dialogBg[theme ?? "dark"], "h-[95vh] max-h-[95vh]")}
            >
              <DialogHeader>
                <DialogTitle>Danh sách chương</DialogTitle>
              </DialogHeader>
              <div className="flex-1 overflow-y-auto space-y-1.5 mb-4">
                {!chaptersList ? (
                  <Loading />
                ) : (
                  <ChapterList
                    chapters={chaptersList?.data?.data ?? []}
                    storySlug={storySlug}
                  />
                )}
              </div>
              <div className="mx-auto min-w-52">
                <RangeSelect
                  pageSearchParam="page"
                  totalCount={chaptersList?.data?.totalElements}
                />
              </div>
            </DialogContent>
          </Dialog>

          <Link
            href={nextSlug ? `/truyen/${storySlug}/${nextSlug}` : "#"}
            className={cn(
              "hidden sm:flex items-center py-2 px-3 rounded font-medium select-none bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:scale-110 transition-transform duration-200",
              "transform transition-transform duration-100",
              "active:scale-95 active:shadow-inner",
              !nextSlug && "pointer-events-none opacity-50"
            )}
          >
            Chương tiếp <ChevronRight />
          </Link>
          <Link
            href={nextSlug ? `/truyen/${storySlug}/${nextSlug}` : "#"}
            className={cn(
              "flex sm:hidden items-center py-2 px-3 rounded font-medium select-none bg-gradient-to-r from-emerald-500 to-teal-600 shadow-lg",
              "transform transition-transform duration-100",
              "active:scale-95 active:shadow-inner",
              !nextSlug && "pointer-events-none opacity-50"
            )}
          >
            <ChevronRight className="text-white" />
          </Link>
        </div>
      </div>
    </div>
  );
}

// "use client";
// import React, { useContext, useState } from "react";
// import Link from "next/link";
// import { ChevronLeft, ChevronRight, List } from "lucide-react";
// import { cn } from "@/app/lib/utils";
// import type { ChapterDetailType, ChapterType } from "@/app/types/chapter";
// import { RangeSelect } from "@/app/components/components/range-select";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/app/components/ui/dialog";
// import { ChaptersApiResponse } from "@/app/interfaces/story";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/app/components/ui/breadcrumb";
// import Loading from "@/app/components/components/loading";
// import { ChapterList } from "@/app/components/components/chapter-list";
// import { SettingsContext, Theme } from "@/app/context/setting-context";

// interface Props {
//   storySlug: string;
//   storyTitle: string;
//   chapterSlug: string;
//   details: ChapterType;
//   contents: ChapterDetailType[];
//   prevSlug: string | null;
//   nextSlug: string | null;
//   chaptersList: ChaptersApiResponse;
// }

// export default function ChapterContent({
//   storySlug,
//   storyTitle,
//   details,
//   contents,
//   prevSlug,
//   nextSlug,
//   chaptersList,
// }: Props) {
//   const { fontSize, paragraphSpacing, theme } = useContext(SettingsContext);
//   const [overlayVisible, setOverlayVisible] = useState(false);

//   // useEffect(() => {
//   //   const showOverlay = () => setOverlayVisible(true);

//   //   // 1) PrintScreen (keydown catches both tap & hold)
//   //   const onKeyDown = (e: KeyboardEvent) => {
//   //     if (e.key === "PrintScreen") {
//   //       showOverlay();
//   //     }
//   //     // 2) Win/Cmd + Shift + S
//   //     if (
//   //       (e.metaKey || e.ctrlKey) &&
//   //       e.shiftKey &&
//   //       e.key.toLowerCase() === "s"
//   //     ) {
//   //       showOverlay();
//   //     }
//   //   };

//   //   // 3) Snipping tools / window loses focus
//   //   const onBlur = () => showOverlay();

//   //   // 4) DevTools open detection
//   //   const devtoolsInterval = setInterval(() => {
//   //     const threshold = 160;
//   //     if (
//   //       window.outerWidth - window.innerWidth > threshold ||
//   //       window.outerHeight - window.innerHeight > threshold
//   //     ) {
//   //       showOverlay();
//   //     }
//   //   }, 500);

//   //   window.addEventListener("keydown", onKeyDown);
//   //   window.addEventListener("blur", onBlur);

//   //   return () => {
//   //     window.removeEventListener("keydown", onKeyDown);
//   //     window.removeEventListener("blur", onBlur);
//   //     clearInterval(devtoolsInterval);
//   //   };
//   // }, []);

//   const themeClasses: Record<Theme, string> = {
//     light: "bg-white text-gray-900",
//     dark: "bg-gray-900 text-gray-100",
//     sepia: "bg-[#f8f1e3] text-[#5f4b32]",
//   };

//   const dialogBg: Record<Theme, string> = {
//     light: "bg-white text-gray-900",
//     dark: "bg-slate-900 text-white",
//     sepia: "bg-[#f8f1e3] text-[#5f4b32]",
//   };

//   return (
//     <div className={`${themeClasses[theme ?? "dark"]}`}>
//       <div className="relative mx-auto max-w-4xl py-8 space-y-6 text-lg break-words">
//         {/* Breadcrumb */}
//         <Breadcrumb className="flex w-full">
//           <BreadcrumbList>
//             <BreadcrumbItem>
//               <BreadcrumbLink
//                 href="/"
//                 className="text-gray-400 hover:text-emerald-500"
//               >
//                 Trang chủ
//               </BreadcrumbLink>
//             </BreadcrumbItem>
//             <BreadcrumbSeparator />
//             <BreadcrumbItem className="flex-1 sm:flex-none line-clamp-1">
//               <BreadcrumbLink
//                 href={`/truyen/${storySlug}`}
//                 className="text-gray-400 hover:text-emerald-500"
//               >
//                 {storyTitle}
//               </BreadcrumbLink>
//             </BreadcrumbItem>
//             <BreadcrumbSeparator />
//             <BreadcrumbItem className="flex-1 line-clamp-1">
//               <BreadcrumbPage className="text-emerald-500">
//                 {details.title}
//               </BreadcrumbPage>
//             </BreadcrumbItem>
//           </BreadcrumbList>
//         </Breadcrumb>

//         {/* Chapter title */}
//         <h1 className="text-2xl sm:text-3xl font-bold flex justify-center">
//           {details.title}
//         </h1>

//         {/* Content paragraphs */}
//         <div
//           className={cn("prose max-w-none dark:prose-invert")}
//           style={{ fontSize: `${fontSize}px` }}
//         >
//           {contents.map((c, idx) => (
//             <p key={idx} style={{ marginBottom: `${paragraphSpacing}px` }}>
//               {c.content}
//             </p>
//           ))}
//         </div>

//         {/* Navigation buttons */}
//         <div className="mt-10 flex justify-between">
//           {/* Prev */}
//           <Link
//             href={prevSlug ? `/truyen/${storySlug}/${prevSlug}` : "#"}
//             className={cn(
//               "hidden sm:flex items-center py-2 px-3 rounded font-medium select-none bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:scale-110 transition-transform duration-200 active:scale-95 active:shadow-inner",
//               !prevSlug && "pointer-events-none opacity-50"
//             )}
//           >
//             <ChevronLeft /> Chương trước
//           </Link>
//           <Link
//             href={prevSlug ? `/truyen/${storySlug}/${prevSlug}` : "#"}
//             className={cn(
//               "flex sm:hidden items-center py-2 px-3 rounded font-medium select-none bg-gradient-to-r from-emerald-500 to-teal-600",
//               !prevSlug && "pointer-events-none opacity-50"
//             )}
//           >
//             <ChevronLeft className="text-white" />
//           </Link>

//           {/* Chapter list dialog */}
//           <Dialog>
//             <DialogTrigger>
//               <div className="cursor-pointer rounded-md p-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:scale-110 transition-transform duration-200 active:scale-95 active:shadow-inner">
//                 <List className="w-8 h-8" />
//               </div>
//             </DialogTrigger>
//             <DialogContent
//               className={cn(dialogBg[theme ?? "dark"], "h-[95vh] max-h-[95vh]")}
//             >
//               <DialogHeader>
//                 <DialogTitle>Danh sách chương</DialogTitle>
//               </DialogHeader>
//               <div className="flex-1 overflow-y-auto space-y-1.5 mb-4">
//                 {!chaptersList ? (
//                   <Loading />
//                 ) : (
//                   <ChapterList
//                     chapters={chaptersList.data.data}
//                     storySlug={storySlug}
//                   />
//                 )}
//               </div>
//               <div className="mx-auto min-w-52">
//                 <RangeSelect
//                   pageSearchParam="page"
//                   totalCount={chaptersList.data.totalElements}
//                 />
//               </div>
//             </DialogContent>
//           </Dialog>

//           {/* Next */}
//           <Link
//             href={nextSlug ? `/truyen/${storySlug}/${nextSlug}` : "#"}
//             className={cn(
//               "hidden sm:flex items-center py-2 px-3 rounded font-medium select-none bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:scale-110 transition-transform duration-200 active:scale-95 active:shadow-inner",
//               !nextSlug && "pointer-events-none opacity-50"
//             )}
//           >
//             Chương tiếp <ChevronRight />
//           </Link>
//           <Link
//             href={nextSlug ? `/truyen/${storySlug}/${nextSlug}` : "#"}
//             className={cn(
//               "flex sm:hidden items-center py-2 px-3 rounded font-medium select-none bg-gradient-to-r from-emerald-500 to-teal-600 shadow-lg",
//               !nextSlug && "pointer-events-none opacity-50"
//             )}
//           >
//             <ChevronRight className="text-white" />
//           </Link>
//         </div>
//       </div>

//       {/* Full-screen notice overlay */}
//       {overlayVisible && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 cursor-pointer"
//           onClick={() => setOverlayVisible(false)}
//         >
//           <div className="bg-white rounded-xl p-8 max-w-xs text-center shadow-2xl">
//             <p className="text-gray-900 text-lg font-medium">
//               Vui lòng bấm vào màn hình để đọc tiếp!
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

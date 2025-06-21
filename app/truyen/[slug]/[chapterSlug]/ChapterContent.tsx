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
import QuestionForm from "@/app/components/components/question-form";
import { useQuestionScheduler } from "@/app/hooks/useQuestionScheduler";

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
  const { question, onSuccess, initialized } = useQuestionScheduler(
    storySlug,
    details.order
  );

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

  if (!initialized) {
    return (
      <div className="flex justify-center py-20">
        <Loading />
      </div>
    );
  }

  if (question) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl sm:text-3xl font-bold flex justify-center">
          {details?.title}
        </h1>
        <QuestionForm question={question!} onSuccess={onSuccess} />
      </div>
    );
  }

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
                {details?.title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-2xl sm:text-3xl font-bold flex justify-center">
          {details?.title}
        </h1>
        <div
          className={cn("prose max-w-none dark:prose-invert")}
          style={{ fontSize: `${fontSize}px` }}
        >
          {contents?.map((c) => (
            <p key={c?.id} style={{ marginBottom: `${paragraphSpacing}px` }}>
              {c?.content}
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
              "flex items-center py-2 px-3 rounded font-medium select-none bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:scale-110 transition-transform duration-200",
              "transform transition-transform duration-100",
              "active:scale-95 active:shadow-inner",
              !prevSlug && "pointer-events-none opacity-50"
            )}
          >
            <ChevronLeft />{" "}
            <span className="hidden sm:block">Chương trước</span>
          </Link>

          <Dialog>
            <DialogTrigger>
              <div className="cursor-pointer rounded-md p-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:scale-110 transition-transform duration-200 active:scale-95 active:shadow-inner">
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
              "flex items-center py-2 px-3 rounded font-medium select-none bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:scale-110 transition-transform duration-200",
              "transform transition-transform duration-100",
              "active:scale-95 active:shadow-inner",
              !nextSlug && "pointer-events-none opacity-50"
            )}
          >
            <span className="hidden sm:block">Chương tiếp</span>{" "}
            <ChevronRight />
          </Link>
        </div>
      </div>
    </div>
  );
}

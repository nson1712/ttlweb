"use client";
import React from "react";
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
  return (
    <div className="mx-auto max-w-4xl py-8 space-y-6 text-lg break-words">
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
          <BreadcrumbItem>
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
      <div>
        {contents.map((c, idx) => (
          <p key={idx}>{c.content}</p>
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
            "hidden sm:flex items-center py-2 px-3 rounded font-medium select-none bg-gradient-to-r from-emerald-500 to-teal-600",
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
          <ChevronLeft />
        </Link>

        <Dialog>
          <DialogTrigger>
            <div className="cursor-pointer border-1 border-slate-400 rounded-md p-1 hover:bg-slate-700">
              <List />
            </div>
          </DialogTrigger>
          <DialogContent className="bg-slate-900 h-[95vh] max-h-[95vh]">
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
            "hidden sm:flex items-center py-2 px-3 rounded font-medium select-none bg-gradient-to-r from-emerald-500 to-teal-600",
            !nextSlug && "pointer-events-none opacity-50"
          )}
        >
          Chương tiếp <ChevronRight />
        </Link>
        <Link
          href={nextSlug ? `/truyen/${storySlug}/${nextSlug}` : "#"}
          className={cn(
            "flex sm:hidden items-center py-2 px-3 rounded font-medium select-none bg-gradient-to-r from-emerald-500 to-teal-600",
            !nextSlug && "pointer-events-none opacity-50"
          )}
        >
          <ChevronRight />
        </Link>
      </div>
    </div>
  );
}

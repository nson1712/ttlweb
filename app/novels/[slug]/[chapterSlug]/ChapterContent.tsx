"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Coins,
  List,
  Lock,
  LockKeyhole,
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
import { LoadingSpinner } from "@/app/components/components/loading";

interface Props {
  novelSlug: string;
  chapterSlug: string;
  details: ChapterType;
  contents: ChapterDetailType[];
  prevSlug: string | null;
  nextSlug: string | null;
  chaptersList: ChaptersApiResponse;
}

export default function ChapterContent({
  novelSlug,
  // chapterSlug,
  details,
  contents,
  prevSlug,
  nextSlug,
  chaptersList,
}: Props) {
  return (
    <div className="mx-auto max-w-4xl py-8 space-y-6 text-lg">
      <h1 className="text-2xl sm:text-3xl font-bold flex justify-center">
        {details.title}
      </h1>
      {details.price !== 0 ? (
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
      )}

      <div className="mt-10 flex justify-between">
        <Link
          href={prevSlug ? `/novels/${novelSlug}/${prevSlug}` : "#"}
          className={cn(
            "flex items-center py-2 px-3 rounded font-medium select-none bg-gradient-to-r from-emerald-400 to-teal-500",
            !prevSlug && "pointer-events-none opacity-50"
          )}
        >
          <ChevronLeft /> Chương trước
        </Link>

        <Dialog>
          <DialogTrigger>
            <div className="cursor-pointer border-1 border-slate-400 rounded-md p-1 hover:bg-slate-700">
              <List />
            </div>
          </DialogTrigger>
          <DialogContent className="bg-slate-900 h-auto max-h-[95%]">
            <DialogHeader>
              <DialogTitle>Danh sách chương</DialogTitle>
            </DialogHeader>
            <div>
              {!chaptersList ? (
                <LoadingSpinner className="" />
              ) : (
                <div className="space-y-1.5 mb-4 max-h-[20%] overflow-y-auto">
                  {chaptersList?.data?.data?.map((chapter) => (
                    <Link
                      key={chapter?.id}
                      href={`/novels/${novelSlug}/${chapter?.slug}`}
                      className={
                        "group block rounded-lg bg-gray-700/50 p-3 hover:bg-gray-700"
                      }
                    >
                      <div className={"flex items-center justify-between"}>
                        <div className={"flex-1"}>
                          <h3 className="font-medium text-emerald-400 group-hover:text-emerald-300 line-clamp-1">
                            {chapter?.title}
                          </h3>

                          <div
                            className={
                              "flex items-center gap-3 text-xs text-gray-400"
                            }
                          >
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>{chapter?.createdAt}</span>
                            </div>
                          </div>
                        </div>

                        <div className="ml-4 flex items-center gap-2">
                          {chapter?.price !== 0 && (
                            <span className="p-0.5 text-xs font-medium text-emerald-400">
                              <LockKeyhole className="h-5 w-5 text-emerald-400" />
                            </span>
                          )}
                          <ChevronRight className="h-5 w-5 text-gray-500 group-hover:text-emerald-400" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
              <div className="mx-auto">
                <RangeSelect
                  pageSearchParam="page"
                  totalCount={chaptersList?.data?.totalElements}
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Link
          href={nextSlug ? `/novels/${novelSlug}/${nextSlug}` : "#"}
          className={cn(
            "flex items-center py-2 px-3 rounded font-medium select-none bg-gradient-to-r from-emerald-400 to-teal-500",
            !nextSlug && "pointer-events-none opacity-50"
          )}
        >
          Chương tiếp <ChevronRight />
        </Link>
      </div>
    </div>
  );
}

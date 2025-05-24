'use client';
import React from 'react';
import Link from 'next/link';
import { Button } from '@/app/components/ui/button';
import { ChevronLeft, ChevronRight, Coins, Lock } from 'lucide-react';
import { cn } from '@/app/lib/utils';
import type { ChapterDetailType, ChapterType } from '@/app/types/chapter';

interface Props {
  novelSlug: string;
  chapterSlug: string;
  details: ChapterType;
  contents: ChapterDetailType[];
  prevSlug: string | null;
  nextSlug: string | null;
}

export default function ChapterContent({
  novelSlug,
  // chapterSlug,
  details,
  contents,
  prevSlug,
  nextSlug,
}: Props) {
  return (
    <div className="prose mx-auto max-w-3xl py-8">
      <h1 className="text-2xl font-bold">{details.title}</h1>

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
          href={prevSlug ? `/novels/${novelSlug}/${prevSlug}` : '#'}
          className={cn(
            'flex items-center gap-2',
            !prevSlug && 'pointer-events-none opacity-50'
          )}
        >
          <ChevronLeft /> Previous
        </Link>

        <Link
          href={nextSlug ? `/novels/${novelSlug}/${nextSlug}` : '#'}
          className={cn(
            'flex items-center gap-2',
            !nextSlug && 'pointer-events-none opacity-50'
          )}
        >
          Next <ChevronRight />
        </Link>
      </div>
    </div>
  );
}
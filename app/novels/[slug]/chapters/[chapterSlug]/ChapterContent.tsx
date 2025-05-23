'use client';
import React from 'react';
// import Link from 'next/link';
// import { ChevronLeft, ChevronRight, Lock, Coins } from 'lucide-react';
// import { Button } from '@/app/components/ui/button';
// import { cn } from '@/app/lib/utils';
import type { ChapterDetailType, ChapterType } from '@/app/types/chapter';
import { Button } from '@/app/components/ui/button';
import { ChevronLeft, ChevronRight, Coins, Lock } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { cn } from '@/app/lib/utils';

interface Props {
  details: ChapterType;
  contents: ChapterDetailType[];
}

export default function ChapterDetailClient({ details, contents }: Props) {
  const params = useParams();
  const {slug} = params
  // const [coins, setCoins] = useState(500);
  // const [unlocked, setUnlocked] = useState(false);

  // const toggleUnlock = () => {
  //   if (coins >= details.lockedCoinAmount) {
  //     setCoins(coins - details.lockedCoinAmount);
  //     setUnlocked(true);
  //   } else {
  //     alert(`Bạn cần thêm ${details.lockedCoinAmount - coins} coins.`);
  //   }
  // };

  return (
    <div className="prose mx-auto max-w-3xl py-8">
      <h1 className="text-2xl font-bold">{details.title}</h1>
      <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
        {/* <span>{details.releaseDate}</span> */}
      </div>

      {details.price !== 0 ? (
        <div className="text-center py-10">
          <p className="mb-6 italic">Nội dung chương này đang bị khóa.</p>
          <Button
            // onClick={toggleUnlock}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
          >
            <Lock className="mr-2" />
            {/* Mở khóa ({details.lockedCoinAmount}{' '} */}
            <Coins className="inline h-4 w-4 text-yellow-400" />
            {/* ) */}
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
          href={`/novels/${slug}/chapters/${details.prevChapterId}`}
          className={cn(
            'flex items-center gap-2',
            details.order === 1 && 'pointer-events-none opacity-50'
          )}
        >
          <ChevronLeft /> Previous
        </Link>
        <Link
          href={`/novels/${details.slug}/chapters/${details.nextChapterId}`}
          className={cn(
            'flex items-center gap-2',
            // details.isLast && 'pointer-events-none opacity-50'
          )}
        >
          Next <ChevronRight />
        </Link>
      </div>
    </div>
  );
}
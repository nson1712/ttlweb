"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, BookOpen, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/button';
export default function LatestReadingSection() {
  // Mock data for latest reading - only showing the most recent one
  const latestReading = {
    id: 1,
    novel: 'The Shadow Throne',
    novelSlug: 'shadow-throne',
    coverImage: '/1742474407_the-empty-box-and-zeroth-maria.webp',
    chapter: 'Chapter 76: The Awakening',
    chapterNumber: 76,
    progress: 65,
    lastReadAt: '2 hours ago',
    status: 'in-progress',
    author: 'Solver Keter',
    description: 'The kingdom is on the brink of collapse as dark forces gather. Prince Alistair must navigate court intrigue and ancient magic to reclaim his birthright.',
    totalChapters: 120
  };

  return (
    <section className="mb-8">
      <h2 className="flex items-center justify-center bg-gray-800 py-4 mb-4">
        <div className="flex items-center w-full max-w-screen-md px-4">
          <div className="flex-grow h-0.5 bg-gradient-to-l from-green-300 to-transparent"></div>
          <span className="mx-4 text-xl font-semibold text-gray-300">
            Continue Reading
          </span>
          <div className="flex-grow h-0.5 bg-gradient-to-r from-green-300 to-transparent"></div>
        </div>
      </h2>
      
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-800/90 to-gray-900 shadow-xl border border-gray-800 hover:border-emerald-500/30 transition-all duration-300">
        {/* Background glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/10 via-transparent to-emerald-500/10 rounded-xl blur-xl opacity-70"></div>
        
        {/* Content */}
        <div className="relative p-6 flex flex-col md:flex-row gap-6">
          {/* Cover Image with Progress */}
          <div className="relative mx-auto md:mx-0 w-40 md:w-48 flex-shrink-0">
            <div className="aspect-[3/4] overflow-hidden rounded-lg shadow-lg">
              <Image
                src={latestReading.coverImage || "/placeholder-cover.jpg"}
                alt={latestReading.novel}
                width={192}
                height={256}
                className="h-full w-full object-cover"
                priority
              />
            </div>
            
            {/* Reading Progress Indicator */}
            <div className="absolute -bottom-2 left-0 right-0 mx-auto w-11/12 bg-gray-800/90 rounded-full p-1 backdrop-blur-sm border border-gray-700">
              <div className="flex items-center justify-between px-2 text-xs">
                <span className="text-emerald-400 font-medium">{latestReading.progress}%</span>
                <span className="text-gray-400">Chapter {latestReading.chapterNumber}/{latestReading.totalChapters}</span>
              </div>
              <div className="h-1.5 bg-gray-700 rounded-full mt-1 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                  style={{ width: `${latestReading.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          {/* Novel Info */}
          <div className="flex-1 space-y-3">
            <div>
              <h3 className="text-2xl font-bold text-white">
                {latestReading.novel}
              </h3>
              <div className="flex items-center gap-3 mt-1">
                <div className="flex items-center gap-1 text-sm text-gray-300">
                  <BookOpen className="h-4 w-4 text-emerald-400" />
                  <span>{latestReading.author}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-300">
                  <Clock className="h-4 w-4 text-emerald-400" />
                  <span>Last read {latestReading.lastReadAt}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
              <h4 className="text-emerald-400 font-medium mb-1">{latestReading.chapter}</h4>
              <p className="text-gray-300 text-sm line-clamp-2">{latestReading.description}</p>
            </div>
            
            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                asChild
                className="rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-2 text-sm font-medium text-white hover:from-emerald-600 hover:to-teal-600 transition-all duration-300"
              >
                <Link href={`/novels/${latestReading.novelSlug}/chapters/${latestReading.chapterNumber}`}>
                  Continue Reading <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              
              <Button
                asChild
                variant="outline"
                className="rounded-full border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                <Link href={`/novels/${latestReading.novelSlug}`}>
                  Novel Details
                </Link>
              </Button>
              
              <Button
                asChild
                variant="ghost"
                className="rounded-full text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300"
              >
                <Link href="/reading-history">
                  Reading History
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Reading Progress Bar at Bottom */}
        <div className="h-1 w-full bg-gradient-to-r from-emerald-500 to-teal-500 opacity-80"></div>
      </div>
    </section>
  );
}

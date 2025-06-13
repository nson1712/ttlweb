"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, BookOpen, ArrowRight, Star, Calendar, User } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';

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
    totalChapters: 120,
    rating: 4.7,
    categories: ['Fantasy', 'Adventure', 'Political'],
    readingTime: '12 minutes left'
  };

  return (
    <section className="mb-8">      
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-2xl border border-gray-800 hover:border-emerald-500/30 transition-all duration-300 group">
        {/* Background glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/10 via-transparent to-emerald-500/10 rounded-xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        {/* Content */}
        <div className="relative p-8 flex flex-col md:flex-row gap-8">
          {/* Cover Image with Progress */}
          <div className="relative mx-auto md:mx-0 w-48 md:w-56 flex-shrink-0">
            <div className="aspect-[3/4] overflow-hidden rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/20 group-hover:shadow-[0_0_25px_rgba(16,185,129,0.25)] transition-all duration-500">
              <Image
                src={latestReading.coverImage || "/placeholder-cover.jpg"}
                alt={latestReading.novel}
                width={224}
                height={336}
                unoptimized
                className="h-full w-full object-cover"
                priority
              />
              
              {/* Rating badge */}
              <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                <span className="text-xs font-medium text-white">{latestReading.rating.toFixed(1)}</span>
              </div>
            </div>
            
            {/* Reading Progress Indicator */}
            <div className="absolute -bottom-3 left-0 right-0 mx-auto w-11/12 bg-gray-900/90 backdrop-blur-md rounded-lg p-2 shadow-lg border border-gray-800 group-hover:border-gray-700 transition-all duration-300">
              <div className="flex items-center justify-between px-1 text-xs">
                <span className="text-emerald-400 font-medium">{latestReading.progress}% Complete</span>
                <span className="text-gray-400">{latestReading.readingTime}</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full mt-1.5 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                  style={{ width: `${latestReading.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          {/* Novel Info */}
          <div className="flex-1 space-y-4">
            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                {latestReading.categories.map((category, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-gray-800/50 text-xs text-emerald-300 border-emerald-500/20 px-2 py-0.5"
                  >
                    {category}
                  </Badge>
                ))}
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-emerald-50 transition-colors duration-300">
                {latestReading.novel}
              </h3>
              
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2">
                <div className="flex items-center gap-1 text-sm text-gray-300">
                  <User className="h-4 w-4 text-emerald-400" />
                  <span>{latestReading.author}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-300">
                  <BookOpen className="h-4 w-4 text-emerald-400" />
                  <span>Chapter {latestReading.chapterNumber}/{latestReading.totalChapters}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-300">
                  <Clock className="h-4 w-4 text-emerald-400" />
                  <span>Last read {latestReading.lastReadAt}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700 shadow-inner">
              <h4 className="text-emerald-400 font-medium mb-2 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Currently Reading: {latestReading.chapter}
              </h4>
              <p className="text-gray-300 leading-relaxed">{latestReading.description}</p>
            </div>
            
            <div className="flex flex-wrap gap-3 pt-3">
              <Button
                asChild
                className="rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-6 text-sm font-medium text-white hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-emerald-500/20"
              >
                <Link href={`/truyen/${latestReading.novelSlug}/${latestReading.chapterNumber}`}>
                  Continue Reading <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              
              <Button
                asChild
                variant="outline"
                className="rounded-full border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                <Link href={`/truyen/${latestReading.novelSlug}`}>
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

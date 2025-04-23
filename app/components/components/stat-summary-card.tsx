import React from 'react';
import Image from 'next/image';
import { BookOpen, Clock, Star, Eye, Award } from 'lucide-react';

// This component represents the stats and summary cards section for a reader
export default function ReaderStatsCards() {
  // Sample reader stats data
  const statsCards = [
    {
      id: 1,
      title: 'Books Read',
      value: '247',
      subtext: 'This Year: 68',
      icon: '/books-icon.png',
      iconBg: 'bg-gray-700',
      valueColor: 'text-white'
    },
    {
      id: 2,
      title: 'Reading Time',
      value: '1,256 hrs',
      subtext: 'Avg: 2.4 hrs/day',
      icon: '/time-icon.png',
      iconBg: 'bg-gray-700',
      valueColor: 'text-white'
    },
    {
      id: 3,
      title: 'Reviews Written',
      value: '124',
      subtext: 'Helpful: 98',
      icon: '/reviews-icon.png',
      iconBg: 'bg-gray-700',
      valueColor: 'text-white'
    },
    {
      id: 4,
      title: 'Achievement Points',
      value: '3,487',
      subtext: 'Rank: Gold',
      icon: '/achievement-icon.png',
      iconBg: 'bg-gray-700',
      valueColor: 'text-blue-500'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Reading Level Progress */}
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-indigo-600/20 rounded-xl blur-xl opacity-70"></div>
        
        <div className="relative bg-majestic-card rounded-xl p-6 border border-gray-800 hover:border-blue-500/30 transition-all duration-300">
          <div className="flex justify-between items-center mb-2">
            <div className="text-white font-medium">
              <span>Reading Level 42</span>
            </div>
            <div className="text-gray-400 text-sm">
              <span className="font-medium text-blue-500">2999</span>
              <span className="mx-1">/</span>
              <span>3000</span>
            </div>
          </div>
          
          <div className="relative h-4 bg-gray-800 rounded-full overflow-hidden mb-1 border border-gray-700">
            {/* Animated gradient progress bar */}
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
              style={{ width: '99.9%' }}
            >
              {/* Animated shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine"></div>
            </div>
            
            {/* Small dots for progress markers */}
            <div className="absolute top-0 left-0 h-full w-full flex justify-between px-1 items-center">
              {[...Array(10)].map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1.5 w-1.5 rounded-full ${i < 9 ? 'bg-white/30' : 'bg-white/70'}`}
                ></div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-gray-400 text-xs">
              <span>Next level</span>
            </div>
            <div className="text-xs text-blue-500/80">
              <span>1 XP to Level 43</span>
            </div>
          </div>
          
          {/* Level rewards preview */}
          <div className="mt-4 pt-4 border-t border-gray-800">
            <div className="text-sm text-gray-400 mb-2">Level 43 Rewards:</div>
            <div className="flex space-x-3">
              <div className="bg-gray-800 p-2 rounded-md border border-gray-700 group hover:border-blue-500/50 transition-all duration-300 hover:bg-gray-800/80">
                <div className="text-xs text-center text-gray-400 mb-1">Premium Chapter</div>
                <div className="h-10 w-10 relative flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-blue-500 group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
              
              <div className="bg-gray-800 p-2 rounded-md border border-gray-700 group hover:border-blue-500/50 transition-all duration-300 hover:bg-gray-800/80">
                <div className="text-xs text-center text-gray-400 mb-1">Comment Badge</div>
                <div className="h-10 w-10 relative flex items-center justify-center">
                  <span className="text-indigo-500 font-bold group-hover:scale-110 transition-transform duration-300">✦</span>
                </div>
              </div>
              
              <div className="bg-gray-800 p-2 rounded-md border border-gray-700 group hover:border-blue-500/50 transition-all duration-300 hover:bg-gray-800/80">
                <div className="text-xs text-center text-gray-400 mb-1">Early Access</div>
                <div className="h-10 w-10 relative flex items-center justify-center">
                  <Clock className="h-6 w-6 text-blue-500 group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Currently Reading */}
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-indigo-600/20 rounded-xl blur-xl opacity-70"></div>
        
        <div className="relative bg-majestic-card rounded-xl p-6 border border-gray-800 hover:border-blue-500/30 transition-all duration-300">
          <h3 className="text-white font-medium mb-4">Currently Reading</h3>
          
          <div className="flex space-x-4">
            <div className="relative w-20 h-28 rounded-md overflow-hidden border border-gray-700 group-hover:border-blue-500/50 transition-colors">
              <Image 
                src="/novel-cover.jpg" 
                alt="Novel Cover" 
                layout="fill" 
                objectFit="cover"
                className="group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            
            <div className="flex-1">
              <h4 className="text-blue-400 font-medium mb-1">The Shadow Throne</h4>
              <p className="text-gray-400 text-sm mb-2">by Marcus Aurelius</p>
              
              <div className="flex items-center mb-2">
                <div className="flex items-center mr-3">
                  <Star className="h-3 w-3 text-yellow-500 mr-1" />
                  <span className="text-gray-300 text-xs">4.8</span>
                </div>
                <div className="flex items-center mr-3">
                  <Eye className="h-3 w-3 text-gray-400 mr-1" />
                  <span className="text-gray-300 text-xs">24.5K</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-3 w-3 text-gray-400 mr-1" />
                  <span className="text-gray-300 text-xs">76/102 Ch</span>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="flex-1 h-2 bg-gray-800 rounded-full mr-2 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                    style={{ width: '74.5%' }}
                  ></div>
                </div>
                <span className="text-gray-300 text-xs">74.5%</span>
              </div>
              
              <div className="mt-3">
                <button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-sm font-medium py-1 px-3 rounded-md transition-all duration-300 transform hover:scale-105">
                  Continue Reading
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats Cards Grid */}
      <div className="grid grid-cols-4 gap-4">
        {statsCards.map((card) => (
          <div 
            key={card.id} 
            className="relative group"
          >
            {/* Background glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
            
            <div className="relative bg-majestic-card rounded-lg p-4 border border-gray-700 group-hover:border-blue-500/30 transition-all duration-300 hover-scale">
              <div className="flex justify-between items-center mb-2">
                <div className="text-gray-400 text-sm">{card.title}</div>
                <div className={`${card.iconBg} p-1 rounded group-hover:bg-opacity-80 transition-all duration-300`}>
                  {card.id === 1 && <BookOpen className="h-5 w-5 text-blue-500 group-hover:scale-110 transition-transform duration-300" />}
                  {card.id === 2 && <Clock className="h-5 w-5 text-blue-500 group-hover:scale-110 transition-transform duration-300" />}
                  {card.id === 3 && <Star className="h-5 w-5 text-blue-500 group-hover:scale-110 transition-transform duration-300" />}
                  {card.id === 4 && <Award className="h-5 w-5 text-blue-500 group-hover:scale-110 transition-transform duration-300" />}
                </div>
              </div>
              
              <div className={`${card.valueColor} font-bold text-xl group-hover:scale-105 origin-left transition-transform duration-300`}>
                {card.value}
              </div>
              
              {card.subtext && (
                <div className="text-gray-400 text-xs mt-1">{card.subtext}</div>
              )}
              
              {/* Decorative elements */}
              <div className="absolute bottom-1 right-1 h-8 w-8 bg-gradient-to-br from-gray-700/20 to-gray-800/20 rounded-full blur-sm group-hover:bg-gradient-to-br group-hover:from-blue-500/10 group-hover:to-indigo-600/10 transition-all duration-500"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

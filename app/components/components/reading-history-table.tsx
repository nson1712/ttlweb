import React, { JSX } from 'react';
import { BookOpen, Clock, Check } from 'lucide-react';

// This component represents the reading history table
export default function ReadingHistoryTable() {
  // Sample reading history data
  const  readingHistory: ReadingHistoryItem[] = [
    {
      id: 1,
      date: '21.06.2023 - 14:55',
      novel: 'The Shadow Throne zxc xzc zxc zx xzc zxc zxc xzc xz',
      chapter: 'Chapter 76: The Awakening zxc zxc zxczxczxc',
      progress: 100,
      status: 'completed'
    },
    {
      id: 2,
      date: '20.06.2023 - 22:30',
      novel: 'Eternal Flames',
      chapter: 'Chapter 103: Reunion xzc xzc zxc xzczx cxzc xz czxc z',
      progress: 100,
      status: 'completed'
    },
    {
      id: 3,
      date: '19.06.2023 - 18:15',
      novel: 'Mystic Academy',
      chapter: 'Chapter 42: The Trial',
      progress: 100,
      status: 'completed'
    },
    {
      id: 4,
      date: '18.06.2023 - 20:45',
      novel: 'Dragon\'s Descent',
      chapter: 'Chapter 15: The Abyss',
      progress: 35,
      status: 'in-progress'
    },
    {
      id: 5,
      date: '17.06.2023 - 12:20',
      novel: 'The Shadow Throne',
      chapter: 'Chapter 75: Betrayal',
      progress: 100,
      status: 'completed'
    },
    {
      id: 6,
      date: '16.06.2023 - 23:10',
      novel: 'Celestial Odyssey',
      chapter: 'Chapter 8: New Worlds',
      progress: 0,
      status: 'bookmarked'
    }
  ];

  // Function to render status indicator based on reading status
  interface ReadingHistoryItem {
    id: number;
    date: string;
    novel: string;
    chapter: string;
    progress: number;
    status: 'completed' | 'in-progress' | 'bookmarked';
  }

  const renderStatus = (status: ReadingHistoryItem['status'], progress: number): JSX.Element | null => {
    switch(status) {
      case 'completed':
        return (
          <div className="flex items-center">
            <div className="bg-green-900/50 p-1 rounded-full mr-2 border border-green-700">
              <Check size={14} className="text-green-500" />
            </div>
            <span className="text-green-500 font-medium">Completed</span>
          </div>
        );
      case 'in-progress':
        return (
          <div className="flex items-center">
            <div className="bg-blue-900/50 p-1 rounded-full mr-2 border border-blue-700">
              <Clock size={14} className="text-blue-400" />
            </div>
            <span className="text-blue-400">{progress}% Read</span>
          </div>
        );
      case 'bookmarked':
        return (
          <div className="flex items-center">
            <div className="bg-indigo-900/50 p-1 rounded-full mr-2 border border-indigo-700">
              <BookOpen size={14} className="text-indigo-400" />
            </div>
            <span className="text-indigo-400">Bookmarked</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative">
      {/* Background glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-xl blur-xl opacity-70"></div>
      
      <div className="relative bg-majestic-card rounded-xl border border-gray-800 overflow-hidden transition-all duration-300 hover:border-gray-700">
        {/* Tabs Navigation */}
        <div className="flex border-b border-gray-800">
          <button className="px-6 py-3 text-white font-medium border-b-2 border-blue-500 bg-gradient-to-b from-blue-500/10 to-transparent">
            Reading History
          </button>
          <button className="px-6 py-3 text-gray-400 hover:text-white transition-colors">
            Bookmarks
          </button>
          <button className="px-6 py-3 text-gray-400 hover:text-white transition-colors">
            Reviews
          </button>
          <button className="px-6 py-3 text-gray-400 hover:text-white transition-colors">
            Comments
          </button>
          <button className="px-6 py-3 text-gray-400 hover:text-white transition-colors">
            Notes
          </button>
        </div>
        
        {/* Table Body */}
        <div className="divide-y divide-gray-800 overflow-auto">
          {readingHistory.map((item) => (
            <div 
              key={item.id} 
              className="grid grid-cols-4 p-4 gap-x-2 text-white hover:bg-gray-800/50 transition-colors duration-200"
            >
              <div className="font-medium text-blue-400 line-clamp-2">{item.novel}</div>
              <div className="text-gray-300 line-clamp-2">{item.chapter}</div>
              <div className="flex items-center">
                <div className="w-16 h-2 bg-gray-800 rounded-full mr-2 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
                <span>{item.progress}%</span>
              </div>
              <div className='self-center'>{renderStatus(item.status, item.progress)}</div>
            </div>
          ))}
        </div>
        
        {/* Table Footer */}
        <div className="flex justify-between items-center py-3 px-4 border-t border-gray-800 text-gray-400 text-sm">
          <div>Total reading sessions</div>
          <div className="font-medium">326</div>
        </div>
      </div>
    </div>
  );
}

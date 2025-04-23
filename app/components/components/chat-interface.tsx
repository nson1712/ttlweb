import React from 'react';
import Image from 'next/image';
import { MessageCircle, Smile, Send, BookOpen, Star } from 'lucide-react';

// This component represents the reader community chat interface
export default function ReaderCommunityChat() {
  // Sample chat messages data
  const chatMessages = [
    {
      id: 1,
      user: {
        name: 'Eleanor Pena',
        avatar: '/reader-avatar-1.jpg',
        badge: { text: 'NEW', color: 'bg-green-500' }
      },
      message: 'Just finished "The Shadow Throne" and I\'m speechless! That ending was incredible!',
      time: '15:29'
    },
    {
      id: 2,
      user: {
        name: 'Marcus Reid',
        avatar: '/reader-avatar-2.jpg',
        badge: { text: 'VIP', color: 'bg-purple-500' }
      },
      message: 'Has anyone started reading "Eternal Flames"? I heard the worldbuilding is amazing.',
      time: '15:25'
    },
    {
      id: 3,
      user: {
        name: 'Sophia Chen',
        avatar: '/reader-avatar-3.jpg',
        badge: { text: 'AUTHOR', color: 'bg-indigo-500' }
      },
      message: 'Thank you all for the support on my new chapter! More coming this weekend.',
      time: '15:21'
    },
    {
      id: 4,
      user: {
        name: 'James Wilson',
        avatar: '/reader-avatar-4.jpg',
        badge: { text: 'MOD', color: 'bg-red-500' }
      },
      message: 'Remember to use spoiler tags when discussing recent chapters!',
      time: '15:21'
    },
    {
      id: 5,
      user: {
        name: 'Olivia Taylor',
        avatar: '/reader-avatar-5.jpg',
        badge: { text: 'CRITIC', color: 'bg-blue-500' }
      },
      message: 'My review of "Mystic Academy" is up! Check it out in the reviews section.',
      time: '15:20'
    },
    {
      id: 6,
      user: {
        name: 'Daniel Lee',
        avatar: '/reader-avatar-6.jpg',
        badge: { text: 'ELITE', color: 'bg-amber-500' }
      },
      message: 'Anyone have recommendations for fantasy novels similar to "Dragon\'s Descent"?',
      time: '15:20'
    },
    {
      id: 7,
      user: {
        name: 'Alex',
        avatar: '/reader-avatar.jpg',
        badge: { text: 'PREMIUM', color: 'bg-purple-500' }
      },
      message: '',
      time: '15:08'
    }
  ];

  return (
    <div className="h-full flex flex-col bg-majestic-card rounded-xl border border-gray-800 overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-800 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <MessageCircle size={18} className="text-purple-500 mr-2" />
            <h3 className="text-white font-medium">Reader Community</h3>
          </div>
          <div className="bg-gray-700 px-2 py-0.5 rounded text-xs text-gray-300">
            253
          </div>
        </div>
      </div>
      
      {/* Community Channels */}
      <div className="px-4 py-2 border-b border-gray-800 bg-gray-900/50">
        <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
          <button className="bg-purple-500/20 text-purple-400 text-xs px-3 py-1 rounded-full whitespace-nowrap border border-purple-500/30">
            General
          </button>
          <button className="bg-gray-800 text-gray-400 hover:text-white text-xs px-3 py-1 rounded-full whitespace-nowrap border border-gray-700 hover:border-gray-600 transition-colors">
            Fantasy
          </button>
          <button className="bg-gray-800 text-gray-400 hover:text-white text-xs px-3 py-1 rounded-full whitespace-nowrap border border-gray-700 hover:border-gray-600 transition-colors">
            Sci-Fi
          </button>
          <button className="bg-gray-800 text-gray-400 hover:text-white text-xs px-3 py-1 rounded-full whitespace-nowrap border border-gray-700 hover:border-gray-600 transition-colors">
            Romance
          </button>
          <button className="bg-gray-800 text-gray-400 hover:text-white text-xs px-3 py-1 rounded-full whitespace-nowrap border border-gray-700 hover:border-gray-600 transition-colors">
            Mystery
          </button>
          <button className="bg-gray-800 text-gray-400 hover:text-white text-xs px-3 py-1 rounded-full whitespace-nowrap border border-gray-700 hover:border-gray-600 transition-colors">
            Horror
          </button>
        </div>
      </div>
      
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
        {chatMessages.map((chat) => (
          <div key={chat.id} className="flex items-start group">
            <div className="flex-shrink-0 mr-3 relative">
              <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-gray-800 group-hover:border-gray-700 transition-colors">
                <Image 
                  src={chat.user.avatar} 
                  alt={chat.user.name} 
                  width={32} 
                  height={32}
                  className="rounded-full group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              
              {/* Online indicator */}
              <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 bg-green-500 rounded-full border border-gray-900"></div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center mb-1">
                <span className="text-white font-medium mr-2 group-hover:text-purple-500 transition-colors">{chat.user.name}</span>
                <span className={`${chat.user.badge.color} text-black text-xs px-1.5 py-0.5 rounded`}>
                  {chat.user.badge.text}
                </span>
                <span className="text-gray-400 text-xs ml-2">{chat.time}</span>
              </div>
              
              {chat.message && (
                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                  {chat.message}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Book Recommendation */}
      <div className="p-3 border-t border-gray-800 bg-gray-900/50">
        <div className="flex items-center bg-gray-800 p-2 rounded-lg border border-gray-700">
          <div className="flex-shrink-0 mr-3">
            <div className="relative w-10 h-14 rounded overflow-hidden">
              <Image 
                src="/novel-cover.jpg" 
                alt="Novel Cover" 
                layout="fill" 
                objectFit="cover"
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center mb-0.5">
              <h4 className="text-white text-xs font-medium mr-2">The Shadow Throne</h4>
              <div className="flex items-center">
                <Star className="h-2.5 w-2.5 text-yellow-500" />
                <span className="text-gray-400 text-xs ml-1">4.8</span>
              </div>
            </div>
            <p className="text-gray-400 text-xs">Share your thoughts on this trending novel!</p>
          </div>
          <button className="bg-purple-500 hover:bg-purple-600 text-white text-xs px-2 py-1 rounded transition-colors">
            Share
          </button>
        </div>
      </div>
      
      {/* Chat Input */}
      <div className="p-4 border-t border-gray-800 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Share your thoughts on books..." 
            className="w-full bg-gray-800 border border-gray-700 rounded-full py-2 pl-4 pr-12 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 transition-all"
          />
          
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
            <button className="text-gray-400 hover:text-gray-300 transition-colors p-1">
              <Smile size={16} />
            </button>
            <button className="text-gray-400 hover:text-gray-300 transition-colors p-1">
              <BookOpen size={16} />
            </button>
            <button className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white rounded-full p-1.5 transition-colors transform hover:scale-105">
              <Send size={14} />
            </button>
          </div>
        </div>
        
        {/* Chat features */}
        <div className="flex justify-between mt-2 px-1">
          <div className="flex space-x-2">
            <button className="text-xs text-gray-500 hover:text-gray-400 transition-colors">
              #booktag
            </button>
            <button className="text-xs text-gray-500 hover:text-gray-400 transition-colors">
              @mention
            </button>
          </div>
          <div className="text-xs text-gray-500">
            Press Enter to send
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 h-40 w-40 bg-gradient-to-br from-purple-500/5 to-indigo-600/5 rounded-full blur-xl"></div>
      <div className="absolute bottom-0 left-0 h-40 w-40 bg-gradient-to-br from-purple-500/5 to-indigo-600/5 rounded-full blur-xl"></div>
    </div>
  );
}

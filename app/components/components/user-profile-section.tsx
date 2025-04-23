import React from "react";
import Image from "next/image";
import { BookOpen, Star } from "lucide-react";

// This component represents the reader profile section with avatar and stats
export default function ReaderProfileSection() {
  return (
    <div className="relative">
      {/* Background glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-indigo-600/20 rounded-xl blur-xl opacity-70"></div>

      <div className="relative bg-majestic-card rounded-xl p-6 border border-gray-800 hover:border-blue-500/30 transition-all duration-300">
        <div className="flex items-center space-x-2 mb-6">
          <div className="text-white opacity-70">
            <span className="text-lg">👋</span>
          </div>
          <h2 className="text-white text-lg font-medium">
            Welcome, <span className="text-blue-500">Alex</span>
          </h2>
        </div>

        <div className="flex flex-col items-center mb-6">
          <div className="relative mb-4 group">
            {/* Animated glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-hexagon transform rotate-45 blur-sm opacity-70 group-hover:blur-md group-hover:opacity-90 transition-all duration-500"></div>

            <div className="relative w-32 h-32 bg-gradient-to-br from-gray-800 to-gray-900 rounded-hexagon overflow-hidden border-2 border-blue-500 group-hover:border-indigo-400 transition-colors duration-300">
              <Image
                src="https://png.pngtree.com/png-clipart/20240321/original/pngtree-avatar-job-student-flat-portrait-of-man-png-image_14639683.png"
                alt="Reader Avatar"
                layout="fill"
                objectFit="cover"
                className="rounded-hexagon transform transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay shine effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/0 via-white/10 to-indigo-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </div>

            {/* Reader badge */}
            <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold text-xs px-2 py-1 rounded-full border border-blue-400 shadow-lg animate-glow">
              PREMIUM
            </div>
          </div>

          <h3 className="text-white text-xl font-bold uppercase tracking-wider mb-2 hover:text-blue-500 transition-colors duration-300">
            ALEX
          </h3>

          <div className="flex items-center">
            <span className="text-blue-500 font-bold text-lg group-hover:text-indigo-400 transition-colors">
              Bookworm Lvl 42
            </span>
            <button className="ml-2 bg-gray-800 hover:bg-gray-700 p-1 rounded-md transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-blue-500 group-hover:text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
          </div>
        </div>

        {/* Reader stats */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Member since</span>
            <span className="text-white">June 2020</span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Books completed</span>
            <span className="text-white">247</span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Reading streak</span>
            <span className="text-green-500">42 days</span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Favorite genre</span>
            <div className="flex items-center">
              <div className="h-3 w-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-white">Fantasy</span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-6 grid grid-cols-2 gap-2">
          <button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
            <BookOpen className="h-4 w-4 mr-2" />
            My Library
          </button>

          <button className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center border border-gray-700 hover:border-blue-500/50">
            <Star className="h-4 w-4 mr-2 text-blue-500" />
            Reviews
          </button>
        </div>

        {/* Reading goals */}
        <div className="mt-6 pt-4 border-t border-gray-800">
          <h4 className="text-white font-medium mb-3">Reading Goal</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm mb-1">
              <span className="text-gray-400">Monthly goal</span>
              <span className="text-white">8 / 10 books</span>
            </div>
            <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                style={{ width: "80%" }}
              ></div>
            </div>
            <p className="text-gray-400 text-xs">
              2 more books to reach your monthly goal
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

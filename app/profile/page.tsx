import React from 'react';

// Import components
import ReaderProfileSection from '../components/components/user-profile-section';
import ReadingHistoryTable from '../components/components/reading-history-table';
import ReaderStatsCards from '../components/components/stat-summary-card';
import ReaderCommunityChat from '../components/components/chat-interface';

export default function NovelReaderProfilePage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center font-sans">
      {/* Main Container */}
      <div className="sm:grid grid-cols-12 gap-x-2 w-full bg-[#111827] bg-opacity-95 rounded-3xl overflow-hidden shadow-2xl border border-gray-800">
        {/* Decorative elements */}
 
        {/* Main Content */}
        {/* <div className="grid grid-cols-12 z-10"> */}
          <div className="col-span-3 border-r border-gray-800">
            <ReaderProfileSection />
          </div>
          
          {/* Main Content Area */}
          <div className="col-span-6">
            <ReaderStatsCards />
            
            <div className="mt-8">
              <ReadingHistoryTable />
            </div>
          </div>
          
          {/* Right Sidebar - Community */}
          <div className="col-span-3 border-l border-gray-800">
            <ReaderCommunityChat />
          </div>
        {/* </div> */}
      </div>
    </div>
  );
}


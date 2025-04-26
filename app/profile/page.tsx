// import SummarySection from "../components/components/account-summary";
// import ChampionsTable from "../components/components/champion-table";
// import RankCards from "../components/components/rank-card";
// import MatchItem from "../components/components/match-history";

// export default function AccountPage() {
//   return (
//     <div className="min-h-screen bg-[#0f172a] text-white p-4">
//       {/* Header */}
//       <h1 className="text-3xl font-bold text-center text-[#4ade80] py-6">
//         Loki Fun And You Know It
//       </h1>

//       {/* Summary Section */}
//       <SummarySection />

//       {/* Top Champions */}
//       <div className="mt-8">
//         <div className="flex justify-between items-center mb-2">
//           <h2 className="text-xl font-semibold">Top Champions</h2>
//           <p className="text-sm text-gray-400">Based on XX last games</p>
//         </div>
//         <ChampionsTable />
//       </div>

//       {/* Rank Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
//         <RankCards
//           title="Ranked Flex 5.5 Platinum 1"
//           games="472 Games / 1015 LP"
//           wins="278W"
//           losses="194L"
//           winRate="59% WR"
//         />
//         <RankCards
//           title="Ranked Solo Challenger"
//           games="472 Games / 1015 LP"
//           wins="278W"
//           losses="194L"
//           winRate="59% WR"
//         />
//       </div>

//       {/* Match History */}
//       <div className="mt-8">
//         <h2 className="text-xl font-semibold mb-4">Match History</h2>
//         <div className="space-y-3">
//           <MatchItem result="Victory" />
//           <MatchItem result="Victory" />
//           <MatchItem result="Defeat" />
//           <MatchItem result="Defeat" />
//           <MatchItem result="Victory" />
//         </div>
//         <button className="mt-4 text-sm text-gray-400 hover:text-[#4ade80]">
//           Show more
//         </button>
//       </div>
//     </div>
//   );
// }

// import React from 'react';
// import Image from 'next/image';
// import { recentUpdates } from '../lib/mock-data';
// import Link from 'next/link';

// // This is the main profile page component
// export default function ProfilePage() {
//   return (
//     <div className="min-h-screen bg-[#0a1428] bg-opacity-95 text-white">
//       {/* Main Content */}
//       <div className="flex">
//         {/* Main Profile Content */}
//         <div className="flex-1 p-6">
//           {/* Profile Header */}
//           <div className="flex items-start mb-6">
//             <div className="relative mr-4">
//               <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-purple-500">
//                 <Image
//                   src="https://png.pngtree.com/png-clipart/20240321/original/pngtree-avatar-job-student-flat-portrait-of-man-png-image_14639683.png"
//                   alt="Profile Avatar"
//                   width={80}
//                   height={80}
//                   className="object-cover"
//                 />
//               </div>
//             </div>
//             <div>
//               <div className="text-xs text-gray-400 mb-1">Last Update 22:30 11/16/2019</div>
//               <h1 className="text-2xl font-bold mb-2">LoLisFunAndYouKnowIt</h1>
//               <div className="flex space-x-2">
//                 <div className="bg-[#0f1b2b] px-3 py-1 rounded-full flex items-center space-x-2">
//                   <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M12 2L4 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-8-3zm0 15c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" fill="currentColor"/>
//                   </svg>
//                   <span className="text-sm">Jungler</span>
//                 </div>
//                 <div className="bg-[#0f1b2b] px-3 py-1 rounded-full flex items-center space-x-2">
//                   <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 15.5h-1.5V14h-1v3H8v-3H7v4.5H5.5v-5c0-.55.45-1 1-1H11c.55 0 1 .45 1 1v5zm3.5 0H14v-6h3.5c.55 0 1 .45 1 1V16c0 .55-.45 1-1 1h-2v1.5zm-1-4.5H17v1h-2.5v-1zm0-3h-1V9c0-.55.45-1 1-1h2.5c.55 0 1 .45 1 1v2c0 .55-.45 1-1 1h-2.5zm7 4.5c0 .55-.45 1-1 1h-2v1.5H17v-6h3.5c.55 0 1 .45 1 1V16z" fill="currentColor"/>
//                   </svg>
//                   <span className="text-sm">Support</span>
//                 </div>
//               </div>
//             </div>
//             <div className="ml-auto">
//               <div className="flex space-x-2">
//                 <button className="px-4 py-1 rounded bg-gray-700 text-sm">Week</button>
//                 <button className="px-4 py-1 rounded bg-blue-600 text-sm">Month</button>
//               </div>
//             </div>
//           </div>

//           {/* Main Content Grid */}
//           <div className="grid grid-cols-12 gap-4">
//             {/* Left Column */}
//             <div className="col-span-5 space-y-4">
//               {/* Summary Card */}
//               <div className="bg-[#0f1b2b] rounded-md p-4">
//                 <h2 className="text-lg font-semibold text-center mb-4">Your Summary</h2>

//                 <div className="mb-6">
//                   <div className="flex items-center mb-2">
//                     <div className="flex-1">
//                       <div className="text-lg">On average, 14 Jul -14 June</div>
//                       <div className="flex items-center">
//                         <span className="text-lg">You played like </span>
//                         <span className="text-lg text-green-400 ml-1">Challenger</span>
//                         <div className="ml-2">
//                           <Image
//                             src="/challenger-icon.png"
//                             alt="Challenger"
//                             width={32}
//                             height={32}
//                             className="object-contain"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-5 text-center">
//                   <div>
//                     <div className="text-xs text-gray-400">MATCHES</div>
//                     <div className="text-xl font-bold">20<span className="text-xs align-top text-gray-400">+</span></div>
//                   </div>
//                   <div>
//                     <div className="text-xs text-gray-400">WINS</div>
//                     <div className="text-xl font-bold text-green-500">12<span className="text-xs align-top text-gray-400">+</span></div>
//                   </div>
//                   <div>
//                     <div className="text-xs text-gray-400">LOSES</div>
//                     <div className="text-xl font-bold text-red-500">8<span className="text-xs align-top text-gray-400">+</span></div>
//                   </div>
//                   <div>
//                     <div className="text-xs text-gray-400">WINRATE</div>
//                     <div className="text-xl font-bold">60%</div>
//                   </div>
//                   <div>
//                     <div className="text-xs text-gray-400">KDA</div>
//                     <div className="text-xl font-bold text-green-500">4.3<span className="text-xs align-top text-gray-400">+</span></div>
//                   </div>
//                 </div>

//                 <div className="mt-6 pt-4 border-t border-gray-700">
//                   <div className="text-sm mb-2">Share</div>
//                   <div className="flex space-x-2">
//                     <button className="bg-[#4c75a3] h-8 w-8 rounded-full flex items-center justify-center">
//                       <span className="text-sm">VK</span>
//                     </button>
//                     <button className="bg-[#3b5998] h-8 w-8 rounded-full flex items-center justify-center">
//                       <span className="text-sm">f</span>
//                     </button>
//                     <button className="bg-[#1da1f2] h-8 w-8 rounded-full flex items-center justify-center">
//                       <span className="text-sm">t</span>
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* TOP Champions */}
//               <div className="bg-[#0f1b2b] rounded-md p-4">
//                 <div className="flex items-center justify-between mb-4">
//                   <h2 className="text-lg font-semibold">TOP Champions</h2>
//                   <div className="text-xs text-gray-400">Based on XX last games</div>
//                 </div>

//                 <div className="grid grid-cols-5 text-xs text-gray-400 mb-2 px-2">
//                   <div>Hero</div>
//                   <div>Games</div>
//                   <div>WR</div>
//                   <div>KDA</div>
//                   <div>Role</div>
//                 </div>

//                 <div className="space-y-2">
//                   {/* Champion 1 */}
//                   <div className="grid grid-cols-5 items-center bg-[#162534] rounded p-2">
//                     <div className="flex items-center">
//                       <div className="h-8 w-8 rounded-full overflow-hidden mr-2">
//                         <Image
//                           src="/champion-talon.jpg"
//                           alt="Talon"
//                           width={32}
//                           height={32}
//                           className="object-cover"
//                         />
//                       </div>
//                       <span>Talon</span>
//                     </div>
//                     <div>2456</div>
//                     <div>52%</div>
//                     <div>3.89</div>
//                     <div>Jungler</div>
//                   </div>

//                   {/* Champion 2 */}
//                   <div className="grid grid-cols-5 items-center bg-[#162534] rounded p-2">
//                     <div className="flex items-center">
//                       <div className="h-8 w-8 rounded-full overflow-hidden mr-2">
//                         <Image
//                           src="/champion-tryndamere.jpg"
//                           alt="Tryndamere"
//                           width={32}
//                           height={32}
//                           className="object-cover"
//                         />
//                       </div>
//                       <span>Tryndamere</span>
//                     </div>
//                     <div>2456</div>
//                     <div>52%</div>
//                     <div>3.89</div>
//                     <div>Support</div>
//                   </div>

//                   {/* Champion 3 */}
//                   <div className="grid grid-cols-5 items-center bg-[#162534] rounded p-2">
//                     <div className="flex items-center">
//                       <div className="h-8 w-8 rounded-full overflow-hidden mr-2">
//                         <Image
//                           src="/champion-alamiya.jpg"
//                           alt="Alamiya"
//                           width={32}
//                           height={32}
//                           className="object-cover"
//                         />
//                       </div>
//                       <span>Alamiya</span>
//                     </div>
//                     <div>2456</div>
//                     <div>52%</div>
//                     <div>3.89</div>
//                     <div>ADC</div>
//                   </div>
//                 </div>
//               </div>

//               {/* Ranked Flex */}
//               <div className="bg-[#0f1b2b] rounded-md p-4">
//                 <div className="flex items-center mb-4">
//                   <div className="h-12 w-12 mr-3">
//                     <Image
//                       src="/platinum-icon.png"
//                       alt="Platinum"
//                       width={48}
//                       height={48}
//                       className="object-contain"
//                     />
//                   </div>
//                   <div>
//                     <div className="text-sm text-gray-400">Ranked Flex 5:5</div>
//                     <div className="text-xl font-bold text-teal-400">Platinum 1</div>
//                   </div>
//                   <div className="ml-auto">
//                     <div className="text-sm">472 Games / 1015 LP</div>
//                     <div className="text-sm">278W / 194L / 59% WR</div>
//                   </div>
//                 </div>
//               </div>

//               {/* Ranked Solo */}
//               <div className="bg-[#0f1b2b] rounded-md p-4">
//                 <div className="flex items-center mb-4">
//                   <div className="h-12 w-12 mr-3">
//                     <Image
//                       src="/challenger-icon.png"
//                       alt="Challenger"
//                       width={48}
//                       height={48}
//                       className="object-contain"
//                     />
//                   </div>
//                   <div>
//                     <div className="text-sm text-gray-400">Ranked Solo</div>
//                     <div className="text-xl font-bold text-green-400">Challenger</div>
//                   </div>
//                   <div className="ml-auto">
//                     <div className="text-sm">472 Games / 1015 LP</div>
//                     <div className="text-sm">278W / 194L / 59% WR</div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Right Column - Match History */}
//             <div className="col-span-7 space-y-4">
//             <div className="space-y-4">
//               {recentUpdates.map((update) => (
//                 <Link href={`/novels/${update.slug}`} key={update.id}>
//                   <div
//                     key={update.id}
//                     className="bg-gray-800 p-3 rounded-lg hover:scale-102 transition-transform duration-200 mb-2 flex gap-x-4"
//                   >
//                     <Image
//                       src={update.coverImage}
//                       alt={update.title}
//                       className="object-cover rounded-md"
//                       width={50}
//                       height={64}
//                     />

//                     <div>
//                       <h3 className="font-medium text-blue-400">
//                         {update.title}
//                       </h3>
//                       <p className="text-sm text-gray-300 line-clamp-1">
//                         {update.chapter}
//                       </p>
//                       <p className="text-xs text-gray-500">
//                         {update.updatedAt}
//                       </p>
//                     </div>
//                   </div>
//                 </Link>
//               ))}

//               {/* <PaginationWithLinks
//                 pageSearchParam="page"
//                 pageSizeSelectOptions={{
//                   pageSizeSearchParam: "size",
//                   pageSizeOptions: [10, 20, 50, 100],
//                 }}
//                 page={page}
//                 pageSize={pageSize}
//                 totalCount={300}
//               /> */}

//             </div>

//               {/* Show more button */}
//               <button className="w-full py-3 bg-[#0f1b2b] rounded-md text-center">
//                 Show more
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

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
        {/* <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-gray-800/0 to-gray-900/80 pointer-events-none"></div>
        </div> */}
 
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


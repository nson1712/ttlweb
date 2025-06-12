import { NotFound } from "../components/components/not-found";

// Novel type definition
// interface Novel {
//   id: string;
//   slug: string;
//   title: string;
//   coverImage: string;
//   author: string;
//   rating: number;
//   totalRatings: number;
//   views: number;
//   chapters: number;
//   status: "Ongoing" | "Completed" | "Hiatus";
//   lastUpdated: string;
//   genres: string[];
//   description: string;
//   trending?: boolean;
//   featured?: boolean;
// }

export default function PopularPage() {

  return (
    // <div className="min-h-screen">
    //   <div className="mx-auto">
    //     {/* Hero Section */}
    //     <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 p-8 mb-8">
    //       <div className="absolute inset-0 opacity-20">
    //         <Image
    //           src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    //           alt="Popular novels background"
    //           fill
    //           className="object-cover"
    //         />
    //       </div>
    //       <div className="relative z-10">
    //         <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
    //           Popular Novels
    //         </h1>
    //         <p className="text-gray-300 max-w-2xl">
    //           Discover the most popular novels on our platform. These stories
    //           have captivated thousands of readers with their engaging plots,
    //           memorable characters, and immersive worlds.
    //         </p>
    //       </div>
    //     </div>

    //     {/* Search and Filters */}
    //     <div className="mb-8 space-y-4">
    //       <div className="flex flex-col gap-4 sm:flex-row">
    //         {/* Search Bar */}
    //         <div className="relative flex-1">
    //           <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
    //             <Search className="h-5 w-5 text-gray-400" />
    //           </div>
    //           <input
    //             type="text"
    //             placeholder="Tìm kiếm truyện..."
    //             value={searchQuery}
    //             onChange={(e) => setSearchQuery(e.target.value)}
    //             className="w-full rounded-lg border border-gray-700 bg-gray-800 py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
    //           />
    //         </div>

    //         {/* Filter Toggle */}
    //         <button
    //           onClick={() => setShowFilters(!showFilters)}
    //           className="flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white hover:bg-gray-700"
    //         >
    //           <Filter className="h-5 w-5" />
    //           <span>Filters</span>
    //           <ChevronDown
    //             className={cn(
    //               "h-4 w-4 transition-transform",
    //               showFilters && "rotate-180"
    //             )}
    //           />
    //         </button>

    //         {/* Sort By Dropdown */}
    //         <div className="relative">
    //           <select
    //             value={sortBy}
    //             onChange={(e) => {
    //               setSortBy(e.target.value);
    //               setSortOrder("desc");
    //             }}
    //             className="appearance-none rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 pr-8 text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
    //           >
    //             <option value="views">Most Views</option>
    //             <option value="rating">Highest Rated</option>
    //             <option value="chapters">Most Chapters</option>
    //             <option value="updated">Recently Updated</option>
    //             <option value="title">Title</option>
    //           </select>
    //           <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
    //             <ChevronDown className="h-4 w-4" />
    //           </div>
    //         </div>

    //         {/* Sort Order Toggle */}
    //         <button
    //           onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
    //           className="flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white hover:bg-gray-700"
    //         >
    //           {sortOrder === "asc" ? (
    //             <ArrowUp className="h-5 w-5" />
    //           ) : (
    //             <ArrowDown className="h-5 w-5" />
    //           )}
    //         </button>
    //       </div>

    //       {/* Expanded Filters */}
    //       {showFilters && (
    //         <div className="rounded-lg border border-gray-700 bg-gray-800 p-4">
    //           <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
    //             {/* Genre Filter */}
    //             <div>
    //               <label className="mb-2 block text-sm font-medium text-gray-300">
    //                 Genre
    //               </label>
    //               <select
    //                 value={selectedGenre}
    //                 onChange={(e) => setSelectedGenre(e.target.value)}
    //                 className="w-full rounded-lg border border-gray-700 bg-gray-700 px-3 py-2 text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
    //               >
    //                 <option value="all">All Genres</option>
    //                 <option value="Fantasy">Fantasy</option>
    //                 <option value="Science Fiction">Science Fiction</option>
    //                 <option value="Action">Action</option>
    //                 <option value="Romance">Romance</option>
    //                 <option value="Adventure">Adventure</option>
    //                 <option value="Mystery">Mystery</option>
    //                 <option value="Horror">Horror</option>
    //                 <option value="Historical">Historical</option>
    //               </select>
    //             </div>

    //             {/* Status Filter */}
    //             <div>
    //               <label className="mb-2 block text-sm font-medium text-gray-300">
    //                 Status
    //               </label>
    //               <select
    //                 value={selectedStatus}
    //                 onChange={(e) => setSelectedStatus(e.target.value)}
    //                 className="w-full rounded-lg border border-gray-700 bg-gray-700 px-3 py-2 text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
    //               >
    //                 <option value="all">All Status</option>
    //                 <option value="ongoing">Ongoing</option>
    //                 <option value="completed">Completed</option>
    //                 <option value="hiatus">On Hiatus</option>
    //               </select>
    //             </div>

    //             {/* Timeframe Filter */}
    //             <div>
    //               <label className="mb-2 block text-sm font-medium text-gray-300">
    //                 Timeframe
    //               </label>
    //               <select
    //                 value={selectedTimeframe}
    //                 onChange={(e) => setSelectedTimeframe(e.target.value)}
    //                 className="w-full rounded-lg border border-gray-700 bg-gray-700 px-3 py-2 text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
    //               >
    //                 <option value="all-time">All Time</option>
    //                 <option value="this-month">This Month</option>
    //                 <option value="this-week">This Week</option>
    //                 <option value="today">Today</option>
    //               </select>
    //             </div>
    //           </div>
    //         </div>
    //       )}
    //     </div>

    //     {/* Featured Popular Novel */}
    //     {searchQuery === "" &&
    //       selectedGenre === "all" &&
    //       selectedStatus === "all" && (
    //         <div className="mb-12">
    //           <h2 className="text-2xl font-bold text-white mb-6">
    //             Featured Popular Novel
    //           </h2>
    //           <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-gray-800 to-gray-900">
    //             <div className="absolute inset-0 opacity-30">
    //               <Image
    //                 src={featuredNovel.coverImage}
    //                 alt={featuredNovel.title}
    //                 fill
    //                 className="object-cover"
    //               />
    //             </div>
    //             <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent"></div>
    //             <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 p-6 md:p-8">
    //               <div className="md:col-span-2">
    //                 <div className="flex items-center gap-2 mb-2">
    //                   <span className="bg-emerald-500 text-white text-xs font-medium px-2.5 py-0.5 rounded">
    //                     Featured
    //                   </span>
    //                   <span className="bg-gray-700 text-gray-300 text-xs font-medium px-2.5 py-0.5 rounded">
    //                     {featuredNovel.status}
    //                   </span>
    //                 </div>
    //                 <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
    //                   {featuredNovel.title}
    //                 </h3>
    //                 <p className="text-gray-300 mb-4">{featuredNovel.author}</p>
    //                 <div className="flex flex-wrap gap-2 mb-4">
    //                   {featuredNovel.genres.map((genre, index) => (
    //                     <span
    //                       key={index}
    //                       className="bg-gray-700 text-gray-300 text-xs font-medium px-2.5 py-0.5 rounded"
    //                     >
    //                       {genre}
    //                     </span>
    //                   ))}
    //                 </div>
    //                 <p className="text-gray-400 mb-6 line-clamp-3 md:line-clamp-4">
    //                   {featuredNovel.description}
    //                 </p>
    //                 <div className="flex flex-wrap gap-6 text-sm text-gray-300 mb-6">
    //                   <div className="flex items-center">
    //                     <Star className="h-5 w-5 text-yellow-500 mr-1" />
    //                     <span>{featuredNovel.rating.toFixed(1)}</span>
    //                     <span className="text-gray-500 ml-1">
    //                       ({featuredNovel.totalRatings.toLocaleString()})
    //                     </span>
    //                   </div>
    //                   <div className="flex items-center">
    //                     <Eye className="h-5 w-5 text-gray-400 mr-1" />
    //                     <span>
    //                       {featuredNovel.views.toLocaleString()} views
    //                     </span>
    //                   </div>
    //                   <div className="flex items-center">
    //                     <BookOpen className="h-5 w-5 text-gray-400 mr-1" />
    //                     <span>{featuredNovel.chapters} chapters</span>
    //                   </div>
    //                   <div className="flex items-center">
    //                     <Clock className="h-5 w-5 text-gray-400 mr-1" />
    //                     <span>{featuredNovel.lastUpdated}</span>
    //                   </div>
    //                 </div>
    //                 <div className="flex flex-wrap gap-3">
    //                   <Link href={`/truyen/${featuredNovel.slug}`}>
    //                     <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors">
    //                       Read Now
    //                     </button>
    //                   </Link>
    //                   <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors flex items-center gap-2">
    //                     <Heart className="h-4 w-4" />
    //                     Add to Library
    //                   </button>
    //                 </div>
    //               </div>
    //               <div className="hidden md:block">
    //                 <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg shadow-xl">
    //                   <Image
    //                     src={featuredNovel.coverImage}
    //                     alt={featuredNovel.title}
    //                     fill
    //                     className="object-cover"
    //                   />
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       )}

    //     {/* Popular Novels List */}
    //     <div>
    //       <h2 className="text-2xl font-bold text-white mb-6">
    //         {searchQuery || selectedGenre !== "all" || selectedStatus !== "all"
    //           ? "Search Results"
    //           : selectedTimeframe === "all-time"
    //           ? "All-Time Popular Novels"
    //           : selectedTimeframe === "this-month"
    //           ? "Popular This Month"
    //           : selectedTimeframe === "this-week"
    //           ? "Popular This Week"
    //           : "Popular Today"}
    //       </h2>

    //       {sortedNovels.length > 0 ? (
    //         <div className="flex flex-col gap-y-2">
    //           {sortedNovels.map((novel, index) => (
    //             <PopularNovelCard
    //               key={novel.id}
    //               novel={novel}
    //               rank={index + 1}
    //               toggleSort={toggleSort}
    //               getSortIcon={getSortIcon}
    //             />
    //           ))}
    //         </div>
    //       ) : (
    //         <div className="flex flex-col items-center justify-center py-12 text-center">
    //           <div className="bg-gray-800 rounded-full p-4 mb-4">
    //             <Search className="h-8 w-8 text-gray-400" />
    //           </div>
    //           <h3 className="text-xl font-medium text-white">
    //             No novels found
    //           </h3>
    //           <p className="mt-2 text-gray-400 max-w-md">
    //             We couldn&apos;t find any novels matching your search criteria. Try
    //             adjusting your filters or search term.
    //           </p>
    //           <button
    //             onClick={() => {
    //               setSearchQuery("");
    //               setSelectedGenre("all");
    //               setSelectedStatus("all");
    //               setSelectedTimeframe("all-time");
    //             }}
    //             className="mt-4 flex items-center gap-2 text-emerald-400 hover:text-emerald-300"
    //           >
    //             <X className="h-4 w-4" />
    //             Clear filters
    //           </button>
    //         </div>
    //       )}

    //       {/* Pagination */}
    //       {sortedNovels.length > 0 && (
    //         <div className="mt-8 flex justify-center">
    //           <nav className="flex items-center space-x-2">
    //             <button className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700">
    //               Previous
    //             </button>
    //             <button className="rounded-lg bg-emerald-500 px-3 py-2 text-sm font-medium text-white">
    //               1
    //             </button>
    //             <button className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700">
    //               2
    //             </button>
    //             <button className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700">
    //               3
    //             </button>
    //             <span className="text-gray-500">...</span>
    //             <button className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700">
    //               10
    //             </button>
    //             <button className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700">
    //               Next
    //             </button>
    //           </nav>
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </div>
    <NotFound href="/" title="Quay lại trang chủ" />
  );
}

// function PopularNovelCard({
//   novel,
//   rank,
//   toggleSort,
//   getSortIcon,
// }: {
//   novel: Novel;
//   rank: number;
//   toggleSort: (field: string) => void;
//   getSortIcon: (field: string) => React.ReactNode;
// }) {
//   return (
//     <Link href={`/truyen/${novel.slug}`}>
//       <motion.div
//         whileHover={{ y: -2 }}
//         transition={{ type: "spring", stiffness: 300, damping: 10 }}
//         className="relative overflow-hidden rounded-xl bg-gray-800/80 hover:bg-gray-800 transition-colors"
//       >
//         <div className="grid grid-cols-12 gap-4 p-4">
//           {/* Rank */}
//           <div className="col-span-1 flex items-center justify-center">
//             <div
//               className={cn(
//                 "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-lg font-bold",
//                 rank <= 3
//                   ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
//                   : "bg-gray-700 text-gray-300"
//               )}
//             >
//               {rank}
//             </div>
//           </div>

//           {/* Cover and Title */}
//           <div className="col-span-11 sm:col-span-5 md:col-span-4 flex items-center gap-4">
//             <div className="relative h-20 w-14 flex-shrink-0 overflow-hidden rounded-md">
//               <Image
//                 src={novel.coverImage}
//                 alt={novel.title}
//                 fill
//                 className="object-cover"
//               />
//             </div>

//             <div className="min-w-0">
//               <h3 className="font-medium text-emerald-400 line-clamp-1 group-hover:text-emerald-300">
//                 {novel.title}
//               </h3>
//               <p className="text-sm text-gray-400">{novel.author}</p>
//               <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs mt-1">
//                 {novel.genres.slice(0, 2).map((genre, index) => (
//                   <span
//                     key={index}
//                     className="rounded-full bg-gray-700 px-2 py-0.5 text-gray-300"
//                   >
//                     {genre}
//                   </span>
//                 ))}
//                 {novel.genres.length > 2 && (
//                   <span className="text-gray-500">
//                     +{novel.genres.length - 2}
//                   </span>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Stats - Desktop */}
//           <div className="hidden sm:col-span-6 md:col-span-7 sm:grid sm:grid-cols-4 sm:gap-4">
//             {/* Rating */}
//             <div className="flex flex-col justify-center">
//               <div
//                 className="flex items-center text-sm text-gray-300 mb-1 cursor-pointer"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   toggleSort("rating");
//                 }}
//               >
//                 <span>Rating</span>
//                 {getSortIcon("rating")}
//               </div>
//               <div className="flex items-center text-yellow-400">
//                 <Star className="mr-1 h-4 w-4 fill-yellow-400" />
//                 <span>{novel.rating.toFixed(1)}</span>
//                 <span className="ml-1 text-xs text-gray-500">
//                   ({novel.totalRatings})
//                 </span>
//               </div>
//             </div>

//             {/* Views */}
//             <div className="flex flex-col justify-center">
//               <div
//                 className="flex items-center text-sm text-gray-300 mb-1 cursor-pointer"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   toggleSort("views");
//                 }}
//               >
//                 <span>Views</span>
//                 {getSortIcon("views")}
//               </div>
//               <div className="flex items-center text-gray-300">
//                 <Eye className="mr-1 h-4 w-4 text-gray-400" />
//                 <span>{novel.views.toLocaleString()}</span>
//               </div>
//             </div>

//             {/* Chapters */}
//             <div className="flex flex-col justify-center">
//               <div
//                 className="flex items-center text-sm text-gray-300 mb-1 cursor-pointer"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   toggleSort("chapters");
//                 }}
//               >
//                 <span>Chapters</span>
//                 {getSortIcon("chapters")}
//               </div>
//               <div className="flex items-center text-gray-300">
//                 <BookOpen className="mr-1 h-4 w-4 text-gray-400" />
//                 <span>{novel.chapters}</span>
//               </div>
//             </div>

//             {/* Last Updated */}
//             <div className="flex flex-col justify-center">
//               <div
//                 className="flex items-center text-sm text-gray-300 mb-1 cursor-pointer"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   toggleSort("updated");
//                 }}
//               >
//                 <span>Updated</span>
//                 {getSortIcon("updated")}
//               </div>
//               <div className="flex items-center text-gray-300">
//                 <Clock className="mr-1 h-4 w-4 text-gray-400" />
//                 <span>{novel.lastUpdated}</span>
//               </div>
//             </div>
//           </div>

//           {/* Stats - Mobile */}
//           <div className="col-span-11 sm:hidden flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-400 mt-2">
//             <div className="flex items-center">
//               <Star className="mr-1 h-3.5 w-3.5 text-yellow-400" />
//               <span>{novel.rating.toFixed(1)}</span>
//             </div>

//             <div className="flex items-center">
//               <Eye className="mr-1 h-3.5 w-3.5" />
//               <span>
//                 {novel.views >= 1000000
//                   ? `${(novel.views / 1000000).toFixed(1)}M`
//                   : novel.views >= 1000
//                   ? `${(novel.views / 1000).toFixed(1)}K`
//                   : novel.views}
//               </span>
//             </div>

//             <div className="flex items-center">
//               <BookOpen className="mr-1 h-3.5 w-3.5" />
//               <span>{novel.chapters} ch</span>
//             </div>

//             <div className="flex items-center">
//               <Clock className="mr-1 h-3.5 w-3.5" />
//               <span>{novel.lastUpdated}</span>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </Link>
//   );
// }
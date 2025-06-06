import { NotFound } from "../components/components/not-found";

export default function BookmarksPage() {

  return (
    // <div className="min-h-screen">
    //   <div className="mx-auto">
    //     {/* Header */}
    //     <div className="mb-8">
    //       <Link
    //         href="/"
    //         className="mb-4 inline-flex items-center text-sm font-medium text-emerald-400 hover:text-emerald-300"
    //       >
    //         <ChevronLeft className="mr-1 h-4 w-4" />
    //         Back to home
    //       </Link>

    //       <div className="flex items-center gap-3">
    //         <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-emerald-500/30 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 text-emerald-400">
    //           <Bookmark className="h-6 w-6" />
    //         </div>
    //         <h1 className="text-3xl font-bold text-white">Bookmarked Novels</h1>
    //         <span className="rounded-full bg-gray-800 px-3 py-1 text-sm font-medium text-gray-300">
    //           {totalCount} novels
    //         </span>
    //       </div>

    //       <p className="mt-2 text-gray-400">
    //         Your personal collection of saved novels for easy access
    //       </p>
    //     </div>

    //     {/* Search and Filters */}
    //     <div className="mb-6 rounded-xl bg-gray-800/50 p-4 backdrop-blur-sm">
    //       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    //         {/* Search */}
    //         <form
    //           onSubmit={handleSearch}
    //           className="relative w-full sm:max-w-xs"
    //         >
    //           <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
    //             <Search className="h-4 w-4 text-gray-400" />
    //           </div>
    //           <input
    //             type="text"
    //             placeholder="Search bookmarks..."
    //             value={searchQuery}
    //             onChange={(e) => setSearchQuery(e.target.value)}
    //             className="w-full rounded-full border border-gray-700 bg-gray-800 py-2 pl-10 pr-4 text-sm text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
    //           />
    //           {searchQuery && (
    //             <button
    //               type="button"
    //               onClick={() => {
    //                 setSearchQuery("");
    //                 if (query) {
    //                   const params = new URLSearchParams(
    //                     window.location.search
    //                   );
    //                   params.delete("query");
    //                   params.set("page", "1");
    //                   window.location.href = `/bookmarks?${params.toString()}`;
    //                 }
    //               }}
    //               className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white"
    //             >
    //               <X className="h-4 w-4" />
    //             </button>
    //           )}
    //         </form>

    //         {/* Category Filter */}
    //         <div className="flex flex-wrap items-center gap-2">
    //           <span className="text-sm font-medium text-white">Category:</span>
    //           <Link
    //             href={`/bookmarks?sort=${sort}&view=${view}${
    //               query ? `&query=${query}` : ""
    //             }`}
    //             className={cn(
    //               "rounded-full px-3 py-1 text-sm font-medium transition-colors",
    //               !selectedCategory
    //                 ? "bg-emerald-500 text-white"
    //                 : "bg-gray-700 text-gray-300 hover:bg-gray-600"
    //             )}
    //           >
    //             All
    //           </Link>
    //           {allCategories.slice(0, 5).map((cat) => (
    //             <Link
    //               key={cat}
    //               href={`/bookmarks?category=${cat.toLowerCase()}&sort=${sort}&view=${view}${
    //                 query ? `&query=${query}` : ""
    //               }`}
    //               className={cn(
    //                 "rounded-full px-3 py-1 text-sm font-medium transition-colors",
    //                 selectedCategory === cat.toLowerCase()
    //                   ? "bg-emerald-500 text-white"
    //                   : "bg-gray-700 text-gray-300 hover:bg-gray-600"
    //               )}
    //             >
    //               {cat}
    //             </Link>
    //           ))}
    //           {allCategories.length > 5 && (
    //             <div className="relative group">
    //               <button className="rounded-full bg-gray-700 px-3 py-1 text-sm font-medium text-gray-300 hover:bg-gray-600">
    //                 More...
    //               </button>
    //               <div className="absolute right-0 z-10 mt-2 hidden w-48 origin-top-right rounded-md bg-gray-800 p-2 shadow-lg ring-1 ring-black ring-opacity-5 group-hover:block">
    //                 <div className="flex flex-col gap-1">
    //                   {allCategories.slice(5).map((cat) => (
    //                     <Link
    //                       key={cat}
    //                       href={`/bookmarks?category=${cat.toLowerCase()}&sort=${sort}&view=${view}${
    //                         query ? `&query=${query}` : ""
    //                       }`}
    //                       className={cn(
    //                         "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
    //                         selectedCategory === cat.toLowerCase()
    //                           ? "bg-emerald-500/20 text-emerald-400"
    //                           : "text-gray-300 hover:bg-gray-700"
    //                       )}
    //                     >
    //                       {cat}
    //                     </Link>
    //                   ))}
    //                 </div>
    //               </div>
    //             </div>
    //           )}
    //         </div>
    //       </div>

    //       {/* Sort and View Options */}
    //       <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    //         <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
    //           <Filter className="h-5 w-5 text-gray-400" />
    //           <span className="text-sm font-medium text-white">Sort by:</span>
    //           <Link
    //             href={`/bookmarks?sort=recent${
    //               category ? `&category=${category}` : ""
    //             }${query ? `&query=${query}` : ""}&view=${view}`}
    //             className={cn(
    //               "rounded-full px-3 py-1 text-sm font-medium transition-colors whitespace-nowrap",
    //               sort === "recent"
    //                 ? "bg-emerald-500 text-white"
    //                 : "bg-gray-700 text-gray-300 hover:bg-gray-600"
    //             )}
    //           >
    //             <SortDesc className="mr-1 h-3 w-3 inline" />
    //             Recently Added
    //           </Link>
    //           <Link
    //             href={`/bookmarks?sort=popular${
    //               category ? `&category=${category}` : ""
    //             }${query ? `&query=${query}` : ""}&view=${view}`}
    //             className={cn(
    //               "rounded-full px-3 py-1 text-sm font-medium transition-colors whitespace-nowrap",
    //               sort === "popular"
    //                 ? "bg-emerald-500 text-white"
    //                 : "bg-gray-700 text-gray-300 hover:bg-gray-600"
    //             )}
    //           >
    //             Popular
    //           </Link>
    //           <Link
    //             href={`/bookmarks?sort=rating${
    //               category ? `&category=${category}` : ""
    //             }${query ? `&query=${query}` : ""}&view=${view}`}
    //             className={cn(
    //               "rounded-full px-3 py-1 text-sm font-medium transition-colors whitespace-nowrap",
    //               sort === "rating"
    //                 ? "bg-emerald-500 text-white"
    //                 : "bg-gray-700 text-gray-300 hover:bg-gray-600"
    //             )}
    //           >
    //             Rating
    //           </Link>
    //           <Link
    //             href={`/bookmarks?sort=title${
    //               category ? `&category=${category}` : ""
    //             }${query ? `&query=${query}` : ""}&view=${view}`}
    //             className={cn(
    //               "rounded-full px-3 py-1 text-sm font-medium transition-colors whitespace-nowrap",
    //               sort === "title"
    //                 ? "bg-emerald-500 text-white"
    //                 : "bg-gray-700 text-gray-300 hover:bg-gray-600"
    //             )}
    //           >
    //             <SortAsc className="mr-1 h-3 w-3 inline" />
    //             Title
    //           </Link>
    //         </div>

    //         <div className="flex items-center gap-2">
    //           <span className="text-sm font-medium text-white">View:</span>
    //           <Link
    //             href={`/bookmarks?sort=${sort}${
    //               category ? `&category=${category}` : ""
    //             }${query ? `&query=${query}` : ""}&view=grid`}
    //             className={cn(
    //               "rounded-full p-1.5 transition-colors",
    //               view === "grid"
    //                 ? "bg-emerald-500 text-white"
    //                 : "bg-gray-700 text-gray-300 hover:bg-gray-600"
    //             )}
    //           >
    //             <Grid className="h-4 w-4" />
    //           </Link>
    //           <Link
    //             href={`/bookmarks?sort=${sort}${
    //               category ? `&category=${category}` : ""
    //             }${query ? `&query=${query}` : ""}&view=list`}
    //             className={cn(
    //               "rounded-full p-1.5 transition-colors",
    //               view === "list"
    //                 ? "bg-emerald-500 text-white"
    //                 : "bg-gray-700 text-gray-300 hover:bg-gray-600"
    //             )}
    //           >
    //             <List className="h-4 w-4" />
    //           </Link>
    //         </div>
    //       </div>
    //     </div>

    //     {/* Novels Grid/List */}
    //     {loading ? (
    //       <div className="flex h-64 items-center justify-center">
    //         <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-emerald-500"></div>
    //       </div>
    //     ) : novels.length > 0 ? (
    //       <div
    //         className={cn(
    //           view === "grid"
    //             ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    //             : "space-y-6"
    //         )}
    //       >
    //         {novels.map((novel) => (
    //           <div key={novel.id} className="group relative">
    //             <NovelCard {...novel} />
    //             <button
    //               onClick={() => handleRemoveBookmark(novel.id)}
    //               className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-gray-900/80 text-gray-300 opacity-0 transition-opacity hover:bg-red-500/80 hover:text-white group-hover:opacity-100"
    //               aria-label="Remove bookmark"
    //             >
    //               <X className="h-4 w-4" />
    //             </button>
    //           </div>
    //         ))}
    //       </div>
    //     ) : (
    //       <div className="flex h-64 flex-col items-center justify-center rounded-xl bg-gray-800/50 p-6 text-center backdrop-blur-sm">
    //         <Bookmark className="h-12 w-12 text-gray-500" />
    //         <h3 className="mt-4 text-xl font-medium text-white">
    //           No bookmarked novels
    //         </h3>
    //         <p className="mt-2 text-gray-400">
    //           {query || category
    //             ? "No bookmarks match your current filters. Try adjusting your search or category selection."
    //             : "You haven't bookmarked any novels yet. Browse novels and click the bookmark button to add them here."}
    //         </p>
    //         <Link
    //           href="/"
    //           className="mt-4 rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600"
    //         >
    //           Browse novels
    //         </Link>
    //       </div>
    //     )}

    //     {/* Pagination */}
    //     {novels.length > 0 && (
    //       <div className="mt-8">
    //         <PaginationWithLinks
    //           pageSearchParam="page"
    //           pageSizeSelectOptions={{
    //             pageSizeSearchParam: "pageSize",
    //             pageSizeOptions: [10, 20, 50, 100],
    //           }}
    //           page={page}
    //           pageSize={pageSize}
    //           totalCount={totalCount}
    //         />
    //       </div>
    //     )}
    //   </div>
    // </div>
    <NotFound href="/" title="Quay lại trang chủ" />
  );
}


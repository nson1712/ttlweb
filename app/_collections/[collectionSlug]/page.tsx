import { NotFound } from "@/app/components/components/not-found"

// Collection type definition
// interface Collection {
//   id: string;
//   slug: string;
//   title: string;
//   description: string;
//   coverImages: string[];
//   creator: string;
//   creatorAvatar: string;
//   novelCount: number;
//   likes: number;
//   lastUpdated: string;
//   category: "Battle" | "Adventure" | "Epic" | "Conquest" | "Personal";
//   featured?: boolean;
//   tags: string[];
//   combatFocus: number; // 1-10 scale of combat focus
//   epicScale: number; // 1-10 scale of epic scale/scope
// }

export default function CollectionDetailPage() {

  return (
    // <div className="min-h-screen">
    //   <div className="mx-auto">
    //     {/* Header */}
    //     <div className="mb-8">
    //       <Link 
    //         href="/collections" 
    //         className="mb-4 inline-flex items-center text-sm font-medium text-emerald-400 hover:text-emerald-300"
    //       >
    //         <ChevronLeft className="mr-1 h-4 w-4" />
    //         Back to all collections
    //       </Link>
          
    //       <div className="flex items-center gap-3">
    //         <div className={cn(
    //           "flex h-12 w-12 items-center justify-center rounded-lg border bg-gradient-to-br",
    //           colorClasses
    //         )}>
    //           <BookOpen className="h-6 w-6" />
    //         </div>
    //         <h1 className="text-3xl font-bold text-white">
    //           {collection.title}
    //         </h1>
    //         <span className="rounded-full bg-gray-800 px-3 py-1 text-sm font-medium text-gray-300">
    //           {collection.novelCount} novels
    //         </span>
    //       </div>
          
    //       <div className="mt-2 flex items-center gap-3">
    //         <div className="flex items-center gap-2 text-sm text-gray-300">
    //           <div className="relative h-5 w-5 overflow-hidden rounded-full">
    //             <Image 
    //               src={collection.creatorAvatar} 
    //               alt={collection.creator}
    //               fill
    //               className="object-cover"
    //             />
    //           </div>
    //           <span>Created by {collection.creator}</span>
    //         </div>
            
    //         <div className="flex items-center gap-1 text-sm text-gray-300">
    //           <Heart className="h-4 w-4 text-red-400" />
    //           <span>{collection.likes.toLocaleString()} likes</span>
    //         </div>
    //       </div>
          
    //       <p className="mt-2 text-gray-400">
    //         {collection.description}
    //       </p>
    //     </div>
        
    //     {/* Filters and Sort */}
    //     <div className="mb-6 flex flex-col gap-4 rounded-xl bg-gray-800/50 p-4 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
    //       <div className="flex items-center gap-2">
    //         <Filter className="h-5 w-5 text-gray-400" />
    //         <span className="text-sm font-medium text-white">Sort by:</span>
    //         <Link
    //           href={`/collections/${params.collectionSlug}?sort=popular&view=${view}`}
    //           className={cn(
    //             "rounded-full px-3 py-1 text-sm font-medium transition-colors",
    //             sort === "popular"
    //               ? "bg-emerald-500 text-white"
    //               : "bg-gray-700 text-gray-300 hover:bg-gray-600"
    //           )}
    //         >
    //           Popular
    //         </Link>
    //         <Link
    //           href={`/collections/${params.collectionSlug}?sort=rating&view=${view}`}
    //           className={cn(
    //             "rounded-full px-3 py-1 text-sm font-medium transition-colors",
    //             sort === "rating"
    //               ? "bg-emerald-500 text-white"
    //               : "bg-gray-700 text-gray-300 hover:bg-gray-600"
    //           )}
    //         >
    //           Rating
    //         </Link>
    //         <Link
    //           href={`/collections/${params.collectionSlug}?sort=newest&view=${view}`}
    //           className={cn(
    //             "rounded-full px-3 py-1 text-sm font-medium transition-colors",
    //             sort === "newest"
    //               ? "bg-emerald-500 text-white"
    //               : "bg-gray-700 text-gray-300 hover:bg-gray-600"
    //           )}
    //         >
    //           <SortDesc className="mr-1 h-3 w-3 inline" />
    //           Newest
    //         </Link>
    //         <Link
    //           href={`/collections/${params.collectionSlug}?sort=oldest&view=${view}`}
    //           className={cn(
    //             "rounded-full px-3 py-1 text-sm font-medium transition-colors",
    //             sort === "oldest"
    //               ? "bg-emerald-500 text-white"
    //               : "bg-gray-700 text-gray-300 hover:bg-gray-600"
    //           )}
    //         >
    //           <SortAsc className="mr-1 h-3 w-3 inline" />
    //           Oldest
    //         </Link>
    //       </div>
          
    //       <div className="flex items-center gap-2">
    //         <span className="text-sm font-medium text-white">View:</span>
    //         <Link
    //           href={`/collections/${params.collectionSlug}?sort=${sort}&view=grid`}
    //           className={cn(
    //             "rounded-full p-1.5 transition-colors",
    //             view === "grid"
    //               ? "bg-emerald-500 text-white"
    //               : "bg-gray-700 text-gray-300 hover:bg-gray-600"
    //           )}
    //         >
    //           <Grid className="h-4 w-4" />
    //         </Link>
    //         <Link
    //           href={`/collections/${params.collectionSlug}?sort=${sort}&view=list`}
    //           className={cn(
    //             "rounded-full p-1.5 transition-colors",
    //             view === "list"
    //               ? "bg-emerald-500 text-white"
    //               : "bg-gray-700 text-gray-300 hover:bg-gray-600"
    //           )}
    //         >
    //           <List className="h-4 w-4" />
    //         </Link>
    //       </div>
    //     </div>
        
    //     {/* Novels Grid/List */}
    //     {loading ? (
    //       <div className="flex h-64 items-center justify-center">
    //         <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-emerald-500"></div>
    //       </div>
    //     ) : novels.length > 0 ? (
    //       <div className={cn(
    //         view === "grid" 
    //           ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" 
    //           : "space-y-6"
    //       )}>
    //         {novels.map((novel) => (
    //           <NovelCard key={novel.id} {...novel} />
    //         ))}
    //       </div>
    //     ) : (
    //       <div className="flex h-64 flex-col items-center justify-center rounded-xl bg-gray-800/50 p-6 text-center backdrop-blur-sm">
    //         <BookOpen className="h-12 w-12 text-gray-500" />
    //         <h3 className="mt-4 text-xl font-medium text-white">No novels found</h3>
    //         <p className="mt-2 text-gray-400">
    //           This collection doesn&#39;t have any novels yet
    //         </p>
    //         <Link
    //           href="/collections"
    //           className="mt-4 rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600"
    //         >
    //           Browse all collections
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
    //             pageSizeOptions: [5, 10, 20, 50],
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
  )
}

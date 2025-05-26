// "use client";
// import { FC, useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import { Eye } from "lucide-react";

// import { UpdateCard } from "../novels/update-card";
// import { ChapterPreview } from "./chapter-preview";
// import { StoryType } from "@/app/types/story";


// export type RecentUpdateType = {
//   recentlyUpdated: Partial<StoryType| "id" | "coverImage" | "title" | "">[]
// }
// export const RecentUpdates: FC<RecentUpdateType> = ({ recentlyUpdated }) => {
//   const [previewId, setPreviewId] = useState(null);
//   const selected = recentlyUpdated.find(u => u.id === previewId);

//   return (
//     <section>
//       {recentlyUpdated.map(u => (
//         <div key={u.id} className="relative group">
//           <UpdateCard {...u}/>
//           <button onClick={() => setPreviewId(u.id)} className="...">
//             <Eye/>
//           </button>
//         </div>
//       ))}
//       <AnimatePresence>
//         {selected && <ChapterPreview {...selected} onClose={() => setPreviewId(null)}/>}
//       </AnimatePresence>
//     </section>
//   );
// }
import { UpdateCard } from "../novels/update-card";
import { FC } from "react";
import { RecentUpdatesType } from "@/app/types/story";
import { NotFound } from "./not-found";

type RecentUpdatePropsType = {
  recentUpdates: RecentUpdatesType[];
};
export const RecentUpdates: FC<RecentUpdatePropsType> = ({ recentUpdates }) => {
  return (
    <div className="space-y-3">
      {recentUpdates.length ? (
        recentUpdates.map((item) => (
          <div
            key={`${item.id}-${item.chapterTitle}`}
            className="relative group"
          >
            <UpdateCard {...item} />
          </div>
        ))
      ) : (
        <NotFound href="/moi-cap-nhat" title="Quay lại" />
      )}
      {}
    </div>
  );
};

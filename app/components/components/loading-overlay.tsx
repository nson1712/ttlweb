"use client";

import useGlobalStore from "@/app/stores/globalStore";

export default function GlobalLoadingOverlay() {
  const isLoading = useGlobalStore((state) => state.isLoading);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="h-14 w-14 animate-spin rounded-full border-b-2 border-t-2 border-emerald-500"></div>
    </div>
  );
}

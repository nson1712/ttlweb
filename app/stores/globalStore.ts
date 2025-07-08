"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { decodeAccessToken } from "../lib/utils";

interface ProfileType {
  [key: string]: unknown;
}

interface GlobalState {
  profile: ProfileType;
  isLoggedIn: boolean;
  showConfirm: boolean;
  copyData: boolean;
  confirm: Record<string, unknown>;
  setProfile: (profile: ProfileType) => void;
  setIsLoggedIn: (loggedIn: boolean) => void;
  updateProfile: (accessToken: string) => Promise<void>;
  handleShowConfirmDialog: (confirm: Record<string, unknown>) => void;
  handleHideConfirmDialog: () => void;
  resetState: () => void; // ➡ thêm đây
}

const useGlobalStore = create<GlobalState>()(
  persist(
    (set) => ({
      profile: {},
      isLoggedIn: false,
      showConfirm: false,
      copyData: false,
      confirm: {},

      setProfile: (profile) => set({ profile }),
      setIsLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),

      updateProfile: async (accessToken) => {
        const jsonObj = await decodeAccessToken(accessToken);
        set({ profile: jsonObj });
      },

      handleShowConfirmDialog: (confirm) => set({ confirm, showConfirm: true }),
      handleHideConfirmDialog: () => set({ showConfirm: false }),

      resetState: () => {
        set({
          profile: {},
          isLoggedIn: false,
        });
        localStorage.removeItem("global-store");
      },
    }),
    {
      name: "global-store",
      partialize: (state) => ({
        profile: state.profile,
        isLoggedIn: state.isLoggedIn,
      }),
    }
  )
);

export default useGlobalStore;

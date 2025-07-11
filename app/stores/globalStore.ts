import { create } from "zustand";
import { persist } from "zustand/middleware";
import { decodeAccessToken } from "../lib/utils";

interface ProfileType {
  [key: string]: unknown;
}

interface GlobalState {
  profile: ProfileType;
  isLoggedIn: boolean;
  isLoading: boolean;
  hasHydrated: boolean;
  showConfirm: boolean;
  copyData: boolean;
  confirm: Record<string, unknown>;

  setProfile: (profile: ProfileType) => void;
  setIsLoggedIn: (loggedIn: boolean) => void;
  setIsLoading: (loading: boolean) => void;
  setHasHydrated: () => void;

  updateProfile: (accessToken: string) => Promise<void>;
  handleShowConfirmDialog: (confirm: Record<string, unknown>) => void;
  handleHideConfirmDialog: () => void;
  resetState: () => void;
}

const useGlobalStore = create<GlobalState>()(
  persist(
    (set) => ({
      profile: {},
      isLoggedIn: false,
      isLoading: false,
      hasHydrated: false,
      showConfirm: false,
      copyData: false,
      confirm: {},

      setProfile: (profile) => set({ profile }),
      setIsLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),
      setIsLoading: (loading) => set({ isLoading: loading }),
      setHasHydrated: () => set({ hasHydrated: true }),

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
          isLoading: false,
          hasHydrated: true,
        });
        localStorage.removeItem("global-store");
      },
    }),
    {
      name: "global-store",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated();
      },
      partialize: (state) => ({
        profile: state.profile,
        isLoggedIn: state.isLoggedIn,
      }),
    }
  )
);

export default useGlobalStore;

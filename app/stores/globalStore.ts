"use client";
import { create } from 'zustand';
import { getAccessToken, getRefreshToken } from '../utils/storage';
import { decodeAccessToken } from '../lib/utils';

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
  checkIsLogin: () => Promise<boolean>;
  updateProfile: (accessToken: string) => Promise<void>;
  handleShowConfirmDialog: (confirm: Record<string, unknown>) => void;
  handleHideConfirmDialog: () => void;
}

const useGlobalStore = create<GlobalState>((set, get) => ({
  profile: {},
  isLoggedIn: false,
  showConfirm: false,
  copyData: false,
  confirm: {},

  // Initialize profile and isLoggedIn from localStorage only on the client-side
  setProfile: (profile) => {
    set({ profile });
    if (typeof window !== 'undefined') {
      localStorage.setItem("profile", JSON.stringify(profile)); // Store in localStorage
    }
  },

  setIsLoggedIn: (loggedIn) => {
    set({ isLoggedIn: loggedIn });
    if (typeof window !== 'undefined') {
      localStorage.setItem("isLoggedIn", JSON.stringify(loggedIn)); // Store in localStorage
    }
  },

  handleShowConfirmDialog: (confirm) => set({ confirm, showConfirm: true }),
  handleHideConfirmDialog: () => set({ showConfirm: false }),

  checkIsLogin: async () => {
    // Check if it's running on the client-side
    if (typeof window !== 'undefined') {
      const accessToken = await getAccessToken();
      const refreshToken = await getRefreshToken();

      const currentProfile = get().profile;
      if (!currentProfile?.referralCode && accessToken) {
        const jsonObj = await decodeAccessToken(accessToken);
        set({ profile: jsonObj });
      }

      const isLoggedIn = !!accessToken && !!refreshToken;
      set({ isLoggedIn });
      return isLoggedIn;
    }

    return false; // Return false if running on the server
  },

  updateProfile: async (accessToken) => {
    // Update profile and store it in localStorage only on the client-side
    if (typeof window !== 'undefined') {
      const jsonObj = await decodeAccessToken(accessToken);
      set({ profile: jsonObj });
      localStorage.setItem("profile", JSON.stringify(jsonObj)); // Store updated profile in localStorage
    }
  },
}));

export default useGlobalStore;

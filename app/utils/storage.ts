export const setItemStorage = (key: string, value: string): void => {
  if (typeof window === "undefined") return;

  localStorage.setItem(key, value);
};

export const getItemStorage = (key: string): string | null => {
  if (typeof window === "undefined") return null;

  return localStorage.getItem(key);
};

export const removeItemStorage = (key: string): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};

export const LSK_ACCESS_TOKEN = "accessToken";
export const LSK_REFRESH_TOKEN = "refreshToken";

export const getAccessToken = () => getItemStorage(LSK_ACCESS_TOKEN);
export const removeAccessToken = () => removeItemStorage(LSK_ACCESS_TOKEN);

export const getRefreshToken = () => getItemStorage(LSK_REFRESH_TOKEN);
export const removeRefreshToken = () => removeItemStorage(LSK_REFRESH_TOKEN);

export const LSK_DEVICE_ID = "DEVICE_ID";

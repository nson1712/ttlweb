import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
// import Router from "next/router";
import {
  LSK_DEVICE_ID,
  getAccessToken,
  getItemStorage,
  removeAccessToken,
} from "./storage";
import { redirect } from "next/navigation";

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: process.env.NEXT_PUBLIC_API_TIMEOUT
    ? parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT, 10)
    : 0,
});

const handleError = async (
  error: AxiosError,
  hideError: boolean
): Promise<AxiosResponse> => {
  const hideErrorNoti: boolean = hideError;
  const errorMessages: { [key: string]: string } = {
    golobal:
      "System is in maintenance. We are on it. Please check back in a few minute.",
    timeout: "Request is timeout, check internet connection",
    sessionExprire: "Session is expried, please re-login again",
  };
  let errorMessage: string = errorMessages.golobal;

  if (error?.response?.data) {
    if (typeof error.response.data === "string") {
      errorMessage = error.response.data;
    } else {
      // Handle the case where error.response.data is an object
      // You might want to convert it to a string or extract relevant information
      errorMessage = "An unexpected error occurred";
    }
  }
  if (error.code === "ECONNABORTED") {
    errorMessage = errorMessages.timeout;
  }
  if (error?.response?.status === 401 || error?.response?.status === 403) {
    errorMessage = errorMessages.sessionExprire;
    removeAccessToken();
    // ProfileStore.setProfile({});
    // Router.push("/login");
    // useRouter().push("/login")
    redirect("/dang-nhap")
    // logout
  }
  if (!hideErrorNoti && errorMessage) {
    // show error message here
    // toast(errorMessage, {
    //   type: "error",
    //   theme: "colored",
    // })
  }

  return Promise.reject([error.response, errorMessage]);
  // return callback()
};

const sendRequest = async ({
  url,
  method,
  params,
  data,
  headers,
  options,
  hideError,
  // isServer,
  customConfig,
}: {
  url: string;
  method: string;
  params?: object;
  data?: object;
  headers?: object;
  options?: AxiosRequestConfig;
  hideError?: boolean;
  isServer?: boolean;
  customConfig?: AxiosRequestConfig; // Rename config to customConfig
}): Promise<AxiosResponse> => {
  const accessToken: string = getAccessToken() || "";

  return instance({
    url,
    method,
    params,
    data,
    ...customConfig, // Use customConfig here
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Authorization: accessToken,
      channelId: "WEB",
      deviceId: getItemStorage(LSK_DEVICE_ID) || "",
      ...headers,
    },
    ...options,
  })
    .then((response: AxiosResponse) => {
      if (response.data.status && +response.data.status > 300) {
        throw {
          response: {
            data: {
              message: response.data.message,
            },
          },
        };
      }
      return response.data;
    })
    .catch((error: AxiosError) => handleError(error, hideError!));
};

const getHTTPClient = (baseURL: string) => ({
  get: ({
    url,
    params = {},
    headers = {},
    options = {},
    hideError = false,
    isServer = false,
  }: {
    url: string;
    params?: object;
    headers?: object;
    options?: AxiosRequestConfig;
    hideError?: boolean;
    isServer?: boolean;
  }): Promise<AxiosResponse> =>
    sendRequest({
      url,
      params,
      method: "GET",

      headers,
      options: { ...options, baseURL },
      hideError,
      isServer,
    }),
  post: ({
    url,
    params = {},
    data = {},
    headers = {},
    options = {},
    hideError = false,
  }: {
    url: string;
    params?: object;
    data?: object;

    headers?: object;
    options?: AxiosRequestConfig;
    hideError?: boolean;
  }): Promise<AxiosResponse> =>
    sendRequest({
      url,
      params,
      data,
      method: "POST",
      headers,
      options: { ...options, baseURL },
      hideError,
    }),
  put: ({
    url,
    params,
    data,
    headers = {},
    options = {},
  }: {
    url: string;
    params?: object;
    data?: object;

    headers?: object;
    options?: AxiosRequestConfig;
  }): Promise<AxiosResponse> =>
    sendRequest({
      url,
      params,
      data,
      method: "PUT",

      headers,
      options: { ...options, baseURL },
    }),
  deleteData: ({
    url,
    params,
    data,
    headers = {},
    options = {},
  }: {
    url: string;
    params?: object;
    data?: object;

    headers?: object;
    options?: AxiosRequestConfig;
  }): Promise<AxiosResponse> =>
    sendRequest({
      url,
      params,
      data,
      method: "DELETE",

      headers,
      options: { ...options, baseURL },
    }),
});

export const httpClient = getHTTPClient(process.env.NEXT_PUBLIC_API_URL ?? "");

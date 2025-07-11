"use client";
import { useEffect } from "react";

export interface FacebookLoginResponse {
  accessToken: string;
  userID: string;
  expiresIn: number;
}

export interface FacebookAPIResponse {
  name: string;
  email: string;
  picture: {
    data: {
      url: string;
    };
  };
}

// Extend the Window interface to include fbAsyncInit
declare global {
  interface Window {
    FB: {
      init: (config: {
        appId: string;
        cookie: boolean;
        xfbml: boolean;
        version: string;
      }) => void;
      AppEvents: {
        logPageView: () => void;
      };
      login: (
        callback: (response: { authResponse: FacebookLoginResponse }) => void,
        options: { scope: string }
      ) => void;
      api: (
        path: string,
        params: { fields: string },
        callback: (response: FacebookAPIResponse) => void
      ) => void;
      XFBML: {
        parse: () => void;
      };
    };
    fbAsyncInit: () => void;
  }
}

const FacebookSDK = () => {
  useEffect(() => {
    // Check if the SDK is already loaded to avoid multiple loads
    if (typeof window !== "undefined" && !window.FB) {
      window.fbAsyncInit = function () {
        window.FB.init({
          appId: "1720600545493667",
          cookie: true,
          xfbml: true,
          version: "v19.0", // Lower version if v21.0 has issues
        });

        window.FB.AppEvents.logPageView();
      };

      // Add the Facebook SDK script to the page
      (function (d: Document, s: string, id: string) {
        const fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;

        const js: HTMLScriptElement = d.createElement(s) as HTMLScriptElement; // Explicitly typing js
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";

        // Null check for fjs.parentNode
        if (fjs.parentNode) {
          fjs.parentNode.insertBefore(js, fjs);
        }
      })(document, "script", "facebook-jssdk");
    }
  }, []);

  return null; // No rendering, just loading the SDK
};

export default FacebookSDK;

import { useEffect } from "react";

interface UseFacebookSDKProps {
  src: string;
}

const useFacebookSDK = ({ src }: UseFacebookSDKProps) => {
  useEffect(() => {
    if (window.FB) {
      window.FB.XFBML.parse();
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.defer = true;
    script.crossOrigin = "anonymous";
    script.onload = () => {
      window.FB?.XFBML.parse();
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [src]);
};

export default useFacebookSDK;

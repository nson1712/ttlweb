import useFacebookSDK from "@/app/hooks/usefacebookSDK";

const TTLPagePlugin = ({
  width,
  height = 300,
}: {
  width?: string | number;
  height?: string | number;
}) => {
  useFacebookSDK({
    src: "https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v23.0&appId=1720600545493667",
  });

  return (
    <div
      className="fb-page self-center w-full flex "
      data-href="https://www.facebook.com/tangthulau.review"
      data-width={width}
      data-height={height}
      data-small-header="false"
      data-adapt-container-width="true"
      data-hide-cover="false"
      data-show-facepile="true"
    ></div>
  );
};

export default TTLPagePlugin;

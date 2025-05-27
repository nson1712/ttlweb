import { FC } from "react";

type GreenLineTitleProps = {
  title: string;
};

export const GreenLineTitle: FC<GreenLineTitleProps> = ({ title }) => {
  return (
    <h2 className="flex items-center justify-center bg-gray-800 py-4 mb-4">
      <div className="flex items-center w-full max-w-screen-md px-4">
        <div className="flex-grow h-0.5 bg-gradient-to-l from-green-300 to-transparent"></div>
        <span className="mx-4 text-xl font-semibold text-gray-300">
          {title}
        </span>
        <div className="flex-grow h-0.5 bg-gradient-to-r from-green-300 to-transparent"></div>
      </div>
    </h2>
  );
};

import React, { FC } from "react";

interface IPropsLoader {
  width: string;
  height: string;
  color: string;
}

const Loader: FC<IPropsLoader> = ({ height, width, color }) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`animate-spin rounded-full h-${height} w-${width} border-b-2 border-${color}`}
      />
    </div>
  );
};

export default Loader;

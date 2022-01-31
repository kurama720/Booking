import React, { FC } from "react";

interface IPropsLoader {
  width: string;
  height: string;
}

const Loader: FC<IPropsLoader> = ({ width, height }) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`spinner-border animate-spin inline-block w-${width} h-${height} border-4 rounded-full`}
        role="status"
      >
        <span className="visually-hidden" />
      </div>
    </div>
  );
};

export default Loader;

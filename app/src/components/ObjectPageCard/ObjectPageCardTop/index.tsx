import React, { useState } from "react";
import { HeartIcon as HeartActiveIcon, StarIcon } from "@heroicons/react/solid";
import { HeartIcon } from "@heroicons/react/outline";

const ObjectsPageCardTop = () => {
  const [isLike, setLike] = useState<boolean>(false);

  const handleLike = () => {
    setLike((prev) => !prev);
  };

  return (
    <div className="w-full flex flex-col">
      <div className="w-full">
        <h1 className="font-body text-3xl font-medium text-gray-900">
          Large flat near center
        </h1>
      </div>
      <div className="w-full flex items-center justify-between pb-6 pt-3">
        <ul className="flex h-5">
          <li>
            <StarIcon className="w-5 h-5" fill="rgba(37, 99, 235, 1)" />
          </li>
          <li className="font-body text-sm font-normal text-gray-900 mx-1.5">
            4,3
          </li>
          <li className="flex items-center mx-1.5">·</li>
          <li className="font-body text-sm font-medium text-blue-600 mx-1.5">
            15 reviews
          </li>
          <li className="flex items-center mx-1.5">·</li>
          <li className="font-body text-sm font-medium text-blue-600">
            Minsk, Minsk Province, Belarus
          </li>
        </ul>
        <div className="flex items-center">
          <button onClick={handleLike}>
            {isLike ? (
              <HeartActiveIcon className="h-5 w-5 text-red-500" />
            ) : (
              <HeartIcon className="h-5 w-5" />
            )}
          </button>
          <button className="ml-[7.7px] text-sm font-body">Save</button>
        </div>
      </div>
    </div>
  );
};

export default ObjectsPageCardTop;

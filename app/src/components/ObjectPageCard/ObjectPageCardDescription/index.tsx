import React, { useState } from "react";
import Avatar from "../../../assets/img/Avatar.png";
import { getFullText } from "../utils/helpers";
import ObjectsPageCardIntroduce from "../ObjectPageCardIntroduce";
import { ObjectsPageCardDescriptionProps } from "./IObjectsPageCardDescriptionProps";

const ObjectsPageCardDescription = ({
  sideEffect,
  description,
  feature,
}: ObjectsPageCardDescriptionProps) => {
  const [isFullText, setFullText] = useState<boolean>(false);

  const handleFullText = () => {
    setFullText((prev) => !prev);
  };

  return (
    <div className="w-3/4">
      <div className="w-full flex justify-between">
        <div>
          <h2 className="font-body font-medium text-2xl">
            Private room in Minsk
          </h2>
          <ul className="flex">
            <li className="font-body text-gray-700 text-base">
              {feature?.guests} guest(s)
            </li>
            <li className="flex items-center mx-1.5">·</li>
            <li className="font-body text-gray-700 text-base">
              {feature?.bedrooms} bedroom(s)
            </li>
            <li className="flex items-center mx-1.5">·</li>
            <li className="font-body text-gray-700 text-base">
              {feature?.beds} bed(s)
            </li>
            <li className="flex items-center mx-1.5">·</li>
            <li className="font-body text-gray-700 text-base">
              {feature?.bathrooms} bathroom(s)
            </li>
          </ul>
        </div>
        <div className="object-contain w-12">
          <img src={Avatar} className="w-full" alt="room" />
        </div>
      </div>
      <hr className="my-7" />
      <div className="w-full">
        <p className="text-base font-body">
          {description && getFullText(description, isFullText)}
        </p>
        <button
          disabled={sideEffect}
          onClick={handleFullText}
          className="font-body text-sm font-medium text-blue-600 mt-1.5"
        >
          {!isFullText ? "Show more" : "Hide"}
        </button>
        <hr className="my-7" />
      </div>
      <ObjectsPageCardIntroduce />
    </div>
  );
};

export default ObjectsPageCardDescription;

import React, { useState } from "react";
import Avatar from "../utils/img/Avatar.png";
import { getFullText } from "../utils/helpers";
import ObjectsPageCardIntroduce from "../ObjectPageCardIntroduce";

const text =
  "Lovely large Private EnSuite room in a shared 2 bed flat (with me as the only other resident) in Paddington which is a thriving hub of restaurants, shops and green spaces just a short walk from central London and the Hyde Park. The flat is spacious and homey. The flat is a 4 min walk to Paddington underground station and 7 minutes to the central line at LancasterGate!Please note that the flat is on the 2nd floor and there is no lift, the kitchen is vegetarian Lovely large Private EnSuite room in a shared 2 bed flat (with me as the only other resident) in Paddington which is a thriving hub of restaurants, shops and green spaces just a short walk from central London and the Hyde Park. The flat is spacious and homey. The flat is a 4 min walk to Paddington underground station and 7 minutes to the central line at LancasterGate!Please note that the flat is on the 2nd floor and there is no lift, the kitchen is vegetarian";

const ObjectsPageCardDescription = () => {
  const [isFullText, setFullText] = useState<boolean>(false);

  const handleFullText = () => {
    setFullText((prev) => !prev);
  };

  return (
    <div className="w-3/4">
      <div className="w-full flex justify-between">
        <div>
          <h2 className="font-body font-medium text-2xl">
            Private room in Minsk hosted by Alexander
          </h2>
          <ul className="flex">
            <li className="font-body text-gray-700 text-base">4 guests</li>
            <li className="flex items-center mx-1.5">·</li>
            <li className="font-body text-gray-700 text-base">1 bedroom</li>
            <li className="flex items-center mx-1.5">·</li>
            <li className="font-body text-gray-700 text-base">2 beds</li>
            <li className="flex items-center mx-1.5">·</li>
            <li className="font-body text-gray-700 text-base">1 bathroom</li>
          </ul>
        </div>
        <div className="object-contain w-12">
          <img src={Avatar} className="w-full" alt="room" />
        </div>
      </div>
      <hr className="my-7" />
      <div className="w-full">
        <p className="text-base font-body">{getFullText(text, isFullText)}</p>
        <button
          onClick={handleFullText}
          className="font-body text-sm font-medium text-blue-600 mt-1.5"
        >
          Show more
        </button>
        <hr className="my-7" />
      </div>
      <ObjectsPageCardIntroduce />
    </div>
  );
};

export default ObjectsPageCardDescription;

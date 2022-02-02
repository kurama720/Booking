import React from "react";
import { LocationMarkerIcon } from "@heroicons/react/outline";

interface LocationMenuProps {
  cities: { name: string }[];
  getSuggestionData: React.MouseEventHandler<HTMLButtonElement>;
}

function LocationMenu({ cities, getSuggestionData }: LocationMenuProps) {
  return (
    <div className="w-56 rounded-md  shadow absolute bg-white rounded-md top-10 1.5xl:left-[23.2%] lg:left-[11.2%] 3xl:left-[24.5%] 4xl:left-[28.8%] 5xl:left-[34.6%] xlg:left-[17.2%] mlg:left-[10.8%] 3.5xl:left-[25.7%] 1xl:left-[21.2%] 3.75xl:left-[28.7%] 6xl:left-[36.3%]">
      {cities.map((city) => {
        return (
          <button
            type="button"
            key={city.name}
            id={city.name}
            className="w-full flex items-center pl-[0.96875rem] py-2 text-gray-700 font-body text-sm leading-5 font-normal"
            onClick={getSuggestionData}
          >
            <LocationMarkerIcon
              key={city.name}
              id={city.name}
              className="w-[1.24rem] h-[1.3728rem] mr-[0.65625rem]"
            />
            {city.name}
          </button>
        );
      })}
    </div>
  );
}

export default LocationMenu;

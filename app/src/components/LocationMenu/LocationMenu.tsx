import React from "react";
import { LocationMarkerIcon } from "@heroicons/react/outline";

interface LocationMenuProps {
  cities: { name: string }[];
  getSuggestionData: React.MouseEventHandler<HTMLButtonElement>;
}

function LocationMenu({ cities, getSuggestionData }: LocationMenuProps) {
  return (
    <div className="w-56 rounded-md  shadow absolute top-10 1.5xl:left-[25.5%] lg:left-[11.2%] 3xl:left-[26.5%] 4xl:left-[30.3%] 5xl:left-[35.2%] xlg:left-[20.5%] mlg:left-[13.2%] 3.5xl:left-[27.5%] 1xl:left-[23.8%] 3.75xl:left-[30.1%] 6xl:left-[36.8%]">
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

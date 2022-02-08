import React, { useRef } from "react";
import { LocationMarkerIcon } from "@heroicons/react/outline";
import { Cities } from "../Header/utils/HeaderInterface";
import { useOutside } from "../../hooks/useClickOutside";

interface LocationMenuProps {
  cities: Array<Cities>;
  getSuggestionData: React.MouseEventHandler<HTMLButtonElement>;
  isActiveLocationBox: React.Dispatch<React.SetStateAction<boolean>>;
}

function LocationMenu({
  cities,
  getSuggestionData,
  isActiveLocationBox,
}: LocationMenuProps) {
  const wrapper = useRef(null);

  useOutside(wrapper, isActiveLocationBox);

  return (
    <>
      {cities.length > 0 ? (
        <div
          ref={wrapper}
          className="w-56 rounded-md shadow absolute z-10 bg-white rounded-md top-[60px] 1.5xl:left-[23.2%] lg:left-[11.2%] 3xl:left-[24.5%] 4xl:left-[28.8%] 5xl:left-[34.6%] xlg:left-[17.2%] mlg:left-[10.8%] 3.5xl:left-[25.7%] 1xl:left-[21.2%] 3.75xl:left-[28.7%] 6xl:left-[36.3%]"
        >
          {cities.map((city) => {
            return (
              <button
                type="button"
                key={city.name}
                id={city.name}
                className="w-full flex items-center pl-[0.96875rem] py-2 text-gray-700 font-body text-sm leading-5 font-normal hover:bg-gray-200"
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
      ) : null}
    </>
  );
}

export default LocationMenu;

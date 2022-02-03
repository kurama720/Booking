import React, { FC } from "react";
import { LocationMarkerIcon } from "@heroicons/react/solid";
import { LocationProps } from "./utils/LocationInterface";

const Location: FC<LocationProps> = ({
  isActiveModel,
  activeLocationBox,
  search,
  setSearch,
  setCalendarPopUpStatus,
  isActiveLocationBox,
}) => {
  const handleClickSearch = () => {
    setCalendarPopUpStatus(false);
    isActiveModel(false);
    isActiveLocationBox((prev) => !prev);
  };

  return (
    <div className="w-56 h-[2.375rem] relative sm:col-span-3">
      <label
        htmlFor="first-name"
        className="block text-sm font-medium text-gray-700"
      />
      <input
        placeholder="Where are you going?"
        type="text"
        name="location"
        autoComplete="off"
        value={search}
        id="location"
        onClick={handleClickSearch}
        onChange={(e) => setSearch(e.target.value)}
        className="font-body rounded-tl-lg rounded-bl-lg outline-none py-[0.50rem] px-[2.46rem] border border-[#D1D5DB] shadow-sm focus:border-[#3B82F6] focus: border  block w-full sm:text-sm "
      />
      <div className="absolute bottom-2 left-4">
        <LocationMarkerIcon
          className="w-[1.24rem] h-[1.3728rem]"
          fill={activeLocationBox ? "#6B7280" : "rgb(156 163 175)"}
        />
      </div>
    </div>
  );
};

export default Location;

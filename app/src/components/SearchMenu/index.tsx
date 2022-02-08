import React from "react";
import { SearchIcon } from "@heroicons/react/solid";

interface ISearchMenuProps {
  handleSearchMenu: (() => void) | undefined;
}
const SearchMenu = ({ handleSearchMenu }: ISearchMenuProps) => {
  return (
    <div className="w-80 h-[38px] relative sm:col-span-3">
      <label
        htmlFor="guest-group"
        className="position absolute font-body text-sm top-2.5 left-[13px] font-body text-gray-400 text-sm"
      >
        Start new search
      </label>
      <input
        type="button"
        name="guest-group"
        id="guest-group"
        onClick={handleSearchMenu}
        className="py-1.5 px-[41px] outline-none bg-white border border-[#D1D5DB] shadow-sm focus:border-[#3B82F6] block w-full"
      />
      <div className="absolute bottom-2 left-[288.76px]">
        <SearchIcon className="w-[20px] h-[22px]" fill="#9CA3AF" />
      </div>
    </div>
  );
};

export default SearchMenu;

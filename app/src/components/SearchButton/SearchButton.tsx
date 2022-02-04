import React from "react";
import { SearchIcon } from "@heroicons/react/solid";
import { SearchButtonProps } from "./utils/SearchButtonInterface";

function SearchButton({ userBookingDate }: SearchButtonProps) {
  const handleSearchButton = () => {
    if (!!userBookingDate.checkInDate && !!userBookingDate.city) {
      alert(JSON.stringify(userBookingDate));
    }
  };
  return (
    <button
      type="button"
      onClick={handleSearchButton}
      className="font-body rounded-tr-lg rounded-br-lg h-[2.375rem] py-[0.62rem] pl-[2.6875rem] pr-[1.0625rem] group relative w-[6.6875rem] flex justify-center items-center border border-transparent text-sm leading-5 font-medium  text-white bg-blue-600 "
    >
      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
        <SearchIcon
          className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
          aria-hidden="true"
          fill="rgba(255, 255, 255, 1)"
        />
      </span>
      Search
    </button>
  );
}

export default SearchButton;

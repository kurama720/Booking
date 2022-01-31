import React from "react";
import { SearchIcon } from "@heroicons/react/solid";
//import { useNavigate } from "react-router-dom";
import { SearchButtonProps } from "./utils/SearchButtonInterface";
import { GetApartmentsService } from "../../api/GetApartmentsService";
//import { Paths } from "../../paths/path";

function SearchButton({ userBookingDate, setApartments }: SearchButtonProps) {
  //const navigate = useNavigate();
  const handleSearchButton = async () => {
    if (!!userBookingDate.checkInDate && !!userBookingDate.city) {
      try {
        const response = await GetApartmentsService.getApartment(
          userBookingDate
        );
        console.log(response);
        setApartments(response.data);
        //navigate(Paths.MAP);
      } catch (e) {
        console.log(e);
      }
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

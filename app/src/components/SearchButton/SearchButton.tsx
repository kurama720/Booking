import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { SearchIcon, XIcon } from "@heroicons/react/solid";
import { SearchButtonProps } from "./utils/SearchButtonInterface";
import { ApartmentsService } from "../../api/ApartmentsService";
import { Paths } from "../../paths/path";

function SearchButton({ userBookingDate, setApartments }: SearchButtonProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [errorSearch, serErrorSearch] = useState<string>("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();
  const handleSearchButton = async () => {
    if (
      !!userBookingDate.checkInDate &&
      !!userBookingDate.lat &&
      !!userBookingDate.lon
    ) {
      try {
        const response = await ApartmentsService.getApartment(userBookingDate);
        alert(userBookingDate);
        console.log(response.data);
        setApartments(response.data);
        navigate(Paths.MAP);
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          serErrorSearch(e.message);
          handleClickOpen();
        }
      }
    }
  };
  return (
    <>
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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          Search Error...{" "}
          <Button onClick={handleClose}>
            <XIcon className="text-gray-500 w-6 h-6 hover:text-gray-700" />
          </Button>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {errorSearch}
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            Try again!
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SearchButton;

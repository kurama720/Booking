import React from "react";
import { IBookingHistoryProps } from "./IBookingHistoryItemProps";

const BookingHistoryItem = ({
  apartment,
  persons,
  checkIn,
  checkOut,
}: IBookingHistoryProps) => {
  const cancelBookApartment = async () => {};

  return (
    <>
      <div className="flex justify-between items-end">
        <div className="w-2/4">
          <hr className="w-full" />
          <p className="font-body text-sm mt-2 text-slate-900 font-medium">
            Apartment:
            <span className="font-body text-md ml-1 font-normal">
              {apartment}
            </span>
          </p>
          <p className="font-body text-sm text-slate-900 font-medium">
            Persons:
            <span className="font-body text-md ml-1 font-normal">
              {persons}
            </span>
          </p>
          <p className="font-body text-sm text-slate-900 font-medium">
            Check in:
            <span className="font-body text-md ml-1 font-normal">
              {checkIn}
            </span>
          </p>
          <p className="font-body text-sm mb-2 font-medium">
            Check out:
            <span className="font-body text-md ml-1 font-normal">
              {checkOut}
            </span>
          </p>
        </div>
        <button
          className="mb-2 mr-2 font-body text-base text-blue-600"
          onClick={cancelBookApartment}
        >
          cancel booking
        </button>
      </div>
      <hr className="w-full" />
    </>
  );
};

export default BookingHistoryItem;

import React from "react";
import { IBookingHistoryProps } from "./IBookingHistoryItemProps";
import { ApartmentsService } from "../../../api/ApartmentsService";

const BookingHistoryItem = ({
  id,
  apartment,
  persons,
  checkIn,
  checkOut,
  bookingData,
  setBookingData,
}: IBookingHistoryProps) => {
  const cancelBookApartment = async () => {
    try {
      const response = await ApartmentsService.cancelApartmentBook("5");
      if (response.status === 201) {
        const newApartmentsBook = bookingData.filter((item) => item.id !== id);
        setBookingData(newApartmentsBook);
      }
    } catch (e) {
      console.log(e);
    }
  };

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

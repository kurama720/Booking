import React, { useState } from "react";
import { ApartmentsService } from "../../../api/ApartmentsService";
import { TBookingHistory } from "../IBookingHistory";
import Loader from "../../Loader";

interface IBookingHistoryProps {
  id: number;
  apartment: string;
  persons: number;
  checkIn: string;
  checkOut: string;
  bookingData: TBookingHistory[];
  setBookingData: React.Dispatch<React.SetStateAction<TBookingHistory[]>>;
}

const BookingHistoryItem = ({
  id,
  apartment,
  persons,
  checkIn,
  checkOut,
  bookingData,
  setBookingData,
}: IBookingHistoryProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const cancelBookApartment = async () => {
    try {
      setIsLoading(true);
      const response = await ApartmentsService.cancelApartmentBook(id);
      console.log(response.status);
      const newApartmentsBook = bookingData.filter((item) => item.id !== id);
      setBookingData(newApartmentsBook);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <hr className="w-full" />
      <div className="flex justify-between items-end">
        <div className="w-2/4">
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
        {isLoading ? (
          <Loader width="8" height="8" color="blue-600" />
        ) : (
          <button
            className="mb-2 mr-2 font-body text-base text-white bg-blue-600 px-4 py-2 rounded-md"
            onClick={cancelBookApartment}
          >
            cancel booking
          </button>
        )}
      </div>
      <hr className="w-full" />
    </>
  );
};

export default BookingHistoryItem;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { XIcon } from "@heroicons/react/solid";
import Button from "../Button/Button";
import { ApartmentsService } from "../../api/ApartmentsService";
import { IBookingHistory, TBookingHistory } from "./IBookingHistory";
import BookingHistoryItem from "./BookingHistoryItem";
import Loader from "../Loader";

const BookingHistory = ({ handleBookingHistory }: IBookingHistory) => {
  const historyItem = 4;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [bookingData, setBookingData] = useState<TBookingHistory[]>([]);
  const [error, setError] = useState<string>("");
  const getBookingHistory = async () => {
    try {
      setIsLoading(true);
      const response = await ApartmentsService.getApartmentsBook();
      setBookingData(response.data);
      setIsLoading(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        setError(e.message);
      }
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBookingHistory();
    return () => setIsLoading(false);
  }, []);

  return (
    <div
      className="h-full flex items-center"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="bg-white max-w-lg shadow rounded-md">
        <div className="w-[32rem] px-4 py-4">
          <div className="flex w-full justify-between mb-4">
            <h1 className="flex justify-center font-body text-2xl font-bold text-gray-600">
              History of booking
            </h1>
            <Button
              classNames="rounded-3xl flex items-center h-9"
              type="button"
              onClick={handleBookingHistory}
              context={
                <XIcon className="h-6 w-6 fill-gray-400 hover:fill-gray-500 duration-500" />
              }
            />
          </div>
          {isLoading ? (
            <div className="flex justify-center items-center">
              <Loader width="16" height="16" color="blue-600" />
            </div>
          ) : (
            <div
              className={`w-full ${
                bookingData.length > historyItem ? "overflow-y-scroll h-96" : ""
              }`}
            >
              {bookingData.length > 0 ? (
                bookingData.map((apartment) => {
                  return (
                    <BookingHistoryItem
                      id={apartment.id}
                      key={apartment.id}
                      apartment={apartment.apartment}
                      persons={apartment.num_of_persons}
                      checkIn={apartment.check_in_date}
                      checkOut={apartment.check_out_date}
                      bookingData={bookingData}
                      setBookingData={setBookingData}
                    />
                  );
                })
              ) : (
                <div className="flex justify-center items-center">
                  <div className="text-2xl font-body font-medium text-gray-900">
                    You have no hotels booked!
                  </div>
                </div>
              )}
              {error && (
                <span className="font-body text-base text-red-500">
                  {error}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingHistory;

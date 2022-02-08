import React, { useEffect, useState } from "react";
import axios from "axios";
import { LocalKey, LocalStorage } from "ts-localstorage";
import { XIcon } from "@heroicons/react/solid";
import { JWT } from "../../hooks/auth.hook.interface";
import Button from "../Button/Button";
import { IBookingHistory } from "./IBookingHistory";
import BookingHistoryItem from "./BookingHistoryItem";

const storageName = "userData" as LocalKey<JWT>;

interface TBookingHistory {
  apartment: string;
  persons: number;
  description: string;
  checkIn: string;
  checkOut: string;
}

const BookingHistory = ({ handleBookingHistory }: IBookingHistory) => {
  const historyItem = 4;
  const data = [
    {
      apartment: "Hilton",
      persons: 10,
      description:
        "One-room studio apartment, opposite East Cinema. 5 minutes to Bus\n" +
        "Station and Central Market. After the bus station, behind the tracks,\n" +
        "the old town begins.",
      checkIn: "2022-01-26",
      checkOut: "2023-01-31",
    },
    {
      apartment: "Gines",
      persons: 11,
      description:
        "One-room studio apartment, opposite East Cinema. 5 minutes to Bus\n" +
        "Station and Central Market. After the bus station, behind the tracks,\n" +
        "the old town begins.",
      checkIn: "2022-01-27",
      checkOut: "2023-01-31",
    },
    {
      apartment: "Hilton",
      persons: 12,
      description:
        "One-room studio apartment, opposite East Cinema. 5 minutes to Bus\n" +
        "Station and Central Market. After the bus station, behind the tracks,\n" +
        "the old town begins.",
      checkIn: "2022-01-28",
      checkOut: "2023-01-31",
    },
    {
      apartment: "China",
      persons: 16,
      description:
        "One-room studio apartment, opposite East Cinema. 5 minutes to Bus\n" +
        "Station and Central Market. After the bus station, behind the tracks,\n" +
        "the old town begins.",
      checkIn: "2022-01-29",
      checkOut: "2023-01-31",
    },
    {
      apartment: "China",
      persons: 16,
      description:
        "One-room studio apartment, opposite East Cinema. 5 minutes to Bus\n" +
        "Station and Central Market. After the bus station, behind the tracks,\n" +
        "the old town begins.",
      checkIn: "2022-01-30",
      checkOut: "2023-01-31",
    },
  ];
  const [bookingData, setBookingData] = useState<TBookingHistory[]>(data);
  const getBookingHistory = async () => {
    const userData = LocalStorage.getItem(storageName);

    if (userData) {
      const payload = userData.token.data.access;

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${payload}`,
        },
      };
      const historyData = await axios.get(
        `${process.env.REACT_APP_API_URL}accounts/booking-history/`,
        config
      );
    }
  };

  useEffect(() => {
    getBookingHistory();
  }, []);

  return (
    <div
      className="h-full flex items-center"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="bg-white max-w-lg shadow rounded-md">
        <div className="w-full px-4 py-4">
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
          <div
            className={`w-full ${
              bookingData.length > historyItem ? "overflow-y-scroll h-96" : ""
            }`}
          >
            {bookingData.map((elem) => {
              return (
                <BookingHistoryItem
                  key={elem.checkIn}
                  apartment={elem.apartment}
                  persons={elem.persons}
                  description={elem.description}
                  checkIn={elem.checkIn}
                  checkOut={elem.checkOut}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingHistory;

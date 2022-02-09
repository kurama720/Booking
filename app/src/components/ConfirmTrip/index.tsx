import React, { FC } from "react";
import { dateFormat } from "../../models/parseDate";

interface IPropsConfirmTrip {
  checkInDate: string;
  checkOutDate: string;
  numberOfGuests: number;
}

const ConfirmTrip: FC<IPropsConfirmTrip> = ({
  checkInDate,
  checkOutDate,
  numberOfGuests,
}) => {
  return (
    <div className="max-w-[670px] w-full mr-2">
      <span className="font-body text-2xl font-medium text-gray-900 mt-10 mb-9 block">
        Your trip
      </span>
      <div className="pl-6">
        <div className="flex flex-col">
          <span className="text-sm font-medium font-body text-gray-900">
            Dates
          </span>
          <span className="font-body text-xs text-gray-500">
            {dateFormat(checkInDate)} - {dateFormat(checkOutDate)}
          </span>
        </div>
        <div className="flex flex-col mt-6">
          <span className="text-sm font-medium font-body text-gray-900">
            Guests
          </span>
          <span className="font-body text-xs text-gray-500">
            {numberOfGuests} {numberOfGuests > 1 ? "guests" : "guest"}
          </span>
        </div>
      </div>
      <div className="w-full h-px bg-gray-200 mt-9" />
    </div>
  );
};

export default ConfirmTrip;

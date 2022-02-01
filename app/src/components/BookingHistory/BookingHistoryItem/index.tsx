import React from "react";
import { IBookingHistoryProps } from "./IBookingHistoryItemProps";

const BookingHistoryItem = ({
  apartment,
  persons,
  description,
  checkIn,
  checkOut,
}: IBookingHistoryProps) => {
  return (
    <div>
      <hr className="w-full" />
      <p className="font-body text-sm mt-2 text-slate-900 font-medium">
        Apartment:
        <span className="font-body text-md ml-1 font-normal">{apartment}</span>
      </p>
      <p className="font-body text-sm text-slate-900 font-medium">
        Persons:
        <span className="font-body text-md ml-1 font-normal">{persons}</span>
      </p>
      <p className="font-body text-sm text-slate-900 font-medium">
        Description:
        <span className="font-body text-md leading-tight ml-1 font-normal">
          {description}
        </span>
      </p>
      <p className="font-body text-sm text-slate-900 font-medium">
        Check in:
        <span className="font-body text-md ml-1 font-normal">{checkIn}</span>
      </p>
      <p className="font-body text-sm mb-2 font-medium">
        Check out:
        <span className="font-body text-md ml-1 font-normal">{checkOut}</span>
      </p>
      <hr className="w-full" />
    </div>
  );
};

export default BookingHistoryItem;

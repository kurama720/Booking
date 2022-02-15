import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StarIcon } from "@heroicons/react/solid";
import { DateRange } from "@mui/lab/DateRangePicker";
import { IFormApartmentProps } from "./IFormApartment";
import PartFormApartment from "./PartFormApartment/PartFormApartment";
import { parseDate, getDiffInDays } from "../../models/parseDate";
import { Paths } from "../../paths/path";

const ApartmentForm = ({
  id,
  sideEffect,
  bookingReverseData,
  setBookingReverseData,
  rating,
  reviews,
  price,
}: IFormApartmentProps) => {
  const [valueDate, setValueDate] = useState<DateRange<Date>>([null, null]);
  const [numberOfGuests, setNumberOfGuests] = useState<number>(1);
  const [isShowGuestsWindow, setIsShowGuestsWindow] = useState<boolean>(false);
  const history = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (valueDate[0] && valueDate[1]) {
      setBookingReverseData({
        ...bookingReverseData,
        id,
        checkIn: parseDate(valueDate[0]),
        checkOut: parseDate(valueDate[1]),
        numberOfGuests,
      });
      history(Paths.CONFIRM);
    }
  };

  const handleChangeShowGuestsWindow = (): void => {
    setIsShowGuestsWindow((prev) => !prev);
  };

  const incrementGuests = (): void => {
    setNumberOfGuests((prev) => prev + 1);
  };

  const decrementGuests = (): void => {
    setNumberOfGuests((prev) => prev - 1);
  };

  const handleOutsideClick = (): void => {
    setIsShowGuestsWindow(false);
  };

  return (
    <div className="4xl:ml-[6%] 5xl:ml-[11%] 6xl:ml-[14%] 3.75xl:ml-[6%] 3.5xl:ml-[5%] 3xl:ml-[5%] 1.5xl:ml-[6%] 1xl:ml-[6%] xlg:ml-[6%] mlg:ml-[4%]">
      <div className="shadow w-full p-6 max-w-[350px]">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-xl font-body font-bold text-gray-900">
              ${price}
            </span>
            <span className="text-xl font-body text-gray-500"> / night</span>
          </div>
          <div className="flex items-center">
            {rating && (
              <>
                <span>
                  <StarIcon className="text-blue-500 w-4 h-4" />
                </span>
                <span className="text-sm font-body">{rating}</span>
                <span className="inline-block mx-2 w-0.5 h-0.5 bg-gray-700 rounded-full" />
              </>
            )}
            <span className="text-blue-600 text-sm font-body font-medium">
              {reviews} reviews
            </span>
          </div>
        </div>
        <PartFormApartment
          sideEffect={sideEffect}
          valueDate={valueDate}
          setValueDate={setValueDate}
          setNumberOfGuests={setNumberOfGuests}
          handleSubmit={handleSubmit}
          numberOfGuests={numberOfGuests}
          isShowGuestsWindow={isShowGuestsWindow}
          decrementGuests={decrementGuests}
          incrementGuests={incrementGuests}
          handleChangeShowGuestsWindow={handleChangeShowGuestsWindow}
          handleOutsideClick={handleOutsideClick}
          price={price}
          nights={getDiffInDays(valueDate[0], valueDate[1])}
        />
      </div>
    </div>
  );
};

export default ApartmentForm;

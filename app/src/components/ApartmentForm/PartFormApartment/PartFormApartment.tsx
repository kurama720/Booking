import React, { FC, useEffect, useRef } from "react";
import { MailIcon } from "@heroicons/react/solid";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/outline";
import { IPropsFormApartment } from "./IPropsPartFormApartment";
import Calendar from "../Calendar/Calendar";

const PartFormApartment: FC<IPropsFormApartment> = (props) => {
  const {
    valueDate,
    setValueDate,
    handleSubmit,
    numberOfGuests,
    isShowGuestsWindow,
    setNumberOfGuests,
    decrementGuests,
    incrementGuests,
    handleChangeShowGuestsWindow,
    handleOutsideClick,
    sideEffect,
  } = props;
  const wrapperRef = useRef(null);

  const useOutsideAlerter = (
    ref: React.MutableRefObject<HTMLBodyElement | null>
  ) => {
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          handleOutsideClick();
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };
  useOutsideAlerter(wrapperRef);
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex align-center justify-center my-6">
        <div>
          <Calendar valueDate={valueDate} setValueDate={setValueDate} />
        </div>
      </div>
      <div>
        <label
          htmlFor="guests"
          className="block text-xs text-gray-700 font-body"
        >
          Guests
        </label>
        <div
          className={`flex rounded-md ${
            isShowGuestsWindow ? "border-1 border-blue-600" : "border-gray-300"
          } border  items-center`}
        >
          <span className="pl-1.5 ">
            <MailIcon className="h-6 w-5 text-gray-400" />
          </span>
          <input
            disabled
            type="text"
            value={`${numberOfGuests} guest${numberOfGuests > 1 ? "s" : ""}`}
            onChange={(e) => setNumberOfGuests(Number(e.target.value))}
            name="guests"
            id="guests"
            className={`${
              sideEffect ? "bg-[#bfbfbf]" : ""
            } appearance-none font-body text-gray-900 text-sm w-full block px-3 py-2 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
          />
          <button
            disabled={sideEffect}
            className="mr-4 inline-block"
            onMouseDown={(e) => {
              e.stopPropagation();
              handleChangeShowGuestsWindow();
            }}
          >
            {isShowGuestsWindow ? (
              <ChevronUpIcon className="w-4 h-4 text-blue-600" />
            ) : (
              <ChevronDownIcon className="w-4 h-4 text-gray-400" />
            )}
          </button>
        </div>
        {isShowGuestsWindow && (
          <div
            className="shadow rounded-md py-4 px-6 absolute bg-white w-[302px] mt-1"
            ref={wrapperRef}
          >
            <div className="flex justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-body font-medium text-gray-900">
                  Guests
                </span>
                <span className="font-body text-xs text-gray-500">
                  ages 13 or above
                </span>
              </div>
              <div className="flex justify-center items-center">
                <button
                  onClick={decrementGuests}
                  disabled={numberOfGuests <= 1}
                  type="button"
                >
                  <div
                    className={`${
                      numberOfGuests <= 1 ? "bg-gray-200" : "bg-blue-600 "
                    } w-8 h-8 rounded-full flex items-center justify-center`}
                  >
                    <MinusIcon className="w-3 text-white " />
                  </div>
                </button>
                <span className="mx-5">{numberOfGuests}</span>
                <button onClick={incrementGuests} type="button">
                  <div className="bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center">
                    <PlusIcon className="w-3 h-3 text-white " />
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-base font-body text-gary-700">
              $34 x 30 nights
            </span>
            <span className="text-base font-body text-gray-700 font-medium">
              $1020
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-base font-body text-gray-700">
              Weekly discount: 5% off
            </span>
            <span className="text-base font-body text-green-600 font-medium">
              -$29
            </span>
          </div>
        </div>
        <div className="w-full h-px bg-gray-200 my-6" />
        <div className="flex justify-between items center">
          <span className="text-base font-body font-medium text-gray-700">
            Total
          </span>
          <span className="text-base font-body font-bold text-gray-700">
            $991
          </span>
        </div>
        <button
          className="group mt-6 w-full font-body font-medium flex justify-center py-2 px-16 border border-transparent text-sm font-medium rounded-md bg-blue-600 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          type="submit"
          disabled={sideEffect}
        >
          Reserve
        </button>
      </div>
    </form>
  );
};

export default PartFormApartment;

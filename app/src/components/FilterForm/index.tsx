import React, { FC, useState } from "react";
import axios from "axios";
import { XIcon, MinusIcon, PlusIcon } from "@heroicons/react/solid";

interface IFilterFormProps {
  onClose: () => void;
}

const FilterForm: FC<IFilterFormProps> = ({ onClose }) => {
  const [bedsCount, setBedsCount] = useState(0);
  const [bedroomsCount, setBedroomsCount] = useState(0);
  const [bathroomsCount, setBathroomsCount] = useState(0);

  const handleClear = () => {
    setBedsCount(0);
    setBedroomsCount(0);
    setBathroomsCount(0);
  };

  const handleApply = async () => {
    const results = await axios.get(
      `${process.env.REACT_APP_API_URL}apartments/`,
      {
        params: {
          feature: {
            beds: bedsCount,
            bedrooms: bedroomsCount,
            bathrooms: bathroomsCount,
          },
        },
      }
    );
    console.log(results);
    onClose();
  };

  return (
    <div
      className="box-border w-[816px] py-8 px-10 rounded-lg bg-white font-body"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold text-gray-600">Filters</span>
        <XIcon
          className="h-6 w-6 fill-gray-400 hover:fill-gray-500 duration-500 cursor-pointer"
          onClick={onClose}
        />
      </div>
      <section className="mt-6 border-b-[1px]">
        <span className="text-lg font-bold text-gray-900">Rooms and beds</span>
        <div className="px-6 py-[41px] space-y-[34px]">
          <div className="flex justify-between">
            <span className="text-sm font-medium text-gray-900">Beds</span>
            <div className="flex space-x-[10px]">
              <button
                type="button"
                disabled={!bedsCount}
                className={
                  !bedsCount
                    ? "w-[1.875rem] h-[1.875rem] bg-gray-200 rounded-full text-gray-400 flex items-center justify-center"
                    : "w-[1.875rem] h-[1.875rem] bg-blue-600 rounded-full text-white flex items-center justify-center"
                }
                onClick={() => setBedsCount((prev: number) => prev - 1)}
              >
                <MinusIcon className="w-5" />
              </button>
              <div className="w-[1.875rem] h-[1.875rem] flex items-center justify-center">
                {bedsCount}
              </div>
              <button
                type="button"
                className="w-[1.875rem] h-[1.875rem] bg-blue-600 rounded-full text-white flex items-center justify-center"
                onClick={() => setBedsCount((prev: number) => prev + 1)}
              >
                <PlusIcon className="w-5" />
              </button>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium text-gray-900">Bedrooms</span>
            <div className="flex space-x-[10px]">
              <button
                type="button"
                disabled={!bedroomsCount}
                className={
                  !bedroomsCount
                    ? "w-[1.875rem] h-[1.875rem] bg-gray-200 rounded-full text-gray-400 flex items-center justify-center"
                    : "w-[1.875rem] h-[1.875rem] bg-blue-600 rounded-full text-white flex items-center justify-center"
                }
                onClick={() => setBedroomsCount((prev: number) => prev - 1)}
              >
                <MinusIcon className="w-5" />
              </button>
              <div className="w-[1.875rem] h-[1.875rem] flex items-center justify-center">
                {bedroomsCount}
              </div>
              <button
                type="button"
                className="w-[1.875rem] h-[1.875rem] bg-blue-600 rounded-full text-white flex items-center justify-center"
                onClick={() => setBedroomsCount((prev: number) => prev + 1)}
              >
                <PlusIcon className="w-5" />
              </button>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium text-gray-900">Bathrooms</span>
            <div className="flex space-x-[10px]">
              <button
                type="button"
                disabled={!bathroomsCount}
                className={
                  !bathroomsCount
                    ? "w-[1.875rem] h-[1.875rem] bg-gray-200 rounded-full text-gray-400 flex items-center justify-center"
                    : "w-[1.875rem] h-[1.875rem] bg-blue-600 rounded-full text-white flex items-center justify-center"
                }
                onClick={() => setBathroomsCount((prev: number) => prev - 1)}
              >
                <MinusIcon className="w-5" />
              </button>
              <div className="w-[1.875rem] h-[1.875rem] flex items-center justify-center">
                {bathroomsCount}
              </div>
              <button
                type="button"
                className="w-[1.875rem] h-[1.875rem] bg-blue-600 rounded-full text-white flex items-center justify-center"
                onClick={() => setBathroomsCount((prev: number) => prev + 1)}
              >
                <PlusIcon className="w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className="flex justify-between items-center test-sm mt-6">
        <button className="text-blue-600 font-medium" onClick={handleClear}>
          Clear all
        </button>
        <button
          className="p-2 text-xs text-white bg-blue-600 rounded font-medium"
          onClick={handleApply}
        >
          Apply filter
        </button>
      </div>
    </div>
  );
};

export default FilterForm;

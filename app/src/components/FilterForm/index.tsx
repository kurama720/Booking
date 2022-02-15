import React, { FC, useState } from "react";
import { XIcon, MinusIcon, PlusIcon } from "@heroicons/react/solid";
import { IApartment } from "../../models/globalInterfaces/globalIntefaces";

export type TFilters = { beds: number; bedrooms: number; bathrooms: number };

interface IFilterFormProps {
  apartments: IApartment[];
  filters: TFilters;
  setFilters: React.Dispatch<React.SetStateAction<TFilters>>;
  onFilter: React.Dispatch<React.SetStateAction<IApartment[]>>;
  onClose: () => void;
}

const FilterForm: FC<IFilterFormProps> = ({
  apartments,
  filters,
  setFilters,
  onFilter,
  onClose,
}) => {
  const handleClear = () => {
    setFilters({ beds: 0, bedrooms: 0, bathrooms: 0 });
    onFilter([...apartments]);
    onClose();
  };

  const handleApply = () => {
    onFilter(
      apartments.filter((item) => {
        const isBedsEqual = !filters.beds || item.feature.beds === filters.beds;
        const isBedroomsEqual =
          !filters.bedrooms || item.feature.bedrooms === filters.bedrooms;
        const isBathroomsEqual =
          !filters.bathrooms || item.feature.bathrooms === filters.bathrooms;
        return isBedsEqual && isBedroomsEqual && isBathroomsEqual;
      })
    );
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
                disabled={!filters.beds}
                className={
                  !filters.beds
                    ? "w-[1.875rem] h-[1.875rem] bg-gray-200 rounded-full text-gray-400 flex items-center justify-center"
                    : "w-[1.875rem] h-[1.875rem] bg-blue-600 rounded-full text-white flex items-center justify-center"
                }
                onClick={() =>
                  setFilters((prev) => ({ ...prev, beds: prev.beds - 1 }))
                }
              >
                <MinusIcon className="w-5" />
              </button>
              <div className="w-[1.875rem] h-[1.875rem] flex items-center justify-center">
                {filters.beds}
              </div>
              <button
                type="button"
                className="w-[1.875rem] h-[1.875rem] bg-blue-600 rounded-full text-white flex items-center justify-center"
                onClick={() =>
                  setFilters((prev) => ({ ...prev, beds: prev.beds + 1 }))
                }
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
                disabled={!filters.bedrooms}
                className={
                  !filters.bedrooms
                    ? "w-[1.875rem] h-[1.875rem] bg-gray-200 rounded-full text-gray-400 flex items-center justify-center"
                    : "w-[1.875rem] h-[1.875rem] bg-blue-600 rounded-full text-white flex items-center justify-center"
                }
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    bedrooms: prev.bedrooms - 1,
                  }))
                }
              >
                <MinusIcon className="w-5" />
              </button>
              <div className="w-[1.875rem] h-[1.875rem] flex items-center justify-center">
                {filters.bedrooms}
              </div>
              <button
                type="button"
                className="w-[1.875rem] h-[1.875rem] bg-blue-600 rounded-full text-white flex items-center justify-center"
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    bedrooms: prev.bedrooms + 1,
                  }))
                }
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
                disabled={!filters.bathrooms}
                className={
                  !filters.bathrooms
                    ? "w-[1.875rem] h-[1.875rem] bg-gray-200 rounded-full text-gray-400 flex items-center justify-center"
                    : "w-[1.875rem] h-[1.875rem] bg-blue-600 rounded-full text-white flex items-center justify-center"
                }
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    bathrooms: prev.bathrooms - 1,
                  }))
                }
              >
                <MinusIcon className="w-5" />
              </button>
              <div className="w-[1.875rem] h-[1.875rem] flex items-center justify-center">
                {filters.bathrooms}
              </div>
              <button
                type="button"
                className="w-[1.875rem] h-[1.875rem] bg-blue-600 rounded-full text-white flex items-center justify-center"
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    bathrooms: prev.bathrooms + 1,
                  }))
                }
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

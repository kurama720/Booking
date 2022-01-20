import React, {useState, useEffect} from 'react';
import {MinusIcon, PlusIcon} from '@heroicons/react/solid'
import {GuestMenuProps} from "./utils/IGuestMenuItemInterface";

const GuestMenuItemInterface =
    ({
       description,
       header,
       userBookingDate,
       setUserBookingDate
     }: GuestMenuProps) => {

      const [handleValue, setHandleValue] = useState<number>(0)

      useEffect(() => {
        setUserBookingDate({
          ...userBookingDate,
          numOfPersons: handleValue
        })
      }, [handleValue])

      return (
          <div className='w-full h-full flex justify-between items-center pl-[1.5rem] pr-10'>
            <div className='flex-col w-34'>
              <h1 className='text-body text-gray-900 text-medium text-sm'>
                {header}
              </h1>
              <p className='text-xs text-body text-gray-500'>
                {description}
              </p>
            </div>
            <div className='flex justify-between w-28'>
              <button
                  disabled={handleValue <= 0}
                  className={
                    handleValue <= 0
                        ? 'w-[1.875rem] h-[1.875rem] bg-gray-200 rounded-full text-gray-400 flex items-center justify-center'
                        : 'w-[1.875rem] h-[1.875rem] bg-blue-600 rounded-full text-white flex items-center justify-center'
                  }
                  onClick={() => setHandleValue((prev: number) => prev - 1)}
              >
                {<MinusIcon className='w-[0.929375rem]'/>}
              </button>
              <div className='w-[1.875rem] h-[1.875rem] flex items-center justify-center'>
                {handleValue}
              </div>
              <button
                  className='w-[1.875rem] h-[1.875rem] bg-blue-600 rounded-full text-white flex items-center justify-center'
                  onClick={() => setHandleValue((prev: number) => prev + 1)}
              >
                {<PlusIcon className='w-[0.929375rem] h-[0.929375rem]'/>}
              </button>
            </div>
          </div>
      );
    };

export default GuestMenuItemInterface;

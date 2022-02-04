import React from "react";
import { useNavigate } from "react-router-dom";
import { OfficeBuildingIcon } from "@heroicons/react/solid";
import { Paths } from "../../paths/path";

function MainPageBody() {
  const history = useNavigate();

  const handleCheckAvailiability = () => {
    history(Paths.SEARCH_RESULTS);
  };

  return (
    <div className="w-full flex-col  radius-md bg-background h-[93%] bg-no-repeat bg-cover rounded-md bg-gray-50">
      <div className="flex w-full pt-7 pl-7">
        <OfficeBuildingIcon className="w-4 h-4" />
        <p className="font-body text-xs text-cyan-900 ml-[6.4px]">
          Palermo, Sicily
        </p>
      </div>
      <div className="w-full h-[94%] flex items-end justify-center">
        <div className="flex-col items-center mb-6">
          <h1 className="font-body text-4xl font-bold text-white">
            Do you want to come here?
          </h1>
          <div className="w-full flex justify-center mt-6">
            <button
              type="button"
              onClick={handleCheckAvailiability}
              className="text-base font-body leading-6 bg-blue-600  text-white rounded-[21px] py-[9px] px-[21px]"
            >
              Check availability
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPageBody;

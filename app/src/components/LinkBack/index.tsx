import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/solid";

interface IPropsLinkBack {
  text: string;
}

const LinkBack: FC<IPropsLinkBack> = ({ text }) => {
  const history = useNavigate();
  const comeback = -1;

  const handleLinkBack = () => {
    history(comeback);
  };
  return (
    <div className="flex justify-start items-center mt-6">
      <button
        onClick={handleLinkBack}
        className="mr-4 border border-gray-300 p-[12px] rounded hover:border-blue-600 hover:text-blue-600"
      >
        <ChevronLeftIcon className="h-4 w-4 text-gray-400 hover:text-blue-600" />
      </button>
      <span className="font-medium font-body text-gray-900 text-3xl">
        {text}
      </span>
    </div>
  );
};

export default LinkBack;

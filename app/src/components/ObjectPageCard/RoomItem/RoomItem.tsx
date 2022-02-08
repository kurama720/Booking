import React from "react";
import { CubeIcon } from "@heroicons/react/outline";
import { IRoomItemProps } from "./IRoomItemProps";

const RoomItem = ({ title, description }: IRoomItemProps) => {
  return (
    <div className="w-36 flex flex-col shadow rounded-md mr-4 ">
      <CubeIcon className="w-3.5 h-3.5 ml-6 mt-[25px]" />
      <p className="mt-[1.083rem] mb-2 ml-6 font-bode font-medium text-sm">
        {title}
      </p>
      <p className="mb-6 ml-6 font-body text-xs font-normal">{description}</p>
    </div>
  );
};

export default RoomItem;

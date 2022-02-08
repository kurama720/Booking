import React from "react";
import RoomItem from "../RoomItem/RoomItem";

const ObjectsPageCardIntroduce = () => {
  return (
    <div className="w-full">
      <h2 className="font-body font-medium text-2xl mb-7">
        Where you'll sleep
      </h2>
      <div className="flex mb-6">
        <RoomItem title="Bedroom" description="1 double bed" />
        <RoomItem title="Hall" description="1 single bed" />
      </div>
    </div>
  );
};

export default ObjectsPageCardIntroduce;

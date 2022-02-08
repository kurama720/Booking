import React from "react";
import { IPropsModal } from "./IObjectPageModel";

const ObjectPageModel = ({
  children,
  sideEffect,
  setActiveSearchMenu,
  setCalendarPopUpStatus,
  isActiveLocationBox,
  isActiveModel,
  setSideEffect,
}: IPropsModal) => {
  const handleobjectPageCardSideEffect = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    setActiveSearchMenu(false);
    e.stopPropagation();
    setCalendarPopUpStatus(false);
    isActiveLocationBox(false);
    isActiveModel(false);
    setSideEffect(false);
  };
  return (
    <div className={`w-full pt-6 ${sideEffect ? "bg-[#bfbfbf]" : ""}`}>
      <div onClick={handleobjectPageCardSideEffect} className="w-full">
        {children}
      </div>
    </div>
  );
};

export default ObjectPageModel;

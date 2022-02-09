import React from "react";
import ObjectsPageTop from "./ObjectPageCardTop";
import ObjectsPagePhotos from "./ObjectPageCardPhotos";
import ObjectsPageDescription from "./ObjectPageCardDescription";
import ApartmentForm from "../ApartmentForm/ApartmentForm";
import Footer from "../Footer/Footer";
import { IObjectPageCardProps } from "./IObjectPageCardProps";
import ObjectPageModel from "../ObjectPageModel";

const ObjectPageCard = ({
  isActiveSearchMenu,
  setActiveSearchMenu,
  setCalendarPopUpStatus,
  isActiveLocationBox,
  isActiveModel,
  setSideEffect,
  sideEffect,
  handleSearchMenu,
  setBookingReverseData,
  bookingReverseData,
}: IObjectPageCardProps) => {
  return (
    <ObjectPageModel
      sideEffect={sideEffect}
      setSideEffect={setSideEffect}
      isActiveSearchMenu={isActiveSearchMenu}
      setActiveSearchMenu={setActiveSearchMenu}
      setCalendarPopUpStatus={setCalendarPopUpStatus}
      isActiveLocationBox={isActiveLocationBox}
      isActiveModel={isActiveModel}
    >
      <div className="w-full px-16">
        <div className="w-full">
          <ObjectsPageTop sideEffect={sideEffect} />
          <ObjectsPagePhotos
            setSideEffect={setSideEffect}
            handleSearchMenu={handleSearchMenu}
            sideEffect={sideEffect}
          />
        </div>
        <div className="w-full mt-6 flex">
          <ObjectsPageDescription sideEffect={sideEffect} />
          <ApartmentForm
            sideEffect={sideEffect}
            bookingReverseData={bookingReverseData}
            setBookingReverseData={setBookingReverseData}
          />
        </div>
      </div>
      <Footer sideEffect={sideEffect} />
    </ObjectPageModel>
  );
};

export default ObjectPageCard;

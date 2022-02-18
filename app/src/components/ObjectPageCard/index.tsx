import React, { useState, useEffect } from "react";
import ObjectsPageTop from "./ObjectPageCardTop";
import ObjectsPagePhotos from "./ObjectPageCardPhotos";
import ObjectsPageDescription from "./ObjectPageCardDescription";
import ApartmentForm from "../ApartmentForm/ApartmentForm";
import Footer from "../Footer/Footer";
import { IObjectPageCardProps } from "./IObjectPageCardProps";
import ObjectPageModel from "../ObjectPageModel";
import { ApartmentsService } from "../../api/ApartmentsService";
import { IApartment } from "../../models/globalInterfaces/globalIntefaces";

const ObjectPageCard = ({
  id,
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
  const [apartmentState, setApartmentState] = useState<IApartment>();
  useEffect(() => {
    ApartmentsService.getOneApartment(id).then(({ data }) =>
      setApartmentState({ ...data })
    );
  }, [id]);
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
          <ObjectsPageTop
            sideEffect={sideEffect}
            title={apartmentState?.title}
            rating={apartmentState?.rating}
            reviews={apartmentState?.reviews}
            isFavourite={apartmentState?.is_favorite}
          />
          <ObjectsPagePhotos
            handleSearchMenu={handleSearchMenu}
            sideEffect={sideEffect}
            images={apartmentState?.img_content}
          />
        </div>
        <div className="w-full mt-6 flex">
          <ObjectsPageDescription
            description={apartmentState?.description}
            feature={apartmentState?.feature}
            sideEffect={sideEffect}
          />
          <ApartmentForm
            id={id}
            sideEffect={sideEffect}
            bookingReverseData={bookingReverseData}
            setBookingReverseData={setBookingReverseData}
            rating={apartmentState?.rating}
            reviews={apartmentState?.reviews}
            price={apartmentState?.price}
          />
        </div>
      </div>
      <Footer sideEffect={sideEffect} />
    </ObjectPageModel>
  );
};

export default ObjectPageCard;

/* eslint-disable import/order */
import React, { FC, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import SearchResultItem from "../../components/SearchResultItem";
import "leaflet/dist/leaflet.css";

// the lines below fix the problem of importing icons from the library
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { IApartment } from "../../models/globalInterfaces/globalIntefaces";
import { BookingState } from "../HomePage/utils/HomePageInterface";
import Header from "../../components/Header/Header";
import Modal from "../../components/Modal/Modal";
import UserLogInPage from "../UserLogInPage/UserLoginPage";
import SignUpPage from "../SignUpPage";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import BookingHistory from "../../components/BookingHistory";
import "./mapPage.css";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;
// end of fix

const position: L.LatLngExpression = [52.43272, 30.999012];

interface IPropsMapSearch {
  apartments: Array<IApartment>;
  userBookingDate: BookingState;
  setApartments: React.Dispatch<React.SetStateAction<IApartment[]>>;
  setUserBookingDate: React.Dispatch<React.SetStateAction<BookingState>>;
}

const MapSearchPage: FC<IPropsMapSearch> = ({
  apartments,
  userBookingDate,
  setApartments,
  setUserBookingDate,
}) => {
  const [guest, setGuest] = useState("Add guests");
  const [isAddGuest, setIsAddGuest] = useState<boolean>(false);
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [activeModel, isActiveModel] = useState<boolean>(false);
  const [popUpStatus, setPopUpStatus] = useState<boolean>(false);
  const [signUpPopUpStatus, setSignUpPopUpStatus] = useState<boolean>(false);
  const [activeLocationBox, isActiveLocationBox] = useState<boolean>(false);
  const [isActiveBookingHistory, setActiveBookingHistory] =
    useState<boolean>(false);
  const [activeLogout, isActiveLogout] = useState<boolean>(false);
  const [calendarPopUpStatus, setCalendarPopUpStatus] =
    useState<boolean>(false);

  const handleLogInPopUp = () => {
    setPopUpStatus((prev) => !prev);
  };

  const handleSignUpPopUpStatus = () => {
    setSignUpPopUpStatus((prev) => !prev);
  };

  const handleLogoutPopUpStatus = () => {
    isActiveLogout((prev) => !prev);
  };

  const handleCalendarPopUpStatus = () => {
    setCalendarPopUpStatus((prev) => !prev);
  };

  const handleBookingHistory = () => {
    setActiveBookingHistory((prev) => !prev);
  };

  return (
    <>
      <div className="px-[27px]">
        <Header
          handleLogInPopUp={handleLogInPopUp}
          activeLocationBox={activeLocationBox}
          isActiveLocationBox={isActiveLocationBox}
          handleSignUpPopUpStatus={handleSignUpPopUpStatus}
          handleLogoutPopUpStatus={handleLogoutPopUpStatus}
          calendarPopUpStatus={calendarPopUpStatus}
          handleCalendarPopUpStatus={handleCalendarPopUpStatus}
          setCalendarPopUpStatus={setCalendarPopUpStatus}
          setUserBookingDate={setUserBookingDate}
          userBookingDate={userBookingDate}
          setApartments={setApartments}
          handleBookingHistory={handleBookingHistory}
          isActiveSearchMenu
          isActiveModel={isActiveModel}
          activeModel={activeModel}
          numberOfGuests={numberOfGuests}
          setNumberOfGuests={setNumberOfGuests}
          guest={guest}
          setGuest={setGuest}
          isAddGuest={isAddGuest}
          setIsAddGuest={setIsAddGuest}
        />
      </div>
      <div className="flex h-[638px] bg-gray-50">
        <div className="flex flex-col box-border w-[656px] px-6">
          <span className="block py-4 font-body text-xs text-gray-700">
            {apartments.length}{" "}
            {userBookingDate.city
              ? `stays in ${userBookingDate.city}`
              : `stays`}
          </span>

          {apartments.length === 0 ? (
            <div className="flex flex-col justify-start items-start">
              <span className="text-2xl font-body font-medium text-gray-900">
                No results
              </span>
              <span className="text-base font-body text-gray-600">
                Try adjusting your search by chainging your dates, removing
                filters, or zooming out on the map.
              </span>
            </div>
          ) : (
            <ul className="overflow-y-auto flex-grow scrollbar-hide">
              {apartments.map((result) => (
                <SearchResultItem
                  {...result}
                  key={result.id}
                  userBookingDate={userBookingDate}
                />
              ))}
            </ul>
          )}
        </div>
        <MapContainer
          className="flex h-full flex-grow bg-gray-50"
          center={position}
          zoom={15}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </div>
      {popUpStatus && (
        <Modal active={popUpStatus} setActive={handleLogInPopUp}>
          <UserLogInPage
            popUpStatus={popUpStatus}
            handleLogInPopUp={handleLogInPopUp}
            handleSignUpPopUpStatus={handleSignUpPopUpStatus}
          />
        </Modal>
      )}
      {signUpPopUpStatus && (
        <Modal active={signUpPopUpStatus} setActive={handleSignUpPopUpStatus}>
          <SignUpPage
            active={signUpPopUpStatus}
            setActive={handleSignUpPopUpStatus}
            handleLogInPopUp={handleLogInPopUp}
          />
        </Modal>
      )}
      {activeLogout && (
        <Modal active={activeLogout} setActive={handleLogoutPopUpStatus}>
          <LogoutButton
            handleLogoutPopUpStatus={handleLogoutPopUpStatus}
            activeLogout={activeLogout}
          />
        </Modal>
      )}
      {isActiveBookingHistory && (
        <Modal active={isActiveBookingHistory} setActive={handleBookingHistory}>
          <BookingHistory handleBookingHistory={handleBookingHistory} />
        </Modal>
      )}
    </>
  );
};

export default MapSearchPage;

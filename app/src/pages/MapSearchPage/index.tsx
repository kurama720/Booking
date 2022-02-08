/* eslint-disable import/order */
import React, { FC, useState } from "react";
import L from "leaflet";
import ReactDOMServer from "react-dom/server";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { AdjustmentsIcon, ChevronLeftIcon } from "@heroicons/react/solid";
import SearchResultItem from "../../components/SearchResultItem";
import MapApartmentCard from "../../components/MapApartmentCard/MapApartmentCard";
import Modal from "../../components/Modal/Modal";
import FilterForm from "../../components/FilterForm";
import "leaflet/dist/leaflet.css";
import { IApartment } from "../../models/globalInterfaces/globalIntefaces";
import { BookingState } from "../HomePage/utils/HomePageInterface";
import Header from "../../components/Header/Header";
import UserLogInPage from "../UserLogInPage/UserLoginPage";
import SignUpPage from "../SignUpPage";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import BookingHistory from "../../components/BookingHistory";
import Footer from "../../components/Footer/Footer";
import "./styles.css";
import DisplayFavouriteApartments from "../../components/DisplayFavouriteApartments";
import ResetPasswordForm from "../../components/ResetPasswordForm";

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
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [isListVisible, setListVisible] = useState(true);
  const [mapState, setMapState] = useState<L.Map>();
  const myIcon = L.divIcon({
    iconSize: L.point(40, 28, true),
    className: "marker",
    html: ReactDOMServer.renderToString(
      <div className="py-[6px] px-2 rounded-[20px] bg-white font-body text-xs font-bold text-gray-700">
        $32
      </div>
    ),
  });
  const [guest, setGuest] = useState("Add guests");
  const [isAddGuest, setIsAddGuest] = useState<boolean>(false);
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [activeModel, isActiveModel] = useState<boolean>(false);
  const [popUpStatus, setPopUpStatus] = useState<boolean>(false);
  const [signUpPopUpStatus, setSignUpPopUpStatus] = useState<boolean>(false);
  const [activeLocationBox, isActiveLocationBox] = useState<boolean>(false);
  const [isActiveBookingHistory, setActiveBookingHistory] =
    useState<boolean>(false);
  const [isActiveFavouriteApartmentList, setActiveFavouriteApartmentList] =
    useState<boolean>(false);
  const [resetPasswordPopUpStatus, setResetPasswordPopUpStatus] =
    useState<boolean>(false);
  const [activeLogout, isActiveLogout] = useState<boolean>(false);
  const [calendarPopUpStatus, setCalendarPopUpStatus] =
    useState<boolean>(false);

  const handleFilterVisible = () => setFilterVisible(false);

  const handleListVisible = () => {
    setListVisible((prev) => !prev);
    setTimeout(() => mapState?.invalidateSize(), 100);
  };

  const handleLogInPopUp = () => {
    setPopUpStatus((prev) => !prev);
  };

  const handleSignUpPopUpStatus = () => {
    setSignUpPopUpStatus((prev) => !prev);
  };

  const handleLogoutPopUpStatus = () => {
    isActiveLogout((prev) => !prev);
  };

  const handleResetPasswordPopUpStatus = () => {
    setResetPasswordPopUpStatus((prev) => !prev);
  };

  const handleCalendarPopUpStatus = () => {
    setCalendarPopUpStatus((prev) => !prev);
  };

  const handleBookingHistory = () => {
    setActiveBookingHistory((prev) => !prev);
  };

  const handleFavouriteApartmentsList = () =>
    setActiveFavouriteApartmentList((prev) => !prev);

  return (
    <>
      <div className="px-[27px]">
        <Header
          handleFavouriteApartmentsList={handleFavouriteApartmentsList}
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
      <div className="flex py-[15px] ml-6 border-b-[1px] border-b-gray-200">
        <button
          className="py-[6px] px-3 flex items-center rounded-[20px] border-[1px] border-gay-300"
          onClick={() => setFilterVisible(true)}
        >
          <AdjustmentsIcon className="w-4 h-4 mr-1 text-gray-400" />
          <span className="text-xs text-gray-700">Filters</span>
        </button>
      </div>
      <div className="flex h-[638px] bg-gray-50">
        <div
          className={`flex flex-col box-border relative transition-all ${
            isListVisible ? "w-[656px] px-6" : "w-0 px-0"
          }`}
        >
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
          <div
            className="flex justify-center items-center h-8 w-8 border-[1px] border-gray-300 bg-white shadow-sm rounded-[4px] cursor-pointer absolute top-0 left-full mt-6 ml-6 z-[1000]"
            onClick={handleListVisible}
          >
            <ChevronLeftIcon
              className={`h-4 text-gray-400 ${!isListVisible && "rotate-180"}`}
            />
          </div>
        </div>
        <MapContainer
          className="flex h-full flex-grow"
          center={position}
          zoom={15}
          zoomControl={false}
          doubleClickZoom={false}
          whenCreated={(e) => setMapState(e)}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} icon={myIcon}>
            <Popup
              closeButton={false}
              className="popup"
              maxHeight={280}
              maxWidth={240}
              minWidth={239}
              closeOnClick={false}
            >
              <MapApartmentCard />
            </Popup>
          </Marker>
        </MapContainer>
      </div>
      {popUpStatus && (
        <Modal active={popUpStatus} setActive={handleLogInPopUp}>
          <UserLogInPage
            popUpStatus={popUpStatus}
            handleLogInPopUp={handleLogInPopUp}
            handleSignUpPopUpStatus={handleSignUpPopUpStatus}
            handleResetPasswordPopUpStatus={handleResetPasswordPopUpStatus}
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
      {isActiveFavouriteApartmentList && (
        <Modal
          active={isActiveFavouriteApartmentList}
          setActive={handleFavouriteApartmentsList}
        >
          <DisplayFavouriteApartments
            handleFavouriteApartmentsList={handleFavouriteApartmentsList}
          />
        </Modal>
      )}
      {isFilterVisible && (
        <Modal active={isFilterVisible} setActive={setFilterVisible}>
          <FilterForm onClose={handleFilterVisible} />
        </Modal>
      )}
      {resetPasswordPopUpStatus && (
        <Modal
          active={resetPasswordPopUpStatus}
          setActive={handleResetPasswordPopUpStatus}
        >
          <ResetPasswordForm
            setActive={handleResetPasswordPopUpStatus}
            handleSignUpPopUp={handleSignUpPopUpStatus}
          />
        </Modal>
      )}
      <Footer />
    </>
  );
};

export default MapSearchPage;

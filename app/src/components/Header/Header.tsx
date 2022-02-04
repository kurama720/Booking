import React, { useState, useEffect } from "react";
import { LocalKey, LocalStorage } from "ts-localstorage";
import { DateRange } from "@mui/lab/DateRangePicker";
import { JWT } from "../../hooks/auth.hook.interface";
import NodicLogo from "./utils/image/NodicLogo.png";
import Calendar from "../Calendar/Calendar";
import Location from "../Location/Location";
import GuestMenu from "../GuestMenu/GuestMenu";
import SearchButton from "../SearchButton/SearchButton";
import AuthMenu from "../AuthMenu/AuthMenu";
import GuestMenuItem from "../GuestMenuItem/GuestMenuItem";
import AuthMenuItemLogout from "../AuthMenuItem/AuthMenuItemLogout";
import AuthMenuItemLogin from "../AuthMenuItem/AuthMenuItemLogin";
import LocationMenu from "../LocationMenu/LocationMenu";
import CalendarMenu from "../Calendar/CalendarMenu/CalendarMenu";
import { AuthMenuItemLogoutProps, Cities } from "./utils/HeaderInterface";
import useDebounce from "../../hooks/useDebounce";
import SearchService from "../../api/SearchService";
import SearchMenu from "../SearchMenu";

function Header({
  handleLogInPopUp,
  handleSignUpPopUpStatus,
  activeLocationBox,
  isActiveLocationBox,
  handleLogoutPopUpStatus,
  calendarPopUpStatus,
  handleCalendarPopUpStatus,
  setCalendarPopUpStatus,
  setUserBookingDate,
  userBookingDate,
  handleBookingHistory,
  setApartments,
  handleSearchMenu,
  isActiveSearchMenu,
  isActiveModel,
  activeModel,
  numberOfGuests,
  setNumberOfGuests,
  guest,
  setGuest,
  isAddGuest,
  setIsAddGuest,
}: AuthMenuItemLogoutProps) {
  const [activeUserMenu, isActiveUserMenu] = useState<boolean>(false);
  const [cities, setCity] = useState<Cities[]>([]);
  const [date, setDate] = React.useState<DateRange<Date>>([null, null]);
  const [search, setSearch] = useState<string>("");

  const debouncedSearch = useDebounce(search, 500);

  const searchOfCity = async () => {
    const response = await SearchService.searchOfCities(debouncedSearch);
    setCity(response.data);
  };

  useEffect(() => {
    if (debouncedSearch) {
      searchOfCity();
    } else {
      setCity([]);
    }
  }, [debouncedSearch]);

  const handleMenuGuest = () => {
    isActiveModel((prev) => !prev);
  };

  const getSuggestionData = (e: React.MouseEvent) => {
    const suggestionData = e.target as HTMLInputElement;
    const currentCity =
      cities.find((item) => item.name === suggestionData.id) || userBookingDate;
    setSearch(suggestionData.id);
    setUserBookingDate({
      ...userBookingDate,
      lat: currentCity.lat,
      lon: currentCity.lon,
    });
    isActiveLocationBox(false);
  };

  const storageName = "userData" as LocalKey<JWT>;
  const data = LocalStorage.getItem(storageName);
  const isAuth = !!data;

  return (
    <div className="w-full flex flex-col py-4 relative bg-gray-50">
      <div className="w-full h-[38px] flex justify-between items-center">
        <div className="flex h-[38px] items-center max-w-logo w-logo ">
          <img src={NodicLogo} className="w-8" alt="logo" />
          <p className="ml-[0.68rem] text-blue-700 text-center font-body font-medium text-2xl">
            Nodic
          </p>
        </div>
        {isActiveSearchMenu ? (
          <ul className="flex">
            <li>
              <Location
                search={search}
                setSearch={setSearch}
                isActiveModel={isActiveModel}
                isActiveLocationBox={isActiveLocationBox}
                setCalendarPopUpStatus={setCalendarPopUpStatus}
                activeLocationBox={activeLocationBox}
              />
            </li>
            <li>
              <Calendar
                handleCalendarPopUpStatus={handleCalendarPopUpStatus}
                isActiveLocationBox={isActiveLocationBox}
                isActiveModel={isActiveModel}
                setUserBookingDate={setUserBookingDate}
                userBookingDate={userBookingDate}
                calendarPopUpStatus={calendarPopUpStatus}
                date={date}
              />
            </li>
            <li>
              <GuestMenu
                handleMenu={handleMenuGuest}
                setCalendarPopUpStatus={setCalendarPopUpStatus}
                isActiveLocationBox={isActiveLocationBox}
                activeModel={activeModel}
                numberOfGuests={numberOfGuests}
                setNumberOfGuests={setNumberOfGuests}
                guest={guest}
                setGuest={setGuest}
                isAddGuest={isAddGuest}
                setIsAddGuest={setIsAddGuest}
              />
            </li>
            <li>
              <SearchButton userBookingDate={userBookingDate} />
            </li>
          </ul>
        ) : (
          <ul className="flex">
            <li>
              <SearchMenu handleSearchMenu={handleSearchMenu} />
            </li>
          </ul>
        )}
        <AuthMenu
          activeUserMenu={activeUserMenu}
          isActiveUserMenu={isActiveUserMenu}
        />
      </div>
      {activeLocationBox && (
        <LocationMenu
          cities={cities}
          getSuggestionData={getSuggestionData}
          isActiveLocationBox={isActiveLocationBox}
        />
      )}
      {activeModel && (
        <GuestMenuItem
          userBookingDate={userBookingDate}
          setUserBookingDate={setUserBookingDate}
          numberOfGuests={numberOfGuests}
          setNumberOfGuests={setNumberOfGuests}
        />
      )}
      {activeUserMenu && isAuth ? (
        <AuthMenuItemLogin
          handleLogoutPopUpStatus={handleLogoutPopUpStatus}
          handleBookingHistory={handleBookingHistory}
        />
      ) : activeUserMenu && !isAuth ? (
        <AuthMenuItemLogout
          handleLogInPopUp={handleLogInPopUp}
          handleSignUpPopUpStatus={handleSignUpPopUpStatus}
        />
      ) : (
        <></>
      )}
      {calendarPopUpStatus && <CalendarMenu date={date} setDate={setDate} />}
    </div>
  );
}

export default Header;

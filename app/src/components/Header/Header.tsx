import React, { useState, useEffect, useContext } from "react";
import { DateRange } from "@mui/lab/DateRangePicker";
import axios from "axios";
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
import { AuthContext } from "../../context/Context";
import CalendarMenu from "../Calendar/CalendarMenu/CalendarMenu";
import { AuthMenuItemLogoutProps, Cities } from "./utils/HeaderInterface";
import useDebounce from "../../hooks/useDebounce";

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
}: AuthMenuItemLogoutProps) {
  const [activeModel, isActiveModel] = useState<boolean>(false);
  const [activeUserMenu, isActiveUserMenu] = useState<boolean>(false);
  const [cities, setCity] = useState<Cities[]>([]);
  const [date, setDate] = React.useState<DateRange<Date>>([null, null]);
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [search, setSearch] = useState("");

  const { token } = useContext(AuthContext);
  const isAuth = !!token;

  const debouncedSearch = useDebounce(search, 500);

  const searchOfCity = async () => {
    const response = await axios.get<Cities[]>(
      `${process.env.REACT_APP_API_URL}cities/coordinates`,
      {
        params: { word: debouncedSearch },
      }
    );
    console.log(response);
  };
  useEffect(() => {
    if (debouncedSearch) {
      searchOfCity();
    }
  }, [debouncedSearch]);

  const handleMenuGuest = () => {
    isActiveModel((prev) => !prev);
  };

  const getSuggestionData = (e: React.MouseEvent) => {
    const suggestionData = e.target as HTMLInputElement;
    setSearch(suggestionData.id);
    setUserBookingDate({
      ...userBookingDate,
      city: search,
    });

    isActiveLocationBox(false);
  };

  return (
    <div className="w-full flex flex-col mt-6 relative bg-gray-50">
      <div className="w-full h-[38px] flex justify-between items-center">
        <div className="flex h-[38px] items-center max-w-logo w-logo ">
          <img src={NodicLogo} className="w-8" alt="logo" />
          <p className="ml-[0.68rem] text-blue-700 text-center font-body font-medium text-2xl">
            Nodic
          </p>
        </div>
        <ul className="flex">
          <li>
            <Location
              isActiveLocationBox={isActiveLocationBox}
              isActiveModel={isActiveModel}
              setCalendarPopUpStatus={setCalendarPopUpStatus}
              activeLocationBox={activeLocationBox}
              search={search}
              setSearch={setSearch}
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
            />
          </li>
          <li>
            <SearchButton userBookingDate={userBookingDate} />
          </li>
        </ul>
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

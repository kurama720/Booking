import React, {
  useState,
  createRef,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { DateRange } from "@mui/lab/DateRangePicker";
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
import { cities } from "./utils/cities.date";
import { AuthContext } from "../../context/Context";
import CalendarMenu from "../Calendar/CalendarMenu/CalendarMenu";
import { AuthMenuItemLogoutProps, Cities } from "./utils/HeaderInterface";

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
  setApartments,
}: AuthMenuItemLogoutProps) {
  const [activeModel, isActiveModel] = useState<boolean>(false);
  const [activeUserMenu, isActiveUserMenu] = useState<boolean>(false);
  const [city, setCity] = useState<Cities[]>([]);
  const [suggestionCityName, setSuggestionCityName] = useState<string>("");
  const [date, setDate] = React.useState<DateRange<Date>>([null, null]);
  const [numberOfGuests, setNumberOfGuests] = useState(1);

  const handleMenuGuest = () => {
    isActiveModel((prev) => !prev);
  };

  const locationRef = createRef<HTMLInputElement>();

  const handleSearchLocation = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const searchLocationValue = e.target.value;
      const suggestion = cities.filter((cityName) => {
        return cityName.name
          .toLowerCase()
          .startsWith(searchLocationValue.toLowerCase());
      });
      setCity([...suggestion]);
      isActiveLocationBox(true);
      setUserBookingDate({
        ...userBookingDate,
        city: searchLocationValue,
      });
    },
    [isActiveLocationBox, setUserBookingDate, userBookingDate]
  );

  useEffect(() => {
    if (city.length > 5) {
      const newCities = city.slice(0, 5);
      setCity([...newCities]);
    }
  }, [handleSearchLocation, city]);

  const getSuggestionData = (e: React.MouseEvent) => {
    const suggestionData = e.target as HTMLInputElement;
    setSuggestionCityName(suggestionData.id);
    const currentObjectOfCities =
      cities.find((item: Cities) => item.name === suggestionData.id) ||
      userBookingDate;
    setUserBookingDate({
      ...userBookingDate,
      city: suggestionData.id,
      lat: currentObjectOfCities.lat,
      lon: currentObjectOfCities.lon,
    });

    if (locationRef.current) {
      const input = locationRef.current as HTMLInputElement;
      input.value = suggestionData.id;
      isActiveLocationBox(false);
    }
  };

  const { token } = useContext(AuthContext);
  const isAuth = !!token;

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
              ref={locationRef}
              suggestionCityName={suggestionCityName}
              handleSearchLocation={handleSearchLocation}
              isActiveModel={isActiveModel}
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
            />
          </li>
          <li>
            <SearchButton
              userBookingDate={userBookingDate}
              setApartments={setApartments}
            />
          </li>
        </ul>
        <AuthMenu
          activeUserMenu={activeUserMenu}
          isActiveUserMenu={isActiveUserMenu}
        />
      </div>
      {activeLocationBox && (
        <LocationMenu cities={city} getSuggestionData={getSuggestionData} />
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
        <AuthMenuItemLogin handleLogoutPopUpStatus={handleLogoutPopUpStatus} />
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

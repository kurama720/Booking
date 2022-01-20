import React, {useState, createRef, useEffect, useContext} from "react";
import NodicLogo from "./utils/image/NodicLogo.png";
import Calendar from "../Calendar/Calendar";
import Location from "../Location/Location";
import GuestMenu from '../GuestMenu/GuestMenu'
import SearchButton from '../SearchButton/SearchButton'
import AuthMenu from '../AuthMenu/AuthMenu'
import GuestMenuItem from "../GuestMenuItem/GuestMenuItem";
import AuthMenuItemLogout from "../AuthMenuItem/AuthMenuItemLogout";
import AuthMenuItemLogin from '../AuthMenuItem/AuthMenuItemLogin'
import LocationMenu from "../LocationMenu/LocationMenu";
import {cities} from './utils/cities.date'
import {AuthContext} from "../../context/Context";
import CalendarMenu from "../Calendar/CalendarMenu/CalendarMenu";
import {DateRange} from "@mui/lab/DateRangePicker";
import {AuthMenuItemLogoutProps, Cities} from "./utils/HeaderInterface";

const Header =
    ({
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
     }: AuthMenuItemLogoutProps) => {
      const [activeModel, isActiveModel] = useState<boolean>(false)
      const [activeUserMenu, isActiveUserMenu] = useState<boolean>(false)
      const [city, setCity] = useState<Cities[]>([])
      const [suggestionCityName, setSuggestionCityName] = useState<string>('')
      const [date, setDate] = React.useState<DateRange<Date>>([null, null]);

      const handleMenuGuest = () => {
        isActiveModel((prev => !prev))
      }

      const locationRef = createRef<HTMLInputElement>()

      const handleSearchLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchLocationValue = e.target.value
        const suggestion = cities.filter((city) => {
          return city.name.toLowerCase().startsWith(searchLocationValue.toLowerCase())
        })
        setCity([...suggestion])
        isActiveLocationBox(true)
        setUserBookingDate({
          ...userBookingDate,
          city: searchLocationValue
        })
      }

      useEffect(() => {
        if (city.length > 5) {
          const newCities = city.slice(0, 5);
          setCity([...newCities])
        }
      }, [handleSearchLocation])

      const getSuggestionData = (e: React.MouseEvent) => {
        const suggestionData = e.target as HTMLInputElement
        setSuggestionCityName(suggestionData.id)
        setUserBookingDate({
          ...userBookingDate,
          city: suggestionData.id
        })

        if (locationRef.current) {
          let input = locationRef.current as HTMLInputElement
          input.value = suggestionData.id
          isActiveLocationBox(false)
        }
      }

      const {token} = useContext(AuthContext)
      const isAuth = !!token

      return (
          <div
              className="w-full flex flex-col mt-[1.5rem] relative"
          >
            <div
                className="w-full h-[2.375rem] flex justify-between items-center px-16 2xl:px-16 lg:px-4 xl:px-16 md:px-2">
              <div className="flex h-[2.375rem] items-center max-w-logo w-logo ">
                <img src={NodicLogo} className="w-8" alt='logo'/>
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
                <li>{
                  <Calendar
                      handleCalendarPopUpStatus={handleCalendarPopUpStatus}
                      isActiveLocationBox={isActiveLocationBox}
                      isActiveModel={isActiveModel}
                      setUserBookingDate={setUserBookingDate}
                      userBookingDate={userBookingDate}
                      calendarPopUpStatus={calendarPopUpStatus}
                      date={date}
                  />}
                </li>
                <li>{
                  <GuestMenu
                      handleMenu={handleMenuGuest}
                      setCalendarPopUpStatus={setCalendarPopUpStatus}
                      isActiveLocationBox={isActiveLocationBox}
                      activeModel={activeModel}
                  />}
                </li>
                <li>{<SearchButton userBookingDate={userBookingDate}/>}</li>
              </ul>
              <AuthMenu
                  activeUserMenu={activeUserMenu}
                  isActiveUserMenu={isActiveUserMenu}
              />
            </div>
            {activeLocationBox && (
                <LocationMenu
                    cities={city}
                    getSuggestionData={getSuggestionData}
                />
            )}
            {activeModel && (
                <GuestMenuItem
                    userBookingDate={userBookingDate}
                    setUserBookingDate={setUserBookingDate}
                />
            )}
            {
              activeUserMenu && isAuth
                  ? <AuthMenuItemLogin handleLogoutPopUpStatus={handleLogoutPopUpStatus}/>
                  : activeUserMenu && !isAuth
                      ? <AuthMenuItemLogout
                          handleLogInPopUp={handleLogInPopUp}
                          handleSignUpPopUpStatus={handleSignUpPopUpStatus}
                      />
                      : <></>
            }
            {
              calendarPopUpStatus && (
                    <CalendarMenu
                        date={date}
                        setDate={setDate}
                    />
                )}
          </div>
      );
    };

export default Header;
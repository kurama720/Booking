import axios from "axios";
import { LocalKey, LocalStorage } from "ts-localstorage";
import { BookingState } from "../pages/HomePage/utils/HomePageInterface";
import { JWT } from "../hooks/auth.hook.interface";

export class ApartmentsService {
  static async getApartment(userBookingDate: BookingState) {
    const storageName = "userData" as LocalKey<JWT>;
    const userData = LocalStorage.getItem(storageName);
    const payload = userData?.token.data.access;
    return axios.get(
      `${process.env.REACT_APP_API_URL}search/?check_availability=${userBookingDate.checkInDate},${userBookingDate.checkOutDate}`,
      {
        params: {
          lat: userBookingDate.lat,
          lon: userBookingDate.lon,
          radius: 16000,
        },
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${payload}`,
        },
      }
    );
  }
}

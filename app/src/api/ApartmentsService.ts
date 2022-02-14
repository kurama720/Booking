import axios from "axios";
import { BookingState } from "../pages/HomePage/utils/HomePageInterface";
import { getIsAuth } from "../models/getIsAuth";

export class ApartmentsService {
  static async getApartment(userBookingDate: BookingState) {
    const payload = getIsAuth();
    return axios.get(
      `${process.env.REACT_APP_API_URL}search/?check_availability=${userBookingDate.checkInDate},${userBookingDate.checkOutDate}&feature=guests:${userBookingDate.numOfPersons}`,
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

  static async getApartmentsBook() {
    const payload = getIsAuth();
    return axios.get(
      `${process.env.REACT_APP_API_URL}accounts/booking-history/`,
      {
        headers: {
          Authorization: `Bearer ${payload}`,
        },
      }
    );
  }

  static async cancelApartmentBook(id: string) {
    const payload = getIsAuth();
    return axios.get(
      `${process.env.REACT_APP_API_URL}accounts/booking-history/`,
      {
        headers: {
          Authorization: `Bearer ${payload}`,
        },
      }
    );
  }
}

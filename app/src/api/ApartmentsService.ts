import axios from "axios";
import { BookingState } from "../pages/HomePage/utils/HomePageInterface";
import { getIsAuth } from "../models/getIsAuth";
import { IBookDataApartment } from "../models/globalInterfaces/globalIntefaces";

export class ApartmentsService {
  static async getApartment(userBookingDate: BookingState) {
    return axios.get(
      `${process.env.REACT_APP_API_URL}search/?check_availability=${userBookingDate.checkInDate},${userBookingDate.checkOutDate}&feature=guests:${userBookingDate.numOfPersons}`,
      {
        params: {
          lat: userBookingDate.lat,
          lon: userBookingDate.lon,
          radius: 16000,
        },
      }
    );
  }

  static async getOneApartment(id: string | undefined) {
    return axios.get(`${process.env.REACT_APP_API_URL}apartments/${id}/`);
  }

  static async bookApartment(
    id: string | undefined,
    dataForBook: IBookDataApartment
  ) {
    const payload = getIsAuth();
    return axios.post(
      `${process.env.REACT_APP_API_URL}apartments/${id}/book`,
      dataForBook,
      {
        headers: {
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

  static async cancelApartmentBook(id: number) {
    const payload = getIsAuth();
    return axios.delete(
      `${process.env.REACT_APP_API_URL}apartments/${id}/cancel-book/`,
      {
        headers: {
          Authorization: `Bearer ${payload}`,
        },
      }
    );
  }
}

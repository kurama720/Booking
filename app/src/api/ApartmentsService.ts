import axios from "axios";
import { LocalKey, LocalStorage } from "ts-localstorage";
import { BookingState } from "../pages/HomePage/utils/HomePageInterface";
import { IBookDataApartment } from "../models/globalInterfaces/globalIntefaces";
import { JWT } from "../hooks/auth.hook.interface";

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
    const storageName = "userData" as LocalKey<JWT>;
    const userData = LocalStorage.getItem(storageName);
    const payload = userData?.token.data.access;
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
}

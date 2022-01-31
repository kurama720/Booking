import axios, { AxiosResponse } from "axios";
import { BookingState } from "../components/Header/utils/HeaderInterface";

export class GetApartmentsService {
  static async getApartment(
    userBookingDate: BookingState
  ): Promise<AxiosResponse> {
    return axios.get(
      `${process.env.REACT_APP_API_URL}apartments/?check_availability=${userBookingDate.checkInDate},${userBookingDate.checkOutDate}`,
      {
        params: {
          lat: userBookingDate.lat,
          lon: userBookingDate.lon,
          guests: userBookingDate.numOfPersons,
        },
      }
    );
  }
}

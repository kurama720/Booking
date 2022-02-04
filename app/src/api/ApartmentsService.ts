import axios from "axios";
import { BookingState } from "../pages/HomePage/utils/HomePageInterface";

export class ApartmentsService {
  static async getApartment(userBookingDate: BookingState) {
    return await axios.get(
      `${process.env.REACT_APP_API_URL}search/?check_availability=${userBookingDate.checkInDate},${userBookingDate.checkOutDate}`,
      {
        params: {
          lat: userBookingDate.lat,
          lon: userBookingDate.lon,
          guests: userBookingDate.numOfPersons,
          radius: userBookingDate,
        },
      }
    );
  }
}

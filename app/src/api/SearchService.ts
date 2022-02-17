import axios from "axios";
import { getIsAuth } from "../models/getIsAuth";

export default class SearchService {
  static async searchOfCities(word: string) {
    const isAuth = getIsAuth();
    return axios.get(`${process.env.REACT_APP_API_URL}cities/coordinates`, {
      params: { word },
      headers: isAuth ? { Authorization: `Bearer ${isAuth}` } : {},
    });
  }
}

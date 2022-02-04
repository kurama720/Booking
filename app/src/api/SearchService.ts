import axios, { AxiosResponse } from "axios";

export default class SearchService {
  static searchOfCities(word: string): Promise<AxiosResponse> {
    return axios.get(`${process.env.REACT_APP_API_URL}cities/coordinates`, {
      params: { word },
    });
  }
}

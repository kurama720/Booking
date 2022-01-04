import axios, {AxiosResponse} from "axios";
import {IUserSignUp} from "../components/UserSignUpForm/IUserSignUp";

export default class AuthService{
   static async signUp(dataForSignUp: IUserSignUp): Promise<AxiosResponse> {
      return axios.post(`${process.env.REACT_APP_API_URL}accounts/signup/`,dataForSignUp)
   }
}

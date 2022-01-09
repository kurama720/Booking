import React, {createContext} from 'react';

interface Auth {
  login: (jwtToken: any, status: any, checked: any) => void,
  logout: () => void,
  token: object | null,
  requestStatus: number | null,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
  errorMessage: string,
  check: boolean

}

export const AuthContext = createContext<Auth>({
  login: () => {},
  logout: () => {},
  token: {},
  requestStatus: 0,
  setErrorMessage: () => {},
  errorMessage: '',
  check: false
})

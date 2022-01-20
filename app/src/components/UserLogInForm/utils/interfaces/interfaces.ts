export interface UserLogin {
  email: string | undefined;
  password: string | undefined;
}

interface config {
  data: string;
  headers: object;
  maxBodyLength: number;
  maxContentLength: number;
  method: string;
  timeout: number;
  transformRequest: number[];
  transformResponse: number[];
  transitional: object;
  url: string;
  xsrfCookieName: string;
  xsrfHeaderName: string;
}

interface token {
  config: config;
  data: object;
  headers: object;
  request: object;
  status: number;
  statusText: string;
}

export interface JWT {
  checked: boolean;
  status: number | string;
  token: token;
}

export interface Token {
  config: config;
  data: object;
  headers: object;
  request: object;
  status: number;
  statusText: string;
}
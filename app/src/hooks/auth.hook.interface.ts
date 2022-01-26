export interface Data {
  access: string;
}

export interface Token {
  data: Data;
  headers: object;
  request: object;
  status: number;
  statusText: string;
}

export interface JWT {
  checked: boolean;
  data: Data;
  status: number | string;
  token: Token;
}

export interface IFormApartment {
  check_in: string;
  check_out: string;
}

export interface IGuest {
  guests: number;
}

export type dataForApartmentForm = IFormApartment | IGuest;

export interface IFormApartmentProps {
  sideEffect: boolean;
}

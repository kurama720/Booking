export interface LocationProps {
  handleSearchLocation: (e: React.ChangeEvent<HTMLInputElement>) => void
  suggestionCityName: string;
  setCalendarPopUpStatus: React.Dispatch<React.SetStateAction<boolean>>;
  isActiveModel: React.Dispatch<React.SetStateAction<boolean>>;
  activeLocationBox: boolean;
}
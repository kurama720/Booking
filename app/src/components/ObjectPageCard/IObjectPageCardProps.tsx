export interface IObjectPageCardProps {
  isActiveSearchMenu: boolean;
  setActiveSearchMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setCalendarPopUpStatus: React.Dispatch<React.SetStateAction<boolean>>;
  isActiveLocationBox: React.Dispatch<React.SetStateAction<boolean>>;
  isActiveModel: React.Dispatch<React.SetStateAction<boolean>>;
  setSideEffect: React.Dispatch<React.SetStateAction<boolean>>;
  sideEffect: boolean;
  handleSearchMenu: () => void;
}
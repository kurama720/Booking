export interface IPropsModal {
  children: React.ReactChildren | React.ReactNode;
  isActiveSearchMenu: boolean;
  setActiveSearchMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setCalendarPopUpStatus: React.Dispatch<React.SetStateAction<boolean>>;
  isActiveLocationBox: React.Dispatch<React.SetStateAction<boolean>>;
  isActiveModel: React.Dispatch<React.SetStateAction<boolean>>;
  setSideEffect: React.Dispatch<React.SetStateAction<boolean>>;
  sideEffect: boolean;
}

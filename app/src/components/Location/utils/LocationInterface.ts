import React from "react";

export interface LocationProps {
  setCalendarPopUpStatus: React.Dispatch<React.SetStateAction<boolean>>;
  isActiveModel: React.Dispatch<React.SetStateAction<boolean>>;
  activeLocationBox: boolean;
  search: string;
  isActiveLocationBox: React.Dispatch<React.SetStateAction<boolean>>;
  handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

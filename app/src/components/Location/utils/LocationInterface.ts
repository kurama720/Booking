import React from "react";

export interface LocationProps {
  setCalendarPopUpStatus: React.Dispatch<React.SetStateAction<boolean>>;
  isActiveModel: React.Dispatch<React.SetStateAction<boolean>>;
  activeLocationBox: boolean;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  isActiveLocationBox: React.Dispatch<React.SetStateAction<boolean>>;
}

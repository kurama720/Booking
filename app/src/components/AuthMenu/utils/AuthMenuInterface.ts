import React from "react";

export interface AuthMenuProps {
  activeUserMenu: boolean;
  isActiveUserMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

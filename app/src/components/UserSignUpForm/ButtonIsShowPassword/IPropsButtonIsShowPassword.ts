import React from "react";

export interface IPropsButtonIsShowPassword {
  showPassword: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isShowPassword: boolean;
}

import * as React from "react";

export interface ButtonProps {
  classNames: string;
  context: string | React.ReactNode;
  onClick?: () => void;
  type: "button";
  disabled?: boolean;
}

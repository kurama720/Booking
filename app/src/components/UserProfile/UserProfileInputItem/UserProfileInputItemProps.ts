import React from "react";

export interface UserProfileInputItemProps {
  value: string;
  handler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoaded: boolean;
  handleBlur: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  name: string;
  error: string | undefined;
  touched: boolean | undefined;
}

import React from "react";

export interface IPropsSliderApartmentPhotos {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  images: string[];
}

import { useCallback } from "react";
import axios from "axios";
import { TUseFavouriteArg } from "./TUseFavouriteArg";

export const useFavourite = (userData: TUseFavouriteArg) => {
  if (userData) {
    const payload = userData.token.data.access;
    axios.defaults.headers.common.Authorization = `Bearer ${payload}`;
  }
  const addFavourite = useCallback(async (id, favouriteStatus) => {
    if (favouriteStatus) {
      const data = await axios.post(
        `${process.env.REACT_APP_API_URL}apartments/favorite/${id}/save`,
        {
          id,
        }
      );
    }
  }, []);
  const removeFavourite = useCallback(async (id) => {
    const data = await axios.delete(
      `${process.env.REACT_APP_API_URL}apartments/favorite/${id}/delete`
    );
  }, []);
  return {
    addFavourite,
    removeFavourite,
  };
};

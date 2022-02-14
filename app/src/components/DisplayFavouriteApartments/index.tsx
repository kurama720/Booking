import React, { useEffect, useState } from "react";
import axios from "axios";
import { LocalKey, LocalStorage } from "ts-localstorage";
import { XIcon } from "@heroicons/react/solid";
import { JWT } from "../../hooks/auth.hook.interface";
import Button from "../Button/Button";
import { IDisplayFavouriteApartmentsProps } from "./IDisplayFavouriteApartmentsProps";
import WishListItem from "../WishListItem";

const storageName = "userData" as LocalKey<JWT>;

interface IDisplayFavouriteApartments {
  description: string;
  feature: null;
  lat: number;
  lon: number;
  price: number;
  rating: number;
  title: string;
  id: number;
}

const DisplayFavouriteApartments = ({
  handleFavouriteApartmentsList,
}: IDisplayFavouriteApartmentsProps) => {
  const historyItem = 4;

  const [favouriteApartments, setFavouriteApartments] =
    useState<IDisplayFavouriteApartments[]>();

  const getWishList = async () => {
    const userData = LocalStorage.getItem(storageName);

    if (userData) {
      const payload = userData.token.data.access;

      const config = {
        headers: {
          Authorization: `Bearer ${payload}`,
        },
      };
      const wishListData = await axios.get(
        `${process.env.REACT_APP_API_URL}apartments/favorite/list`,
        config
      );
      const wishList = wishListData.data;
      setFavouriteApartments([...wishList]);
    }
  };

  useEffect(() => {
    getWishList();
  }, []);

  return (
    <div
      className="h-full flex items-center"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="bg-white max-w-xlg shadow rounded-md">
        <div className="w-[36rem] px-4 py-4">
          <div className="flex w-full justify-between mb-4">
            <h1 className="flex justify-center font-body text-2xl font-bold text-gray-600">
              Wishlist
            </h1>
            <Button
              classNames="rounded-3xl flex items-center h-9"
              type="button"
              onClick={handleFavouriteApartmentsList}
              context={
                <XIcon className="h-6 w-6 fill-gray-400 hover:fill-gray-500 duration-500" />
              }
            />
          </div>
          {favouriteApartments && (
            <div
              className={`w-full ${
                favouriteApartments.length > historyItem
                  ? "overflow-y-scroll h-[40rem]"
                  : ""
              }`}
            >
              {favouriteApartments.map((elem, id) => {
                return (
                  <WishListItem
                    key={elem.id}
                    title={elem.title}
                    price={elem.price}
                    rating={elem.rating}
                    description={elem.description}
                    lat={elem.lat}
                    lon={elem.lon}
                    feature={elem.feature}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayFavouriteApartments;

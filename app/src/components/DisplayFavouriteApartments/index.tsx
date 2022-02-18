import React, { useEffect, useState } from "react";
import axios from "axios";
import { LocalKey, LocalStorage } from "ts-localstorage";
import { XIcon } from "@heroicons/react/solid";
import { JWT } from "../../hooks/auth.hook.interface";
import Button from "../Button/Button";
import { IDisplayFavouriteApartmentsProps } from "./IDisplayFavouriteApartmentsProps";
import WishListItem from "../WishListItem";
import Loader from "../Loader";
import { IFeature } from "../../models/globalInterfaces/globalIntefaces";

const storageName = "userData" as LocalKey<JWT>;

interface IDisplayFavouriteApartments {
  feature: IFeature;
  price: number;
  rating: number | null;
  title: string;
  id: number;
  img_content: Array<string>;
}

const DisplayFavouriteApartments = ({
  handleFavouriteApartmentsList,
}: IDisplayFavouriteApartmentsProps) => {
  const historyItem = 4;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [favouriteApartments, setFavouriteApartments] = useState<
    IDisplayFavouriteApartments[]
  >([]);

  const getWishList = async () => {
    try {
      setIsLoading(true);
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
        console.log(wishListData.data);
        setFavouriteApartments(wishList);
      }
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
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
        <div className="w-[46rem] px-4 py-4">
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
          {isLoading ? (
            <div className="flex justify-center items-center">
              <Loader width="16" height="16" color="blue-600" />
            </div>
          ) : (
            <>
              {favouriteApartments.length > 0 ? (
                <div
                  className={`w-full space-y-4 ${
                    favouriteApartments.length > historyItem
                      ? "overflow-y-scroll h-[40rem]"
                      : ""
                  }`}
                >
                  {favouriteApartments.map((elem) => {
                    return (
                      <WishListItem
                        key={elem.id}
                        id={elem.id}
                        title={elem.title}
                        price={elem.price}
                        rating={elem.rating}
                        feature={elem.feature}
                        img_content={elem.img_content}
                        onDelete={getWishList}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="flex justify-center items-center">
                  <div className="text-2xl font-body font-medium text-gray-900">
                    You have no favourite hotels!
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayFavouriteApartments;

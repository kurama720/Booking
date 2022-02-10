import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { CheckIcon } from "@heroicons/react/outline";
import LinkBack from "../../components/LinkBack";
import Footer from "../../components/Footer/Footer";
import ConfirmTrip from "../../components/ConfirmTrip";
import ConfirmCard from "../../components/ConfirmCard";
import ModalForConfirm from "../../components/ModalForConfirm";
import NodicLogo from "../../components/Header/utils/image/NodicLogo.png";
import {
  IApartment,
  IBookDataApartment,
} from "../../models/globalInterfaces/globalIntefaces";
import { ApartmentsService } from "../../api/ApartmentsService";
import { dateFormatForPolicy, parseDateReserve } from "../../models/parseDate";
import Loader from "../../components/Loader";
import { Paths } from "../../paths/path";
import { IPropsConfirmPage } from "./IPropsConfirmPage";

const ConfirmPage: FC<IPropsConfirmPage> = ({ bookingReverseData }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [currentApartment, setCurrentApartment] = useState<IApartment>(Object);
  const [openModal, setModalOpen] = useState<boolean>(false);
  const history = useNavigate();
  const { id } = bookingReverseData;

  const startDayForPolicy = dateFormatForPolicy(bookingReverseData.checkIn);
  const finishDayForPolice = dateFormatForPolicy(bookingReverseData.checkOut);
  const numberOfNights = parseDateReserve(
    bookingReverseData.checkIn,
    bookingReverseData.checkOut
  );

  const fetchApartment = async () => {
    try {
      const response = await ApartmentsService.getOneApartment(id);
      setCurrentApartment(response.data);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        alert(e);
      }
    }
  };

  useEffect(() => {
    fetchApartment();
  }, []);

  const handleRequestBook = async () => {
    const dataForBookApartment: IBookDataApartment = {
      num_of_persons: bookingReverseData.numberOfGuests,
      check_in_date: bookingReverseData.checkIn,
      check_out_date: bookingReverseData.checkOut,
      idempotency_key: currentApartment.uuid,
    };
    setLoading(true);
    try {
      const response = await ApartmentsService.bookApartment(
        id,
        dataForBookApartment
      );
      if (response.status === 201) {
        setModalOpen(true);
      }
      setLoading(false);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        alert(JSON.stringify(e.response?.data));
      }
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleReturnToMain = () => {
    history(Paths.HOME);
  };

  return (
    <>
      <div className="px-[64px] bg-gray-50">
        <div className="max-w-[1238px] w-full mx-auto">
          <Link to="/">
            <div className="flex justify-start items-center py-[33px]">
              <img src={NodicLogo} className="w-8" alt="logo" />
              <p className="ml-[21px] text-blue-700 font-body font-medium text-2xl">
                Nodic
              </p>
            </div>
          </Link>
          <div className="w-full h-[1px] bg-gray-200 " />
          <LinkBack text="Confirm and pay" />
          <div className="flex justify-between items-start">
            <div className="max-w-[670px] w-full mr-2">
              <ConfirmTrip
                checkInDate={bookingReverseData.checkIn}
                checkOutDate={bookingReverseData.checkOut}
                numberOfGuests={bookingReverseData.numberOfGuests}
              />
              <div className="flex flex-col justify-center items-start mt-6">
                <span className="text-2xl font-medium font-body text-gray-900">
                  Cancellation policy
                </span>
                <div className="mt-4">
                  <span className="font-body font-bold text-base text-gray-900">
                    Free cancellation before 15:00 on {startDayForPolicy}.
                  </span>
                  <span className="font-body text-base text-gray-900">
                    &nbsp;After that, cancel before 15:00 on{" "}
                    {finishDayForPolice} and get a 50% refund, minus the first
                    night and service fee.
                  </span>
                </div>
              </div>
              <button
                className="font-body text-base text-white bg-blue-600 px-[17px] py-[9px] rounded-md mt-[34px] max-w-[153px] w-full"
                onClick={handleRequestBook}
                disabled={loading}
              >
                {loading ? (
                  <Loader width="8" height="8" color="white" />
                ) : (
                  "Request a book"
                )}
              </button>
            </div>
            <div className="shadow rounded-md bg-white max-w-[544px] w-full p-6">
              <div className="max-w-[512px] w-full mx-auto">
                <ConfirmCard
                  title={currentApartment?.title}
                  description={currentApartment?.description}
                  price={currentApartment?.price}
                  rating={4.3}
                />
                <div className="mt-6 max-w-[512px] w-full mx-auto">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-base font-body text-gary-700">
                      ${currentApartment?.price} x {numberOfNights}{" "}
                      {numberOfNights > 1 ? "nights" : "night"}
                    </span>
                    <span className="text-base font-body text-gray-700 font-medium">
                      {!!currentApartment &&
                        `$${currentApartment.price * numberOfNights}`}
                    </span>
                  </div>
                  <div className="w-full h-px bg-gray-200 mt-6" />
                </div>
                <div className="flex justify-between items-center mt-6">
                  <span className="text-base font-body font-medium text-gray-700">
                    Total
                  </span>
                  <span className="font-bold font-body text-base text-gray-700">
                    $
                    {!!currentApartment &&
                      `${currentApartment.price * numberOfNights}`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {openModal && (
        <ModalForConfirm active={openModal}>
          <div
            className="shadow p-8 bg-white rounded-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center items-center flex-col">
              <div className="font-body text-3xl text-green-400">
                Your booking is confirmed!
              </div>
              <div className="">
                <CheckIcon className="w-16 h-16 text-green-400" />
              </div>
            </div>
            <button
              className="text-base font-body font-medium text-blue-600"
              onClick={handleReturnToMain}
            >
              Return to main page
            </button>
          </div>
        </ModalForConfirm>
      )}
      <Footer />
    </>
  );
};

export default ConfirmPage;

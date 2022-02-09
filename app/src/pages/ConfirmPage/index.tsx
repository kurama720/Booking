import React from "react";
import NodicLogo from "../../components/Header/utils/image/NodicLogo.png";
import LinkBack from "../../components/LinkBack";
import Footer from "../../components/Footer/Footer";
import ConfirmTrip from "../../components/ConfirmTrip";
import ConfirmCard from "../../components/ConfirmCard";

const ConfirmPage = () => {
  return (
    <>
      <div className="px-[64px] bg-gray-50">
        <div className="max-w-[1238px] w-full mx-auto">
          <div className="flex justify-start items-center py-[33px]">
            <img src={NodicLogo} className="w-8" alt="logo" />
            <p className="ml-[21px] text-blue-700 font-body font-medium text-2xl">
              Nodic
            </p>
          </div>
          <div className="w-full h-[1px] bg-gray-200 " />
          <LinkBack text="Confirm and pay" />
          <div className="flex justify-between items-start">
            <ConfirmTrip
              checkInDate="2022-06-21"
              checkOutDate="2022-07-26"
              numberOfGuests={1}
            />
            <div className="shadow rounded-md bg-white max-w-[544px] w-full p-6">
              <div className="max-w-[512px] w-full mx-auto">
                <ConfirmCard
                  title="Large flat near center"
                  description="Private room in Minsk"
                  price={34}
                  rating={4.3}
                />
                <div className="mt-6 max-w-[512px] w-full mx-auto">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-base font-body text-gary-700">
                      $34 x 30 nights
                    </span>
                    <span className="text-base font-body text-gray-700 font-medium">
                      $1020
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-base font-body text-gray-700">
                      Weekly discount: 5% off
                    </span>
                    <span className="text-base font-body text-green-600 font-medium">
                      -$29
                    </span>
                  </div>
                  <div className="w-full h-px bg-gray-200 mt-6" />
                </div>
                <div className="flex justify-between items-center mt-6">
                  <span className="text-base font-body font-medium text-gray-700">
                    Total
                  </span>
                  <span className="font-bold font-body text-base text-gray-700">
                    $991
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ConfirmPage;

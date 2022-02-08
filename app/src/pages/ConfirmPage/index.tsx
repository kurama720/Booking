import React from "react";
import NodicLogo from "../../components/Header/utils/image/NodicLogo.png";

import LinkBack from "../../components/LinkBack";
import Footer from "../../components/Footer/Footer";

const ConfirmPage = () => {
  return (
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
      </div>
      <Footer />
    </div>
  );
};

export default ConfirmPage;

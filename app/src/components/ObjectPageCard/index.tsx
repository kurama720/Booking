import React from "react";
import ObjectsPageTop from "./ObjectPageCardTop";
import ObjectsPagePhotos from "./ObjectPageCardPhotos";
import ObjectsPageDescription from "./ObjectPageCardDescription";
import ApartmentForm from "../ApartmentForm/ApartmentForm";
import Footer from "../Footer/Footer";

const Index = () => {
  return (
    <div className="w-full">
      <div className="w-full px-16">
        <div className="w-full">
          <ObjectsPageTop />
          <ObjectsPagePhotos />
        </div>
        <div className="w-full mt-6 flex">
          <ObjectsPageDescription />
          <ApartmentForm />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;

import React from "react";
import Room from "../utils/img/image5.svg";
import Room2 from "../utils/img/image1.svg";
import Room3 from "../utils/img/image2.svg";
import Room4 from "../utils/img/image3.svg";
import Room5 from "../utils/img/image4.svg";
import SlideShow from "../../SlideShow/SlideShow";

const ObjectsPageCardPhotos = () => {
  return (
    <div className="w-full  flex justify-center">
      <div className="w-2/4 object-contain mr-2">
        <img src={Room} className="w-full" alt="room" />
      </div>
      <div className="w-2/4 relative">
        <div className="w-full flex">
          <SlideShow />
          <div className="object-contain w-2/4 mr-2 mb-2">
            <img src={Room2} className="w-full" alt="room" />
          </div>
          <div className="w-2/4 object-contain">
            <img src={Room3} className="w-full" alt="room" />
          </div>
        </div>
        <div className="w-full flex">
          <div className="object-contain w-2/4 mr-2 mb-2">
            <img src={Room4} className="w-full" alt="room" />
          </div>
          <div className="object-contain w-2/4 ">
            <img src={Room5} className="w-full" alt="room" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObjectsPageCardPhotos;

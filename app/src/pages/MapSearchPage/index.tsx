/* eslint-disable import/order */
import React, { FC, useState } from "react";
import L, { map } from "leaflet";
import ReactDOMServer from "react-dom/server";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { AdjustmentsIcon, ChevronLeftIcon } from "@heroicons/react/solid";
import SearchResultItem from "../../components/SearchResultItem";
import MapApartmentCard from "../../components/MapApartmentCard/MapApartmentCard";
import Modal from "../../components/Modal/Modal";
import FilterForm from "../../components/FilterForm";
import "leaflet/dist/leaflet.css";
import mockSearchResults from "../../assets/stubs";
import "./styles.css";

const position: L.LatLngExpression = [52.43272, 30.999012];

const MapSearchPage: FC = () => {
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [isListVisible, setListVisible] = useState(true);
  const [mapState, setMapState] = useState<L.Map>();
  const myIcon = L.divIcon({
    iconSize: L.point(40, 28, true),
    className: "marker",
    html: ReactDOMServer.renderToString(
      <div className="py-[6px] px-2 rounded-[20px] bg-white font-body text-xs font-bold text-gray-700">
        $32
      </div>
    ),
  });
  const handleFilterVisible = () => setFilterVisible(false);
  const handleListVisible = () => {
    setListVisible((prev) => !prev);
    setTimeout(() => mapState?.invalidateSize(), 100);
  };
  return (
    <>
      <div className="flex py-[15px] ml-6 border-b-[1px] border-b-gray-200">
        <button
          className="py-[6px] px-3 flex items-center rounded-[20px] border-[1px] border-gay-300"
          onClick={() => setFilterVisible(true)}
        >
          <AdjustmentsIcon className="w-4 h-4 mr-1 text-gray-400" />
          <span className="text-xs text-gray-700">Filters</span>
        </button>
      </div>
      <div className="flex h-[638px]">
        <div
          className={`flex flex-col box-border relative transition-all ${
            isListVisible ? "w-[656px] px-6" : "w-0 px-0"
          }`}
        >
          <span className="block py-4 font-body text-xs text-gray-700">
            {mockSearchResults.length} stays in Minsk
          </span>
          <ul className="overflow-y-auto flex-grow scrollbar-hide">
            {mockSearchResults.map((result) => (
              <SearchResultItem {...result} key={result.id} />
            ))}
          </ul>
          <div
            className="flex justify-center items-center h-8 w-8 border-[1px] border-gray-300 bg-white shadow-sm rounded-[4px] cursor-pointer absolute top-0 left-full mt-6 ml-6 z-[1000]"
            onClick={handleListVisible}
          >
            <ChevronLeftIcon
              className={`h-4 text-gray-400 ${!isListVisible && "rotate-180"}`}
            />
          </div>
        </div>
        <MapContainer
          className="flex h-full flex-grow"
          center={position}
          zoom={15}
          zoomControl={false}
          doubleClickZoom={false}
          whenCreated={(e) => setMapState(e)}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} icon={myIcon}>
            <Popup
              closeButton={false}
              className="popup"
              maxHeight={280}
              maxWidth={240}
              minWidth={239}
              closeOnClick={false}
            >
              <MapApartmentCard />
            </Popup>
          </Marker>
        </MapContainer>
      </div>
      <Modal active={isFilterVisible} setActive={setFilterVisible}>
        <FilterForm onClose={handleFilterVisible} />
      </Modal>
    </>
  );
};

export default MapSearchPage;

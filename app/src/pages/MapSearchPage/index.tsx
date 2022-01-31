/* eslint-disable import/order */
import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import SearchResultItem from "../../components/SearchResultItem";
import "leaflet/dist/leaflet.css";
import mockSearchResults from "../../assets/const";

// the lines below fix the problem of importing icons from the library
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;
// end of fix

const position: L.LatLngExpression = [52.43272, 30.999012];

const MapSearchPage = () => {
  return (
    <div className="flex h-[710px]">
      <div className="flex flex-col box-border w-1/2 px-6">
        <span className="block py-4 font-body text-xs text-gray-700">
          {mockSearchResults.length} stays in Minsk
        </span>
        <ul className="overflow-y-auto flex-grow scrollbar-hide">
          {mockSearchResults.map((result) => (
            <SearchResultItem {...result} />
          ))}
        </ul>
      </div>
      <MapContainer
        className="h-full w-1/2"
        center={position}
        zoom={15}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
};

export default MapSearchPage;

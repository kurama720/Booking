import React from "react";
import { divIcon, point } from "leaflet";
import ReactDOMServer from "react-dom/server";
import "../styles.css";

export default (value: number) =>
  divIcon({
    iconSize: point(40, 28, true),
    className: "marker",
    html: ReactDOMServer.renderToString(
      <div className="py-[6px] px-2 rounded-[20px] bg-white font-body text-xs font-bold text-gray-700">
        ${value}
      </div>
    ),
  });

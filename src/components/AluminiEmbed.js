import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
import { Tooltip } from 'react-tooltip';

const geoUrl = "https://raw.githubusercontent.com/lotusms/world-map-data/main/world.json";

const markers = [
  { coordinates: [-100, 40], value: 9958, color: "#2a81cb" },
  { coordinates: [2, 46], value: 1774, color: "#2a81cb" },
  { coordinates: [78, 22], value: 42430, color: "#2a81cb" },
  { coordinates: [105, 35], value: 414, color: "#2a81cb" },
  { coordinates: [100, 15], value: 623, color: "#2a81cb" },
  { coordinates: [30, 0], value: 71, color: "#2a81cb" },
  { coordinates: [-60, -10], value: 7, color: "#2a81cb" },
  { coordinates: [-70, -30], value: 4, color: "#2a81cb" },
  { coordinates: [170, -40], value: 9, color: "#2a81cb" },
  { coordinates: [10, 15], value: 13, color: "#2a81cb" },
  { coordinates: [-5, 60], value: 2, color: "#2a81cb" },
  { coordinates: [20, 60], value: 1, color: "#f39c12" },
  { coordinates: [120, 45], value: 36, color: "#f39c12" },
  { coordinates: [25, -25], value: 6, color: "#f39c12" },
  { coordinates: [35, -5], value: 7, color: "#f39c12" },
  { coordinates: [135, -25], value: 326, color: "#f39c12" }
];

const AlumniEmbed = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="relative w-full h-[60vh] bg-gray-100">
      <ComposableMap
        projection="geoMercator"
        className="w-full h-full"
      >
        <ZoomableGroup center={[2, 2]} zoom={2}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#EAEAEC"
                  stroke="#D6D6DA"
                  className="outline-none"
                />
              ))
            }
          </Geographies>
          {markers.map((marker, index) => (
            <Marker key={index} coordinates={marker.coordinates}>
              <circle 
                r={Math.sqrt(marker.value) / 10}
                fill={marker.color}
                stroke="#fff"
                strokeWidth={2}
                className="cursor-pointer transition-all duration-300 hover:opacity-80"
                data-tooltip-id="marker-tooltip"
                data-tooltip-content={`Alumni: ${marker.value}`}
              />
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
      <div className="absolute top-4 left-4 bg-white p-2 rounded-lg shadow-md z-10">
        <input
          type="text"
          placeholder="Search alumni"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <Tooltip id="marker-tooltip" />
    </div>
  );
};

export default AlumniEmbed;
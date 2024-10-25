import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
import { Tooltip } from 'react-tooltip';
import supabase from '../supabaseClient';

const geoUrl = "https://raw.githubusercontent.com/lotusms/world-map-data/main/world.json";

const AlumniEmbed = () => {
  const [markers, setMarkers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMarkers, setFilteredMarkers] = useState([]);

  useEffect(() => {
    const fetchMarkers = async () => {
      const { data, error } = await supabase
        .from('alumni_locations')
        .select('*');

      if (error) {
        console.error('Error fetching markers:', error);
      } else {
        setMarkers(data);
        setFilteredMarkers(data); // Initially set filtered markers to all markers
      }
    };

    fetchMarkers();
  }, []);

  useEffect(() => {
    const results = markers.filter(marker =>
      marker.value.toString().includes(searchTerm) ||
      JSON.stringify(marker.coordinates).includes(searchTerm)
    );
    setFilteredMarkers(results);
  }, [searchTerm, markers]);

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
                  stroke="#EAEAEC"
                  className="outline-none"
                />
              ))
            }
          </Geographies>
          {filteredMarkers.map((marker, index) => (
            <Marker key={index} coordinates={marker.coordinates}>
              <circle 
                r={Math.sqrt(marker.value) / 10}
                fill={marker.color}
                stroke="#fff"
                strokeWidth={1}
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

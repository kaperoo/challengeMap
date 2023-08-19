import { MapContainer, TileLayer, GeoJSON, useMapEvent } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import { continents } from "./continents";

interface CColors {
  [key: string]: string;
}

const contColors: CColors = {
  Asia: "red",
  Europe: "blue",
  Africa: "green",
  "North America": "orange",
  "South America": "yellow",
  Australia: "cyan",
  Oceania: "purple",
  Antarctica: "grey",
};

const SetViewOnClick = () => {
  const map = useMapEvent("click", (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: true,
    });
  });
  return null;
};

const Map = () => {
  return (
    <MapContainer
      zoom={2}
      center={[51.505, -0.09]}
      style={{ height: "90vh", width: "90%" }}
      minZoom={1.5}
      maxZoom={3}
      maxBounds={[
        [-90, -180],
        [90, 180],
      ]}
      zoomControl={false}
    >
      {/* <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      /> */}
      {continents.features.map((continent) => {
        const color = contColors[continent.properties.CONTINENT];
        return (
          <GeoJSON
            key={continent.properties.CONTINENT}
            data={continent}
            style={() => {
              return {
                color: "white",
                fillColor: color,
                // dashArray: "3",
                fillOpacity: 0.2,
                weight: 2,
              };
            }}
            eventHandlers={{
              mouseover: (e) => {
                const layer = e.target;
                layer.setStyle({
                  fillOpacity: 0.7,
                });
              },
              mouseout: (e) => {
                const layer = e.target;
                layer.setStyle({
                  color: "white",
                  fillColor: color,
                  // dashArray: "3",
                  fillOpacity: 0.2,
                });
              },
            }}
          />
        );
      })}
      <SetViewOnClick />
    </MapContainer>
  );
};

export default Map;

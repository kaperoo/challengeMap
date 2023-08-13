import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import { continents } from "./continents";

const contColors = {
  Asia: "red",
  Europe: "blue",
  Africa: "green",
  "North America": "orange",
  "South America": "yellow",
  australia: "brown",
  Oceania: "purple",
}

const Map = () => {
  return (
    <MapContainer
      zoom={3}
      center={[51.505, -0.09]}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
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
                dashArray: "3",
                fillOpacity: 0.2,
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
                  dashArray: "3",
                  fillOpacity: 0.2,
                });
              }
            }}
          />
        );
      })}
      
    </MapContainer>
  );
};

export default Map;

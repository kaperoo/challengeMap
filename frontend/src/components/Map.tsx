import { MapContainer, TileLayer, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import {continents} from "./continents";

const Map = () => {
  return (
    <MapContainer
      zoom={10}
      center={[51.505, -0.09]}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {
        continents.features.map((continent) => {
            const coordinates = continent.geometry.coordinates[0];
            return (
                <Polygon
                    key={continent.properties.CONTINENT}
                    pathOptions={{ 
                        color: "white",
                        fillColor: "purple",
                        fillOpacity: 0.7,
                        weight: 2,
                        opacity: 1,
                        dashArray: "3",

                    }}
                    positions={coordinates.map((coordinate) => [coordinate[1], coordinate[0]])}
                    eventHandlers={{
                        mouseover: (e) => {
                            e.target.openPopup();
                        },
                        mouseout: (e) => {
                            e.target.closePopup();
                        },
                        click: (e) => {
                            console.log(e.target);
                        }
                    }}
                    />
            )
        })
      }
    </MapContainer>
  );
};

export default Map;

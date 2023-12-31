import { useEffect, useState } from "react";
import {
   MapContainer,
   Marker,
   Popup,
   TileLayer,
   useMap,
   useMapEvent,
} from "react-leaflet";
import { useNavigate } from "react-router-dom";
import useGeoLocation from "../../hooks/useGeoLocation";
import useUrlLocation from "../../hooks/useUrlLocation";

const Map = ({ markerLocations }) => {
   const [mapCenter, setMapCenter] = useState([50, 4]);

   const [lat, lng] = useUrlLocation();

   const {
      isLoading: isLoadingPosition,
      position: geoLocationPosition,
      getPosition,
   } = useGeoLocation();

   useEffect(() => {
      if (lat && lng) setMapCenter([lat, lng]);
   }, [lat, lng]);

   useEffect(() => {
      if (geoLocationPosition?.lat && geoLocationPosition?.lng)
         setMapCenter([geoLocationPosition.lat, geoLocationPosition.lng]);
   }, [geoLocationPosition]);

   return (
      <div className="mapContainer">
         <MapContainer
            className="map"
            center={mapCenter}
            zoom={13}
            scrollWheelZoom={true}>
            <TileLayer
               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
               url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            />
            <button
               className="getLocation"
               onClick={getPosition}>
               {isLoadingPosition ? "is loading..." : "Use Your Location"}
            </button>
            <DetectClick />
            <ChangeCenter position={mapCenter} />
            {markerLocations.map((item) => (
               <Marker
                  key={item.id}
                  position={[item.latitude, item.longitude]}>
                  <Popup>{item.host_location}</Popup>
               </Marker>
            ))}
         </MapContainer>
      </div>
   );
};

export default Map;

const ChangeCenter = ({ position }) => {
   const map = useMap();
   map.setView(position);
   return null;
};

const DetectClick = () => {
   const negative = useNavigate();
   useMapEvent({
      click: (e) =>
         negative(`/bookmark/add?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
   });

   return null;
};

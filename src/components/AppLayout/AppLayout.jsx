import React from "react";
import { Outlet } from "react-router";
import { useHotels } from "../../contexts/HotelsProvider";
import Map from "../Map/Map";

const AppLayout = () => {
   const { hotels } = useHotels();
   return (
      <div className="appLayout">
         <div className="sidebar">
            <Outlet />
         </div>
         <Map markerLocations={hotels} />
      </div>
   );
};

export default AppLayout;

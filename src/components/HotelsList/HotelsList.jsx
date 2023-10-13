import React from "react";
import { Link } from "react-router-dom";
import { useHotels } from "../../contexts/HotelsProvider";
import Loader from "../Loader/Loader";

const HotelsList = () => {
   const { hotels, isLoading, currentHotel } = useHotels();

   if (isLoading) return <Loader />;

   return (
      <div className="searchList">
         <h2>Search Results ({hotels.length})</h2>
         {hotels.map((item) => {
            return (
               <Link
                  key={item.id}
                  to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}>
                  <div
                     className={`searchItem ${
                        currentHotel?.id === item.id ? "current-hotel" : ""
                     } `}>
                     <img
                        src={item.picture_url.url}
                        alt={item.name}
                     />
                     <div className="searchItemDescription">
                        <p className="location">{item.smartLocation}</p>
                        <p className="name">{item.name}</p>
                        <p className="price">
                           €&nbsp;{item.price}&nbsp;
                           <span>night</span>
                        </p>
                     </div>
                  </div>
               </Link>
            );
         })}
      </div>
   );
};

export default HotelsList;

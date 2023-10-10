import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Loader from "../Loader/Loader";

const HotelsList = () => {
   const [searchParams, setSearchParams] = useSearchParams();
   const destination = searchParams.get("destination");
   const room = JSON.parse(searchParams.get("options"))?.room;

   const { data, isLoading } = useFetch(
      "http://localhost:5000/hotels",
      `q=${destination || ""}&accommodates_gte=${room || 1}`,
   );

   if (isLoading) return <Loader />;

   return (
      <div className="searchList">
         <h2>Search Results ({data.length})</h2>
         {data.map((item) => {
            return (
               <Link
                  key={item.id}
                  to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}>
                  <div className="searchItem">
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

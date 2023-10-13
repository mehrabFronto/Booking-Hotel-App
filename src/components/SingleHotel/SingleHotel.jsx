import { useEffect } from "react";
import { useParams } from "react-router";
import { useHotels } from "../../contexts/HotelsProvider";
import Loader from "../Loader/Loader";

const SingleHotel = () => {
   const { id } = useParams();

   const { currentHotel, isLoadingCurrHotel, getHotel } = useHotels();

   useEffect(() => {
      getHotel(id);
   }, [id]);

   if (isLoadingCurrHotel) return <Loader />;

   return (
      <div className="room">
         <div className="roomDetail">
            <h2>{currentHotel.name}</h2>
            <div>
               {currentHotel.number_of_reviews} reviews &bull;{" "}
               {currentHotel.smart_location}
            </div>
            <img
               src={currentHotel.xl_picture_url}
               alt={currentHotel.name}
            />
         </div>
      </div>
   );
};

export default SingleHotel;

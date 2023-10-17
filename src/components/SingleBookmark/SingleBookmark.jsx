import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBookmarks } from "../../contexts/BookmarksListProvider";
import Loader from "../Loader/Loader";

import ReactCountryFlag from "react-country-flag";
import { BsArrowLeft } from "react-icons/bs";

const SingleBookmark = () => {
   const { id } = useParams();
   const navigate = useNavigate();
   const { getBookmark, currentBookmark, isLoadingCurrHotel } = useBookmarks();

   useEffect(() => {
      getBookmark(id);
   }, [id]);

   if (isLoadingCurrHotel) return <Loader />;

   return (
      <div>
         <button
            className="btn btn--back"
            onClick={() => navigate(-1)}>
            <BsArrowLeft />
            Back
         </button>
         <h2>{currentBookmark.cityName}</h2>
         <ReactCountryFlag
            svg
            countryCode={currentBookmark.countryCode}
         />
         &nbsp;
         <strong>{currentBookmark.cityName}</strong>
         &nbsp;
         <span>{currentBookmark.country}</span>
      </div>
   );
};

export default SingleBookmark;

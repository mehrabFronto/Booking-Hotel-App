import axios from "axios";
import { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import toast from "react-hot-toast";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useBookmarks } from "../../contexts/BookmarksListProvider";
import useUrlLocation from "../../hooks/useUrlLocation";
import Loader from "../Loader/Loader";

const BASE_GEOCODING_URL =
   "https://api.bigdatacloud.net/data/reverse-geocode-client";

const AddNewBookmark = () => {
   const navigate = useNavigate();
   const [lat, lng] = useUrlLocation();
   const [cityName, setCityName] = useState("");
   const [country, setCountry] = useState("");
   const [countryCode, setCountryCode] = useState("");
   const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
   const [geocodingError, setGeocodingError] = useState(null);
   const { createBookmark } = useBookmarks();

   const submitHandler = async (e) => {
      e.preventDefault();

      if (!cityName || !country) return;

      const newBookmark = {
         cityName,
         country,
         countryCode,
         latitude: lat,
         longitude: lng,
         host_location: cityName + " " + country,
      };

      await createBookmark(newBookmark);
      navigate("/bookmark");
   };

   useEffect(() => {
      if (!lat || !lng) return;

      const fetchLocationData = async () => {
         setIsLoadingGeocoding(true);
         setGeocodingError(null);
         try {
            const { data } = await axios.get(
               `${BASE_GEOCODING_URL}?latitude=${lat}&longitude=${lng}`,
            );

            if (!data.countryCode)
               throw new Error(
                  "this location is not a city, please click somewhere else",
               );

            setCityName(data.city || data.locality || "");
            setCountry(data.countryName);
            setCountryCode(data.countryCode);
         } catch (error) {
            setGeocodingError(error.message);
            toast.error(error.message);
         } finally {
            setIsLoadingGeocoding(false);
         }
      };

      fetchLocationData();
   }, [lat, lng]);

   if (isLoadingGeocoding) return <Loader />;

   if (geocodingError) return <p>{geocodingError}</p>;

   return (
      <div>
         <h2>Bookmark New Location</h2>
         <form
            className="form"
            onSubmit={submitHandler}>
            <div className="formControl">
               <label htmlFor="cityName">City Name:</label>
               <input
                  value={cityName}
                  onChange={(e) => setCityName(e.target.value)}
                  type="text"
                  name="cityName"
                  id="cityName"
               />
            </div>
            <div className="formControl">
               <label htmlFor="country">Country:</label>
               <input
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  type="text"
                  name="country"
                  id="country"
               />
               <ReactCountryFlag
                  svg
                  className="flag"
                  countryCode={countryCode}
               />
            </div>
            <div className="buttons">
               <button
                  type="button"
                  className="btn btn--back"
                  onClick={(e) => {
                     e.preventDefault();
                     navigate(-1);
                  }}>
                  <BsArrowLeft /> Back
               </button>
               <button
                  type="submit"
                  className="btn btn--primary">
                  Add
               </button>
            </div>
         </form>
      </div>
   );
};

export default AddNewBookmark;

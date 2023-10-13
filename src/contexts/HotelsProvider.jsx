import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const HotelsContext = createContext();

const BASE_URL = "http://localhost:5000";

const HotelsProvider = ({ children }) => {
   const [searchParams, setSearchParams] = useSearchParams();

   const [currentHotel, setCurrentHotel] = useState({});
   const [isLoadingCurrHotel, setIsLoadingCurrHotel] = useState(false);

   const destination = searchParams.get("destination");
   const room = JSON.parse(searchParams.get("options"))?.room;

   const { data: hotels, isLoading } = useFetch(
      `${BASE_URL}/hotels`,
      `q=${destination || ""}&accommodates_gte=${room || 1}`,
   );

   const getHotel = async (id) => {
      setIsLoadingCurrHotel(true);
      try {
         const { data } = await axios.get(`${BASE_URL}/hotels/${id}`);
         setCurrentHotel(data);
         setIsLoadingCurrHotel(false);
      } catch (error) {
         toast.error(error.message);
         setIsLoadingCurrHotel(false);
      }
   };

   return (
      <HotelsContext.Provider
         value={{
            hotels,
            isLoading,
            currentHotel,
            isLoadingCurrHotel,
            getHotel,
         }}>
         {children}
      </HotelsContext.Provider>
   );
};

export default HotelsProvider;

export const useHotels = () => useContext(HotelsContext);

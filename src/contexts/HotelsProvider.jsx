import React, { createContext, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const HotelsContext = createContext();

const HotelsProvider = ({ children }) => {
   const [searchParams, setSearchParams] = useSearchParams();
   const destination = searchParams.get("destination");
   const room = JSON.parse(searchParams.get("options"))?.room;

   const { data: hotels, isLoading } = useFetch(
      "http://localhost:5000/hotels",
      `q=${destination || ""}&accommodates_gte=${room || 1}`,
   );

   return (
      <HotelsContext.Provider value={{ hotels, isLoading }}>
         {children}
      </HotelsContext.Provider>
   );
};

export default HotelsProvider;

export const useHotels = () => useContext(HotelsContext);

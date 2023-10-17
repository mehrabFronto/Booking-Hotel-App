import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import useFetch from "../hooks/useFetch";

const BookmarksListContext = createContext();

const BASE_URL = "http://localhost:5000";

const BookMarksListProvider = ({ children }) => {
   const [currentBookmark, setCurrentBookmark] = useState({});
   const [isLoadingCurrHotel, setIsLoadingCurrBookmark] = useState(false);

   const { data: bookmarks, isLoading } = useFetch(`${BASE_URL}/bookmarks`);

   const getBookmark = async (id) => {
      setIsLoadingCurrBookmark(true);
      try {
         const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
         setCurrentBookmark(data);
         setIsLoadingCurrBookmark(false);
      } catch (error) {
         toast.error(error.message);
         setIsLoadingCurrBookmark(false);
      }
   };

   return (
      <BookmarksListContext.Provider
         value={{
            bookmarks,
            isLoading,
            currentBookmark,
            isLoadingCurrHotel,
            getBookmark,
         }}>
         {children}
      </BookmarksListContext.Provider>
   );
};

export default BookMarksListProvider;

export const useBookmarks = () => useContext(BookmarksListContext);

import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const BookmarksListContext = createContext();

const BASE_URL = "http://localhost:5000";

const BookMarksListProvider = ({ children }) => {
   const [currentBookmark, setCurrentBookmark] = useState({});
   const [bookmarks, setBookmarks] = useState([]);
   const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
      const fetchBookmarksList = async () => {
         setIsLoading(true);
         try {
            const { data } = await axios.get(`${BASE_URL}/bookmarks`);
            setBookmarks(data);
         } catch (error) {
            toast.error(error.message);
         } finally {
            setIsLoading(false);
         }
      };

      fetchBookmarksList();
   }, []);

   const getBookmark = async (id) => {
      try {
         const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
         setCurrentBookmark(data);
      } catch (error) {
         toast.error(error.message);
      }
   };

   const createBookmark = async (newBookmark) => {
      try {
         const { data } = await axios.post(
            `${BASE_URL}/bookmarks`,
            newBookmark,
         );
         setCurrentBookmark(data);
         setBookmarks((prev) => [...prev, data]);
      } catch (error) {
         toast.error(error.message);
      }
   };

   return (
      <BookmarksListContext.Provider
         value={{
            bookmarks,
            isLoading,
            currentBookmark,
            getBookmark,
            createBookmark,
         }}>
         {children}
      </BookmarksListContext.Provider>
   );
};

export default BookMarksListProvider;

export const useBookmarks = () => useContext(BookmarksListContext);

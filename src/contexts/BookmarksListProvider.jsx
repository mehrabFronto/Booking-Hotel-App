import React, { createContext, useContext } from "react";
import useFetch from "../hooks/useFetch";

const BookmarksListContext = createContext();

const BASE_URL = "http://localhost:5000";

const BookMarksListProvider = ({ children }) => {
   const { data: bookmarks, isLoading } = useFetch(`${BASE_URL}/bookmarks`);

   return (
      <BookmarksListContext.Provider
         value={{
            bookmarks,
            isLoading,
         }}>
         {children}
      </BookmarksListContext.Provider>
   );
};

export default BookMarksListProvider;

export const useBookmarks = () => useContext(BookmarksListContext);

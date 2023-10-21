import axios from "axios";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import toast from "react-hot-toast";

const BookmarksListContext = createContext();

const BASE_URL = "http://localhost:5000";

const initialState = {
   bookmarks: [],
   currentBookmark: {},
   isLoading: false,
};

const bookmarkReducer = (state, action) => {
   switch (action.type) {
      case "loading": {
         return { ...state, isLoading: true };
      }

      case "bookmarks/loaded": {
         return { ...state, isLoading: false, bookmarks: action.payload };
      }

      case "bookmark/loaded": {
         return { ...state, isLoading: false, currentBookmark: action.payload };
      }

      case "bookmark/created": {
         return {
            ...state,
            isLoading: false,
            currentBookmark: action.payload,
            bookmarks: [...state.bookmarks, action.payload],
         };
      }

      case "bookmark/deleted": {
         return {
            ...state,
            isLoading: false,
            currentBookmark: {},
            bookmarks: state.bookmarks.filter(
               (item) => item.id !== action.payload,
            ),
         };
      }

      case "rejected": {
         return {
            ...state,
            isLoading: false,
            error: action.payload,
         };
      }

      default:
         throw new Error("Unknown action");
   }
};

const BookMarksListProvider = ({ children }) => {
   const [{ bookmarks, currentBookmark, isLoading }, dispatch] = useReducer(
      bookmarkReducer,
      initialState,
   );

   useEffect(() => {
      const fetchBookmarksList = async () => {
         dispatch({ type: "loading" });
         try {
            const { data } = await axios.get(`${BASE_URL}/bookmarks`);
            dispatch({ type: "bookmarks/loaded", payload: data });
         } catch (error) {
            toast.error(error.message);
            dispatch({ type: "rejected", payload: error });
         }
      };

      fetchBookmarksList();
   }, []);

   const getBookmark = async (id) => {
      if (Number(id) === currentBookmark?.id) return;

      dispatch({ type: "loading" });
      try {
         const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
         dispatch({ type: "bookmark/loaded", payload: data });
      } catch (error) {
         toast.error(error.message);
         dispatch({ type: "rejected", payload: error });
      }
   };

   const createBookmark = async (newBookmark) => {
      try {
         const { data } = await axios.post(
            `${BASE_URL}/bookmarks`,
            newBookmark,
         );
         dispatch({ type: "bookmark/created", payload: data });
         toast.success("location bookmarked");
      } catch (error) {
         toast.error(error.message);
         dispatch({ type: "rejected", payload: error });
      }
   };

   async function deleteBookmark(id) {
      dispatch({ type: "loading" });
      try {
         await axios.delete(`${BASE_URL}/bookmarks/${id}`);
         dispatch({ type: "bookmark/deleted", payload: id });
         toast.success("bookmarked location deleted");
      } catch (error) {
         toast.error(error.message);
         dispatch({ type: "rejected", payload: error });
      }
   }

   return (
      <BookmarksListContext.Provider
         value={{
            bookmarks,
            isLoading,
            currentBookmark,
            getBookmark,
            createBookmark,
            deleteBookmark,
         }}>
         {children}
      </BookmarksListContext.Provider>
   );
};

export default BookMarksListProvider;

export const useBookmarks = () => useContext(BookmarksListContext);

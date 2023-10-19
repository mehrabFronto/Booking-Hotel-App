import ReactCountryFlag from "react-country-flag";
import { HiTrash } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useBookmarks } from "../../contexts/BookmarksListProvider";
import Loader from "../Loader/Loader";

const Bookmark = () => {
   const { bookmarks, isLoading, currentBookmark, deleteBookmark } =
      useBookmarks();

   const deleteHandler = async (e, id) => {
      e.preventDefault();
      await deleteBookmark(id);
   };

   if (isLoading) return <Loader />;

   if (!bookmarks.length) return <p>There is no bookmarked location</p>;

   return (
      <div>
         <h2>Bookmarks List</h2>
         <div className="bookmarkList">
            {bookmarks.map((item) => {
               return (
                  <Link
                     key={item.id}
                     to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}>
                     <div
                        className={`bookmarkItem ${
                           currentBookmark?.id === item.id
                              ? "current-bookmark"
                              : ""
                        }`}>
                        <div>
                           <ReactCountryFlag
                              svg
                              countryCode={item.countryCode}
                           />
                           &nbsp;
                           <strong>{item.cityName}</strong>
                           &nbsp;
                           <span>{item.country}</span>
                        </div>
                        <button onClick={(e) => deleteHandler(e, item.id)}>
                           <HiTrash className="trash" />
                        </button>
                     </div>
                  </Link>
               );
            })}
         </div>
      </div>
   );
};

export default Bookmark;

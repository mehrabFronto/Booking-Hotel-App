import ReactCountryFlag from "react-country-flag";
import { Link } from "react-router-dom";
import { useBookmarks } from "../../contexts/BookmarksListProvider";
import Loader from "../Loader/Loader";

const Bookmark = () => {
   const { bookmarks, isLoading, currentBookmark } = useBookmarks();

   if (isLoading) return <Loader />;

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
                        <ReactCountryFlag
                           svg
                           countryCode={item.countryCode}
                        />
                        &nbsp;
                        <strong>{item.cityName}</strong>
                        &nbsp;
                        <span>{item.country}</span>
                     </div>
                  </Link>
               );
            })}
         </div>
      </div>
   );
};

export default Bookmark;

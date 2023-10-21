import { Outlet } from "react-router";
import { useBookmarks } from "../../contexts/BookmarksListProvider";
import Map from "../Map/Map";

const BookmarkLayout = () => {
   const { bookmarks } = useBookmarks();
   return (
      <div className="appLayout">
         <div className="sidebar">
            <Outlet />
         </div>
         <Map markerLocations={bookmarks} />
      </div>
   );
};

export default BookmarkLayout;

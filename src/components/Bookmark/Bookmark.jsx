import Map from "../Map/Map";

const Bookmark = () => {
   return (
      <div className="appLayout">
         <div className="sidebar">
            <div>bookmarks list...</div>
         </div>
         <Map markerLocations={[]} />
      </div>
   );
};

export default Bookmark;

import { useState } from "react";
import { HiCalendar, HiSearch } from "react-icons/hi";
import { MdLocationOn } from "react-icons/md";

const Header = () => {
   const [destination, setDestination] = useState("");
   return (
      <div className="header">
         <div className="headerSearch">
            <div className="headerSearchItem">
               <MdLocationOn className="headerIcon locationIcon" />
               <input
                  value={destination}
                  onChange={({ target }) => setDestination(target.value)}
                  type="text"
                  placeholder="Where to go?"
                  className="headerSearchInput"
                  name="destination"
               />
               <span className="separator"></span>
            </div>

            <div className="headerSearchItem">
               <HiCalendar className="headerIcon dateIcon" />
               <div className="dateDropDown">10/08/2023</div>
               <span className="separator"></span>
            </div>

            <div className="headerSearchItem">
               <div id="optionDropDown">
                  1 adult &bull; 0 children &bull; 1 room
               </div>
               <span className="separator"></span>
            </div>

            <div className="headerSearchItem">
               <button className="headerSearchBtn">
                  <HiSearch className="headerIcon" />
               </button>
            </div>
         </div>
      </div>
   );
};

export default Header;

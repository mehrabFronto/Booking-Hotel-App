import { useRef, useState } from "react";
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi";
import { MdLocationOn } from "react-icons/md";
import useOutsideClick from "../../hooks/useOutsideClick";

const Header = () => {
   const [destination, setDestination] = useState("");
   const [openOptions, setOpenOptions] = useState(false);
   const [options, setOptions] = useState({
      adult: 1,
      children: 0,
      room: 1,
   });

   const optionTypes = [
      { id: 1, type: "adult", minLimit: 1 },
      { id: 2, type: "children", minLimit: 0 },
      { id: 3, type: "room", minLimit: 1 },
   ];

   const handleOptions = (name, operation) => {
      setOptions((prev) => {
         return {
            ...prev,
            [name]: operation === "inc" ? options[name] + 1 : options[name] - 1,
         };
      });
   };

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
               <div
                  id="optionDropDown"
                  onClick={() => setOpenOptions((prev) => !prev)}>
                  {options.adult} adult &bull; {options.children} children
                  &bull; {options.room} room
               </div>
               {openOptions && (
                  <GuestOptionsList setOpenOptions={setOpenOptions}>
                     {optionTypes.map((item) => (
                        <OptionItem
                           key={item.id}
                           type={item.type}
                           minLimit={item.minLimit}
                           options={options}
                           handleOptions={handleOptions}
                        />
                     ))}
                  </GuestOptionsList>
               )}
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

const GuestOptionsList = ({ children, setOpenOptions }) => {
   const optionsRef = useRef();

   useOutsideClick(optionsRef, "optionDropDown", () => setOpenOptions(false));

   return (
      <div
         className="guestOptions"
         ref={optionsRef}>
         {children}
      </div>
   );
};

const OptionItem = ({ type, minLimit, options, handleOptions }) => {
   return (
      <div className="guestOptionItem">
         <span className="optionText">{type}</span>
         <div className="optionCounter">
            <button
               className="optionCounterBtn"
               onClick={() => handleOptions(type, "dec")}
               disabled={options[type] <= minLimit}>
               <HiMinus />
            </button>
            <span className="optionsCounterNumber">{options[type]}</span>
            <button
               className="optionCounterBtn"
               onClick={() => handleOptions(type, "inc")}>
               <HiPlus />
            </button>
         </div>
      </div>
   );
};

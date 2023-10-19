import { format } from "date-fns";
import { useRef, useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { AiFillHome } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { BsFillBookmarkFill } from "react-icons/bs";
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi";
import { MdLocationOn, MdLogout } from "react-icons/md";
import {
   NavLink,
   createSearchParams,
   useNavigate,
   useSearchParams,
} from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";
import useOutsideClick from "../../hooks/useOutsideClick";

const Header = () => {
   const navigate = useNavigate();
   const [searchParams, setSearchParams] = useSearchParams();
   const [destination, setDestination] = useState(
      searchParams.get("destination") || "",
   );
   const [openOptions, setOpenOptions] = useState(false);
   const [options, setOptions] = useState({
      adult: 1,
      children: 0,
      room: 1,
   });

   const [date, setDate] = useState([
      {
         startDate: new Date(),
         endDate: new Date(),
         key: "selection",
      },
   ]);

   const [openDate, setOpenDate] = useState(false);

   const optionTypes = [
      { id: 1, type: "adult", minLimit: 1 },
      { id: 2, type: "children", minLimit: 0 },
      { id: 3, type: "room", minLimit: 1 },
   ];

   const dateRef = useRef();

   useOutsideClick(dateRef, "dateDropDown", () => setOpenDate(false));

   const handleOptions = (name, operation) => {
      setOptions((prev) => {
         return {
            ...prev,
            [name]: operation === "inc" ? options[name] + 1 : options[name] - 1,
         };
      });
   };

   const handleSearch = () => {
      const encodedParams = createSearchParams({
         destination: destination,
         options: JSON.stringify(options),
         date: JSON.stringify(date),
      });
      // setSearchParams(encodedParams);
      navigate({
         pathname: "/hotels",
         search: encodedParams.toString(),
      });
   };

   return (
      <div className="header">
         <NavLink to="/">
            <AiFillHome style={{ width: "30px", height: "30px" }} />
         </NavLink>

         <NavLink to="/bookmark">
            <BsFillBookmarkFill
               style={{ width: "25px", height: "25px", marginTop: "2px" }}
            />
         </NavLink>
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

            <div
               className="headerSearchItem"
               ref={dateRef}>
               <HiCalendar className="headerIcon dateIcon" />
               <div
                  id="dateDropDown"
                  className="dateDropDown"
                  onClick={() => setOpenDate((prev) => !prev)}>
                  {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                     date[0].endDate,
                     "MM/dd/yyyy",
                  )}`}
               </div>
               {openDate && (
                  <DateRange
                     className="date"
                     ranges={date}
                     onChange={(item) => setDate([item.selection])}
                     minDate={new Date()}
                     moveRangeOnFirstSelection={true}
                  />
               )}
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
               <button
                  className="headerSearchBtn"
                  onClick={handleSearch}>
                  <HiSearch className="headerIcon" />
               </button>
            </div>
         </div>
         <User />
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

const User = () => {
   const navigate = useNavigate();
   const { user, isAuthenticated, logout } = useAuth();

   const logoutHandler = () => {
      logout();
      navigate("/");
   };

   return (
      <div>
         {isAuthenticated ? (
            <div>
               <strong>{user.name}</strong>
               <button onClick={logoutHandler}>
                  &nbsp;
                  <MdLogout className="logout icon" />
               </button>
            </div>
         ) : (
            <NavLink to="/login">
               <BiUserCircle style={{ width: "35px", height: "35px" }} />
            </NavLink>
         )}
      </div>
   );
};

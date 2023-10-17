import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router";
import "./App.css";
import AppLayout from "./components/AppLayout/AppLayout";
import BookmarkLayout from "./components/BookmarkLayout/BookmarkLayout";
import Header from "./components/Header/Header";
import HotelsList from "./components/HotelsList/HotelsList";
import LocationList from "./components/LocationList/LocationList";
import SingleHotel from "./components/SingleHotel/SingleHotel";
import BookMarksListProvider from "./contexts/BookmarksListProvider";
import HotelsProvider from "./contexts/HotelsProvider";

function App() {
   return (
      <BookMarksListProvider>
         <HotelsProvider>
            <Toaster />
            <Header />
            <Routes>
               <Route
                  path="/"
                  element={<LocationList />}
               />
               <Route
                  path="/hotels"
                  element={<AppLayout />}>
                  <Route
                     index
                     element={<HotelsList />}
                  />
                  <Route
                     path=":id"
                     element={<SingleHotel />}
                  />
               </Route>
               <Route
                  path="/bookmark"
                  element={<BookmarkLayout />}>
                  <Route
                     index
                     element={<div>bookmark list...</div>}
                  />
                  <Route
                     path="add"
                     element={<div>add bookmark</div>}
                  />
               </Route>
            </Routes>
         </HotelsProvider>
      </BookMarksListProvider>
   );
}

export default App;

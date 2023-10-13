import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router";
import "./App.css";
import AppLayout from "./components/AppLayout/AppLayout";
import Header from "./components/Header/Header";
import HotelsList from "./components/HotelsList/HotelsList";
import LocationList from "./components/LocationList/LocationList";
import SingleHotel from "./components/SingleHotel/SingleHotel";
import HotelsProvider from "./contexts/HotelsProvider";

function App() {
   return (
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
         </Routes>
      </HotelsProvider>
   );
}

export default App;

import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router";
import "./App.css";
import AppLayout from "./components/AppLayout/AppLayout";
import Header from "./components/Header/Header";
import HotelsList from "./components/HotelsList/HotelsList";
import LocationList from "./components/LocationList/LocationList";

function App() {
   return (
      <div>
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
                  element={<div>single hotel</div>}
               />
            </Route>
         </Routes>
      </div>
   );
}

export default App;

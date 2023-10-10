import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router";
import "./App.css";
import Header from "./components/Header/Header";
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
         </Routes>
      </div>
   );
}

export default App;

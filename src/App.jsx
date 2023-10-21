import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router";
import "./App.css";
import AddNewBookmark from "./components/AddNewBookmark/AddNewBookmark";
import AppLayout from "./components/AppLayout/AppLayout";
import Bookmark from "./components/Bookmark/Bookmark";
import BookmarkLayout from "./components/BookmarkLayout/BookmarkLayout";
import Header from "./components/Header/Header";
import HotelsList from "./components/HotelsList/HotelsList";
import LocationList from "./components/LocationList/LocationList";
import Login from "./components/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import SingleBookmark from "./components/SingleBookmark/SingleBookmark";
import SingleHotel from "./components/SingleHotel/SingleHotel";
import AuthProvider from "./contexts/AuthProvider";
import BookMarksListProvider from "./contexts/BookmarksListProvider";
import HotelsProvider from "./contexts/HotelsProvider";

function App() {
   return (
      <AuthProvider>
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
                     element={
                        <ProtectedRoute>
                           <BookmarkLayout />
                        </ProtectedRoute>
                     }>
                     <Route
                        index
                        element={<Bookmark />}
                     />
                     <Route
                        path=":id"
                        element={<SingleBookmark />}
                     />
                     <Route
                        path="add"
                        element={<AddNewBookmark />}
                     />
                  </Route>
                  <Route
                     path="/login"
                     element={<Login />}
                  />
               </Routes>
            </HotelsProvider>
         </BookMarksListProvider>
      </AuthProvider>
   );
}

export default App;

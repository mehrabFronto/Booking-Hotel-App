import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";

const ProtectedRoute = ({ children }) => {
   const navigate = useNavigate();
   const { user, isAuthenticated } = useAuth();

   useEffect(() => {
      if (!isAuthenticated) navigate("/login");
   }, [isAuthenticated, navigate]);

   return isAuthenticated ? children : null;
};

export default ProtectedRoute;

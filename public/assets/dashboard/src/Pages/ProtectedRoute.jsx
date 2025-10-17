import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthStore";
import axios from "axios";

function ProtectedRoute({ children }) {
  const { userData } = useContext(AuthContext);



  if (
    userData == null &&
    sessionStorage.getItem("userToken") == null &&
    sessionStorage.getItem("userToken") == undefined
  ) {
 
    return <Navigate to="/login" />;
  } else {
    return children;
  }
}

export default ProtectedRoute;

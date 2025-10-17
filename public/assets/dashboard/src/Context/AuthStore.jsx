import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import axios from "axios";


export const AuthContext = createContext();
export default function AuthContextProvider({ children }) {
  const accessToken = sessionStorage.getItem('userToken');
  // for handle Reload
  useEffect(() => {
    if (accessToken !== null && accessToken !== undefined) {
      saveUserData();
    }
  }, []);

  const [userData, setUserData] = useState(null);
  const saveUserData = () => {
    const encodedToken = sessionStorage.getItem("userToken");
    const decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken);
  };
    // Function to refresh token
  const getRefreshedToken = async () => {
    try {
      const token = sessionStorage.getItem("userToken");
      const refreshToken = sessionStorage.getItem("refreshToken");

      if (!token || !refreshToken) return;

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/Account/refresh`,
        {
          accessToken: token,
          refreshToken: refreshToken,
        }
      );
      console.log("Token refreshed", data);

      // Save new tokens
      if (data?.accessToken && data?.refreshToken) {
        sessionStorage.setItem("userToken", data.accessToken);
        sessionStorage.setItem("refreshToken", data.refreshToken);
      }
    } catch (error) {
      console.error("Failed to refresh token", error);
      toast.error("انتهت صلاحية الجلسة، يرجى تسجيل الدخول مرة أخرى.");
      sessionStorage.removeItem("userToken");
      sessionStorage.removeItem("refreshToken");
    }
  };

  useEffect(() => {
    // refresh every 5 minutes
  
    getRefreshedToken();

  
  }, []);
  
  const logout = () => {
    sessionStorage.removeItem('userToken');
    setUserData(null);
    toast.success("تم تسجيل الخروج بنجاح.");
   
  };
  return (
    <AuthContext.Provider value={{ userData, saveUserData , logout , accessToken }}>
      {children}
    </AuthContext.Provider>
  );
}

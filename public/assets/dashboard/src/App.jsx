import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MainLayout from "./Pages/MainLayout";
import Login from "./Pages/Login";
import { Suspense, useContext } from "react";
import { Toaster } from "sonner";
import { AuthContext } from "./Context/AuthStore";
import ProtectedRoute from "./Pages/ProtectedRoute";
import NotFound from "./Pages/NotFound";
import Home from "./Pages/Home/Home";
import Orders from "./Pages/Orders/Orders";
import Packages from "./Pages/Packages/Packages";
import AddPackages from "./Pages/Packages/AddPackages";
import ContactUs from "./Pages/Contact/ContactUs";
import Menus from "./Pages/Menus/Menus";
import AddHomeData from "./Pages/Home/AddHomeData";
import AddSection from "./Pages/Packages/AddSection";
import AddAddons from "./Pages/Packages/AddAddons";
import Settings from "./Pages/Settings/Settings";
import AddMenu from "./Pages/Menus/AddMenu";
import AddCategory from "./Pages/Menus/AddCategory";
import AddItem from "./Pages/Menus/AddItem";
import PackageOrders from "./Pages/Orders/PackageOrders";

function App() {
  const { saveUserData } = useContext(AuthContext);

  return (
    <>
      <BrowserRouter basename="/dashboard">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route
              path="/login"
              element={<Login saveUserData={saveUserData} />}
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/" element={<Home />} />
              <Route path="/home/add" element={<AddHomeData />} />
              <Route path="orders" element={<Orders />} />
              <Route path="package-orders" element={<PackageOrders />} />
              <Route path="packages" element={<Packages />} />
              <Route path="packages/add" element={<AddPackages />} />
              <Route path="sections/add" element={<AddSection />} />
              <Route path="addons/add" element={<AddAddons />} />
              <Route path="contact-us" element={<ContactUs />} />

              <Route path="menus" element={<Menus />} />
              <Route path="menus/add" element={<AddMenu />} />
              <Route path="categories/add" element={<AddCategory />} />
              <Route path="items/add" element={<AddItem />} />
              <Route path="settings" element={<Settings />} />

              {/* <Route path="register" element={<Register />} />  */}
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Toaster richColors position="top-left" />
    </>
  );
}

export default App;

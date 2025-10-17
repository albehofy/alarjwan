import { Outlet } from "react-router-dom";
import { useState, createContext, useContext } from "react";
import Sidebar from "../Components/Sidebar";

// Create context for sidebar state
const SidebarContext = createContext();

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within SidebarProvider");
  }
  return context;
  
};

function MainLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-slate-100">
        <Sidebar />
        <main
          className={`transition-all duration-300 min-h-screen ${
            isCollapsed ? "lg:mr-16" : "lg:mr-64"
          }`}
        >
          {/* Content wrapper with padding for mobile menu button */}
          <div className="pt-16 lg:pt-0">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarContext.Provider>
  );
}

export default MainLayout;

import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthStore";
import { NavLink } from "react-router-dom";
import { useSidebar } from "../Pages/MainLayout";

function Sidebar() {
  const { userData, logout } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isCollapsed, setIsCollapsed } = useSidebar();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {userData && (
        <>
          {/* Desktop Toggle Button */}
          <button
            onClick={toggleCollapse}
            className="hidden lg:block fixed top-4 right-4 z-[10002] p-2 rounded-lg bg-slate-300 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <i
              className={`fas ${
                isCollapsed ? "fa-chevron-left" : "fa-chevron-right"
              } text-sm`}
            ></i>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className={`lg:hidden fixed top-4 right-4 z-[10001] p-2 rounded-lg ${isMobileMenuOpen ? "  bg-slate-300" : " text-white bg-gradient-to-r from-[#354137] to-[#6c8570]"}  shadow-lg hover:shadow-xl transition-all duration-300`}
          >
            <i
              className={`fas ${
                isMobileMenuOpen ? "fa-times " : "fa-bars"
              } text-lg`}
            ></i>
          </button>

          {/* Mobile Overlay */}
          {isMobileMenuOpen && (
            <div
              className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-[9998]"
              onClick={closeMobileMenu}
            ></div>
          )}

          {/* Sidebar */}
          <aside
            className={`
            fixed top-0 h-screen right-0 z-[9999] 
            bg-[#6c8570]
            shadow-2xl transition-all duration-300 ease-in-out overflow-y-auto
            ${
              isMobileMenuOpen
                ? "translate-x-0"
                : "translate-x-full lg:translate-x-0"
            }
            ${isCollapsed ? "lg:w-16" : "lg:w-64"}
            w-64
          `}
          >
            {/* Header Section */}
            <div
              className={`relative bg-gradient-to-r from-[#354137] to-[#6c8570] border-b border-slate-600/30 transition-all duration-300 ${
                isCollapsed ? "lg:p-2" : "p-6"
              }`}
            >
              {/* Logo Section */}
              <div
                className={`flex items-center justify-center transition-all duration-300 ${
                  isCollapsed ? "lg:flex-col lg:py-2" : "flex-col"
                }`}
              >
                <div
                  className={`bg-slate-300 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                    isCollapsed
                      ? "lg:w-10 lg:h-10 w-16 h-16 lg:mb-0 mb-3"
                      : "w-16 h-16 mb-3"
                  }`}
                >
                  <i
                    className={`fas fa-store text-slate-900 transition-all duration-300 ${
                      isCollapsed ? "lg:text-lg text-2xl" : "text-2xl"
                    }`}
                  ></i>
                </div>
                {!isCollapsed && (
                  <>
                    <h1 className="text-white font-bold text-lg lg:block hidden">
                      لوحة التحكم
                    </h1>
                  </>
                )}
                {/* Mobile always shows text */}
                <div className="lg:hidden">
                  <h1 className="text-white font-bold text-lg">لوحة التحكم</h1>
                </div>
              </div>
            </div>

            {/* Navigation Section */}
            <nav
              className={`flex-1 transition-all duration-300 ${
                isCollapsed ? "lg:px-2 px-4" : "px-4"
              } py-6`}
            >
              <ul className="space-y-2">
                <li>
                  <NavLink
                    to="/"
                    onClick={closeMobileMenu}
                    className={({ isActive }) => `
                      flex items-center   rounded-xl transition-all duration-300 group
                      ${
                        isCollapsed
                          ? "lg:px-2 lg:py-2 lg:justify-center px-4 py-2"
                          : "px-4 py-2"
                      }
                      ${
                        isActive
                          ? "bg-slate-300 text-slate-900 shadow-lg transform scale-105"
                          : "hover:bg-[#354137] hover:transform hover:translate-x-1 text-white"
                      }
                    `}
                    title={isCollapsed ? "الرئيسية" : ""}
                  >
                    <div
                      className={`flex items-center justify-center rounded-lg bg-[#354137] group-hover:bg-[#6c8570] transition-colors ${
                        isCollapsed
                          ? "lg:w-8 lg:h-8 lg:ml-0 w-8 h-8 ml-3"
                          : "w-8 h-8 ml-3"
                      }`}
                    >
                      <i className="fas fa-home text-sm text-white"></i>
                    </div>
                    {!isCollapsed && (
                      <span className="font-medium lg:block hidden">
                        الرئيسية
                      </span>
                    )}
                    {/* Mobile always shows text */}
                    <span className="font-medium lg:hidden block">
                      الرئيسية
                    </span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/orders"
                    onClick={closeMobileMenu}
                    className={({ isActive }) => `
                      flex items-center  rounded-xl transition-all duration-300 group
                      ${
                        isCollapsed
                          ? "lg:px-2 lg:py-2 lg:justify-center px-4 py-2"
                          : "px-4 py-2"
                      }
                      ${
                        isActive
                          ? "bg-slate-300 text-slate-900 shadow-lg transform scale-105"
                          : "hover:bg-[#354137] hover:transform hover:translate-x-1 text-white"
                      }
                    `}
                    title={isCollapsed ? "الطلبات" : ""}
                  >
                    <div
                      className={`flex items-center justify-center rounded-lg bg-[#354137] group-hover:bg-[#6c8570] transition-colors ${
                        isCollapsed
                          ? "lg:w-8 lg:h-8 lg:ml-0 w-8 h-8 ml-3"
                          : "w-8 h-8 ml-3"
                      }`}
                    >
                      <i className="fas fa-shopping-cart text-sm text-white"></i>
                    </div>
                    {!isCollapsed && (
                      <span className="font-medium lg:block hidden">
                        الطلبات
                      </span>
                    )}
                    {/* Mobile always shows text */}
                    <span className="font-medium lg:hidden block">الطلبات</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/package-orders"
                    onClick={closeMobileMenu}
                    className={({ isActive }) => `
                      flex items-center  rounded-xl transition-all duration-300 group
                      ${
                        isCollapsed
                          ? "lg:px-2 lg:py-2 lg:justify-center px-4 py-2"
                          : "px-4 py-2"
                      }
                      ${
                        isActive
                          ? "bg-slate-300 text-slate-900 shadow-lg transform scale-105"
                          : "hover:bg-[#354137] hover:transform hover:translate-x-1 text-white"
                      }
                    `}
                    title={isCollapsed ? "طلبات الباقات" : ""}
                  >
                    <div
                      className={`flex items-center justify-center rounded-lg bg-[#354137] group-hover:bg-[#6c8570] transition-colors ${
                        isCollapsed
                          ? "lg:w-8 lg:h-8 lg:ml-0 w-8 h-8 ml-3"
                          : "w-8 h-8 ml-3"
                      }`}
                    >
                      <i className="fas fa-shopping-cart text-sm text-white"></i>
                    </div>
                    {!isCollapsed && (
                      <span className="font-medium lg:block hidden">
                        طلبات الباقات
                      </span>
                    )}
                    {/* Mobile always shows text */}
                    <span className="font-medium lg:hidden block">طلبات الباقات</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/packages"
                    onClick={closeMobileMenu}
                    className={({ isActive }) => `
                      flex items-center  rounded-xl transition-all duration-300 group
                      ${
                        isCollapsed
                          ? "lg:px-2 lg:py-2 lg:justify-center px-4 py-2"
                          : "px-4 py-2"
                      }
                      ${
                        isActive
                          ? "bg-slate-300 text-slate-900 shadow-lg transform scale-105"
                          : "hover:bg-[#354137] hover:transform hover:translate-x-1 text-white"
                      }
                    `}
                    title={isCollapsed ? "الباقات" : ""}
                  >
                    <div
                      className={`flex items-center justify-center rounded-lg bg-[#354137] group-hover:bg-[#6c8570] transition-colors ${
                        isCollapsed
                          ? "lg:w-8 lg:h-8 lg:ml-0 w-8 h-8 ml-3"
                          : "w-8 h-8 ml-3"
                      }`}
                    >
                      <i className="fas fa-box text-sm text-white"></i>
                    </div>
                    {!isCollapsed && (
                      <span className="font-medium lg:block hidden">
                        الباقات
                      </span>
                    )}
                    {/* Mobile always shows text */}
                    <span className="font-medium lg:hidden block">الباقات</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/menus"
                    onClick={closeMobileMenu}
                    className={({ isActive }) => `
                      flex items-center  rounded-xl transition-all duration-300 group
                      ${
                        isCollapsed
                          ? "lg:px-2 lg:py-2 lg:justify-center px-4 py-2"
                          : "px-4 py-2"
                      }
                      ${
                        isActive
                          ? "bg-slate-300 text-slate-900 shadow-lg transform scale-105"
                          : "hover:bg-[#354137] hover:transform hover:translate-x-1 text-white"
                      }
                    `}
                    title={isCollapsed ? "قائمة الطعام" : ""}
                  >
                    <div
                      className={`flex items-center justify-center rounded-lg bg-[#354137] group-hover:bg-[#6c8570] transition-colors ${
                        isCollapsed
                          ? "lg:w-8 lg:h-8 lg:ml-0 w-8 h-8 ml-3"
                          : "w-8 h-8 ml-3"
                      }`}
                    >
                      <i className="fas fa-utensils text-sm text-white"></i>
                    </div>
                    {!isCollapsed && (
                      <span className="font-medium lg:block hidden">
                        قائمة الطعام
                      </span>
                    )}
                    {/* Mobile always shows text */}
                    <span className="font-medium lg:hidden block">قائمة الطعام</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/contact-us"
                    onClick={closeMobileMenu}
                    className={({ isActive }) => `
                      flex items-center  rounded-xl transition-all duration-300 group
                      ${
                        isCollapsed
                          ? "lg:px-2 lg:py-2 lg:justify-center px-4 py-2"
                          : "px-4 py-2"
                      }
                      ${
                        isActive
                          ? "bg-slate-300 text-slate-900 shadow-lg transform scale-105"
                          : "hover:bg-[#354137] hover:transform hover:translate-x-1 text-white"
                      }
                    `}
                    title={isCollapsed ? "التواصل" : ""}
                  >
                    <div
                      className={`flex items-center justify-center rounded-lg bg-[#354137] group-hover:bg-[#6c8570] transition-colors ${
                        isCollapsed
                          ? "lg:w-8 lg:h-8 lg:ml-0 w-8 h-8 ml-3"
                          : "w-8 h-8 ml-3"
                      }`}
                    >
                      <i className="fas fa-envelope text-sm text-white"></i>
                    </div>
                    {!isCollapsed && (
                      <span className="font-medium lg:block hidden">
                        التواصل
                      </span>
                    )}
                    {/* Mobile always shows text */}
                    <span className="font-medium lg:hidden block">التواصل</span>
                  </NavLink>
                </li>
                {/* <li>
                  <NavLink
                    to="/settings"
                    onClick={closeMobileMenu}
                    className={({ isActive }) => `
                      flex items-center  rounded-xl transition-all duration-300 group
                      ${
                        isCollapsed
                          ? "lg:px-2 lg:py-2 lg:justify-center px-4 py-2"
                          : "px-4 py-2"
                      }
                      ${
                        isActive
                          ? "bg-slate-300 text-slate-900 shadow-lg transform scale-105"
                          : "hover:bg-[#354137] hover:transform hover:translate-x-1 text-white"
                      }
                    `}
                    title={isCollapsed ? "الإعدادات" : ""}
                  >
                    <div
                      className={`flex items-center justify-center rounded-lg bg-[#354137] group-hover:bg-[#6c8570] transition-colors ${
                        isCollapsed
                          ? "lg:w-8 lg:h-8 lg:ml-0 w-8 h-8 ml-3"
                          : "w-8 h-8 ml-3"
                      }`}
                    >
                      <i className="fas fa-cog text-sm text-white"></i>
                    </div>
                    {!isCollapsed && (
                      <span className="font-medium lg:block hidden">
                        الإعدادات
                      </span>
                    )}
                
                    <span className="font-medium lg:hidden block">الإعدادات</span>
                  </NavLink>
                </li> */}
              </ul>
            </nav>

            {/*  Logout Section */}
            <div
              className={`border-t border-slate-600/30  bg-[#6c8570] transition-all duration-300 ${
                isCollapsed ? "lg:p-2 p-4" : "p-4"
              }`}
            >
              {/* Logout Button */}
              <button
                onClick={logout}
                className={`flex items-center justify-center  bg-[#354137] hover:bg-slate-300 text-white hover:text-slate-900 font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 group ${
                  isCollapsed
                    ? "lg:w-10 lg:h-10 lg:p-0 w-full px-4 py-3"
                    : "w-full px-4 py-3"
                }`}
                title={isCollapsed ? "تسجيل الخروج" : ""}
              >
                {!isCollapsed && (
                  <span className="ml-2 lg:block hidden">تسجيل الخروج</span>
                )}
                {/* Mobile always shows text */}
                <span className="ml-2 lg:hidden block">تسجيل الخروج</span>
                <i className="fas fa-sign-out-alt transform scale-x-[-1] group-hover:translate-x-1 transition-transform"></i>
              </button>
            </div>
          </aside>
        </>
      )}
    </>
  );
}

export default Sidebar;

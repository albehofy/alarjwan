import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthStore";
import { NavLink } from "react-router-dom";
import useGetData from "../../Hooks/useGetData";

function Home() {
  const { userData } = useContext(AuthContext);

  const quickActions = [
    {
      title: "إضافة باقة جديدة",
      description: "أنشئ باقة جديدة في مطعمك",
      icon: "fa-plus-circle",
      link: "/packages/add",
      color: "from-[#354137] to-[#6c8570]",
    },
    {
      title: "إدارة الطلبات",
      description: "عرض وتعديل جميع الطلبات الموجودة",
      icon: "fa-th-large",
      link: "/orders",
      color: "from-slate-500 to-slate-600",
    },
    {
      title: "إدارة طلبات الباقات",
      description: "عرض وتعديل جميع طلبات الباقات الموجودة",
      icon: "fa-th-large",
      link: "/package-orders",
      color: "from-slate-500 to-slate-600",
    },
    {
      title: "إدارة رسائل التواصل",
      description: "عرض  جميع رسائل التواصل الموجودة",
      icon: "fa-envelope",
      link: "/contact-us",
      color: "from-[#16247e] to-[#574f85]",
    },
  ];

  const {
    dataList: homeData,
    isLoading,
  } = useGetData("/api/Home");

  // state للسلايدر
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === homeData.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? homeData.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="p-4">
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-[#354137] to-[#6c8570] rounded-2xl p-3  text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div className="text-center m-auto lg:m-0">
              <h1 className="text-xl lg:text-3xl font-bold mb-2">
                مرحباً بك في لوحة التحكم
              </h1>
              <p className="text-lg opacity-90">إدارة شاملة لمطعم الأرجوان</p>
            </div>
            <div className="hidden lg:block">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <i className="fas fa-store text-3xl text-white"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <i className="fas fa-bolt text-[#354137] ml-2"></i>
          إجراءات سريعة
        </h2>
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 lg:gap-6">
          {quickActions.map((action, index) => (
            <NavLink
              key={index}
              to={action.link}
              className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 group"
            >
              <div className="text-center">
                <div
                  className={`w-10 h-10 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow`}
                >
                  <i className={`fas ${action.icon} text-white text-xl`}></i>
                </div>
                <h3 className="font-bold text-gray-800 mb-2 group-hover:text-[#3d7246] transition-colors">
                  {action.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {action.description}
                </p>
              </div>
            </NavLink>
          ))}
        </div>
      </div>

      {/* home data */}
      <h2 className="text-lg font-bold bg-[#6c8570] text-white/95 mb-6 w-[300px] min-w-[300px] m-auto p-2 text-center rounded">
        بيانات الصفحة الرئيسية
      </h2>
      <div className="mb-6">
        <NavLink
          to="/home/add"
          className="px-6 py-3 bg-[#6c8570] hover:bg-[#354137] text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 font-medium"
        >
          <i className="fas fa-plus ml-2"></i>
          إضافة بيانات
        </NavLink>
      </div>

      {isLoading ? (
        // Loading State
        <div className="bg-white rounded-2xl p-12 text-center shadow-xl">
          <div className="w-24 h-24 bg-[#96b89c] rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <i className="fas fa-spinner fa-spin text-3xl text-[#354137]"></i>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            جاري تحميل بيانات الصفحة الرئيسية...
          </h3>
          <p className="text-gray-600">يرجى الانتظار لحظة...</p>
        </div>
      ) : homeData && Object.keys(homeData).length > 0 ? (
        // home data card
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl mx-auto">
          {/* Slider */}
          <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden">
            <img
              src={homeData.images[currentIndex]}
              alt={`slide-${currentIndex}`}
              className="w-full h-full object-cover transition-all duration-500"
            />

            {/* Controls */}
            <button
              onClick={prevSlide}
              className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
            >
            ❯
            </button>
            <button
              onClick={nextSlide}
              className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
              >
              ❮
            </button>

            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
              {homeData.images.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-3 h-3 rounded-full ${
                    idx === currentIndex ? "bg-[#354137]" : "bg-gray-400"
                  }`}
                ></div>
              ))}
            </div>
          </div>

          {/* Card Body */}
          <div className="p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {homeData.header}
            </h3>
            <h4 className="text-lg text-[#354137] font-semibold mb-3">
              {homeData.title}
            </h4>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {homeData.description}
            </p>
          </div>
        </div>
      ) : (
        // Empty State
        <div className="bg-white rounded-2xl p-12 text-center shadow-xl">
          <div className="w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-th-large text-3xl text-gray-400"></i>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            لا توجد بيانات متاحة
          </h3>
        </div>
      )}
    </div>
  );
}

export default Home;

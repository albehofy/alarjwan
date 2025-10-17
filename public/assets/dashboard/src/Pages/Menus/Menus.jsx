import { NavLink } from "react-router-dom";
import useGetData from "../../Hooks/useGetData";
import { useState } from "react";

import useDelete from "../../Hooks/useDelete";

function Packages() {
  const { dataList: menus, getDataList, isLoading } = useGetData("/api/Menus");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);

  const openModal = (packageItem) => {
    setSelectedPackage(packageItem);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPackage(null);
  };

  const { deleteItem } = useDelete();

  const handleDeleteMenu = async (menuId) => {
    const result = await deleteItem("/api/Menus", menuId);
    if (result) {
      getDataList();
    }
  };

  const handleDeleteCategory = async (catId) => {
    const result = await deleteItem(`/api/Menus/category`, catId);
    if (result) {
      getDataList();
    }
  };
  const handleDeleteItem = async (itemId) => {
    const result = await deleteItem(`/api/Menus/item`, itemId);
    if (result) {
      getDataList();
    }
  };

  return (
    <>
      <div className="p-4">
        {/* Header Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-[#354137] to-[#6c8570] rounded-2xl p-3 text-white shadow-xl">
            <div className="text-center">
              <h1 className="text-xl lg:text-3xl font-bold mb-2">
                إدارة قائمة الطعام
              </h1>
              <p className="text-purple-100 opacity-90">
                قم بإدارة وتنظيم قائمة الطعام الخاصة بك
              </p>
            </div>
            <div className="flex justify-center mt-4">
              <div className="flex space-x-1 space-x-reverse">
                <div className="w-3 h-1 bg-[#2e3f31] rounded-full"></div>
                <div className="w-6 h-1 bg-[#cde6d1] rounded-full"></div>
                <div className="w-3 h-1 bg-[#2e3f31] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="mb-6">
            <NavLink
              to="/menus/add"
              className="px-6 py-3 bg-[#6c8570] hover:bg-[#354137] text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 font-medium"
            >
              <i className="fas fa-plus ml-2"></i> إضافة قائمة
            </NavLink>
          </div>
          <div className="mb-6">
            <NavLink
              to="/categories/add"
              className="px-6 py-3 bg-[#6c8570] hover:bg-[#354137] text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 font-medium"
            >
              <i className="fas fa-plus ml-2"></i> إضافة قسم
            </NavLink>
          </div>
          <div className="mb-6">
            <NavLink
              to="/items/add"
              className="px-6 py-3 bg-[#6c8570] hover:bg-[#354137] text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 font-medium"
            >
              <i className="fas fa-plus ml-2"></i> إضافة عناصر القسم
            </NavLink>
          </div>
        </div>

        {/* menus Content */}
        {isLoading ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-xl">
            <div className="w-24 h-24 bg-[#96b89c]   rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <i className="fas fa-spinner fa-spin text-3xl text-[#354137]"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              جاري تحميل قائمة الطعام...
            </h3>
            <p className="text-gray-600">يرجى الانتظار لحظة...</p>
          </div>
        ) : menus && menus.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menus.map((menuItem, index) => (
              <div
                key={menuItem.id || index}
                className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300"
              >
                {/* Package Image */}
                <img
                  src={menuItem.image}
                  alt={menuItem.name}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                  onError={(e) => {
                    e.target.src = "/placeholder-image.jpg";
                  }}
                />

                {/* Package Basic Info */}
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-right mb-2">
                    {menuItem.menuName}
                  </h3>
                  <button onClick={() => handleDeleteMenu(menuItem.id)}>
                    <i
                      className="fas fa-trash-alt text-red-500 ml-2"
                      title="حذف القائمة"
                    ></i>
                  </button>
                </div>

                {/* <button 
                  onClick={() => openModal(packageItem)} 
                  className="p-1 bg-[#6c8570] text-white rounded-lg hover:bg-[#354137] transition duration-300"
                >
                  تعديل الباقة
                </button> */}

                {/* Sections */}
                {menuItem.menu && menuItem.menu.length > 0 && (
                  <div className="space-y-4 mb-4">
                    <h4 className="text-lg font-bold text-right border-b border-gray-200 pb-2">
                      الأقسام:
                    </h4>
                    {menuItem.menu.map((menu, menuIndex) => (
                      <div
                        key={menuIndex}
                        className="bg-[#e6f4e8] rounded-lg p-3"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="font-semibold text-right">
                            {menu.name}
                          </h5>
                          <button
                            onClick={() => {
                              handleDeleteCategory( menu.id);
                            }}
                          >
                            <i
                              className="fas fa-trash-alt text-red-500 ml-2"
                              title="حذف القسم"
                            ></i>
                          </button>
                        </div>
                        <p className="text-sm text-gray-600 text-right mb-3">
                          {menu.description || "لا يوجد وصف"}
                        </p>

                        {/* Addons */}
                        {menu.items && menu.items.length > 0 && (
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-right">
                              عناصر القسم:
                            </p>
                            {menu.items.map((men, menIndex) => (
                              <div
                                key={menIndex}
                                className="relative flex flex-col items-center space-y-3  bg-white rounded p-1"
                              >
                                <button
                                  className="absolute top-1 left-1"
                                  onClick={() =>
                                    handleDeleteItem(men.id)
                                  }
                                >
                                  <i
                                    className="fas fa-trash-alt text-red-500 ml-2"
                                    title="حذف الطعام"
                                  ></i>
                                </button>
                                <img
                                  src={men.image}
                                  alt={men.name}
                                  className="w-32 h-32  object-cover rounded"
                               
                                />
                                <span className="text-sm  ">
                                  {men.name}
                                </span>
                                <p className="text-green-600  font-semibold">
                                  السعر: {men.price} ريال
                                </p>
                                <p className="">
                                  وصف الطعام: {men.description || "لا يوجد وصف"}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center shadow-xl">
            <div className="w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-th-large text-3xl text-gray-400"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              لا توجد قائمة متاحة
            </h3>
          </div>
        )}
      </div>

      {/* Modal for Editing Package */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full mx-4 relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
            <h2 className="text-2xl font-bold text-right mb-4">تعديل الباقة</h2>
            <EditePackage packageData={selectedPackage} onClose={closeModal} />
          </div>
        </div>
      )}
    </>
  );
}

export default Packages;

import { NavLink } from "react-router-dom";
import useGetData from "../../Hooks/useGetData";
import { useState } from "react";
import EditePackage from "./EditePackage";
import useDelete from "../../Hooks/useDelete";

function Packages() {
  const {
    dataList: packages,
    getDataList,
    isLoading,
  } = useGetData("/api/Packages");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const openModal = (packageItem) => {
    setSelectedPackage(packageItem);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPackage(null);
  };

  const { deleteItem } = useDelete();

  const handleDeletePackage = async (packId) => {
    const result = await deleteItem("/api/Packages", packId);
    if (result) {
      getDataList();
    }
  };

  const handleDeleteSection = async (packId, secId) => {
    const result = await deleteItem(`/api/Packages/${packId}/sections`, secId);
    if (result) {
      getDataList();
    }
  };
  const handleDeleteAddon = async (packId, addonId) => {
    const result = await deleteItem(`/api/Packages/${packId}/addons`, addonId);
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
                إدارة الباقات
              </h1>
              <p className="text-purple-100 opacity-90">
                قم بإدارة وتنظيم الباقات
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
              to="/packages/add"
              className="px-6 py-3 bg-[#6c8570] hover:bg-[#354137] text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 font-medium"
            >
              <i className="fas fa-plus ml-2"></i> إضافة باقة
            </NavLink>
          </div>
          <div className="mb-6">
            <NavLink
              to="/sections/add"
              className="px-6 py-3 bg-[#6c8570] hover:bg-[#354137] text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 font-medium"
            >
              <i className="fas fa-plus ml-2"></i> إضافة قسم
            </NavLink>
          </div>
          <div className="mb-6">
            <NavLink
              to="/addons/add"
              className="px-6 py-3 bg-[#6c8570] hover:bg-[#354137] text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 font-medium"
            >
              <i className="fas fa-plus ml-2"></i> إضافة عناصر القسم
            </NavLink>
          </div>
        </div>

        {/* Packages Content */}
        {isLoading ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-xl">
            <div className="w-24 h-24 bg-[#96b89c]   rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <i className="fas fa-spinner fa-spin text-3xl text-[#354137]"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              جاري تحميل الباقات...
            </h3>
            <p className="text-gray-600">يرجى الانتظار لحظة...</p>
          </div>
        ) : packages && packages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((packageItem, index) => (
              <div
                key={packageItem.id || index}
                className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300"
              >
                {/* Package Image */}
                <img
                  src={packageItem.image}
                  alt={packageItem.name}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                  onError={(e) => {
                    e.target.src = "/placeholder-image.jpg";
                  }}
                />

                {/* Package Basic Info */}
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-right mb-2">
                    {packageItem.name}
                  </h3>
                  <button onClick={() => handleDeletePackage(packageItem.id)}>
                    <i
                      className="fas fa-trash-alt text-red-500 ml-2"
                      title="حذف الباقة"
                    ></i>
                  </button>
                </div>
                <p className="text-gray-600 text-right mb-2">
                  {packageItem.details || "لا يوجد وصف"}
                </p>
                <p className="text-green-600 font-semibold text-right mb-4">
                  السعر: {packageItem.price} ريال
                </p>
                {/* <button 
                  onClick={() => openModal(packageItem)} 
                  className="p-1 bg-[#6c8570] text-white rounded-lg hover:bg-[#354137] transition duration-300"
                >
                  تعديل الباقة
                </button> */}

                {/* Sections */}
                {packageItem.sections && packageItem.sections.length > 0 && (
                  <div className="space-y-4 mb-4">
                    <h4 className="text-lg font-bold text-right border-b border-gray-200 pb-2">
                      الأقسام:
                    </h4>
                    {packageItem.sections.map((section, secIndex) => (
                      <div
                        key={secIndex}
                        className="bg-[#e6f4e8] rounded-lg p-3"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="font-semibold text-right">
                            {section.name}
                          </h5>
                          <button
                            onClick={() => {
                              handleDeleteSection(packageItem.id, section.id);
                            }}
                          >
                            <i
                              className="fas fa-trash-alt text-red-500 ml-2"
                              title="حذف القسم"
                            ></i>
                          </button>
                          <span className="text-sm text-gray-500">
                            الحد الأقصى: {section.limit || 0}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 text-right mb-3">
                          {section.description  || "لا يوجد وصف"}
                        </p>

                        {/* Addons */}
                        {section.addons && section.addons.length > 0 && (
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-right">
                              عناصر القسم:
                            </p>
                            {section.addons.map((addon, addIndex) => (
                              <div
                                key={addIndex}
                                className="relative flex items-center space-x-3 space-x-reverse bg-white rounded p-1"
                              >
                                <button
                                className="absolute top-1 left-1"
                                  onClick={() =>
                                    handleDeleteAddon(packageItem.id , addon.id)
                                  }
                                >
                                  <i
                                    className="fas fa-trash-alt text-red-500 ml-2"
                                    title="حذف الوجبة"
                                  ></i>
                                </button>
                                <img
                                  src={addon.image}
                                  alt={addon.recipeName}
                                  className="w-32 h-32 object-cover rounded"
                                  onError={(e) => {
                                    e.target.src = "/placeholder-addon.jpg";
                                  }}
                                />
                                <span className="text-sm text-right">
                                  {addon.recipeName}
                                </span>
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
              لا توجد باقات متاحة
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

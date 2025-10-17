import { useNavigate } from "react-router-dom";
import useCreateData from "../../Hooks/useCreateData";
import { useState } from "react";

function AddPackages() {
  const navigate = useNavigate();
 

  // Initialize the hook with initial form data and endpoint
  const {
    isLoading,
    formRef,
    handleInputChange,
    handleSubmit,
  } = useCreateData(
    {
      Name: "",
      Details: "",
      Price: "",
      ImageFile:"",
    },
    "/api/Packages"
  );

  // Handle form submission
  const submitPackage = async (e) => {
    const success = await handleSubmit(e);
   
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="bg-gradient-to-r from-[#354137] to-[#6c8570] rounded-2xl p-3 text-white shadow-xl">
          <div className="text-center">
            <h1 className="text-xl lg:text-3xl font-bold mb-2">
              إضافة باقة جديدة
            </h1>
          </div>
          <div className="flex justify-center mt-4">
               <div className="flex space-x-1 space-x-reverse">
                <div className="w-3 h-1 bg-[#2e3f31] rounded-full"></div>
                <div className="w-6 h-1  bg-[#cde6d1] rounded-full"></div>
                <div className="w-3 h-1 bg-[#2e3f31] rounded-full"></div>
              </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6">
          <form ref={formRef} className="space-y-6" onSubmit={submitPackage}>
            {/* Name Input */}
            <div className="space-y-2">
              <label
                htmlFor="Name"
                className="flex items-center text-sm font-bold text-gray-700"
              >
                <i className="fas fa-th-large text-[#6c8570] ml-2"></i>
                اسم الباقة
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="Name"
                  name="Name"
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-4 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none  focus:border-[#6c8570] focus:ring-2 focus:ring-[#bac5bb] transition-all duration-300 text-gray-900 placeholder-gray-400"
                  placeholder="أدخل اسم الباقة"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <i className="fas fa-tag"></i>
                </div>
              </div>
              <p className="text-sm text-gray-500 flex items-center">
                <i className="fas fa-info-circle text-[#6c8570] ml-2"></i>
                اختر اسماً واضحاً ومميزاً للباقة
              </p>
            </div>

            {/* Details Input */}
            <div className="space-y-2">
              <label
                htmlFor="Details"
                className="flex items-center text-sm font-bold text-gray-700"
              >
                <i className="fas fa-info text-[#6c8570] ml-2"></i>
                تفاصيل الباقة
              </label>
              <div className="relative">
                <textarea
                  id="Details"
                  name="Details"
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#6c8570] focus:ring-2 focus:ring-[#bac5bb] transition-all duration-300 text-gray-900 placeholder-gray-400"
                  placeholder="أدخل تفاصيل الباقة"
                  rows="4"
                />
              </div>
              <p className="text-sm text-gray-500 flex items-center">
                <i className="fas fa-info-circle text-[#6c8570] ml-2"></i>
                أدخل وصفاً موجزاً للباقة
              </p>
            </div>

            {/* Price Input */}
            <div className="space-y-2">
              <label
                htmlFor="Price"
                className="flex items-center text-sm font-bold text-gray-700"
              >
                <i className="fas fa-dollar-sign text-[#6c8570] ml-2"></i>
                السعر
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="Price"
                  name="Price"
                  onChange={handleInputChange}
                
                  required
                  className="w-full px-4 py-4 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#6c8570] focus:ring-2 focus:ring-[#bac5bb] transition-all duration-300 text-gray-900 placeholder-gray-400"
                  placeholder="أدخل السعر"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <i className="fas fa-money-bill"></i>
                </div>
              </div>
              <p className="text-sm text-gray-500 flex items-center">
                <i className="fas fa-info-circle text-[#6c8570] ml-2"></i>
                أدخل السعر بالريال
              </p>
            </div>

            {/* Image Input */}
            <div className="space-y-2">
              <label
                htmlFor="ImageFile"
                className="flex items-center text-sm font-bold text-gray-700"
              >
                <i className="fas fa-image text-[#6c8570] ml-2"></i>
                صورة الباقة
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="ImageFile"
                  name="ImageFile"
                  onChange={handleInputChange}
                  accept="image/*"
                  required
                  className="w-full px-4 py-4 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#6c8570] focus:ring-2 focus:ring-[#bac5bb] transition-all duration-300 text-gray-900 placeholder-gray-400"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <i className="fas fa-upload"></i>
                </div>
              </div>
              <p className="text-sm text-gray-500 flex items-center">
                <i className="fas fa-info-circle text-[#6c8570] ml-2"></i>
                اختر صورة تعبر عن محتوى الباقة
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-[#6c8570] hover:bg-[#354137] text-white py-2 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <>
                    <i className="fas fa-spinner fa-spin ml-2"></i>
                    جاري الإضافة...
                  </>
                ) : (
                  <>
                    <i className="fas fa-plus ml-2"></i>
                    إضافة
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate("/packages")}
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
              >
                <i className="fas fa-arrow-right ml-2"></i>
                العودة للقائمة
              </button>
            </div>
          </form>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-t border-gray-100">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center">
            <i className="fas fa-lightbulb text-yellow-500 ml-2"></i>
            نصائح مفيدة
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div className="flex items-start">
              <i className="fas fa-check-circle text-green-500 ml-2 mt-0.5"></i>
              <span>استخدم أسماء واضحة وبسيطة للباقات</span>
            </div>
            <div className="flex items-start">
              <i className="fas fa-check-circle text-green-500 ml-2 mt-0.5"></i>
              <span>تجنب استخدام أسماء مكررة للباقات</span>
            </div>
            <div className="flex items-start">
              <i className="fas fa-check-circle text-green-500 ml-2 mt-0.5"></i>
              <span>اختر أسماء تعبر عن محتوى الباقة</span>
            </div>
            <div className="flex items-start">
              <i className="fas fa-check-circle text-green-500 ml-2 mt-0.5"></i>
              <span>تأكد من إدخال تفاصيل وسعر   الباقة  </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPackages;

import { useNavigate } from "react-router-dom";
import useCreateData from "../../Hooks/useCreateData";
import { useState } from "react";
import useGetData from "../../Hooks/useGetData";

function AddCategory() {
  const navigate = useNavigate();
  const [menuId, setMenuId] = useState(0); // State to hold the package ID

  // Initialize the hook with initial form data and endpoint
  const { isLoading, formRef, handleInputChange, handleSubmit } = useCreateData(
    {
      Name: "",
      ImageFile: "",
      Description: "",
      MenuId: "",
    },
    `/api/Menus/category`
  );
  const { dataList: menus } = useGetData("/api/Menus");

  // Handle form submission
  const submitCategory = async (e) => {
    const success = await handleSubmit(e);
  
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="bg-gradient-to-r from-[#354137] to-[#6c8570] rounded-2xl p-3 text-white shadow-xl">
          <div className="text-center">
            <h1 className="text-xl lg:text-3xl font-bold mb-2">
              إضافة قسم داخل القائمة
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
          <form ref={formRef} className="space-y-6" onSubmit={submitCategory}>
            <div className="space-y-2">
              <label
                htmlFor="MenuId"
                className="flex items-center text-sm font-bold text-gray-700"
              >
                <i className="fas fa-th-large text-[#6c8570] ml-2"></i>
                القائمة
              </label>
              <select
                className="w-full px-4 py-4 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none  focus:border-[#6c8570] focus:ring-2 focus:ring-[#bac5bb] transition-all duration-300 text-gray-900 placeholder-gray-400"
                name="MenuId"
                id="MenuId"
                defaultValue={0}
                onChange={(e) => {
                  setMenuId(e.target.value);
                  handleInputChange(e);
                }}
              >
                <option value={0} hidden disabled>
                  اختر قائمة
                </option>
                {menus.map((menu) => (
                  <option key={menu.id} value={menu.id}>
                    {menu.menuName}
                  </option>
                ))}
              </select>
            </div>
            {/* Name Input */}
            <div className="space-y-2">
              <label
                htmlFor="Name"
                className="flex items-center text-sm font-bold text-gray-700"
              >
                <i className="fas fa-th-large text-[#6c8570] ml-2"></i>
                اسم القسم
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="Name"
                  name="Name"
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-4 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none  focus:border-[#6c8570] focus:ring-2 focus:ring-[#bac5bb] transition-all duration-300 text-gray-900 placeholder-gray-400"
                  placeholder="أدخل اسم القسم"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <i className="fas fa-tag"></i>
                </div>
              </div>
              <p className="text-sm text-gray-500 flex items-center">
                <i className="fas fa-info-circle text-[#6c8570] ml-2"></i>
                اختر اسماً واضحاً ومميزاً للقسم
              </p>
            </div>

            {/* Description Input */}
            <div className="space-y-2">
              <label
                htmlFor="Description"
                className="flex items-center text-sm font-bold text-gray-700"
              >
                <i className="fas fa-info text-[#6c8570] ml-2"></i>
                وصف القسم
              </label>
              <div className="relative">
                <textarea
                  id="Description"
                  name="Description"
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#6c8570] focus:ring-2 focus:ring-[#bac5bb] transition-all duration-300 text-gray-900 placeholder-gray-400"
                  placeholder="أدخل وصف القسم"
                />
              </div>
              <p className="text-sm text-gray-500 flex items-center">
                <i className="fas fa-info-circle text-[#6c8570] ml-2"></i>
                أدخل وصفاً موجزاً للقسم
              </p>
            </div>

            {/* Image Input */}
            <div className="space-y-2">
              <label
                htmlFor="ImageFile"
                className="flex items-center text-sm font-bold text-gray-700"
              >
                <i className="fas fa-image text-[#6c8570] ml-2"></i>
                صورة القسم
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
                اختر صورة تعبر عن محتوى القسم
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

        {/* <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-t border-gray-100">
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
              <span>تأكد من إدخال تفاصيل وسعر الباقة </span>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default AddCategory;

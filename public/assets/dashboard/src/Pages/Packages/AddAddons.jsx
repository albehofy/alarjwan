import { useNavigate } from "react-router-dom";
import useCreateData from "../../Hooks/useCreateData";
import { useContext, useEffect, useState } from "react";
import useGetData from "../../Hooks/useGetData";
import axios from "axios";

import { AuthContext } from "../../Context/AuthStore";

function AddAddons() {
  const navigate = useNavigate();
    const { accessToken } = useContext(AuthContext);

  const [packageId, setPackageId] = useState(0); // State to hold the package ID
  const [sectionId, setSectionId] = useState(0); // State to hold the section ID
  const [sections, setSections] = useState([]); // State to hold sections of the selected package

  // Initialize the hook with initial form data and endpoint
  const { isLoading, formRef, handleInputChange, handleSubmit } = useCreateData(
    {
      RecipeName: "",
      ImageFile: "",
      PackageId: "",
      SectionId: 0,
    },
    `/api/Packages/${packageId}/sections/${sectionId}/addons`
  );
  const { dataList: packages } = useGetData("/api/Packages");
  const getPackagesSections = async () => {
    if (packageId) {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/Packages/${packageId}/sections` ,
        {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setSections(data);
    }
  };
  useEffect(() => {
    getPackagesSections();
  }, [packageId]);

  // Handle form submission
  const submitAddon = async (e) => {
    const success = await handleSubmit(e);
  
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="bg-gradient-to-r from-[#354137] to-[#6c8570] rounded-2xl p-3 text-white shadow-xl">
          <div className="text-center">
            <h1 className="text-xl lg:text-3xl font-bold mb-2">
              إضافة وجبة داخل القسم
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
          <form ref={formRef} className="space-y-6" onSubmit={submitAddon}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="PackageId"
                  className="flex items-center text-sm font-bold text-gray-700"
                >
                  <i className="fas fa-th-large text-[#6c8570] ml-2"></i>
                  الباقة
                </label>
                <select
                  className="w-full px-4 py-4 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none  focus:border-[#6c8570] focus:ring-2 focus:ring-[#bac5bb] transition-all duration-300 text-gray-900 placeholder-gray-400"
                  name="PackageId"
                  id="PackageId"
                  defaultValue={0}
                  onChange={(e) => {
                    setPackageId(e.target.value);
                    handleInputChange(e);
                  }}
                >
                  <option value={0} hidden disabled>
                    اختر باقة
                  </option>
                  {packages.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="SectionId"
                  className="flex items-center text-sm font-bold text-gray-700"
                >
                  <i className="fas fa-th-large text-[#6c8570] ml-2"></i>
                  القسم
                </label>
                <select
                  className="w-full px-4 py-4 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none  focus:border-[#6c8570] focus:ring-2 focus:ring-[#bac5bb] transition-all duration-300 text-gray-900 placeholder-gray-400"
                  name="SectionId"
                  id="SectionId"
                  defaultValue={0}
                  onChange={(e) => {
                    setSectionId(e.target.value);
                    handleInputChange(e);
                  }}
                >
                  <option value={0} hidden disabled>
                    اختر قسم
                  </option>
                  {sections.map((sec) => (
                    <option key={sec.id} value={sec.id}>
                      {sec.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* Name Input */}
            <div className="space-y-2">
              <label
                htmlFor="RecipeName"
                className="flex items-center text-sm font-bold text-gray-700"
              >
                <i className="fas fa-th-large text-[#6c8570] ml-2"></i>
                اسم الوجبة
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="RecipeName"
                  name="RecipeName"
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-4 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none  focus:border-[#6c8570] focus:ring-2 focus:ring-[#bac5bb] transition-all duration-300 text-gray-900 placeholder-gray-400"
                  placeholder="أدخل اسم الوجبة"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <i className="fas fa-tag"></i>
                </div>
              </div>
              <p className="text-sm text-gray-500 flex items-center">
                <i className="fas fa-info-circle text-[#6c8570] ml-2"></i>
                اختر اسماً واضحاً للوجبة
              </p>
            </div>

            {/* Image Input */}
            <div className="space-y-2">
              <label
                htmlFor="ImageFile"
                className="flex items-center text-sm font-bold text-gray-700"
              >
                <i className="fas fa-image text-[#6c8570] ml-2"></i>
                صورة الوجبة
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
                اختر صورة تعبر عن الوجبة
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

       
      </div>
    </div>
  );
}

export default AddAddons;

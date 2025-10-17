import { useNavigate } from "react-router-dom";
import useCreateData from "../../Hooks/useCreateData";
import { useState, useEffect } from "react";

function AddHomeData() {
  const navigate = useNavigate();
  const [imageInputs, setImageInputs] = useState([0]); // Array to track file inputs
  const [imagePreviews, setImagePreviews] = useState([]); // Store image previews

  // Initialize the hook with initial form data and endpoint
  const {
    isLoading,
    formRef,
    handleInputChange,
    handleArrayInput,
    handleSubmit,
  } = useCreateData(
    {
      header: "",
      Title: "",
      Description: "",
      ImageFiles: [], // Array to store multiple files
    },
    "/api/Home"
  );

  // Handle adding a new file input
  const addImageInput = () => {
    setImageInputs((prev) => [...prev, prev.length]);
  };

  // Handle removing a file input
  const removeImageInput = (index) => {
    setImageInputs((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    handleArrayInput("ImageFiles", (prevFiles) =>
      prevFiles.filter((_, i) => i !== index)
    );
  };

  // Handle file selection for a specific input
  const handleFileChange = (index, e) => {
    const file = e.target.files[0]; // Take only the first file
    if (file) {
      // Update form data with the new file
      handleArrayInput("ImageFiles", (prevFiles) => {
        const newFiles = [...prevFiles];
        newFiles[index] = file;
        return newFiles;
      });

      // Update image previews
      const newPreviews = [...imagePreviews];
      newPreviews[index] = URL.createObjectURL(file);
      setImagePreviews(newPreviews);
    }
  };

  // Handle form submission
  const submitHomeData = async (e) => {
    e.preventDefault();
    const success = await handleSubmit(e);
   
  };

  // Clean up object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [imagePreviews]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="bg-gradient-to-r from-[#354137] to-[#6c8570] rounded-2xl p-3 text-white shadow-xl">
          <div className="text-center">
            <h1 className="text-xl lg:text-3xl font-bold mb-2">
              إضافة بيانات جديدة
            </h1>
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

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6">
          <form ref={formRef} className="space-y-6" onSubmit={submitHomeData}>
            {/* Header */}
            <div className="space-y-2">
              <label
                htmlFor="header"
                className="flex items-center text-sm font-bold text-gray-700"
              >
                <i className="fas fa-th text-[#6c8570] ml-2"></i>
                العنوان الأساسي
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="header"
                  name="header"
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-4 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#6c8570] focus:ring-2 focus:ring-[#bac5bb] transition-all duration-300 text-gray-900 placeholder-gray-400"
                  placeholder="أدخل العنوان الأساسي"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <i className="fas fa-tag"></i>
                </div>
              </div>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <label
                htmlFor="Title"
                className="flex items-center text-sm font-bold text-gray-700"
              >
                <i className="fas fa-th-large text-[#6c8570] ml-2"></i>
                العنوان الفرعي
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="Title"
                  name="Title"
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-4 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#6c8570] focus:ring-2 focus:ring-[#bac5bb] transition-all duration-300 text-gray-900 placeholder-gray-400"
                  placeholder="أدخل العنوان الفرعي"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <i className="fas fa-tag"></i>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label
                htmlFor="Description"
                className="flex items-center text-sm font-bold text-gray-700"
              >
                <i className="fas fa-info text-[#6c8570] ml-2"></i>
                الوصف
              </label>
              <div className="relative">
                <textarea
                  id="Description"
                  name="Description"
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#6c8570] focus:ring-2 focus:ring-[#bac5bb] transition-all duration-300 text-gray-900 placeholder-gray-400"
                  placeholder="أدخل الوصف"
                />
              </div>
            </div>

            {/* Image Files */}
            <div className="space-y-2">
              <label
                className="flex items-center text-sm font-bold text-gray-700"
              >
                <i className="fas fa-image text-[#6c8570] ml-2"></i>
                الصور
              </label>
              {imageInputs.map((inputId, index) => (
                <div key={inputId} className="flex items-center space-x-2 space-x-reverse">
                  <input
                    type="file"
                    id={`ImageFiles-${index}`}
                    name={`ImageFiles`}
                    onChange={(e) => handleFileChange(index, e)}
                    accept="image/*"
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#6c8570] focus:ring-2 focus:ring-[#bac5bb] transition-all duration-300 text-gray-900"
                  />
                  {imageInputs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImageInput(index)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addImageInput}
                className="bg-[#6c8570] hover:bg-[#354137] text-white py-1 px-2 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <i className="fas fa-plus ml-2"></i>
                إضافة صورة أخرى
              </button>
              {/* Image Previews */}
              {imagePreviews.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {imagePreviews.map((preview, index) => (
                    <img
                      key={index}
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg shadow-md"
                    />
                  ))}
                </div>
              )}
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
                onClick={() => navigate("/")}
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

export default AddHomeData;
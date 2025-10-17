import { useContext, useRef, useState } from "react";
import { AuthContext } from "../Context/AuthStore";
import { toast } from "sonner";
import axios from "axios";

function useUpdateData(initialData = {}, endPoint) {
  const { accessToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const formRef = useRef(null);

  // Function to handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Function to handle array inputs (like size and color)
  const handleArrayInput = (name, values) => {
    setFormData((prev) => ({
      ...prev,
      [name]: values,
    }));
  };

  // Function to send updated data to API
  const sendUpdateToAPI = async (id, additionalData = {}) => {
    setIsLoading(true);
    const url = `${import.meta.env.VITE_API_URL}${endPoint}/${id}`;
    console.log(url);

    // Merge formData with additional data (like sizes, colors, images)
    const mergedData = { ...formData, ...additionalData };

    // Check if we have files or if we need FormData
    const hasFiles = additionalData.images && additionalData.images.length > 0;

    let dataToSend;
    let headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    if (hasFiles) {
      // Create FormData for file upload
      dataToSend = new FormData();

      // Append all form data
      Object.keys(mergedData).forEach((key) => {
        if (key === "images") {
          // Handle image files
          if (mergedData[key] && mergedData[key].length > 0) {
            mergedData[key].forEach((file) => {
              dataToSend.append("images", file);
            });
          }
        } else if (Array.isArray(mergedData[key])) {
          // Handle arrays (size, color)
          mergedData[key].forEach((item) => {
            dataToSend.append(`${key}[]`, item);
          });
        } else if (mergedData[key] !== null && mergedData[key] !== undefined) {
          dataToSend.append(key, mergedData[key]);
        }
      });

      // Let browser set Content-Type for FormData
      headers["Content-Type"] = "multipart/form-data";
    } else {
      // Regular JSON data
      dataToSend = mergedData;
      headers["Content-Type"] = "application/json";
    }

    console.log(
      "Data being sent:",
      hasFiles ? "FormData (see network tab)" : dataToSend
    );

    try {
      const { data } = await axios.put(url, dataToSend, { headers });
      console.log("Response:", data);
      toast.success("تم التحديث بنجاح.");
      if (formRef.current) {
        formRef.current.reset();
      }
      setIsLoading(false);
      return true; // Return success indicator
    } catch (error) {
      setIsLoading(false);
      console.log("Error:", error);
      toast.error(error.response?.data?.message || "حدث خطأ ما");
      return false; // Return failure indicator
    }
  };

  // Function to handle form submit
  const handleSubmit = async (e, id, additionalData = {}) => {
    e.preventDefault();
    return await sendUpdateToAPI(id, additionalData);
  };

  return {
    // State
    isLoading,
    formRef,
    formData,
    setFormData,

    // Form handlers
    handleInputChange,
    handleArrayInput,

    // API functions
    sendUpdateToAPI,
    handleSubmit,
  };
}

export default useUpdateData;

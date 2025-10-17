import { useContext, useRef, useState } from "react";
import { AuthContext } from "../Context/AuthStore";
import { toast } from "sonner";
import axios from "axios";

function useCreateData(initialData = {}, endPoint) {
  const { accessToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const formRef = useRef(null);

 // Function to handle input change
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      // Handle file input (single file or multiple files)
      const fileValue = files.length > 0 ? (files.length === 1 ? files[0] : Array.from(files)) : null;
      setFormData((prev) => ({
        ...prev,
        [name]: fileValue,
      }));
      console.log("Updated formData:", { ...formData, [name]: fileValue });
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      console.log("Updated formData:", { ...formData, [name]: value });
    }
  };

 
// Function to handle array inputs (e.g., ImageFiles)
  const handleArrayInput = (name, updateFunctionOrValue) => {
    setFormData((prev) => {
      const newValue =
        typeof updateFunctionOrValue === "function"
          ? updateFunctionOrValue(prev[name] || [])
          : updateFunctionOrValue;
      return {
        ...prev,
        [name]: newValue,
      };
    });
  };

  // Function to send data to API
// Function to send data to API
  const sendDataToAPI = async () => {
    setIsLoading(true);
    const url = `${import.meta.env.VITE_API_URL}${endPoint}`;
    console.log("url:", url);
    

    // Check if we need to send FormData (for file uploads)
    const hasFiles = Object.values(formData).some(
      (value) =>
        value instanceof File ||
        value instanceof FileList ||
        (Array.isArray(value) && value.length > 0 && value[0] instanceof File)
    );

    let dataToSend;

    if (hasFiles) {
      console.log("Preparing FormData for file upload");
      // Create FormData for file uploads
      dataToSend = new FormData();

      Object.keys(formData).forEach((key) => {
        const value = formData[key];

        if (value instanceof File) {
          // Handle single file (e.g., single image)
          dataToSend.append(key, value);
        } else if (value instanceof FileList) {
          // Handle FileList from input
          Array.from(value).forEach((file) => {
            dataToSend.append(key, file);
          });
        } else if (
          Array.isArray(value) &&
          value.length > 0 &&
          value[0] instanceof File
        ) {
          // Handle array of File objects
          value.forEach((file) => {
            dataToSend.append(key, file);
          });
        } else if (Array.isArray(value)) {
          // Handle regular arrays (like size, color)
          value.forEach((item) => {
            dataToSend.append(key, item);
          });
        } else if (value !== null && value !== undefined && value !== "") {
          dataToSend.append(key, value);
        }
      });

      // Log FormData contents for debugging
      console.log("FormData contents:");
      for (let [key, value] of dataToSend.entries()) {
        console.log(`${key}:`, value);
      }
    } else {
      console.log("Preparing JSON data");
      dataToSend = formData;
    }

    try {
      const { data } = await axios.post(url, dataToSend, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          ...(hasFiles ? { "Content-Type": "multipart/form-data" } : {}),
        },
      });

      toast.success("تمت الإضافة بنجاح.");
      formRef.current.reset();
      setFormData(initialData); // Reset form data to initial state
      setIsLoading(false);
      return true; // Return success status
    } catch (error) {
      setIsLoading(false);
      console.error("Error:", error);
      const errorMessage = error.response?.data?.message || "حدث خطأ ما";
      toast.error(errorMessage);
      return false; // Return failure status
    }
  };
  
  // Function to handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    return await sendDataToAPI();
  };

  return {
    // State
    isLoading,
    formRef,
    formData,

    // Form handlers
    handleInputChange,
    handleArrayInput,

    // API functions
    sendDataToAPI,
    handleSubmit,
  };
}

export default useCreateData;

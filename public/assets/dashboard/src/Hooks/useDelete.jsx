import { useContext } from "react";
import { AuthContext } from "../Context/AuthStore";
import { toast } from "sonner";
import axios from "axios";

function useDelete() {
  const { accessToken } = useContext(AuthContext);

  const deleteItem = async (fullUrl, itemId) => {
    if (!confirm("هل أنت متأكد من الحذف؟")) {
      return false;
    }

    const url = `${import.meta.env.VITE_API_URL}${fullUrl}/${itemId}`;
    try {
      await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      toast.success("تم الحذف بنجاح.");
      return true;
    } catch (error) {
      console.log(error);
      toast.error("حدث خطأ ما.");
      return false;
    }
  };

  return { deleteItem };
}

export default useDelete;

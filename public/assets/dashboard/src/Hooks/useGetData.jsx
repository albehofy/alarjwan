import { useContext, useState, useEffect, useCallback } from "react";
import { AuthContext } from "../Context/AuthStore";
import { toast } from "sonner";
import axios from "axios";


function useGetData(endPoint) {
  const { accessToken } = useContext(AuthContext);
  const [dataList, setDataList] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const buildUrl = useCallback(
    (page = 1) => {
      let baseUrl = `${import.meta.env.VITE_API_URL}${endPoint}`;
      baseUrl += `?page=${page}`;
      return baseUrl;
    },
    [endPoint]
  );
  const getDataList = async (page = 1) => {
    const url = buildUrl(page);
    console.log(url);

    setIsLoading(true);
    try {
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
        console.log(data);

      setDataList(data?.data || data );

      //   setPagination(data?.meta || null); // Assuming `meta` contains pagination info
      //   setCurrentPage(page);
    } catch (error) {
      console.log(error);
      toast.error("حدث خطأ ما ");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // setCurrentPage(1);
    getDataList();
  }, []);

  const handlePageChange = (page) => {
    getDataList(page);
  };
  return {
    dataList,
    pagination,
    currentPage,
    isLoading,
    getDataList,
    handlePageChange,
  };
}

export default useGetData;

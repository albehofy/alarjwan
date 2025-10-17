import { useState, useEffect, useRef, useContext } from "react";
import useGetData from "../../Hooks/useGetData";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { AuthContext } from "../../Context/AuthStore";
import Pagination from "../../Components/Pagination";

function PaidPackages() {
  const [b, setB] = useState(0);
  const { accessToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true); // New state for loading
  const [filterState, setFilterState] = useState(); // New state for filtering by order state
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    totalCount: 0,
  });

  // Store newState for each order using an object
  const [orders, setOrders] = useState([]);
  const [orderStates, setOrderStates] = useState({});
  const a = useRef(null);

  const checkOrders = () => {
    setB((prevB) => prevB + 1);
    a.current = window.setInterval(() => {
      setB((prevB) => prevB + 1);
    }, 10000);
  };

  // Uncomment and fix the useEffect if needed
  // useEffect(() => {
  //   checkOrders(); // Start interval on mount
  //   return () => {
  //     clearInterval(a.current); // Clear interval on unmount
  //   };
  // }, []);
  //get normal orders
  // const {
  //   dataList: orders,
  //   getDataList: getOrders,
  //   isLoading,
  // } = useGetData("/api/Orders");
  const handleFilterChange = (e) => {
    setFilterState(e.target.value);
  };
  const getOrders = async (page = 1) => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/api/PaidPackages?state=${filterState}&page=${page}&pageSize=${
          pagination.pageSize
        }`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setIsLoading(false);
      console.log(data);
      setOrders(data);
      setPagination({
        page: data.page,
        pageSize: data.pageSize,
        totalCount: data.totalCount,
      });
    } catch (error) {
      setIsLoading(false);
      toast.error("حدث خطأ ما.");
    }
  };
  useEffect(() => {
    getOrders();
  }, [filterState]);

  const handlePageChange = (newPage) => {
    if (
      newPage >= 1 &&
      newPage <= Math.ceil(pagination.totalCount / pagination.pageSize)
    ) {
      getOrders(newPage);
    }
  };

  const changePaidPakageOrderState = async (orderId, newState) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/PaidPackages/${orderId}`,
        {
          state: newState,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      toast.success("تم تحديث حالة الطلب بنجاح.");

      getOrders(); // refresh paid packages
    } catch (error) {
      console.error(error);
      toast.error("حدث خطأ ما.");
    }
  };

  // Handle select change for a specific order and update immediately
  const handleStateChange = (orderId, value) => {
    setOrderStates((prev) => ({
      ...prev,
      [orderId]: value, // Update the newState for the specific order
    }));
    changePaidPakageOrderState(orderId, value); // Call the API to update the state
  };

  return (
    <div className="p-4">
      {/* Header Section */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-[#354137] to-[#6c8570] rounded-2xl p-3 text-white shadow-xl">
          <div className="text-center">
            <h1 className="text-xl lg:text-3xl font-bold mb-2">
              إدارة طلبات الباقات
            </h1>
            <p className="text-purple-100 opacity-90">
              قم بإدارة وتنظيم طلبات الباقات
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
      {/* Filter Select
      <div className="mb-6 flex justify-center space-x-4 space-x-reverse">
        <select
          value={filterState}
          onChange={handleFilterChange}
          className="px-12 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#6c8570] focus:ring-2 focus:ring-[#bac5bb] transition-all duration-300 text-gray-900 bg-white cursor-pointer"
        >
          <option value="all">كل الحالات</option>
          <option value="Pending">قيد الانتظار</option>
          <option value="Processing">جاري الإعداد </option>
          <option value="Done">مكتمل</option>
        </select>
      </div> */}
      <Pagination
        currentPage={pagination.page}
        pagination={pagination}
        handlePageChange={handlePageChange}
      />
      {/* Orders Content */}
      {isLoading ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-xl">
          <div className="w-24 h-24 bg-[#96b89c]   rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <i className="fas fa-spinner fa-spin text-3xl text-[#354137]"></i>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            جاري تحميل الطلبات...
          </h3>
          <p className="text-gray-600">يرجى الانتظار لحظة...</p>
        </div>
      ) : orders && orders.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders?.map((order, index) => (
              <div
                key={order.id || index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {/* Card Header */}
                <div className="flex justify-center mb-2">
                  <div className="w-6 h-6 bg-[#637359] rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                </div>

                {/* Card Body */}
                <div className="space-y-4">
                  <p className="text-gray-600">
                    <span className="font-medium text-gray-800">الاسم:</span>{" "}
                    {order?.customerName}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium text-gray-800">العنوان:</span>{" "}
                    {order?.address}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium text-gray-800">الهاتف:</span>{" "}
                    {order?.phoneNumber}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium text-gray-800">الباقة:</span>{" "}
                    {order?.package.name}
                  </p>
                  <p className="text-gray-600 bg-[#e0ebe3] rounded p-1">
                    <span className="font-medium text-gray-800">
                      السعر الإجمالي :{" "}
                    </span>
                    {order?.package.price}
                    <span className="text-gray-600"> ريال</span>
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium text-gray-800">الحالة:</span>{" "}
                    {order.state === "Pending"
                      ? "قيد الانتظار"
                      : order.state === "Processing"
                      ? "جار الإعداد"
                      : order.state === "Done"
                      ? "مكتمل"
                      : "تم الإلغاء"}
                  </p>

                  {/* Items Details */}
                  <div className="mt-4">
                    <h4 className="font-bold text-lg text-center text-gray-800 mb-2">
                      تفاصيل الطلب:
                    </h4>
                    {order?.selectedAddons?.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="bg-[#e0ebe3] rounded-lg p-1 my-3"
                      >
                        <ul className="list-disc list-inside mb-5">
                          <li className="text-gray-700">
                            <span className="font-medium">اسم الوجبة : </span>{" "}
                            {item.recipeName}
                          </li>
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* State Selection */}
                  <div>
                    <select
                      name="newState"
                      value={orderStates[order.id] || order.state} // Use the stored state or fallback to current order state
                      onChange={(e) =>
                        handleStateChange(order.id, e.target.value)
                      }
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#6c8570] focus:ring-2 focus:ring-[#bac5bb] transition-all duration-300 text-gray-900 bg-white appearance-none cursor-pointer"
                    >
                      <option value="Pending">قيد الانتظار</option>
                      <option value="Processing">جار الإعداد</option>
                      <option value="Done">مكتمل</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 text-center shadow-xl">
          <div className="w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-th-large text-3xl text-gray-400"></i>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            لا توجد طلبات متاحة
          </h3>
        </div>
      )}
    </div>
  );
}

export default PaidPackages;

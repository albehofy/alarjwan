import { NavLink } from "react-router-dom";
import useGetData from "../../Hooks/useGetData";
import useDelete from "../../Hooks/useDelete";

function ContactUs() {
  const {
    dataList: messages,
    getDataList,
    isLoading,
  } = useGetData("/api/Message");

  
  const { deleteItem } = useDelete();

  const handleDeleteMessage = async (messageId) => {
    const result = await deleteItem("/api/Message", messageId);
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
                إدارة التواصل
              </h1>
              <p className="text-purple-100 opacity-90">
                قم بإدارة وتنظيم رسائل التواصل
              </p>
            </div>

            {/* Decorative elements */}
            <div className="flex justify-center mt-4">
              <div className="flex space-x-1 space-x-reverse">
                <div className="w-3 h-1 bg-[#2e3f31] rounded-full"></div>
                <div className="w-6 h-1  bg-[#cde6d1] rounded-full"></div>
                <div className="w-3 h-1 bg-[#2e3f31] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="mb-6">
          <NavLink
            to="/packages/add"
            className="px-6 py-3 bg-gradient-to-r from-[#354137] to-slate-700 hover:from-purple-700 hover:to-[#6c8570] text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 font-medium"
          >
            <i className="fas fa-plus ml-2"></i>
            إضافة باقة
          </NavLink>
        </div> */}

        {/* messages Content */}
        {isLoading ? (
          // Loading State
          <div className="bg-white rounded-2xl p-12 text-center shadow-xl">
            <div className="w-24 h-24 bg-[#96b89c]   rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <i className="fas fa-spinner fa-spin text-3xl text-[#354137]"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              جاري تحميل رسائل التواصل...
            </h3>
            <p className="text-gray-600">يرجى الانتظار لحظة...</p>
          </div>
        ) : messages && messages.length > 0 ? (
          <>
            {/* Desktop Table View */}
            <div className=" bg-white rounded-2xl shadow-xl overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#96b89c]">
                  <tr>
                    <th className="px-6 py-4  text-sm font-bold  border-b border-gray-200">
                      #
                    </th>
                    <th className="px-6 py-4  text-sm font-bold  border-b border-gray-200">
                      تاريخ الإنشاء
                    </th>
                    <th className="px-6 py-4  text-sm font-bold  border-b border-gray-200">
                      الاسم
                    </th>
                    <th className="px-6 py-4  text-sm font-bold  border-b border-gray-200">
                      الإيميل
                    </th>
                    <th className="px-6 py-4  text-sm font-bold  border-b border-gray-200">
                      الهاتف
                    </th>
                    <th className="px-6 py-4  text-sm font-bold  border-b border-gray-200 min-w-[200px]">
                      الرسالة
                    </th>
                    <th className="px-6 py-4  text-sm font-bold  border-b border-gray-200">
                      حذف
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {messages.map((messageItem, index) => (
                    <tr
                      key={messageItem.id || index}
                      className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-transparent transition-all duration-300"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-[#96b89c] rounded-full flex items-center justify-center font-bold text-sm">
                            {index + 1}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(messageItem.createdAtUtc).toLocaleDateString(
                          "ar-EG"
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {messageItem.fullName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {messageItem.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {messageItem.phoneNumber}
                      </td>
                      <td className="px-6 py-4">{messageItem.messageText}</td>
                      <td className="px-6 py-4">
                         <button onClick={() => handleDeleteMessage(messageItem.id)}>
                    <i
                      className="fas fa-trash-alt text-red-500 ml-2"
                      title="حذف الرسالة"
                    ></i>
                  </button>
                      </td>

                      {/* <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex justify-center space-x-3 space-x-reverse">
                        <NavLink
                          to={`/packages/edit/${category.categoryId}`}
                          className="w-9 h-9 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                          title="تعديل"
                        >
                          <i className="fas fa-edit text-sm"></i>
                        </NavLink>
                        <button
                          onClick={() => handleDelete(category.categoryId)}
                          disabled={deletingId === category.categoryId}
                          className="w-9 h-9 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                          title="حذف"
                        >
                          {deletingId === category.categoryId ? (
                            <i className="fas fa-spinner fa-spin text-sm"></i>
                          ) : (
                            <i className="fas fa-trash text-sm"></i>
                          )}
                        </button>
                      </div>
                    </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          // Empty State
          <div className="bg-white rounded-2xl p-12 text-center shadow-xl">
            <div className="w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-th-large text-3xl text-gray-400"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              لا توجد رسائل متاحة
            </h3>
          </div>
        )}
      </div>
    </>
  );
}

export default ContactUs;

import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-purple-50/30 to-slate-100 px-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-slate-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative text-center max-w-2xl mx-auto">
        {/* Error Illustration */}
        <div className="mb-8">
          <div className="w-28 h-28 bg-gradient-to-r from-[#354137] to-[#6c8570] rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <i className="fas fa-exclamation-triangle text-4xl text-white"></i>
          </div>

          {/* Large 404 text */}
          <div className="text-8xl  font-black text-transparent bg-clip-text bg-gradient-to-r from-[#354137] to-[#6c8570] mb-4">
            404
          </div>
        </div>

        {/* Error Content */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            الصفحة غير موجودة
          </h1>

          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            عذراً، يبدو أن الصفحة التي تبحث عنها غير موجودة أو تم نقلها إلى موقع
            آخر.
          </p>

          {/* Decorative line */}
          <div className="flex justify-center mb-6">
            <div className="flex space-x-1 space-x-reverse">
              <div className="w-2 h-1 bg-purple-400 rounded-full"></div>
              <div className="w-4 h-1 bg-purple-600 rounded-full"></div>
              <div className="w-2 h-1 bg-purple-400 rounded-full"></div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#354137] to-[#6c8570] hover:from-purple-700 hover:to-slate-900 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
            >
              <i className="fas fa-home ml-2"></i>
              العودة إلى الرئيسية
            </Link>

            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
            >
              <i className="fas fa-arrow-right ml-2"></i>
              العودة للخلف
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;

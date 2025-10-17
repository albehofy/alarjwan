import axios from "axios";
import Joi from "joi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import logo from "/src/assets/logo.jpeg";
export default function Login({ saveUserData }) {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const sendLoginDataToApi = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/Account/login`,
        user
      );
      console.log(res);

      if (res.data.accessToken) {
        setIsLoading(false);
        sessionStorage.setItem("userToken", res.data.accessToken);
        sessionStorage.setItem("refreshToken", res.data.refreshToken);

        saveUserData();
        toast.success("تم تسجيل الدخول بنجاح.");
        navigate("/");
      } else {
        setIsLoading(false);
        toast.error("البريد الإلكتروني أو كلمة المرور غير صحيحة", {
          position: "bottom-center",
        });
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("البريد الإلكتروني أو كلمة المرور غير صحيحة", {
        position: "bottom-center",
      });
    }
  };
  const validateLoginFrom = () => {
    const schema = Joi.object({
      username: Joi.string().required().messages({
        "string.empty": " أدخل اسم المستخدم ",
      }),
      password: Joi.string().required().messages({
        "string.empty": " أدخل كلمة السر ",
      }),
    });
    return schema.validate(user, { abortEarly: false });
  };

  const submitLoginForm = (e) => {
    setIsLoading(true);
    e.preventDefault();

    let validation = validateLoginFrom();
    if (!validation.error) {
      sendLoginDataToApi();
    } else {
      setIsLoading(false);
      try {
        validation.error.details.map((err) => {
          toast.error(err.message, {
            position: "bottom-center",
          });
        });
      } catch (e) {
        toast.error("حدث خطأ ما عند تسجيل الدخول");
      }
    }
  };
  return (
    <>
      <div className="min-h-screen  bg-gradient-to-r from-[#354137] to-[#e2eee5] p-2 space-y-4 md:p-0 grid grid-cols-1 md:grid-cols-2 items-center justify-between">
        <div className="text-center m-auto">
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 border-2 border-[#354137] rounded-full flex items-center justify-center bg-white shadow-xl">
              <i className="fa-solid fa-user text-6xl text-[#354137]"></i>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-[#354137] mb-5">
            مرحبًا بك في لوحة التحكم
          </h2>
          <p className="text-center font-medium">
            يرجى إدخال بياناتك لتسجيل الدخول إلى لوحة التحكم الخاصة بك.
          </p>
        </div>

        <div className="shadow-lg w-full mx-auto max-w-lg bg-white rounded-xl p-5">
          <div className="flex flex-col items-center mb-10">
            <div className="relative mb-6">
              <div className="w-44 rounded-full bg-gradient-to-r from-[#e2eee5] to-[#354137] flex items-center justify-center shadow-lg">
                <img
                  src={logo}
                  alt="logo"
                  className="w-28 h-28 rounded-full object-cover border-2 border-white"
                />
              </div>
            </div>
            <h2 className="text-xl font-bold text-[#354137] pb-3  text-center">
              تسجيل الدخول
            </h2>
            <div className="flex justify-center space-x-1 space-x-reverse mb-4">
              <div className="w-2 h-1 bg-[#98bb9e] rounded-full"></div>
              <div className="w-4 h-1 bg-[#6c8570] rounded-full"></div>
              <div className="w-5 h-1 bg-[#354137] rounded-full"></div>
            </div>
          </div>
          <form onSubmit={submitLoginForm} className="space-y-5">
            <div>
              <label
                htmlFor="username"
                className="flex items-center gap-2 text-[#354137] mb-2 font-medium"
              >
                <i className="fa-solid fa-user text-[#354137]"></i>
                اسم المستخدم
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="block w-full border-2 border-[#98bb9e] rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#6c8570] focus:border-[#6c8570] transition-all duration-200 bg-[#6c8570]/10"
                  name="username"
                  id="username"
                  onChange={handleInputChange}
                  autoComplete="username"
                  placeholder="اسم المستخدم"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="flex items-center gap-2 text-[#354137] mb-2 font-medium"
              >
                <i className="fa-solid fa-lock text-[#354137]"></i>
                كلمة السر
              </label>
              <div className="relative">
                <input
                  type="password"
                  className="block w-full border-2 border-[#98bb9e] rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#6c8570] focus:border-[#6c8570] transition-all duration-200 bg-[#6c8570]/10"
                  name="password"
                  id="password"
                  onChange={handleInputChange}
                  autoComplete="current-password"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <button
              className="rounded-lg py-3 bg-gradient-to-r from-[#354137] to-[#6c8570] text-white w-full hover:from-[#6c8570] hover:to-[#354137] transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <i className="fa-solid fa-spinner fa-spin"></i>
                  <span>جاري تسجيل الدخول...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <i className="fa-solid fa-sign-in-alt"></i>
                  <span>تسجيل الدخول</span>
                </div>
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import BackIcon from "../assets/ic_arrow_back.svg";
import LoginIc from "../assets/login_ic.svg";
import { useAuthStore } from "../store/auth";
import { LoginPost, LoginResponse } from "../types/responses/Login";
import { useMutation } from "@tanstack/react-query";
import { ErrorResponse } from "../types/responses/Error";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../services/api";
import { useState } from "react";
export const Route = createFileRoute("/login")({
  component: LoginComponent,
  beforeLoad: ({ context }) => {
    const token = context.auth.token;
    if (token && context.auth.validateToken()) {
      throw redirect({ to: "/dashboard" });
    }
  },
});

function LoginComponent() {
  const navigate = useNavigate();
  const auth = useAuthStore();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPost>();
  const { mutate } = useMutation({
    mutationFn: async (data: LoginPost) => {
      const response = await api.post<LoginResponse>("/auth", data);
      console.log(response);
      return response.data;
    },
    onSuccess: (data: LoginResponse) => {
      auth.setToken(data.token);
      auth.setUser(data.user);
      toast.success("Login berhasil!", {
        closeButton: false,
      });
      setTimeout(() => {
        navigate({ to: "/dashboard" });
      }, 2000);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      // if (error.response?.status === 400) {
      const errorMessage =
        error.response?.data?.message ||
        "Login gagal. Periksa kembali username dan password!";

      toast.error(errorMessage, {
        closeButton: false,
      });
      setLoading(false);
      // }
    },
  });
  function submitForm(data: LoginPost) {
    setLoading(true);
    mutate(data);
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-white font-poppins oveflow-hidden">
      <div className="max-w-lg p-4 overflow-hidden text-center md:h-auto sm:h-screen lg:h-auto xl:h-auto mt-4">
        {/* Header Section */}
        <div className="flex items-center justify-between gap-2 px-2 mb-12">
          <button onClick={() => navigate({ to: "/" })} type="button">
            <img src={BackIcon} alt="Back Icon" width={30} height={30} />
          </button>
          <p>Masuk Akun</p>
        </div>

        {/* Login Illustration */}
        <div className="flex items-center justify-center mb-6">
          <img src={LoginIc} alt="Login" width={300} height={300} />
        </div>

        <h1 className="mb-6 text-2xl font-bold text-gray-800">
          Masuk ke Aplikasi
        </h1>
        <p className="w-3/4 px-2 mx-auto text-sm text-center text-gray-600">
          Masukan informasi pengguna Anda di bawah ini untuk melanjutkan
        </p>

        {/* Form Section */}
        <form className="px-4" onSubmit={handleSubmit(submitForm)}>
          {/* Username Input */}
          <div className="mb-2">
            <label
              htmlFor="username"
              className="flex mb-2 text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Username"
              {...register("username", { required: "Username harus diisi" })}
              className={`w-full p-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#205295]  ${errors.username ? "border border-red-500 focus:ring-red-500 focus:ring-1" : "border"}`}
            />
            {errors.username && (
              <p className="mt-2 text-sm text-left text-red-500">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-2">
            <label
              htmlFor="password"
              className="flex mb-2 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Masukan Password"
              {...register("password", { required: "Password harus diisi" })}
              className={`w-full p-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#205295] ${errors.password ? "border border-red-500 focus:ring-red-500 focus:ring-1" : "border"}`}
            />
            {errors.password && (
              <p className="mt-2 text-sm text-left text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-8 font-medium text-white transition bg-primary rounded-3xl hover:bg-primary/80 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Masuk"}
          </button>
        </form>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default LoginComponent;

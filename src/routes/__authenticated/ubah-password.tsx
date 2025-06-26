import {
  createFileRoute,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import BackIcon from "../../assets/ic_arrow_back.svg";
import ChangePasswordIC from "../../assets/ic_ubah_password.png";
import {
  UbahPasswordSchema,
  UbahPasswordType,
} from "../../types/requests/ubah-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ubahPsaswordUpload } from "../../queries/ubah-password";
import { useAuthStore } from "../../store/auth";
export const Route = createFileRoute("/__authenticated/ubah-password")({
  component: RouteComponent,
});

type PasswordVisibility = {
  old: boolean;
  new: boolean;
  confirm: boolean;
};

function RouteComponent() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = useAuthStore();
  const router = useRouter();
  const [visible, setVisible] = useState<PasswordVisibility>({
    old: false,
    new: false,
    confirm: false,
  });

  const toggleVisibility = (key: keyof PasswordVisibility) => {
    setVisible((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UbahPasswordType>({
    resolver: zodResolver(UbahPasswordSchema),
  });

  const onSubmit = async (data: UbahPasswordType) => {
    setLoading(true);

    try {
      await ubahPsaswordUpload(data);
      toast.success("Password Berhasil Diperbarui", { closeButton: false });
      setTimeout(async () => {
        auth.logout();
        router.invalidate();
        localStorage.clear();
        await navigate({ to: "/login" });
        window.location.reload();
      }, 2000);
    } catch (error: any) {
      toast.error(error.message || "Gagal Mengubah Password", {
        closeButton: false,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen overflow-hidden bg-white font-poppins">
      <div className="max-w-lg p-4 overflow-hidden text-center">
        {/* Header Section */}
        <div className="flex items-center justify-between gap-2 px-2 mb-6">
          <button onClick={() => navigate({ to: "/akun" })} type="button">
            <img src={BackIcon} alt="Back Icon" width={30} height={30} />
          </button>
          <p>Ubah Password</p>
        </div>

        {/* Profile Illustration */}
        <div className="flex items-center justify-center mb-6">
          <img src={ChangePasswordIC} alt="Profile" width={200} height={200} />
        </div>

        <h1 className="mb-2 text-2xl font-bold text-gray-800">
          Perbarui Password
        </h1>
        <p className="w-3/4 px-2 mx-auto text-sm text-center text-gray-600">
          Ubah pengaturan kata sandi anda silahkan masukkan kata sandi baru
        </p>

        {/* Form Section */}
        <form className="px-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="relative mb-4">
            <label className="block mb-2 text-sm font-medium text-left text-gray-700">
              Masukkan Password Lama
            </label>
            <input
              id="password_lama"
              {...register("password_lama", { required: true })}
              type={visible.old ? "text" : "password"}
              className={`w-full p-3 pr-10 rounded-lg border focus:outline-none focus:ring-1 focus:ring-[#205295] ${
                errors.password_lama
                  ? "border border-red-500 focus:ring-red-500 focus:ring-1"
                  : "border"
              }`}
            />
            <button
              type="button"
              onClick={() => toggleVisibility("old")}
              className="btn-eye-password"
            >
              <i
                className={`ph ${visible.old ? "ph-eye" : "ph-eye-slash"}`}
              ></i>
            </button>
          </div>
          {errors.password_lama && (
            <p className="my-2 text-xs text-left text-red-500">
              {errors.password_lama.message}
            </p>
          )}

          {/* Password Baru */}
          <div className="relative mb-4">
            <label className="block mb-2 text-sm font-medium text-left text-gray-700">
              Masukkan Password Baru
            </label>
            <input
              id="password_baru"
              {...register("password_baru", { required: true })}
              type={visible.new ? "text" : "password"}
              className={`w-full p-3 pr-10 rounded-lg border focus:outline-none focus:ring-1 focus:ring-[#205295] ${
                errors.password_baru
                  ? "border border-red-500 focus:ring-red-500 focus:ring-1"
                  : "border"
              }`}
            />
            <button
              type="button"
              onClick={() => toggleVisibility("new")}
              className="btn-eye-password"
            >
              <i
                className={`ph ${visible.new ? "ph-eye" : "ph-eye-slash"}`}
              ></i>
            </button>
          </div>
          {errors.password_baru && (
            <p className="my-2 text-xs text-left text-red-500">
              {errors.password_baru.message}
            </p>
          )}

          {/* Konfirmasi Password Baru */}
          <div className="relative mb-4">
            <label className="block mb-2 text-sm font-medium text-left text-gray-700">
              Konfirmasi Password Baru
            </label>
            <input
              id="konfirmasi_password_baru"
              {...register("konfirmasi_password_baru", { required: true })}
              type={visible.confirm ? "text" : "password"}
              className={`w-full p-3 pr-10 rounded-lg border focus:outline-none focus:ring-1 focus:ring-[#205295] ${
                errors.konfirmasi_password_baru
                  ? "border border-red-500 focus:ring-red-500 focus:ring-1"
                  : "border"
              }`}
            />
            <button
              type="button"
              onClick={() => toggleVisibility("confirm")}
              className="btn-eye-password"
            >
              <i
                className={`ph ${visible.confirm ? "ph-eye" : "ph-eye-slash"}`}
              ></i>
            </button>
          </div>
          {errors.konfirmasi_password_baru && (
            <p className="my-2 text-xs text-left text-red-500">
              {errors.konfirmasi_password_baru.message}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 mt-4 font-medium text-white transition bg-primary rounded-3xl hover:bg-primary/80 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Menyimpan..." : "Simpan"}
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
      {/* {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-bold text-center">
              Konfirmasi Ubah Password
            </h2>
            <p className="mt-2 text-sm text-center text-gray-600">
              Apakah anda yakin ingin mengubah password?
            </p>
            <div className="flex justify-between mt-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md"
                onClick={() => setIsModalOpen(false)}
              >
                Batal
              </button>
              <button
                className="px-4 py-2 text-white rounded-md bg-redCustom hover:bg-redCustom/80"
                onClick={handleLogout}
              >
                
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}

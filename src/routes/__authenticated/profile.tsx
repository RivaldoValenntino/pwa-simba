import {
  createFileRoute,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import BackIcon from "../../assets/ic_arrow_back.svg";
import ProfileIc from "../../assets/ic_profile_interface.svg";
import { ubahProfileUpload } from "../../queries/ubah-profile";
import {
  profileUpdateRequest,
  ProfileUpdateRequest,
} from "../../types/requests/ubah-profile";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../../store/auth";
import { toast, ToastContainer } from "react-toastify";
export const Route = createFileRoute("/__authenticated/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const auth = useAuthStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileUpdateRequest>({
    resolver: zodResolver(profileUpdateRequest),
  });

  const onSubmit = async (data: ProfileUpdateRequest) => {
    setLoading(true);
    setErrorMessage("");

    try {
      await ubahProfileUpload(data);
      toast.success("Profil Berhasil Diperbarui", { closeButton: false });
      auth.logout();
      router.invalidate();
      localStorage.clear();
      await navigate({ to: "/login" });
      window.location.reload();
    } catch (error: any) {
      setErrorMessage(error.message || "Terjadi kesalahan");
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
          <p>Ganti Profil</p>
        </div>

        {/* Profile Illustration */}
        <div className="flex items-center justify-center mb-6">
          <img src={ProfileIc} alt="Profile" width={200} height={200} />
        </div>

        <h1 className="mb-2 text-2xl font-bold text-gray-800">
          Perbarui Profil
        </h1>
        <p className="w-3/4 px-2 mx-auto text-sm text-center text-gray-600">
          Ubah informasi profil Anda. Pastikan data yang Anda input sudah
          sesuai.
        </p>
        {errorMessage && (
          <p className="mt-2 mb-4 text-sm text-left text-red-500">
            {errorMessage}
          </p>
        )}

        {/* Form Section */}
        <form className="px-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Nama Lengkap */}
          <div className="mb-2">
            <label
              htmlFor="nama"
              className="block mb-2 text-sm font-medium text-left text-gray-700"
            >
              Nama Lengkap
            </label>
            <input
              id="nama"
              type="text"
              defaultValue={auth.user?.nama}
              {...register("nama_lengkap")}
              className="w-full p-3 rounded-lg border focus:outline-none focus:ring-1 focus:ring-[#205295]"
            />
            {errors.nama_lengkap && (
              <p className="mt-2 text-xs text-left text-red-500">
                {errors.nama_lengkap.message}
              </p>
            )}
          </div>

          {/* Nomor HP */}
          <div className="mb-2">
            <label
              htmlFor="kontak"
              className="block mb-2 text-sm font-medium text-left text-gray-700"
            >
              No HP
            </label>
            <input
              id="kontak"
              type="text"
              defaultValue={auth.user?.kontak}
              {...register("kontak")}
              className="w-full p-3 rounded-lg border focus:outline-none focus:ring-1 focus:ring-[#205295]"
            />
            {errors.kontak && (
              <p className="mt-2 text-xs text-left text-red-500">
                {errors.kontak.message}
              </p>
            )}
          </div>

          {/* Alamat */}
          <div className="mb-2">
            <label
              htmlFor="alamat"
              className="block mb-2 text-sm font-medium text-left text-gray-700"
            >
              Alamat
            </label>
            <textarea
              id="alamat"
              {...register("alamat")}
              className="w-full p-3 rounded-lg border focus:outline-none focus:ring-1 focus:ring-[#205295]"
            >
              {auth.user?.alamat}
            </textarea>
            {errors.alamat && (
              <p className="mt-2 text-xs text-left text-red-500">
                {errors.alamat.message}
              </p>
            )}
          </div>

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
    </div>
  );
}

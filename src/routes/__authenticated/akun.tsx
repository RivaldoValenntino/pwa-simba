import { useState } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { BottomNavigation } from "../../components/BottomNavigation";
import _IcUser from "../../assets/ic_user.svg";
import _IcSignOut from "../../assets/ic_sign_out.svg";
import _IcUserOutline from "../../assets/bottom-nav/person-circle-outline.svg";
import _IcEdit from "../../assets/bottom-nav/create-outline.svg";
import { useAuthStore } from "../../store/auth";
import { useNavigate } from "@tanstack/react-router";
import _IcAvatar from "../../assets/ic_akun_avatar.svg";
import { queryClient } from "../../main";
export const Route = createFileRoute("/__authenticated/akun")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const router = useRouter();
  const auth = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleLogout = async () => {
    auth.logout();
    queryClient.clear();
    router.invalidate();
    localStorage.clear();
    await navigate({ to: "/login" });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="h-48 p-6 text-center text-white bg-primary">
        <div className="relative -bottom-2">
          <h2 className="mb-4 font-semibold text-md">Informasi Akun</h2>
          <div className="absolute w-20 h-20 transform -translate-x-1/2 left-1/2">
            <img
              src={_IcAvatar}
              alt="Profile"
              className="w-20 h-20 p-1 mx-auto -mb-32 bg-white rounded-full shadow-md"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center h-full p-6 -mt-10 shadow-lg bg-secondary rounded-t-3xl">
        <div className="w-full max-w-3xl">
          <div className="mt-4 text-lg font-semibold text-center text-gray-400">
            {auth.user?.nama}
          </div>
          <div className="flex flex-col gap-4 mt-4 text-blackCust">
            <h1 className="font-semibold">Pengaturan</h1>
            <button
              className="flex items-center gap-3 p-4 font-semibold bg-white shadow-md rounded-xl hover:bg-white/30"
              onClick={() => navigate({ to: "/profile" })}
              type="button"
            >
              <img src={_IcUserOutline} alt="" />
              Ubah Profil
            </button>
            <button className="flex items-center gap-3 p-4 font-semibold bg-white shadow-md rounded-xl" onClick={() => navigate({ to: "/ubah-password" })} type='button'>
              <img src={_IcEdit} alt="" />
              Ubah Password
            </button>
          </div>
          <div className="flex flex-col gap-4 mt-8">
            <button
              className="flex items-center gap-3 p-4 text-white shadow-md bg-redCustom rounded-xl hover:bg-redCustom/80"
              onClick={() => setIsModalOpen(true)} // Buka modal
            >
              <img
                src={_IcSignOut}
                alt=""
                className="rotate-180 brightness-200"
              />
              Keluar Akun
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="mt-auto">
        <BottomNavigation />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-bold text-center">Konfirmasi Logout</h2>
            <p className="mt-2 text-sm text-center text-gray-600">
              Apakah Anda yakin ingin keluar dari akun?
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
                Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BottomNavigation } from "../../components/BottomNavigation";
import _IcUser from "../../assets/ic_user.svg";
import { CategoryCard } from "../../components/CategoryCard";
import _Building from "../../assets/building-safety/rafiki.svg";
import _CustomerSurvey from "../../assets/customer-survey/rafiki.svg";
import _CarAcc from "../../assets/car-accesories/rafiki.svg";
import _Devices from "../../assets/devices/rafiki.svg";
import _IcTodo from "../../assets/ic_todo_list.svg";
import ProgressSummary from "../../components/ProgressSummary";
import { useAuthStore } from "../../store/auth";
import { ToastContainer, toast } from "react-toastify";
import _IcAvatar from "../../assets/ic_akun_avatar.svg";
import "react-toastify/dist/ReactToastify.css";
import { dashboardQuery } from "../../queries/dashboard-query";
import { useQuery } from "@tanstack/react-query";
import DashboardSkeleton from "../../components/skeleton/DashboardSkeleton";

export const Route = createFileRoute("/__authenticated/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const periode = `${new Date().getFullYear()} - ${String(new Date().getMonth() + 1).padStart(2, "0")}`;
  const { data, isLoading, isError, refetch, isFetching } = useQuery(
    dashboardQuery(new Date().toISOString().slice(0, 10))
  );

  const categories = data?.menu_kategori_penilaian;
  const auth = useAuthStore();

  useEffect(() => {
    const isgreetingToastShow = localStorage.getItem("greetingToastShow");

    if (!isgreetingToastShow) {
      const currentHour = new Date().getHours();
      let greeting = "Selamat Pagi";

      if (currentHour >= 12 && currentHour < 18) {
        greeting = "Selamat Siang";
      } else if (currentHour >= 18 || currentHour < 5) {
        greeting = "Selamat Malam";
      }

      toast.info(`${greeting}, ${auth.user?.nama || "User"}!`, {
        position: "top-right",
        autoClose: 2000,
        closeButton: false,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      localStorage.setItem("greetingToastShow", "true");
    }
  }, []);

  if (isLoading || isFetching) {
    return <DashboardSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <p className="text-lg font-bold text-redCustom">
          Terjadi kesalahan saat memuat data.
        </p>
        <button
          className="px-4 py-2 my-4 text-sm font-bold text-white rounded bg-redCustom"
          type="button"
          onClick={() => refetch()}
        >
          Muat Ulang
        </button>
        <p className="text-sm text-gray-500">Atau silakan coba lagi nanti.</p>
        <BottomNavigation />
      </div>
    );
  }
  return (
    <div className="h-screen overflow-auto pb-28 bg-secondary">
      {/* Header */}
      <div className="flex flex-col items-center justify-between w-full h-48 px-5 py-4 text-white bg-primary rounded-b-3xl">
        <div className="flex items-center justify-center w-full max-w-3xl gap-3 mt-8">
          <img
            src={_IcAvatar}
            alt="User"
            className="w-16 h-16 p-1 bg-white rounded-full object-fit"
          />
          <div>
            <h1 className="font-bold text-md">{auth.user?.nama}</h1>
            <p className="text-sm">ID : {auth.user?.kode}</p>
          </div>
          <div className="px-3 py-1 ml-auto text-sm font-bold text-center bg-white rounded-md text-primary">
            Periode <br />
            <span className="text-md">{periode}</span>
          </div>
        </div>
      </div>

      {/* Progress Pekerjaan */}
      <div className="max-w-3xl px-5 mx-auto -mt-6">
        <div className="p-2 bg-white shadow-md rounded-xl">
          <ProgressSummary
            progress_pekerjaan={data?.progress_pekerjaan}
            total_pekerjaan_selesai_hari_ini={
              data?.total_pekerjaan_selesai_hari_ini
            }
            total_pekerjaan_hari_ini={data?.total_pekerjaan_hari_ini}
            imageSrc={_IcTodo}
          />
        </div>
      </div>

      {/* Menu Kategori Penilaian */}
      <div className="w-full max-w-3xl px-5 mx-auto mt-4">
        <h2 className="font-bold text-md">Menu Kategori Penilaian</h2>
        {categories ? (
          categories?.map((category) => (
            <CategoryCard
              key={category.id_kategori_group}
              title={category.kategori_group}
              progress={category.yang_telah_dikerjakan}
              total={category.total_pekerjaan}
              deadline={category.tenggat}
              image={category.image}
              id_kategori_group={category.id_kategori_group}
            />
          ))
        ) : (
          <p className="text-center text-gray-400">Tidak ada data</p>
        )}
      </div>

      {/* Toastr & Bottom Navigation */}
      <ToastContainer />
      <BottomNavigation />
    </div>
  );
}

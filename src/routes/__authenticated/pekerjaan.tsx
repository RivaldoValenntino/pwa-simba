import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { daftarPekerjaanQuery } from "../../queries/pekerjaan-query";
import { BottomNavigation } from "../../components/BottomNavigation";
import PekerjaanSkeleton from "../../components/skeleton/PekerjaanSkeleton";
import { JobCard } from "../../components/JobCard";

export const Route = createFileRoute("/__authenticated/pekerjaan")({
  component: RouteComponent,
  validateSearch: (search) => ({
    category: search.category ?? "0",
  }),
});

function RouteComponent() {
  const params = Route.useSearch();
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["0"]);
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch, isFetching } = useQuery(
    daftarPekerjaanQuery(selectedCategories)
  );
  const categories = data?.kategori;
  const jobs = data?.jadwal_penilaian;

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        const newCategories = prev.filter((id) => id !== categoryId);
        return newCategories.length === 0 ? ["0"] : newCategories;
      }
      return prev.includes("0")
        ? [categoryId] // Jika sebelumnya "Semua" dipilih, langsung ganti dengan kategori yang dipilih
        : [...prev, categoryId];
    });
  };

  useEffect(() => {
    if (params.category) {
      setSelectedCategories([String(params.category)]);
    }
  }, [params.category]);

  if (isLoading || isFetching) {
    return <PekerjaanSkeleton />;
  }

  if (!jobs?.length) {
    return (
      <div className="min-h-screen pb-24 bg-gray-100">
        <div className="flex flex-col justify-between w-full h-12 px-5 py-4 text-white bg-primary">
          <p className="text-center">Daftar Pekerjaan</p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2 p-4 overflow-x-auto bg-white shadow-sm">
          <button
            onClick={() => setSelectedCategories(["0"])}
            className={`px-3 py-1 text-xs font-medium border rounded-full ${
              selectedCategories.length === 1 && selectedCategories[0] === "0"
                ? "bg-primary text-white"
                : ""
            }`}
          >
            Semua
          </button>
          {categories?.map((cat) => (
            <button
              key={cat.id_kategori_group}
              onClick={() => toggleCategory(cat?.id_kategori_group ?? "0")}
              className={`px-3 py-1 text-xs font-medium border rounded-full text-nowrap flex items-center gap-1 ${
                selectedCategories.includes(cat?.id_kategori_group ?? "0") &&
                cat.id_kategori_group !== "0"
                  ? "bg-primary text-white"
                  : ""
              }`}
            >
              {cat.nama_kategori}
              {cat.id_kategori_group === "0" && (
                <span className="px-2 text-white rounded-full bg-primary">
                  {cat.is_aktif_filter}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="flex flex-col items-center justify-center text-center mt-36">
          <p className="text-lg font-bold text-gray-500">
            Tidak ada pekerjaan tersedia.
          </p>
          <button
            className="px-4 py-2 my-4 text-sm font-bold text-white rounded bg-primary"
            onClick={() => refetch()}
          >
            Muat Ulang
          </button>
        </div>

        <BottomNavigation />
      </div>
    );
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
    <div className="min-h-screen pb-24 bg-gray-100">
      <div className="flex flex-col justify-between w-full h-12 px-5 py-4 text-white bg-primary">
        <p className="text-center">Daftar Pekerjaan</p>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2 p-4 overflow-x-auto bg-white shadow-sm">
        <button
          onClick={() => setSelectedCategories(["0"])}
          className={`px-3 py-1 text-xs font-medium border rounded-full ${
            selectedCategories.length === 1 && selectedCategories[0] === "0"
              ? "bg-primary text-white"
              : ""
          }`}
        >
          Semua
        </button>
        {categories?.map((cat) => (
          <button
            key={cat.id_kategori_group}
            onClick={() => toggleCategory(cat?.id_kategori_group ?? "0")}
            className={`px-3 py-1 text-xs font-medium border rounded-full text-nowrap flex items-center gap-1 ${
              selectedCategories.includes(cat?.id_kategori_group ?? "0") &&
              cat.id_kategori_group !== "0"
                ? "bg-primary text-white"
                : ""
            }`}
          >
            {cat.nama_kategori}
            {cat.id_kategori_group === "0" && (
              <span className="px-2 text-white rounded-full bg-primary">
                {cat.is_aktif_filter}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Informasi Detail Pekerjaan */}
      <div className="w-full max-w-3xl p-4 mx-auto">
        <h2 className="font-bold text-md">Informasi Detail Pekerjaan</h2>
        <div className="mt-3 space-y-4">
          {jobs ? (
            jobs?.map((job) => (
              <JobCard
                key={job?.id}
                {...job}
                onclick={() => navigate({ to: `/penilaian/${job?.id}` })}
              />
            ))
          ) : (
            <div className="flex items-center justify-center h-72">
              <p className="text-center text-gray-500">
                Tidak ada pekerjaan tersedia.
              </p>
            </div>
          )}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}

export default RouteComponent;

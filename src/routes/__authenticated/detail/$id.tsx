import {
  createFileRoute,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import {
  detailHasilPenilaianQuery,
  downloadSpkPdf,
} from "../../../queries/detail-hasil-penilaian-query";
import { BottomNavigation } from "../../../components/BottomNavigation";
import { useQuery } from "@tanstack/react-query";
import BackIcon from "../../../assets/ic_arrow_back.svg";
import DetailRow from "../../../components/DetailRow";
import MapButton from "../../../components/MapButton";
import DetailHasilPenilaianSkeleton from "../../../components/skeleton/DetailHasilPenilaianSkeleton";
import { TindakanBadge } from "../../../components/TindakanBadge";

export const Route = createFileRoute("/__authenticated/detail/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ strict: false });
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery(detailHasilPenilaianQuery(id));
  const { data: spk } = useQuery(downloadSpkPdf(id));

  const hasil = data?.hasil_penilaian;
  const foto = data?.foto;

  // let skorColor = "transparent";

  // if (hasil?.tindakan == "Perbaikan") {
  //   skorColor = "#FF9100";
  // } else if (hasil?.tindakan == "Penghapusan") {
  //   skorColor = "#EB5757";
  // } else if (hasil?.tindakan == "Tidak Perlu Tindakan") {
  //   skorColor = "#8BC34A";
  // }
  if (isLoading) {
    return <DetailHasilPenilaianSkeleton />;
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
          onClick={() => window.location.reload()}
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
      <div className="flex justify-start w-full h-12 gap-2 p-3 text-white bg-primary">
        <img
          src={BackIcon}
          alt=""
          className="w-6 h-6 invert"
          onClick={() => navigate({ to: "/selesai" })}
        />
        <p className="text-left">Detail Pekerjaan</p>
      </div>
      <div className="flex flex-col items-center justify-center w-full gap-4 p-4 mx-auto">
        <div className="flex items-center justify-between w-full max-w-3xl p-2">
          <h1 className="font-bold text-md">Informasi Asset</h1>
          <a
            className="px-3 py-1 text-xs text-white rounded-full bg-primary"
            href={spk?.pdf_url}
            target="_blank"
            rel="noopener noreferrer"
            download
          >
            Download SPK
          </a>
        </div>
        <div className="flex flex-col items-center justify-center w-full max-w-3xl p-2">
          <DetailRow label="Nomor SPK" value={hasil?.no_spk ?? ""} />
          <div className="w-full h-0.5 bg-gray-300 mt-2"></div>

          <DetailRow label="Penanggung Jawab" value={hasil?.bagian ?? ""} />
          <div className="w-full h-0.5 bg-gray-300 mt-2"></div>

          <DetailRow label="Ruang" value={hasil?.ruangan ?? ""} />
          <div className="w-full h-0.5 bg-gray-300 mt-2"></div>

          <DetailRow label="Alamat" value={hasil?.lokasi_asset ?? ""} />
          <div className="w-full h-0.5 bg-gray-300 mt-2"></div>

          <DetailRow label="Tipe" value={hasil?.tipe ?? ""} />
          <div className="w-full h-0.5 bg-gray-300 mt-2"></div>

          <DetailRow label="Kategori" value={hasil?.kategori ?? ""} />
          <div className="w-full h-0.5 bg-gray-300 mt-2"></div>

          <DetailRow label="Petugas Survei" value={hasil?.petugas_1 ?? ""} />
          <div className="w-full h-0.5 bg-gray-300 mt-2"></div>

          <div className="flex items-center justify-between w-full my-2">
            <p className="text-xs text-gray-500">Koordinat Aset</p>
            <MapButton
              latitude={hasil?.latitude}
              longitude={hasil?.longitude}
            />
          </div>
          <div className="w-full h-0.5 bg-gray-300 mt-2"></div>

          <h1 className="self-start mt-2 font-bold text-md">Parameter</h1>
          <DetailRow
            label="Skor Penilaian"
            value={hasil?.skor_penilaian ?? "0.00"}
          />
          <div className="w-full h-0.5 bg-gray-300 mt-2"></div>
          <h1 className="self-start mt-2 font-bold text-md">Tindakan</h1>
          <div className="flex items-center justify-between w-full my-2">
            <p className="flex-1 text-xs">Jenis Tindakan</p>
            <TindakanBadge tindakan={hasil?.tindakan ?? ""} />
          </div>
          <div className="w-full h-0.5 bg-gray-300 mt-2"></div>

          <DetailRow label="Keterangan" value={hasil?.keterangan ?? "-"} />
          <div className="w-full h-0.5 bg-gray-300 mt-2"></div>

          <h1 className="self-start mt-2 font-bold text-md">Lampiran Foto</h1>
          <div className="flex flex-col w-full my-2">
            <p className="text-xs font-normal text-black">
              Berikut adalah hasil foto penilaian
            </p>
            <div className="grid grid-cols-4 gap-2 mt-2">
              {foto?.map((item, index) => (
                <img
                  key={index}
                  src={item.filename}
                  alt={`Foto ${index + 1}`}
                  className="object-cover w-48 h-20 rounded-lg shadow-md"
                />
              ))}
            </div>
          </div>

          <button
            className="w-full px-4 py-2 mt-4 font-semibold text-white rounded-full bg-primary"
            onClick={() => navigate({ to: "/selesai" })}
          >
            Kembali
          </button>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
}

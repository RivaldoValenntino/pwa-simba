import React from "react";
import { Pekerjaan } from "../types/responses/Job";

const formatTanggal = (tanggal: string) => {
  if (tanggal == "0000-00-00") return "";
  if (tanggal == "") return "";
  const date = new Date(tanggal);
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
};
export const JobCard: React.FC<Pekerjaan> = ({
  id,
  kode,
  no_spk,
  nama_asset,
  tanggal_penilaian,
  pemohon,
  is_aset_terdaftar,
  STATUS,
  foto_1,
  nama,
  tindakan,
  onclick,
}) => {
  let skorColor = "#FFFFFF";

  if (tindakan === "Perbaikan") {
    skorColor = "#FF9100";
  } else if (tindakan === "Penghapusan") {
    skorColor = "#EB5757";
  } else if (tindakan === "Tidak Perlu Tindakan") {
    skorColor = "#8BC34A";
  }
  return (
    <div
      className="overflow-hidden bg-white rounded-lg shadow-md cursor-pointer"
      onClick={onclick}
    >
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="STATUS" value={STATUS} />
      <input type="hidden" name="is_aset_terdaftar" value={is_aset_terdaftar} />
      <input type="hidden" name="kode" value={kode} />
      <div
        className={`text-white p-3 flex justify-between items-center ${tindakan ? "bg-greenCust" : " bg-redCustom"}`}
      >
        <span className="text-xs font-semibold">
          {formatTanggal(tanggal_penilaian ?? "")}
        </span>
        {/* <span className="px-2 py-1 text-xs font-semibold text-red-600 bg-white rounded-lg">
          {kode}
        </span> */}
      </div>

      <div className="flex gap-4 p-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold">{nama_asset ?? nama}</h3>
          <p className="inline-block px-2 py-1 mt-1 text-xs font-medium text-gray-600 bg-gray-200 rounded-md">
            Nomor SPK: {no_spk}
          </p>

          {pemohon && (
            <p className="mt-1 text-sm text-gray-700">
              Nama Pemohon : <span className="font-semibold">{pemohon}</span>
            </p>
          )}

          {tindakan && (
            <p className="mt-4 text-xs text-gray-700">
              Skor Penilaian :{" "}
              <span
                className="px-3 py-1 text-xs font-semibold text-white rounded-full"
                style={{ backgroundColor: skorColor }}
              >
                {tindakan}
              </span>
            </p>
          )}
        </div>
        {foto_1 && (
          <img
            src={foto_1}
            alt={nama_asset}
            className="object-cover w-24 h-24 rounded-lg"
          />
        )}
      </div>
    </div>
  );
};

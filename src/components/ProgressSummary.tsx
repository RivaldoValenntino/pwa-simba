import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface ProgressSummaryProps {
  progress_pekerjaan?: number;
  total_pekerjaan_selesai_hari_ini?: number;
  total_pekerjaan_hari_ini?: number;
  progress_pekerjaan_hari_ini?: number;
  imageSrc?: string;
}

const ProgressSummary: React.FC<ProgressSummaryProps> = ({
  progress_pekerjaan = 0, // Default 0
  total_pekerjaan_selesai_hari_ini = 0, // Default 0
  total_pekerjaan_hari_ini = 0, // Default 0
  imageSrc = "",
}) => {
  const percentage = Math.floor(progress_pekerjaan ?? 0); // Mencegah undefined
  const totalPercentage =
    total_pekerjaan_hari_ini > 0
      ? (total_pekerjaan_selesai_hari_ini / total_pekerjaan_hari_ini) * 100
      : 0;

  // Fungsi menentukan warna berdasarkan progress pekerjaan
  const getProgressColor = (percentage: number) => {
    if (percentage < 50) return "#FFD740"; // Kuning
    if (percentage < 75) return "#FFA726"; // Orange
    if (percentage < 100) return "#8BC34A"; // Hijau Muda
    return "#4CAF50"; // Hijau Tua (100%)
  };

  return (
    <div className="relative p-5">
      <div className="flex items-center justify-between">
        {/* Progress Pekerjaan */}
        <div className="flex flex-col items-center w-1/3">
          <div className="w-20 h-20">
            <CircularProgressbar
              value={percentage}
              text={`${percentage}%`}
              styles={buildStyles({
                textSize: "16px",
                pathColor: getProgressColor(percentage),
                trailColor: "#E0E0E0",
                textColor: "#000",
              })}
            />
          </div>
          <p className="mt-2 text-xs font-normal text-center">
            Progress Pekerjaan
          </p>
        </div>

        {/* Gambar Tengah */}
        <div className="flex justify-center">
          {imageSrc ? (
            <img src={imageSrc} alt="Progress Image" width={200} />
          ) : (
            <p className="text-xs text-gray-500">Tidak ada gambar</p>
          )}
        </div>

        {/* Total Pekerjaan Hari Ini */}
        <div className="flex flex-col items-center w-1/3">
          <div className="w-20 h-20">
            {total_pekerjaan_hari_ini !== null &&
            total_pekerjaan_hari_ini !== undefined ? (
              <CircularProgressbar
                value={totalPercentage}
                text={`${total_pekerjaan_selesai_hari_ini}/${total_pekerjaan_hari_ini}`}
                styles={buildStyles({
                  textSize: "16px",
                  pathColor: getProgressColor(totalPercentage),
                  trailColor: "#E0E0E0",
                  textColor: "#000",
                })}
              />
            ) : (
              <p className="text-xs text-gray-500">Tidak ada data</p>
            )}
          </div>
          <p className="mt-2 text-xs font-normal text-center">
            Total Pekerjaan Hari Ini
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgressSummary;

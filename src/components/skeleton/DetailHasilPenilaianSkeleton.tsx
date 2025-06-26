import React from "react";
import { BottomNavigation } from "../BottomNavigation";

const DetailHasilPenilaianSkeleton: React.FC = () => {
  return (
    <div className="w-full h-screen pb-24 bg-white">
      {/* Header */}
      <div className="flex items-center w-full px-4 py-3 text-white bg-blue-600">
        <div className="w-5 h-5 mr-3 bg-white rounded-full animate-pulse"></div>
        <div className="w-40 h-4 bg-white rounded animate-pulse"></div>
      </div>

      {/* Body */}
      <div className="w-full max-w-3xl p-4 mx-auto">
        {/* Title Section */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="h-5 bg-gray-300 rounded w-36 animate-pulse"></div>
          <div className="w-24 h-8 bg-gray-300 rounded animate-pulse"></div>
        </div>

        {/* List Data */}
        {Array(12)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="flex justify-between gap-4 mb-4 ">
              <div className="flex-1 h-4 mb-1 bg-gray-300 rounded animate-pulse"></div>
              <div className="flex-1 h-5 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))}

        {/* Parameter & Tindakan */}
        <div className="h-4 mt-4 mb-2 bg-gray-300 rounded w-28 animate-pulse"></div>
        <div className="w-full h-5 bg-gray-200 rounded animate-pulse"></div>

        <div className="w-20 h-4 mt-4 mb-2 bg-gray-300 rounded animate-pulse"></div>
        <div className="w-full h-5 bg-gray-200 rounded animate-pulse"></div>

        {/* Skeleton Lampiran Foto */}
        <h1 className="w-48 h-4 mt-4 mb-2 bg-gray-300 rounded animate-pulse"></h1>
        <div className="flex flex-col w-full my-2">
          <p className="w-48 h-4 bg-gray-300 rounded animate-pulse"></p>
          <div className="grid grid-cols-4 gap-2 mt-4">
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="w-20 h-20 bg-gray-300 rounded-lg animate-pulse"
                ></div>
              ))}
          </div>
        </div>
      </div>

      {/* Bottom Tab Bar */}
      <BottomNavigation />
    </div>
  );
};

export default DetailHasilPenilaianSkeleton;

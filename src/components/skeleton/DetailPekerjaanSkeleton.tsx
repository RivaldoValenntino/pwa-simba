import React from "react";
import { BottomNavigation } from "../BottomNavigation";

const DetailPekerjaanSkeleton: React.FC = () => {
  return (
    <div className="mx-auto bg-white ">
      {/* Header */}
      <div className="flex items-center px-4 py-3 text-white bg-blue-600">
        <div className="w-5 h-5 mr-3 bg-white rounded-full animate-pulse"></div>
        <div className="w-40 h-4 bg-white rounded animate-pulse"></div>
      </div>

      {/* Body */}
      <div className="w-full max-w-3xl p-4 mx-auto">
        {/* Title Section */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="w-32 h-5 bg-gray-300 rounded animate-pulse"></div>
          <div className="w-32 h-5 bg-gray-300 rounded animate-pulse"></div>
          <div className="w-32 h-5 bg-gray-300 rounded animate-pulse"></div>
        </div>

        {/* List Data */}
        {Array(8)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="flex justify-between gap-4 mb-4 ">
              <div className="flex-1 h-4 mb-1 bg-gray-300 rounded animate-pulse"></div>
              <div className="flex-1 h-8 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))}

        {/* Parameter & Tindakan */}
        <div className="w-full mt-4 bg-gray-300 rounded-full h-14 animate-pulse float-end"></div>
        {/* Skeleton Lampiran Foto */}
      </div>

      {/* Bottom Tab Bar */}
      <BottomNavigation />
    </div>
  );
};

export default DetailPekerjaanSkeleton;

import React from "react";

export const CategoryCardSkeleton: React.FC = () => {
  return (
    <div className="flex items-center gap-4 p-4 mt-3 bg-white shadow-md rounded-xl animate-pulse">
      {/* Skeleton untuk Gambar */}
      <div className="flex-shrink-0 w-20 h-20 bg-gray-300 rounded-lg" />

      {/* Skeleton untuk Konten */}
      <div className="flex-1 space-y-2">
        {/* Skeleton untuk Judul */}
        <div className="w-2/3 h-4 bg-gray-300 rounded" />

        {/* Skeleton untuk Deadline */}
        <div className="w-1/4 h-3 bg-gray-300 rounded" />

        {/* Skeleton untuk teks informasi */}
        <div className="flex justify-between">
          <div className="w-1/3 h-3 bg-gray-300 rounded" />
          <div className="w-1/5 h-3 bg-gray-300 rounded" />
        </div>

        {/* Skeleton untuk Progress Bar */}
        <div className="w-full h-2 bg-gray-300 rounded-full" />
      </div>
    </div>
  );
};

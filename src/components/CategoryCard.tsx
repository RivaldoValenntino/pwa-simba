import { useNavigate } from "@tanstack/react-router";
import React from "react";

interface CategoryCardProps {
  id_kategori_group: string | number;
  title: string;
  progress: number;
  total: number;
  deadline?: number;
  image?: string;
}

const getProgressColor = (progress: number, total: number) => {
  const percentage = (progress / total) * 100;

  if (percentage < 50) return "#EB5757"; // Merah
  if (percentage < 100) return "#FFD740"; // Kuning
  return "#8BC34A"; // Hijau
};

export const CategoryCard: React.FC<CategoryCardProps> = ({
  id_kategori_group,
  title,
  progress,
  total,
  deadline,
  image,
}) => {
  const progressColor = getProgressColor(progress, total);
  const navigate = useNavigate();
  return (
    <div
      className="flex items-center gap-4 p-4 mt-3 bg-white shadow-md rounded-xl hover:bg-opacity-10 cursor-pointer transition-all duration-300"
      onClick={() =>
        navigate({ to: `/pekerjaan?category=${id_kategori_group}` })
      }
    >
      {/* Image di sebelah kiri */}
      {image && (
        <div className="flex-shrink-0 w-20 h-20">
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
      )}

      {/* Gambar di sebelah kanan */}
      <div className="flex-1">
        <div className="flex justify-between mb-2">
          <h3 className="font-bold text-md">{title}</h3>
          {deadline !== undefined ||
            (deadline !== 0 && (
              <span className="px-3 py-1 text-xs font-bold text-white bg-orange-500 rounded-full">
                {deadline} Tenggat
              </span>
            ))}
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-gray-500">Yang telah dikerjakan</p>
          <span className="text-sm font-bold">
            {progress}/{total}
          </span>
        </div>

        {/* Progress Bar */}
        <progress
          value={progress}
          max={total}
          className="w-full h-2 overflow-hidden rounded-full"
          style={
            {
              "--progress-color": progressColor,
            } as React.CSSProperties
          }
        />
      </div>
    </div>
  );
};

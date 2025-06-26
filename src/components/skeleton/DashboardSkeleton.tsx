import { BottomNavigation } from "../../components/BottomNavigation";
import { CategoryCardSkeleton } from "../CategoryCardSkeleton";

function DashboardSkeleton() {
  return (
    <div className="h-screen overflow-auto pb-28 bg-secondary">
      <div className="flex flex-col items-center justify-between w-full h-48 px-5 py-4 bg-gray-300 rounded-b-3xl animate-pulse">
        <div className="flex items-center justify-center w-full max-w-3xl gap-3 mt-8">
          <div className="w-16 h-16 bg-gray-400 rounded-full"></div>
          <div>
            <div className="w-24 h-4 bg-gray-400 rounded"></div>
            <div className="w-16 h-3 mt-2 bg-gray-400 rounded"></div>
          </div>
          <div className="w-20 h-10 ml-auto bg-gray-400 rounded-md"></div>
        </div>
      </div>

      <div className="max-w-3xl px-5 mx-auto -mt-6 animate-pulse">
        <div className="flex items-center justify-between p-2 bg-white shadow-md rounded-xl">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
            <div className="w-12 h-4 mt-2 bg-gray-300 rounded"></div>
            <div className="w-24 h-3 mt-2 bg-gray-300 rounded"></div>
          </div>

          <div className="flex items-center justify-center w-24 h-24 bg-gray-200 rounded-lg"></div>

          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
            <div className="w-12 h-4 mt-2 bg-gray-300 rounded"></div>
            <div className="w-24 h-3 mt-2 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-3xl px-5 mx-auto mt-4">
        <h2 className="font-bold text-md">Menu Kategori Penilaian</h2>
        <div className="mt-3 space-y-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <CategoryCardSkeleton key={index} />
          ))}
        </div>
      </div>

      {/* Bottom Navigation Skeleton */}
      <BottomNavigation />
    </div>
  );
}

export default DashboardSkeleton;

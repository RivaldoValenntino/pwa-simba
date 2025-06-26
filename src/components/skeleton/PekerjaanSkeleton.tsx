import { BottomNavigation } from "../../components/BottomNavigation";
import CardSkeleton from "../../components/CardSkeleton";

function PekerjaanSkeleton() {
  return (
    <div className="min-h-screen pb-24 bg-gray-100">
      <div className="flex flex-col justify-between w-full h-12 px-5 py-4 text-white bg-primary">
        <p className="text-center">Daftar Pekerjaan</p>
      </div>

      <div className="flex items-center gap-2 p-4 overflow-x-auto bg-white shadow-sm">
        <div className="w-16 h-6 bg-gray-300 rounded-full animate-pulse"></div>
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="w-20 h-6 bg-gray-300 rounded-full animate-pulse"
          ></div>
        ))}
      </div>

      <div className="w-full max-w-3xl p-4 mx-auto">
        <h2 className="font-bold text-md">Informasi Detail Pekerjaan</h2>
        <div className="mt-3 space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}

export default PekerjaanSkeleton;

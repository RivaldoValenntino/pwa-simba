const CardSkeleton = () => {
  return (
    <div className="overflow-hidden bg-white rounded-lg shadow-md animate-pulse">
      {/* Header Card */}
      <div className="flex items-center justify-between p-3 bg-gray-300">
        <span className="w-32 h-4 bg-gray-400 rounded"></span>
        {/* <span className="w-20 h-6 bg-gray-400 rounded"></span> */}
      </div>

      {/* Body Card */}
      <div className="flex gap-4 p-4">
        {/* Informasi Pekerjaan */}
        <div className="flex-1 space-y-2">
          <div className="w-3/4 h-6 bg-gray-400 rounded"></div>
          <div className="w-1/2 h-5 bg-gray-300 rounded"></div>
          <div className="w-2/3 h-4 bg-gray-300 rounded"></div>
        </div>
        {/* Gambar */}
        {/* <div className="w-24 h-24 bg-gray-400 rounded-lg"></div> */}
      </div>
    </div>
  );
};

export default CardSkeleton;

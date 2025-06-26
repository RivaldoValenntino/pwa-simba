interface DetailRowProps {
  label: string;
  value?: string | number | null | undefined;
}

const DetailRow: React.FC<DetailRowProps> = ({ label, value }) => (
  <div className="flex justify-between items-center w-full my-2">
    <p className="text-gray-500 text-xs flex-1">{label}</p>
    <p className="font-bold text-xs text-right flex-1">{value || "-"}</p>
  </div>
);

export default DetailRow;

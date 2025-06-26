type TindakanBadgeProps = {
  tindakan: string;
};

export const TindakanBadge: React.FC<TindakanBadgeProps> = ({ tindakan }) => {
  let skorColor = "transparent";

  if (tindakan === "Perbaikan") {
    skorColor = "#FF9100";
  } else if (tindakan === "Penghapusan") {
    skorColor = "#EB5757";
  } else if (
    tindakan === "Tidak Perlu tindakan" ||
    tindakan === "Tidak Perlu Tindakan"
  ) {
    skorColor = "#8BC34A";
  }

  return (
    <p
      className="px-3 py-1 text-xs font-semibold text-right text-white rounded-full"
      style={{ backgroundColor: skorColor }}
    >
      {tindakan || "-"}
    </p>
  );
};

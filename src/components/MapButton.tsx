import _ICMaps from "../assets/ic_maps.svg";
interface MapButtonProps {
  latitude?: number | undefined;
  longitude?: number | undefined;
}

const MapButton: React.FC<MapButtonProps> = ({ latitude, longitude }) => {
  const openMap = () => {
    if (latitude && longitude) {
      window.open(
        `https://www.google.com/maps?q=${latitude},${longitude}`,
        "_blank"
      );
    } else {
      alert("Koordinat tidak tersedia");
    }
  };

  return (
    <button
      className="px-2 py-1 bg-primary text-xs text-white rounded-full flex gap-2 hover:bg-primary/80"
      onClick={openMap}
    >
      <img src={_ICMaps} alt="" className="w-4 h-4" />
      <p>Buka Peta</p>
    </button>
  );
};

export default MapButton;

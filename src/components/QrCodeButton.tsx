import qrCodeIcon from "../assets/bottom-nav/qr-code-outline.svg";
import { useNavigate } from "@tanstack/react-router";

export const QrCodeButton: React.FC = () => {
  const navigate = useNavigate();

  // Fungsi untuk mendeteksi apakah aplikasi berjalan di mode PWA
  // const isPWA = () => window.matchMedia("(display-mode: standalone)").matches;

  // console.log("Running in PWA:", isPWA());

  // Fungsi untuk mendapatkan stream dari kamera belakang
  // const getBackCameraStream = async () => {
  //   try {
  //     const devices = await navigator.mediaDevices.enumerateDevices();
  //     const videoDevices = devices.filter(
  //       (device) => device.kind === "videoinput"
  //     );

  //     const backCamera = videoDevices.find((device) =>
  //       device.label.toLowerCase().includes("back")
  //     );

  //     if (backCamera) {
  //       return navigator.mediaDevices.getUserMedia({
  //         video: { deviceId: { exact: backCamera.deviceId } },
  //       });
  //     } else {
  //       return navigator.mediaDevices.getUserMedia({ video: true });
  //     }
  //   } catch (error: any) {
  //     console.error("Error Mengakses Kamera:", error);

  //     if (error.name === "NotReadableError") {
  //       alert(
  //         "Kamera sedang digunakan oleh aplikasi lain. Coba tutup aplikasi lain yang menggunakan kamera."
  //       );
  //     } else if (error.name === "NotAllowedError") {
  //       alert("Akses kamera ditolak. Pastikan izin kamera sudah diberikan.");
  //     } else if (error.name === "OverconstrainedError") {
  //       alert("Kamera yang diminta tidak tersedia.");
  //     } else {
  //       alert("Gagal mengakses kamera. Silakan coba lagi.");
  //     }

  //     throw new Error("Gagal mengakses kamera: " + error.message);
  //   }
  // };

  const handleOpenScanner = async () => {
    try {
      // const stream = await getBackCameraStream();
      // console.log("Kamera belakang bisa digunakan", stream);
      navigate({ to: "/qrscan" });
    } catch (error) {
      console.error(error);
      alert("Akses kamera ditolak! Harap aktifkan izin kamera.");
    }
  };

  return (
    <div className="relative flex justify-center flex-1">
      <button
        className="absolute flex flex-col items-center justify-center w-20 h-20 border-4 border-white rounded-full bg-primary -top-14"
        onClick={handleOpenScanner}
      >
        <img src={qrCodeIcon} alt="QR Scan" className="h-7 w-7" />
        <span className="text-xs text-white">QR Scan</span>
      </button>
    </div>
  );
};

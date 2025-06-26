import { useEffect, useState } from "react";

interface OfflineBannerProps {
  autoHide?: boolean;
  duration?: number;
}

const OfflineBanner: React.FC<OfflineBannerProps> = ({
  autoHide = false,
  duration = 5000,
}) => {
  // const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [status, setStatus] = useState<"offline" | "online" | null>(
    navigator.onLine ? null : "offline"
  );
  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      // setIsOnline(true);
      setStatus("online");
      setAnimateOut(false);

      if (autoHide) {
        setTimeout(() => setAnimateOut(true), duration - 400);
        setTimeout(() => setStatus(null), duration);
      }
    };

    const handleOffline = () => {
      // setIsOnline(false);
      setStatus("offline");
      setAnimateOut(false);

      if (autoHide) {
        setTimeout(() => setAnimateOut(true), duration - 400);
        setTimeout(() => setStatus(null), duration);
      }
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [autoHide, duration]);

  if (!status) return null;

  const isOffline = status === "offline";
  const bannerText = isOffline
    ? "Sepertinya anda sedang offline. Beberapa fitur mungkin tidak tersedia."
    : "Anda berhasil online kembali.";

  const bgColor = isOffline ? "bg-yellow-500" : "bg-green-500";
  const animationClass = animateOut
    ? "animate-slide-fade-out"
    : "animate-slide-fade-in";

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 px-4 py-2 text-sm text-center text-white shadow-md ${bgColor} ${animationClass}`}
    >
      {bannerText}
    </div>
  );
};

export default OfflineBanner;

import React, { useEffect, useState } from "react";
import AppIcon from "../assets/android-launchericon-192-192.png";
import _IcSignOut from "../assets/ic_sign_out.svg";
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

const InstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isShow, setIsShow] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const isAppleDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(isAppleDevice);

    const handleBeforeInstallPrompt = (event: Event) => {
      const beforeInstallEvent = event as BeforeInstallPromptEvent;
      beforeInstallEvent.preventDefault();
      setDeferredPrompt(beforeInstallEvent);
      setIsShow(true);
    };

    if (!isAppleDevice) {
      window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    }

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleAddToHome = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response: ${outcome}`);
      setIsShow(false);
      setDeferredPrompt(null);
    }
  };

  const handleCloseModal = () => {
    setIsShow(false);
  };

  if (!isShow) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50 z-[999]"
      onClick={handleCloseModal} // Klik di luar modal untuk menutup
    >
      <div
        className="relative w-full max-w-sm p-6 text-center bg-white rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup saat klik di dalam
      >
        {/* Tombol Close (X) di sudut kanan atas */}
        <button
          onClick={handleCloseModal}
          className="absolute p-2 text-gray-500 top-2 right-2 hover:text-gray-700"
        >
          <span className="text-xl">✖</span>
        </button>

        <div className="mb-4">
          <img
            src={AppIcon}
            alt="App Logo"
            className="w-16 h-16 mx-auto mb-2"
          />
          <span className="text-xl font-bold">
            {import.meta.env.VITE_APP_NAME}
          </span>
        </div>

        {isIOS ? (
          <>
            <p className="mb-6 text-gray-700">
              Untuk menginstal aplikasi ini di iPhone, tap tombol{" "}
              <strong>Share</strong> pada Safari dan pilih{" "}
              <strong>
                "Add to Home Screen" atau "Tambahkan ke layar beranda"
              </strong>
              .
            </p>
            <button
              onClick={handleCloseModal}
              className="px-4 py-2 text-white transition rounded-lg bg-primary hover:bg-blue-600"
            >
              Tutup
            </button>
          </>
        ) : (
          <>
            <p className="mb-6 text-sm text-gray-700">
              Untuk pengalaman yang lebih baik, install aplikasi ini ke halaman
              utama.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleAddToHome}
                className="flex gap-2 px-4 py-2 text-white transition rounded-lg shadow-sm bg-primary hover:bg-primary/80 "
              >
                <img
                  src={_IcSignOut}
                  alt=""
                  className="w-6 h-6 rotate-90 brightness-200"
                />
                Install
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default InstallPrompt;

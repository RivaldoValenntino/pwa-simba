import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";
import BackIcon from "../../assets/ic_arrow_back.svg";
import { toast, ToastContainer } from "react-toastify";
export const Route = createFileRoute("/__authenticated/qrscan")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const [scanResult, setScanResult] = useState<string | null>(null);
  const urlApi = "https://mangutama.aurorasystem.co.id/work-order/public";
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        qrbox: {
          width: 400,
          height: 400,
        },
        fps: 5,
        videoConstraints: {
          facingMode: { exact: "environment" },
        },
      },
      false
    );

    scanner.render(
      (result) => {
        scanner.clear();
        setScanResult(result);
        console.log(`Scan result: ${scanResult}`);
        if (result.startsWith("/panel/detailPublicjadwalperawatan")) {
          toast.success(
            `QR Code berhasil di scan anda akan dialihkan ke ${urlApi}${result}`,
            {
              closeButton: false,
            }
          );
          setTimeout(() => {
            window.location.href = urlApi + result;
          }, 3000);
        } else {
          toast.error(`QR Code Tidak Valid`, {
            closeButton: false,
          });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      },

      (error) => {
        console.error(error);
      }
    );

    return () => {
      scanner.clear();
    };
  }, []);
  return (
    <div className="min-h-screen bg-white ">
      <div className="flex items-center justify-start h-12 gap-2 p-3 bg-primary">
        <img
          src={BackIcon}
          alt=""
          className="w-6 h-6 invert"
          onClick={() => navigate({ to: "/dashboard" })}
        />
        <h1 className="text-white">Scan QR</h1>
      </div>
      <div className="flex items-center justify-center w-full h-screen">
        <div className="w-full max-w-3xl p-6 bg-white rounded-lg">
          <div id="reader" className=""></div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

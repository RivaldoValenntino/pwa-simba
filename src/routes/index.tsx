import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { APP_NAME } from "../../constant";
import CreditAsesment from "../assets/credit-assesment/rafiki.svg";
export const Route = createFileRoute("/")({
  component: IndexComponent,
  // beforeLoad: () => {
  //   if (localStorage.getItem("auth-store")) {
  //     throw redirect({ to: "/dashboard" });
  //   }
  // },
});

function IndexComponent() {
  const navigate = useNavigate();
  return (
    <div id="index-body">
      <div className="max-w-3xl p-8 mt-8 text-center">
        <div className="flex justify-center mb-4">
          <h1 className="max-w-xs mb-8 text-2xl font-bold text-white">
            Selamat Datang di Aplikasi {import.meta.env.VITE_APP_NAME}
          </h1>
        </div>
        <div className="flex flex-col items-center justify-center mb-2">
          <img src={CreditAsesment} alt="Login" width={400} height={400} />
          <p className="max-w-xs mt-12 font-normal text-center text-white">
            Silahkan masuk untuk menggunakan aplikasi{" "}
            {import.meta.env.VITE_APP_NAME}
          </p>
        </div>
        <button
          onClick={() => navigate({ to: "/login" })}
          id="btn-masuk"
          className="w-full py-4 mt-8 font-bold text-black transition bg-white rounded-full hover:bg-white/80"
        >
          Masuk
        </button>
      </div>
    </div>
  );
}

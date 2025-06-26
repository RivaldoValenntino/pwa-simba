import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { registerSW } from "virtual:pwa-register";

import "./index.css";
import { router } from "./router";
import { useAuthStore } from "./store/auth";
import InstallPrompt from "./components/InstallPrompt";
import OfflineBanner from "./components/OfflineBanner";

const updateSW = registerSW({
  onNeedRefresh() {
    updateSW();
  },
  onOfflineReady() {},
});

export const queryClient = new QueryClient();

function App() {
  const auth = useAuthStore();
  return <RouterProvider router={router} context={{ queryClient, auth }} />;
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <QueryClientProvider client={queryClient}>
      <OfflineBanner autoHide={true} duration={5000} />
      <InstallPrompt />
      <App />
    </QueryClientProvider>
  );
}

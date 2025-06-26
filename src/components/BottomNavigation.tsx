import { useRouter } from "@tanstack/react-router";
import * as Icons from "../assets/bottom-nav";
import NavButton from "./NavButton";
import { QrCodeButton } from "./QrCodeButton";

export const BottomNavigation = () => {
  const router = useRouter();
  const currentPath = router.state.location.pathname;
  return (
    <div className="fixed bottom-0 flex items-center justify-between w-full px-2 -translate-x-1/2 bg-white shadow-lg left-1/2">
      <NavButton
        path="/dashboard"
        currentPath={currentPath}
        icon={Icons.gridIcon}
        activeIcon={Icons.gridIconActive}
        label="Dashboard"
      />
      <NavButton
        path="/pekerjaan"
        currentPath={currentPath}
        icon={Icons.briefcaseIcon}
        activeIcon={Icons.briefcaseIconActive}
        label="Pekerjaan"
      />
      <QrCodeButton />
      <NavButton
        path="/selesai"
        currentPath={currentPath}
        icon={Icons.cloudDoneIcon}
        activeIcon={Icons.cloudDoneIconActive}
        label="Selesai"
      />
      <NavButton
        path="/akun"
        currentPath={currentPath}
        icon={Icons.personIcon}
        activeIcon={Icons.personActive}
        label="Akun"
      />
    </div>
  );
};

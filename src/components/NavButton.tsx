import { useNavigate } from "@tanstack/react-router";
import React from "react";

interface NavButtonProps {
  path: string;
  currentPath: string;
  icon: string;
  activeIcon: string;
  label: string;
}

const NavButton: React.FC<NavButtonProps> = ({
  path,
  currentPath,
  icon,
  activeIcon,
  label,
}) => {
  const navigate = useNavigate();

  return (
    <button
      className={`flex flex-col items-center flex-1 py-3 text-xs transition ${
        currentPath === path
          ? "text-primary font-bold"
          : "text-textGray font-medium"
      }`}
      onClick={() => navigate({ to: path })}
    >
      <img
        src={currentPath === path ? activeIcon : icon}
        alt={label}
        className="h-7 w-7"
      />
      <span>{label}</span>
    </button>
  );
};

export default NavButton;

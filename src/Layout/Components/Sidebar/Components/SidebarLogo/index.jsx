import React from "react";
import { Logo } from "../../../../../Config";

const SidebarLogo = () => {
  return (
    <div className="flex items-center gap-2">
      <img src={Logo} alt="Logo" className="w-10 h-10 object-contain rounded-xl" />
      <h3 className="!font-[700]">Demo</h3>
    </div>
  );
};

export default SidebarLogo;

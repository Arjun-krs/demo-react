import React, { createContext, useContext, useState, useEffect } from "react";

export const SidebarContext = createContext();

export const useSidebar = () => {
  return useContext(SidebarContext);
};

export const SidebarProvider = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed((prevState) => !prevState);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarWidth = isCollapsed ? "80px" : "260px";

  return (
    <SidebarContext.Provider
      value={{ isCollapsed, toggleCollapse, sidebarWidth }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { sidebarNavItems } from "../../../../../Utils/sidebarItems";

const SidebarMenuItems = () => {
  const navigate = useNavigate();
  const [openSections, setOpenSections] = useState({});
  const childRefs = useRef({});

  const handleLogout = () => {
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  const toggleSection = (section) => {  
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <ul className="mt-4 flex-1 overflow-y-auto scrollbar-hide">
      {sidebarNavItems?.map((item, index) => {
        if (item?.section === "Logout") {
          return (
            <li key={index} className="w-full px-3 py-1 mt-auto">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-3xl hover:bg-[#8A9FA2] w-full text-left text-[#1F1F1F] transition"
              >
                {item?.icon}
                <span>{item?.display}</span>
              </button>
            </li>
          );
        }

        const hasChildren = item.children && item.children.length > 0;

        return (
          <li key={index} className="w-full px-3 py-1">
            {hasChildren ? (
              <div
                className={`flex items-center justify-between gap-3 px-4 py-3 rounded-3xl hover:bg-[#8A9FA2] transition w-full cursor-pointer ${openSections[item.section] ? "bg-[#002F34] text-white" : "text-[#1F1F1F]"
                  }`}
                onClick={() => toggleSection(item.section)}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.display}</span>
                </div>
                <svg
                  className={`w-3 h-3 transform transition-transform duration-300 ${openSections[item.section] ? "rotate-180" : "rotate-0"
                    }`}
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 4.5L6 7.5L9 4.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            ) : (
              <NavLink
                to={item.to || "#"}
                end
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-3xl hover:bg-[#8A9FA2] transition w-full ${isActive ? "bg-[#002F34] text-white" : "text-[#1F1F1F]"
                  }`
                }
              >
                {item.icon}
                <span>{item.display}</span>
              </NavLink>
            )}

            {hasChildren && (
              <ul
                ref={(el) => (childRefs.current[item.section] = el)}
                className="ml-6 mt-2 overflow-hidden transition-[max-height] duration-300 ease-in-out"
                style={{
                  maxHeight: openSections[item.section]
                    ? `${childRefs.current[item.section]?.scrollHeight}px`
                    : "0",
                }}
              >
                {item.children.map((child, cIndex) => (
                  <li key={cIndex}>
                    <NavLink
                      to={child.to || "#"}
                      end
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-4 py-2 rounded-2xl hover:bg-[#8A9FA2] transition w-full ${isActive ? "bg-[#00494C] text-white" : "text-[#1F1F1F]"
                        }`
                      }
                    >
                      {child.icon}
                      <span>{child.display}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default SidebarMenuItems;

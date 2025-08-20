import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Avatar } from "antd";
import { MenuOutlined } from "@ant-design/icons";

const Header = ({ setIsSidebarOpen }) => {
  const location = useLocation();
  const Navigate = useNavigate();
  const [routeName, setRouteName] = useState("");
  const UserName = localStorage.getItem("name");
  const Email = localStorage.getItem("email");

  useEffect(() => {
    const curPath = location.pathname.split("/")[1];
    setRouteName(curPath);
  }, [location]);

  return (
    <div className="w-full">
      <div className="p-[20px] my-[10px] h-[60px] px-[20px] justify-between items-center flex">
        <button
          className="md:hidden text-black"
          onClick={() => setIsSidebarOpen(true)}
        >
          <MenuOutlined />
        </button>

        <h2 className="!mb-0 ml-2">
          {routeName
            .replace(/([a-z])([A-Z])/g, "$1 $2")
            .replace(/^./, (c) => c.toUpperCase())}
        </h2>

        <div className="flex items-center gap-3">
          <div className="rounded-[4px] ml-[20px] h-[32px] w-[32px]">
            <Avatar onClick={() => Navigate('Profile')} style={{ backgroundColor: "#87d068", cursor: "pointer" }}>
              {UserName ? UserName.charAt(0).toUpperCase() : "U"}
            </Avatar>
          </div>
          <div className="hidden md:block">
            <p className="text-[12px] font-[800] text-[#33595D]">{UserName}</p>
            <p className="text-[12px] text-[#6B6B6B]">{Email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

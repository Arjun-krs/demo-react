import { SidebarLogo, SidebarMenuItems } from "./components";
import { CloseOutlined } from "@ant-design/icons";
import './style.scss'

const Sidebar = ({ isOpen, setIsOpen }) => {
    return (
        <>
            <div className={`backdrop ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(false)} />
            <div className={`sidebar_wrapper fixed top-0 left-0 h-full w-64 bg-[#FFFFFF] flex flex-col z-50 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:block`}>
                <div className="flex justify-end p-4 absolute right-0 md:hidden">
                    <button onClick={() => setIsOpen(false)}>
                        <CloseOutlined />
                    </button>
                </div>

                <div className="p-4 h-[60px]">
                    <SidebarLogo />
                </div>

                <div className="flex-1 overflow-y-auto scrollbar_hide" style={{ height: "calc(100vh - 60px)" }}>
                    <SidebarMenuItems />
                </div>
            </div>
        </>
    );
};

export default Sidebar;

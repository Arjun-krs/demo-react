import { Outlet } from "react-router-dom";
import PrivateRoute from "../Routes/PrivateRoute";
import { Header, Sidebar } from "./Components";
import { useState } from "react";
import "./style.scss";

const MainLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="layout_bg h-screen w-full flex">
            {/* <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} /> */}
            <div className="flex-1 flex flex-col h-screen transition-all duration-300">
                {/* <Header setIsSidebarOpen={setIsSidebarOpen} /> */}
                <div className="content_wrapper overflow-auto p-5 flex-1" style={{ height: "calc(100vh - 80px)" }}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default MainLayout;

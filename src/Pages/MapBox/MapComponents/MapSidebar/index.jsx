import React, { useEffect, useState } from "react";
import VehicleCard from "../VehicleCard";
import { DatePicker, IconToolTip, TextInput } from "../../../../Components"
import { VehicleOptions } from "../../../../Config";
import { ShrinkOutlined } from "@ant-design/icons";

const MapSidebar = ({ vehicles = [], onSelect, search, onSearchChange, onOption, selectedVehicle }) => {

    const [sidebarInfo, setSidebarInfo] = useState({
        showRange: false,
        expanded: false
    })

    useEffect(() => {
        setSidebarInfo((prev) => ({
            ...prev,
            showRange: false
        }));
    }, [selectedVehicle]);

    const renderCard = (vehicle) => {
        const isSelected = selectedVehicle?._id === vehicle._id;
        return (
            <li key={vehicle._id} onClick={() => onSelect(vehicle)}>
                <VehicleCard
                    className={`cursor-pointer rounded-xl border transition-all duration-200 py-[8px] px-[12px] bg-[#FFFFFF] ${isSelected ? "text-white border-[#006162] border-2" : "hover:bg-[#FFFFFF] border-transparent"}`}
                    vehicle={vehicle}
                    onOptions={(action, vehicle) => {
                        setSidebarInfo((prev) => ({
                            ...prev,
                            showRange: action === 'playback',
                            expanded: action !== 'playback'
                        }))
                        onOption?.(action, vehicle);
                    }}
                />
            </li>
        );
    };

    return (
        <div className={`bg-white rounded-2xl shadow-xl h-full transition-all duration-500 overflow-hidden ${sidebarInfo?.expanded ? "w-[330px] p-4" : "w-[60px] p-2"}`}>
            {/* <IconToolTip title={'SideBar'}> */}
                <button
                    onClick={() => setSidebarInfo((prev) => ({
                        ...prev,
                        expanded: !prev.expanded,
                    }))}
                    className="w-full flex items-center cursor-pointer"
                >
                    <div className="bg-[#bababa] rounded-full p-2 flex-shrink-0">
                        <VehicleOptions width={25} height={25} />
                    </div>

                    <div className={`flex items-center gap-[50px] overflow-hidden transition-all duration-500 ${sidebarInfo?.expanded ? "opacity-100 ml-2 w-auto" : "opacity-0 w-0"}`}>
                        <h4 className="text-[18px] font-bold whitespace-nowrap">
                            Vehicle Tracking
                        </h4>
                        <ShrinkOutlined size={40} />
                    </div>
                </button>
            {/* </IconToolTip> */}

            <div className={`transition-all duration-500 ${sidebarInfo?.expanded ? "opacity-100" : "opacity-0 h-0 mt-0"} overflow-hidden`}>
                <div className="flex flex-col gap-[8px] flex-1 overflow-hidden h-[450px]">
                    <div className="my-3 border-b border-dashed pb-3">
                        <TextInput
                            type="search"
                            placeholder="Search"
                            value={search?.search}
                            onChange={(e) => onSearchChange('search', e.target.value)}
                        />
                        {sidebarInfo?.showRange && (
                            <div className="flex gap-[16px]">
                                <DatePicker
                                    placeholder="Start date"
                                    value={search.startDate || ""}
                                    onChange={(date) => onSearchChange("startDate", date)}
                                    allowClear={false}
                                />
                                <DatePicker
                                    placeholder="End date"
                                    value={search.endDate || ""}
                                    onChange={(date) => onSearchChange("endDate", date)}
                                    allowClear={false}
                                />
                            </div>
                        )}
                    </div>
                    <p className="irgo_body_large">{`Vehicles (${vehicles?.length})`}</p>

                    {vehicles?.length > 0 ? (
                        <ul className="scrollbar_hide space-y-2 overflow-y-auto h-full">
                            {vehicles.map(renderCard)}
                        </ul>
                    ) : (
                        <div className="flex flex-1 justify-center items-center">
                            <p className="irgo_body_large">No vehicles found</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MapSidebar;

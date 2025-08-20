import React, { useState } from "react";
import { formatDateTime } from "../../Functions";
import { CardInfo, LocationIcon } from "../../../../Config";
import { ShrinkOutlined } from "@ant-design/icons";
import { IconToolTip } from "../../../../Components";

const BottomCard = ({ vehicleDetail, selectedVehicle }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className={`bg-white rounded-2xl shadow-xl transition-all duration-500 overflow-hidden ${expanded ? "w-[450px] p-2 px-4" : "w-[60px] p-2"} `}>
            {/* <IconToolTip title={'Vehicle Info'}> */}
                <button onClick={() => setExpanded((prev) => !prev)} className="w-full flex items-start cursor-pointer">
                    <div className="bg-[#bababa] rounded-full p-2 flex-shrink-0">
                        <CardInfo width={25} height={25} />
                    </div>
                    <div className={`transition-all duration-500 ${expanded ? "opacity-100" : "opacity-0 h-0 mt-0"} overflow-hidden`}>
                        {vehicleDetail?.location && (
                            <div className="bg-[#FFFFFF] rounded-3xl py-[8px] px-[18px] flex items-center gap-[8px] max-w-[400px] w-full shadow-md">
                                <LocationIcon width={45} />
                                <p className="irgo_captions !text-[#00888A]">
                                    {vehicleDetail?.location}
                                </p>
                            </div>
                        )}

                        <div className="bg-[#FFFFFF] rounded-2xl px-[28px] shadow-md">
                            <div className="flex items-center gap-[12px]">
                                <h3 className="!text-[28px]">{selectedVehicle?.VehicleNumber}</h3>
                                <p>{`( ${formatDateTime(selectedVehicle?.ModifiedOn)} )`}</p>
                            </div>

                            <div className="grid grid-cols-3 gap-4 text-center mt-3">
                                <div>
                                    <label className="!text-[#696969] !text-[12px] block">Range</label>
                                    <h5 className="!text-[#00888A] !text-[20px]">
                                        {vehicleDetail?.range ? `${vehicleDetail.range}KM` : "-"}
                                    </h5>
                                </div>
                                <div>
                                    <label className="!text-[#696969] !text-[12px] block">Mileage</label>
                                    <h5 className="!text-[#00888A] !text-[20px]">
                                        {vehicleDetail?.mileage ? `${vehicleDetail.mileage}KM` : "-"}
                                    </h5>
                                </div>
                                <div>
                                    <label className="!text-[#696969] !text-[12px] block">Battery</label>
                                    <h5 className="!text-[#00888A] !text-[20px]">
                                        {vehicleDetail?.battery ? `${vehicleDetail.battery}%` : "-"}
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </button>
            {/* </IconToolTip> */}
        </div>
    );
};

export default BottomCard;

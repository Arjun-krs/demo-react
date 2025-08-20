import React from 'react'
import dayjs from "dayjs";

const PopupCard = ({ selectedVehicle }) => {

    return (
        <div className='flex flex-col gap-[12px]'>
            <h5>Details</h5>

            <div className="grid grid-cols-3 gap-4">
                <div>
                    <label className="!text-[#696969] !text-[12px]">Vehicle No:</label>
                    <p className="!text-[#00888A] !text-[14px]">
                        {selectedVehicle?.VehicleNumber || "-"}
                    </p>
                </div>
                <div>
                    <label className="!text-[#696969] !text-[12px]">Category:</label>
                    <p className="!text-[#00888A] !text-[14px]">
                        {selectedVehicle?.VehicleCategory?.Category || "-"}
                    </p>
                </div>
                <div>
                    <label className="!text-[#696969] !text-[12px]">Engine No:</label>
                    <p className="!text-[#00888A] !text-[14px]">
                        {selectedVehicle?.EngineNo || "-"}
                    </p>
                </div>
                <div>
                    <label className="!text-[#696969] !text-[12px]">Chassis No:</label>
                    <p className="!text-[#00888A] !text-[14px]">
                        {selectedVehicle?.ChasisNo || "-"}
                    </p>
                </div>
                <div>
                    <label className="!text-[#696969] !text-[12px]">Vehicle Color:</label>
                    <p className="!text-[#00888A] !text-[14px]">
                        {selectedVehicle?.VehicleColor || "-"}
                    </p>
                </div>
                <div>
                    <label className="!text-[#696969] !text-[12px]">Vehicle Brand:</label>
                    <p className="!text-[#00888A] !text-[14px]">
                        {selectedVehicle?.VehicleModel || "-"}
                    </p>
                </div>
                <div>
                    <label className="!text-[#696969] !text-[12px]">Vehicle Description:</label>
                    <p className="!text-[#00888A] !text-[14px]">
                        {selectedVehicle?.VehicleDescp || "-"}
                    </p>
                </div>
                <div>
                    <label className="!text-[#696969] !text-[12px]">Fuel Type:</label>
                    <p className="!text-[#00888A] !text-[14px]">
                        {selectedVehicle?.FuelType || "-"}
                    </p>
                </div>
                <div>
                    <label className="!text-[#696969] !text-[12px]">Purchase Date:</label>
                    <p className="!text-[#00888A] !text-[14px]">
                        {selectedVehicle?.PurDate
                            ? dayjs(selectedVehicle.PurDate).format("DD/MM/YYYY")
                            : "-"}
                    </p>
                </div>
                <div>
                    <label className="!text-[#696969] !text-[12px]">Remarks:</label>
                    <p className="!text-[#00888A] !text-[14px]">
                        {selectedVehicle?.Remarks || "-"}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default PopupCard

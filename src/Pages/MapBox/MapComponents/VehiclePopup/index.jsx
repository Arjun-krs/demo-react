// VehiclePopup.jsx
import React from "react";

const VehiclePopup = ({ vehicle, coordinates }) => {
    return (
        <div>
            <label className="!text-[#696969] !text-[12px]">Vehicle No:</label>
            <p className="!text-[#00888A] !text-[14px]">
                {vehicle?.VehicleNumber || "-"}
            </p>

            <label className="!text-[#696969] !text-[12px]">Category:</label>
            <p className="!text-[#00888A] !text-[14px]">
                {vehicle?.VehicleCategory?.Category || "N/A"}
            </p>

            <label className="!text-[#696969] !text-[12px]">Coordinates:</label>
            <p className="!text-[#00888A] !text-[14px]">
                Lat: {coordinates.lat.toFixed(5)}, Lng: {coordinates.lng.toFixed(5)}
            </p>
        </div>
    );
};

export default VehiclePopup;

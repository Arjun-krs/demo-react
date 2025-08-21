import React, { useRef } from 'react'
import { DropdownMenu } from '../../MapComponents';
import { BikeImg, CarImg, HilluxImg, LorryImg, StreamRollerImg, TractorImg, VanImg } from '../../../../Config';

const VehicleCard = ({ vehicle, className, onOptions }) => {
    const dropdownRef = useRef(null);
console.log('vehicle sidebar',vehicle);

    const renderVehicleIcon = () => {
        const type = vehicle?.VehicleCategory?.Category?.toLowerCase()
        if (type === 'tractor') {
            return <TractorImg />
        } else if (type === 'lorry') {
            return <LorryImg />
        } else if (type === 'hilux' || type === 'hillux') {
            return <HilluxImg />
        } else if (type === 'car') {
            return <CarImg />
        } else if (type === 'bike') {
            return <BikeImg />
        } else if (type === 'stream_roller') {
            return <StreamRollerImg />
        } else if (type === 'van') {
            return <VanImg />
        } else {
            return <LorryImg />
        }
    }

    const handleOption = (action) => {
        onOptions?.(action, vehicle);
    };

    const dropdownItems = [
        { label: 'Playback', value: 'playback' },
        { label: 'Track', value: 'track' },
        { label: 'Details', value: 'details' },
    ];

    return (
        <div className={`${className} relative flex justify-between items-center`}>
            <div className="flex gap-[8px] items-center">
                {renderVehicleIcon()}
                <div>
                    <p className='!text-[18px] !text-[#1F1F1F]'>{vehicle?.devicename}</p>
                    {vehicle?.routeData && (
                        <p className='!text-[#696969]'>{`${vehicle?.routeData?.travelled}km / ${vehicle?.routeData?.total}km`}</p>
                    )}
                </div>
            </div>

            <div className="relative" ref={dropdownRef}>
                <DropdownMenu
                    items={dropdownItems}
                    onSelect={(action) => {
                        handleOption(action);
                    }}
                />
            </div>
        </div >
    );
};

export default VehicleCard

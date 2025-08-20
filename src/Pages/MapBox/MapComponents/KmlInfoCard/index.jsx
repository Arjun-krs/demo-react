import React from 'react'

const KmlInfoCard = ({ cardInfo }) => {
    return (
        <div className='grid grid-cols-3 gap-4'>
            <div>
                <label className='!text-[#696969] !text-[12px]'>Name</label>
                <h5 className='!text-[#00888A] !text-[20px]'>{cardInfo?.name || 'Nil'}</h5>
            </div>
            <div>
                <label className='!text-[#696969] !text-[12px]'>Area Ha</label>
                <h5 className='!text-[#00888A] !text-[20px]'>{cardInfo?.Area_Ha || 'Nil'}</h5>
            </div>
            <div>
                <label className='!text-[#696969] !text-[12px]'>Block</label>
                <h5 className='!text-[#00888A] !text-[20px]'>{cardInfo?.Block || 'Nil'}</h5>
            </div>
            <div>
                <label className='!text-[#696969] !text-[12px]'>Estate</label>
                <h5 className='!text-[#00888A] !text-[20px]'>{cardInfo?.Estate || 'Nil'}</h5>
            </div>
            <div>
                <label className='!text-[#696969] !text-[12px]'>Global ID</label>
                <h5 className='!text-[#00888A] !text-[20px]'>{cardInfo?.GlobalID || 'Nil'}</h5>
            </div>
            <div>
                <label className='!text-[#696969] !text-[12px]'>Gross Area</label>
                <h5 className='!text-[#00888A] !text-[20px]'>{cardInfo?.GrossArea || 'Nil'}</h5>
            </div>
            <div>
                <label className='!text-[#696969] !text-[12px]'>Lduse Area</label>
                <h5 className='!text-[#00888A] !text-[20px]'>{cardInfo?.Lduse_area || 'Nil'}</h5>
            </div>
            <div>
                <label className='!text-[#696969] !text-[12px]'>Planted Area</label>
                <h5 className='!text-[#00888A] !text-[20px]'>{cardInfo?.PlantedAre || 'Nil'}</h5>
            </div>
            <div>
                <label className='!text-[#696969] !text-[12px]'>YOP</label>
                <h5 className='!text-[#00888A] !text-[20px]'>{cardInfo?.YOP || 'Nil'}</h5>
            </div>
        </div>
    )
}

export default KmlInfoCard

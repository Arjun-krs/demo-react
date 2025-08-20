// import React from 'react';
// import { Modal } from 'antd';
// import { CloseOutlined } from '@ant-design/icons';
// import "./style.scss"

// const CustomModal = ({open,onClose,title = '',children,footer = null,width = 600,closable = true,centered = true,}) => {
  
//     return (
//         <>
//             <Modal open={open} onCancel={''}footer={footer}width={width}closable={false}centered={centered}>
//                 <div className='mb-5'>
//                     <h5 className="text-center  flex justify-center relative">{title}</h5>
//                     {closable && (<button onClick={onClose}className="irgo_action_icons text-gray-500 transition-all absolute"><CloseOutlined className=" cursor-pointer text-lg" /></button>)}
//                 </div>
//                 <div className="text-gray-700">{children}</div>
//             </Modal>
//         </>
//     );
// };

// export default CustomModal;


import React, { useState } from 'react';
import { Modal } from 'antd';
import { CloseOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import "./style.scss"

const CustomModal = ({
    open,
    onClose,
    title = '',
    children,
    footer = null,
    width = 600,
    closable = true,
    centered = true,
    confirmClose = true, 
    confirmTitle = 'Confirm Close', 
    confirmMessage = 'Are you sure you want to close ? Any unsaved changes will be lost.' 
}) => {
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleClose = () => {
        if (confirmClose) {
            setShowConfirmation(true);
        } else {
            onClose();
        }
    };

    const handleConfirmClose = () => {
        setShowConfirmation(false);
        onClose();
    };

    const handleCancelClose = () => {
        setShowConfirmation(false);
    };

    return (
        <>
            <Modal 
                open={open} 
                // onCancel={handleClose}
                footer={footer}
                width={width}
                closable={false}
                centered={centered}
            >
                <div className='mb-5'>
                    <h5 className="text-center flex justify-center relative">{title}</h5>
                    {closable && (
                        <button 
                            onClick={handleClose}
                            className="irgo_action_icons text-gray-500 transition-all absolute"
                        >
                            <CloseOutlined className="cursor-pointer text-lg" />
                        </button>
                    )}
                </div>
                <div className="text-gray-700">{children}</div>
            </Modal>

            {/* Confirmation Modal */}
            <Modal
                open={showConfirmation}
                title={
                    <div className="flex items-center">
                        <ExclamationCircleOutlined className="text-orange-500 mr-2" />
                        {confirmTitle}
                    </div>
                }
                onOk={handleConfirmClose}
                onCancel={handleCancelClose}
                okText="Yes, Close"
                cancelText="Stay"
                okButtonProps={{ 
                    style: { backgroundColor: '#00888A', borderColor: '#00888A' }
                }}
                centered
                width={400}
            >
                <p>{confirmMessage}</p>
            </Modal>
        </>
    );
};

export default CustomModal;
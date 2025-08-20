import React from 'react';
import './style.scss';

const CustomButton = ({
    varient = 'primary',
    loading = false,
    disabled = false,
    iconLeft = null,
    iconRight = null,
    label,
    className,
    onClick,
    ...rest
}) => {

    return (
        <button
            className={`btn__wrapper flex justify-center items-center py-[10px] px-[20px] text-[16px] font-[500] ${className} ${varient} ${disabled ? 'disabled' : ''}`}
            onClick={onClick}
            disabled={disabled || loading}
            {...rest}
        >
            {loading ? (
                <span className="spinner"></span>
            ) : (
                <>
                    {iconLeft && <span >{iconLeft}</span>}
                    {label && <span className="mx-2">{label}</span>}
                    {iconRight && <span >{iconRight}</span>}
                </>
            )}
        </button>
    );
};

export default CustomButton;

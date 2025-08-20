import React from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import "./style.scss";

const DatePickerComp = ({
    value,
    onChange,
    format = "YYYY-MM-DD",
    showTime = false,
    placeholder = "Select Date",
    disabled = false,
    className = "",
    label,
    showAsterisk,
    error,
    allowClear = true,
}) => {
    const formattedValue = value ? dayjs(value) : null;
    const handleChange = (date, dateString) => {
        if (onChange) {
            const formattedDate = date ? date.format(format) : null;
            onChange(formattedDate, dateString);
        }
    };

    return (
        <div className={`date-picker-wrapper ${className}`}>
            {label && (
                <label className="mb-1 text-[14px]" style={{ display: "block" }}>
                    {label}
                    {showAsterisk && (
                        <span className="asterisk ml-1" style={{ color: "red" }}>
                            *
                        </span>
                    )}
                </label>
            )}

            <DatePicker
                value={formattedValue}
                onChange={handleChange}
                format={format}
                showTime={showTime}
                placeholder={placeholder}
                disabled={disabled}
                allowClear={allowClear}
                className={`w-full !p-[10px] ${error ? "error-border" : ""}`}
                classNames={{
                    popup: {
                        root: "custom-datepicker-popup",
                    },
                }}
            />

            {error && (
                <div className="text-[red]" style={{ fontSize: 12 }}>
                    {error}
                </div>
            )}
        </div>
    );
};

export default DatePickerComp;

import React from "react";
import { Popover } from "antd";
import "./style.scss";

const IconToolTip = ({ title, children, onClick, placement = "top" }) => {
  return (
    <Popover
      content={title}
      placement={placement}
      trigger="hover"
      mouseEnterDelay={0.1}
      mouseLeaveDelay={0.1}
      overlayStyle={{
        maxWidth: '200px'
      }}
    >
      <div onClick={onClick} className="cursor-pointer custom-tooltip-wrapper">
        {children}
      </div>
    </Popover>
  );
};

export default IconToolTip;
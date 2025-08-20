import React, { useState } from "react";
import {
    PlayCircleOutlined,
    PauseCircleOutlined,
    RedoOutlined,
    StepBackwardOutlined,
    StepForwardOutlined,
} from "@ant-design/icons";
import { IconToolTip } from "../../../../Components";

const PlaybackCard = ({ onPlay, onPause, onRewind, onRestart, onForward }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlay = () => {
        setIsPlaying(true);
        onPlay?.();
    };

    const handlePause = () => {
        setIsPlaying(false);
        onPause?.();
    };

    return (
        <div className="bg-white shadow-md rounded-2xl flex items-center justify-center gap-4 px-6 py-3">
            <IconToolTip title={'Rewind'}>
                <StepBackwardOutlined
                    className="text-xl cursor-pointer hover:text-blue-500"
                    onClick={onRewind}
                />
            </IconToolTip>

            {!isPlaying ? (
                <IconToolTip title={'Play'}>
                    <PlayCircleOutlined
                        className="text-2xl cursor-pointer hover:text-green-500"
                        onClick={handlePlay}
                    />
                </IconToolTip>
            ) : (
                <IconToolTip title={'Pause'}>
                    <PauseCircleOutlined
                        className="text-2xl cursor-pointer hover:text-red-500"
                        onClick={handlePause}
                    />
                </IconToolTip>
            )}

            <IconToolTip title={'Restart'}>
                <RedoOutlined
                    className="text-xl cursor-pointer hover:text-purple-500"
                    onClick={() => {
                        setIsPlaying(false);
                        onRestart?.();
                    }}
                />
            </IconToolTip>

            <IconToolTip title={'Forward'}>
                <StepForwardOutlined
                    className="text-xl cursor-pointer hover:text-blue-500"
                    onClick={onForward}
                />
            </IconToolTip>
        </div>
    );
};

export default PlaybackCard;

import React, { useState, useEffect } from 'react';


type TimerProps = {
    caption?: string;
    duration: number;
    isRunning: boolean;
    onTimeOver?: () => void;
};


export const Timer: React.FC<TimerProps> = ({
    caption,
    duration,
    isRunning,
    onTimeOver
}) => {
    const [timeLeft, setTimeLeft] = useState<number>(duration);


    useEffect(() => {
        if (timeLeft <= 0) {
            setTimeLeft(0);
            if (onTimeOver) {
                onTimeOver();
            }
        }
    }, [timeLeft]);


    if(isRunning) {
        setTimeout(() => {
            setTimeLeft(timeLeft - 100);
        }, 100);
    };

    return (
        <div className="timer">
            <div className="timer__time">
                {caption}
                {
                    Math.floor(timeLeft / 1000).toString().padStart(2, '0') + ':' +
                    Math.floor((timeLeft % 1000) / 10).toString().padStart(2, '0')

                }s
            </div>
        </div>
    );
};

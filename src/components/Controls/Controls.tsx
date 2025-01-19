import React from 'react';
import { usePlaymodoroContext } from '../../contexts/playmodoro';



import { RiShutDownLine } from '@remixicon/react';
import { RiSkipBackLine } from '@remixicon/react';
import { RiSkipForwardLine } from '@remixicon/react';
import { RiRepeatLine } from '@remixicon/react';




export const Controls: React.FC = () => {
    const {
        state, dispatchState,
    } = usePlaymodoroContext();


    return (
        <>
            <div className="playmodoro__controls">
                <RiSkipBackLine
                    className="start-cycles-button"
                    size={70}
                    onClick={() => dispatchState({
                        type: "PREVIOUS_VIDEO",
                    })}
                    color={'#aaa'}
                />

                <RiShutDownLine
                    className="start-cycles-button"
                    size={70}
                    onClick={() => dispatchState({
                        type: "TOOGLE_RUN_STATE",
                    })}
                    color={state.isRunning ? '#0fa' : '#aaa'}
                />

                <RiSkipForwardLine
                    className="start-cycles-button"
                    size={70}
                    onClick={() => dispatchState({
                        type: "NEXT_VIDEO",
                    })}
                    color={'#aaa'}
                />

                <RiRepeatLine
                    className="start-cycles-button"
                    size={70}
                    onClick={() => dispatchState({
                        type: "TOGGLE_REPEAT",
                    })}
                    color={state.repeat ? '#0fa' : '#aaa'}
                />

            </div>

            <label className="no_pause">
                <span className="no_pause__caption">
                    Skip pauses
                </span>

                <input
                    type="checkbox"
                    className="toggle"
                    checked={state.skipPause} onChange={() => dispatchState({
                        type: "TOGGLE_SKIP_PAUSE",
                    })}
                />
            </label>
        </>
    );
};
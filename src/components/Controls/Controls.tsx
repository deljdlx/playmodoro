import React from 'react';
import { usePlaymodoroContext } from '../../contexts/playmodoro';

import { RiShutDownLine } from '@remixicon/react';
import { RiSkipBackLine } from '@remixicon/react';
import { RiSkipForwardLine } from '@remixicon/react';
import { RiRepeatLine } from '@remixicon/react';


import {
    motion
} from "framer-motion";


export const Controls: React.FC = () => {
    const {
        state, dispatchState,
    } = usePlaymodoroContext();


    return (
        <>
            <div className="playmodoro__controls">


                <motion.button
                    whileTap={{ scale: 0.7 }}
                    transition={{ duration: 0.2 }}
                >

                    <RiSkipBackLine
                        className="start-cycles-button"
                        size={60}
                        onClick={() => dispatchState({
                            type: "PREVIOUS_VIDEO",
                        })}
                        color={'#aaa'}
                    />
                </motion.button>

                <motion.button
                    whileTap={{ scale: 0.7 }}
                    transition={{ duration: 0.2 }}
                >

                    <RiShutDownLine
                        className="start-cycles-button"
                        size={60}
                        onClick={() => dispatchState({
                            type: "TOGGLE_RUN_STATE",
                        })}
                        color={state.isRunning ? '#0fa' : '#aaa'}
                    />
                </motion.button>


                <motion.button
                    whileTap={{ scale: 0.7 }}
                    transition={{ duration: 0.2 }}
                >

                    <RiSkipForwardLine
                        className="start-cycles-button"
                        size={60}
                        onClick={() => dispatchState({
                            type: "NEXT_VIDEO",
                        })}
                        color={'#aaa'}
                    />
                </motion.button>


                <motion.button
                    whileTap={{ scale: 0.7 }}
                    transition={{ duration: 0.2 }}
                >
                    <RiRepeatLine
                        className="start-cycles-button"
                        size={60}
                        onClick={() => dispatchState({
                            type: "TOGGLE_REPEAT",
                        })}
                        color={state.repeat ? '#0fa' : '#aaa'}
                    />
                </motion.button>

            </div>

            <label className="no_pause">
                <span className="no_pause__caption">
                    Skip pauses
                </span>

                <input
                    type="checkbox"
                    className="toggle"
                    style={{
                        color: state.skipPause ? '#0fa': '',
                    }}
                    checked={state.skipPause} onChange={() => dispatchState({
                        type: "TOGGLE_SKIP_PAUSE",
                    })}
                />
            </label>
        </>
    );
};
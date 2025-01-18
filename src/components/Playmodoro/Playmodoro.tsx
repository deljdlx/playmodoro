import React, { useEffect, useState } from 'react';

import type { Video } from '../../types/Video';

import { Storage } from '../../utils/storage';

import { PlaymodoroCyclesInformations } from '../PlaymodoroCyclesInformations/PlaymodoroCyclesInformations';

import { Tab } from '../Tab/Tab';



import { VideosList } from '../VideosList/VideosList';
import { Player } from '../Player/Player';
import { defaultConfiguration } from '../../configurations/defaultConfiguration';


import { usePlaymodoroContext } from '../../contexts/playmodoro';

import { RiShutDownLine } from '@remixicon/react';
import { RiSkipBackLine } from '@remixicon/react';
import { RiSkipForwardLine } from '@remixicon/react';
import { RiRepeatLine } from '@remixicon/react';



type PlaylistEditorProps = {
};


export const Playmodoro: React.FC<PlaylistEditorProps> = ({
}) => {

    const {
        state, dispatchState,
    } = usePlaymodoroContext();

    const [isReady, setIsReady] = useState(false);
    const [localWorkCycleDuration, setLocalWorkCycleDuration] = useState(state.configuration.workCycleDuration);
    const [localPauseCycleDuration, setLocalPauseCycleDuration] = useState(state.configuration.pauseCycleDuration);


    useEffect(() => {
        const configuration = Storage.get('configuration') || defaultConfiguration;

        dispatchState({
            type: "SET_CONFIGURATION",
            payload: configuration,
        });

        setIsReady(true);

    }, []);

    // save configuration to localStorage
    useEffect(() => {
        if (isReady) {
            Storage.set('configuration', state.configuration);
        }
    }, [state.configuration, ]);




    const handlePlaylistChange = (playlistName: string, videos: Video[]) => {
        dispatchState({
            type: "UPDATE_PLAYLIST",
            payload: {
                playlistName: playlistName,
                videos: videos,
            }
        });
    };

    const handleVideoClick = (video: Video) => {
        dispatchState({
            type: "SET_CURRENT_VIDEO",
            payload: video,
        });
    }


    return (
        <>
            <div className="playmodoro">
                <div role="tablist" className="playmodoro-tabs tabs tabs-bordered">
                    <Tab
                        name="my_tabs_1"
                        caption="Cycles"
                        checked={true}
                    >
                        <div className="playmodoro_panel cycles_panel">

                            <Player />

                            <div>
                                <PlaymodoroCyclesInformations />
                            </div>
                        </div>

                    </Tab>


                    <Tab
                        name="my_tabs_1"
                        caption="Playlists"
                    >
                        <div className="playmodoro_panel playlists_panel">

                            <div role="tablist" className="tabs tabs-bordered">
                                <Tab
                                    name="playlists_tabs"
                                    caption="Work"
                                    checked={true}
                                >
                                    <VideosList
                                        videos={state.configuration.playlists.work}
                                        onChange={(videos) => handlePlaylistChange('work', videos)}
                                        onVideoClick={handleVideoClick}
                                    />
                                </Tab>
                                <Tab
                                    name="playlists_tabs"
                                    caption="Pause"
                                >
                                    <VideosList
                                        videos={state.configuration.playlists.pause}
                                        onChange={(videos) => handlePlaylistChange('pause', videos)}
                                    />
                                </Tab>
                            </div>
                        </div>
                    </Tab>

                    <Tab
                        name="my_tabs_1"
                        caption="Settings"
                    >
                        <div className="playmodoro_panel playlists_panel">

                            <div role="tablist" className="tabs tabs-bordered">

                                <div className="playmodoro-cycles-settings">
                                    <div>
                                        <fieldset>
                                            <label className="form-control w-full">
                                                <div className="label">
                                                    <span className="label-text">Cycles number</span>
                                                </div>

                                                <div className="flex gap-1">
                                                    <input
                                                        type="number"
                                                        min={1}
                                                        className="input input-bordered w-full grow"
                                                        placeholder="A number"
                                                        value={state.configuration.cycles}
                                                        onChange={(e) => dispatchState({
                                                            type: "SET_CYCLES_NUMBER",
                                                            payload: parseInt(e.target.value),
                                                        })}
                                                        onClick={(e) => e.currentTarget.select()}
                                                    />

                                                    <button className="btn btn-primary btn-md" type="submit">OK</button>
                                                </div>

                                            </label>

                                        </fieldset>

                                        <fieldset>
                                            <label className="form-control w-full">
                                                <div className="label">
                                                    <span className="label-text">Work duration in minutes</span>
                                                </div>
                                                <div className="flex gap-1">
                                                    <input
                                                        type="number"
                                                        step="0.1"
                                                        min="0.1"
                                                        className="input input-bordered w-full grow"
                                                        placeholder={(state.configuration.workCycleDuration / 60000).toString()}
                                                        onBlur={(e) => {
                                                            if (isNaN(parseFloat(e.target.value)) || parseFloat(e.target.value) <= 0) {
                                                                e.target.value = state.configuration.workCycleDuration.toString();
                                                            }

                                                            dispatchState({
                                                                type: "SET_WORK_CYCLE_DURATION",
                                                                payload: parseFloat(e.target.value),
                                                                // payload: parseInt(e.target.value),
                                                            })
                                                        }}
                                                        onClick={(e) => e.currentTarget.select()}
                                                    />
                                                    <button className="btn btn-primary btn-md" type="submit">OK</button>
                                                </div>
                                            </label>
                                        </fieldset>

                                        <fieldset>
                                            <label className="form-control w-full">
                                                <div className="label">
                                                    <span className="label-text">Pause duration in minutes</span>
                                                </div>
                                                <div className="flex gap-1">
                                                    <input
                                                        type="number"
                                                        step="0.1"
                                                        min="0.1"
                                                        className="input input-bordered w-full grow"
                                                        placeholder={(state.configuration.pauseCycleDuration / 60000).toString()}
                                                        onBlur={(e) => {
                                                            if (isNaN(parseFloat(e.target.value)) || parseFloat(e.target.value) <= 0) {
                                                                e.target.value = state.configuration.pauseCycleDuration.toString();
                                                            }

                                                            dispatchState({
                                                                type: "SET_PAUSE_CYCLE_DURATION",
                                                                payload: parseFloat(e.target.value),
                                                                // payload: parseInt(e.target.value),
                                                            })
                                                        }}
                                                        onClick={(e) => e.currentTarget.select()}
                                                    />
                                                    <button className="btn btn-primary btn-md" type="submit">OK</button>
                                                </div>
                                            </label>
                                        </fieldset>

                                        {/* <button className="btn btn-primary btn-md" type="submit">Add</button> */}
                                    </div>
                                </div>




                            </div>
                        </div>
                    </Tab>



                </div>



                <div className="playmodoro__controls">

                    {/* previous icon */}

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

                {/* <div>
                    <input type="range" min="0" max="100" value="40" className="range range-success" />
                </div> */}

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


            </div>
        </>
    );
}



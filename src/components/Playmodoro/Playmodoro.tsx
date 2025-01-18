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
        console.log('%cSAVE CONFIGURATION', 'color: #ff0; font-size: 1rem');
        console.log(isReady);

        if (isReady) {
            Storage.set('configuration', state.configuration);
        }
    }, [state.configuration, ]);




    const handlePlaylistChange = (playlistName: string, videos: Video[]) => {

        console.log('%cPlaymodoro.tsx :: 126 =============================', 'color: #f00; font-size: 1rem');
        console.log(playlistName);

        dispatchState({
            type: "UPDATE_PLAYLIST",
            payload: {
                playlistName: playlistName,
                videos: videos,
            }
        });
    };



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

                            <Player
                                // onChange={handlePlayerNext}
                            />


                            {/* <h1>{currentWorkVideoElaspedTime}</h1>
                            <h1>{currentPauseVideoElaspedTime}</h1> */}
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
                                        // onVideoClick={handleVideoClick}
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
                        color={state.isRunning ? '#0fa' : '#aaa'}
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



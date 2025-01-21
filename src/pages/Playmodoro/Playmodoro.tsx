import React, { useEffect, useState } from 'react';

import type { Video } from '../../types/Video';
import { Storage } from '../../utils/Storage';
import { defaultConfiguration } from '../../configurations/defaultConfiguration';
import { usePlaymodoroContext } from '../../contexts/playmodoro';


import { PlaymodoroCyclesInformations } from '../../components/PlaymodoroCyclesInformations/PlaymodoroCyclesInformations';
import { Tab } from '../../components/Tab/Tab';
import { VideosList } from '../../components/VideosList/VideosList';
import { YoutubePlayer } from '../../components/YoutubePlayer/YoutubePlayer';
import { PlaymodoroSettings } from '../../components/PlaymodoroSettings/PlaymodoroSettings';
import { Controls } from '../../components/Controls/Controls';
import { Search } from '../../components/Search/Search';

import {
    motion
} from "framer-motion";


import { RiFileCodeLine } from '@remixicon/react';


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

                    {/* ====================================================================== */}

                    <Tab name="playmodoro_tabs" caption="▶️" checked={true}>
                        <div className="playmodoro_panel cycles_panel p-4">
                            <YoutubePlayer />
                            <div className="video_title">
                                {state.currentVideo?.title}
                            </div>
                            <div>
                                <PlaymodoroCyclesInformations />
                            </div>
                        </div>
                    </Tab>

                    {/* ====================================================================== */}

                    <Tab name="playmodoro_tabs" caption="🎧">
                        <div className="playmodoro_panel playlists_panel">
                            <div role="tablist" className="tabs tabs-bordered">
                                <Tab
                                    name="playlists_tabs"
                                    caption="Work"
                                    checked={true}
                                >
                                    <div className="playlist-content">
                                        <VideosList
                                            videos={state.configuration.playlists.work}
                                            onChange={(videos) => handlePlaylistChange('work', videos)}
                                            onVideoClick={handleVideoClick}
                                        />
                                    </div>
                                </Tab>
                                <Tab
                                    name="playlists_tabs"
                                    caption="Pause"
                                >
                                    <div className="playlist-content">
                                        <VideosList
                                            videos={state.configuration.playlists.pause}
                                            onChange={(videos) => handlePlaylistChange('pause', videos)}
                                        />
                                    </div>
                                </Tab>

                                <Tab
                                    name="playlists_tabs"
                                    caption="🔎"
                                >
                                    <div className="playlist-content mt-4">
                                        <Search />
                                    </div>

                                </Tab>

                            </div>
                        </div>
                    </Tab>
                    <Tab name="playmodoro_tabs" caption="⚙️">
                        <div className="playmodoro_panel setting_panel p-4">
                            <PlaymodoroSettings />
                        </div>
                    </Tab>

                    <Tab name="playmodoro_tabs" caption="ℹ️">
                        <div className="playmodoro_panel setting_panel p-4">
                            <iframe src="/help.html"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: 'transparent',
                                }}
                                allowTransparency={true}
                            ></iframe>
                        </div>
                    </Tab>

                    {/* ====================================================================== */}

                    {state.debugMode && (
                        <Tab name="playmodoro_tabs" caption="💾">
                            <div className="playmodoro_panel json_panel p-4">
                                <motion.button
                                        className="copy_configuration_trigger"
                                        // whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.7 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                    <RiFileCodeLine
                                        size={50}
                                        onClick={() => {
                                            navigator.clipboard.writeText(JSON.stringify(state.configuration, null, 4));
                                        }}
                                    />
                                </motion.button>
                                <textarea
                                    value={JSON.stringify(state.configuration, null, 4)}
                                    readOnly={true}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        fontFamily: 'monospace',
                                        fontSize: '10px',
                                    }}
                                ></textarea>
                            </div>
                        </Tab>
                    )}
                </div>
                <Controls />
            </div>
        </>
    );
}



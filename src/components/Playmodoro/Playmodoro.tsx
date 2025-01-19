import React, { useEffect, useState } from 'react';

import type { Video } from '../../types/Video';
import { Storage } from '../../utils/Storage';
import { defaultConfiguration } from '../../configurations/defaultConfiguration';
import { usePlaymodoroContext } from '../../contexts/playmodoro';


import { PlaymodoroCyclesInformations } from '../PlaymodoroCyclesInformations/PlaymodoroCyclesInformations';
import { Tab } from '../Tab/Tab';
import { VideosList } from '../VideosList/VideosList';
import { YoutubePlayer } from '../YoutubePlayer/YoutubePlayer';
import { CycleSettings } from '../CycleSettings/CycleSettings';
import { Controls } from '../Controls/Controls';
import { Search } from '../Search/Search';


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

                    <Tab name="playmodoro_tabs" caption="Cycle" checked={true}>
                        <div className="playmodoro_panel cycles_panel p-4">
                            <YoutubePlayer />
                            <div>
                                <PlaymodoroCyclesInformations />
                            </div>
                        </div>
                    </Tab>

                    <Tab name="playmodoro_tabs" caption="Playlists">
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
                            <CycleSettings />
                        </div>
                    </Tab>
                </div>
                <div>
                    <Controls />
                </div>
            </div>
        </>
    );
}



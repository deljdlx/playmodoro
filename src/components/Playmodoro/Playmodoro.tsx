import React, { useEffect, useState } from 'react';

import type { Video } from '../../types/Video';
import { Storage } from '../../utils/storage';
import { defaultConfiguration } from '../../configurations/defaultConfiguration';
import { usePlaymodoroContext } from '../../contexts/playmodoro';


import { PlaymodoroCyclesInformations } from '../PlaymodoroCyclesInformations/PlaymodoroCyclesInformations';
import { Tab } from '../Tab/Tab';
import { VideosList } from '../VideosList/VideosList';
import { Player } from '../Player/Player';
import { CycleSettings } from '../CycleSettings/CycleSettings';
import { Controls } from '../Controls/Controls';




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

                    <Tab name="playmodoro_tabs" caption="Cycles" checked={true}>
                        <div className="playmodoro_panel cycles_panel">
                            <Player />
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
                    <Tab name="playmodoro_tabs" caption="Settings">
                        <CycleSettings />
                    </Tab>
                </div>
                <div>
                    <Controls />
                </div>
            </div>
        </>
    );
}



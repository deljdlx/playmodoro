import React, { createContext, useContext, useState, useEffect,  ReactNode, useReducer } from "react";
import { PlaymodoroConfiguration } from "../types/PlaymodoroConfiguration";
import { Video } from "../types/Video";

type PlaymodoroContextType = {
    configuration: PlaymodoroConfiguration;
    state: PlaymodoroState;
    dispatchState: React.Dispatch<PlaymodoroAction>;
};

const PlaymodoroContext = createContext<PlaymodoroContextType | null>(null);

type PlaymodoroProviderProps = {
    children: ReactNode;
    configuration: PlaymodoroConfiguration;
};



// ====================================================================
type PlaymodoroState = {

    configuration: PlaymodoroConfiguration;

    player?: any;

    lastTick: Date;

    isRunning: boolean;
    skipPause: boolean;
    repeat: boolean;
    isWorkCycleRunning: boolean;
    currentPlaylist: string;
    videoReady: boolean;

    currentWorkVideoIndex: number;
    currentWorkVideoElaspedTime: number;

    currentPauseVideoIndex: number;
    currentPauseVideoElaspedTime: number;

    timeElapsed: number;
    workTimeElapsed: number;
    pauseTimeElapsed: number;
    cyclesCount: number;

    // workCycleDuration: number;
    // pauseCycleDuration: number;

    currentVideo?: Video;
};

type PlaymodoroAction =
    | { type: "SET_PLAYER"; payload: any; }

    | { type: "VIDEO_ENDED";}
    | { type: "VIDEO_READY";}
    | { type: "VIDEO_PLAYING";}
    | { type: "VIDEO_PAUSED";}

    | { type: "TOOGLE_RUN_STATE";}
    | { type: "TOGGLE_SKIP_PAUSE";}
    | { type: "TOGGLE_REPEAT";}

    | { type: "NEXT_VIDEO";}
    | { type: "PREVIOUS_VIDEO";}
    | { type: "SET_CURRENT_VIDEO"; payload: Video; }



    | { type: "UPDATE_PLAYLIST"; payload: {
        playlistName: string;
        videos: Video[];
    }}

    | { type: "HANDLE_TICK";}
    | { type: "SET_CURRENT_VIDEO_ELAPSED_TIME"; payload: number;}

    | { type: "SET_CONFIGURATION"; payload: PlaymodoroConfiguration; }


;


const initialState: PlaymodoroState = {
    configuration:{
        workCycleDuration: 0,
        pauseCycleDuration: 0,
        cycles: 0,
        playlists: {
            work: [],
            pause: [],
        },
    },

    lastTick: new Date(),


    // playlists: playlists,

    isRunning: false,
    skipPause: false,
    repeat: false,
    isWorkCycleRunning: true,
    videoReady: false,


    currentPlaylist: 'work',
    currentWorkVideoIndex: 0,
    currentPauseVideoIndex: 0,

    currentWorkVideoElaspedTime: 0,
    currentPauseVideoElaspedTime: 0,

    timeElapsed: 0,
    workTimeElapsed: 0,
    pauseTimeElapsed: 0,
    cyclesCount: 0,
};

const playmodoroReducer = (state: PlaymodoroState, action: PlaymodoroAction): PlaymodoroState => {

    const handleCases = (): PlaymodoroState => {

        switch (action.type) {

            case "SET_PLAYER": {
                let newState = {...state};
                newState.player = action.payload;
                return newState;
            }
            case "SET_CURRENT_VIDEO_ELAPSED_TIME": {
                let newState = {...state};
                if(state.isWorkCycleRunning) {
                    newState.currentWorkVideoElaspedTime = action.payload;
                }
                else {
                    newState.currentPauseVideoElaspedTime = action.payload;
                }
                return newState;
            };
            case "HANDLE_TICK": {
                return handleTick(state);
            }

            case "NEXT_VIDEO": {
                return nextVideo(state);
            }

            case "PREVIOUS_VIDEO": {
                return previousVideo(state);
            }

            case "TOGGLE_REPEAT": {
                let newState = {...state};
                newState.repeat = !state.repeat;
                return newState;
            }

            case "TOOGLE_RUN_STATE":
                return {
                    ...state,
                    lastTick: new Date(),
                    isRunning: !state.isRunning,
                    cyclesCount:
                        (state.cyclesCount >= state.configuration.cycles && !state.isRunning)
                            ? 0
                            : state.cyclesCount,
                };
            case "TOGGLE_SKIP_PAUSE": {
                let newState = {...state};
                newState.skipPause = !state.skipPause;
                return newState;
            }

            case "VIDEO_ENDED": {
                console.log('%cVIDEO_ENDED', 'color: #f00; font-size: 3rem');
                if(state.repeat) {
                    return rewindVideo(state);
                }
                return nextVideo(state);
            }

            case "VIDEO_PLAYING": {
                console.log('%cVIDEO_READY', 'color: #f00; font-size: 3rem');
                return  {
                    ...state,
                    isRunning: true,
                };
            }

            case "VIDEO_PAUSED": {
                console.log('%cVIDEO_PAUSED', 'color: #f00; font-size: 3rem');
                return  {
                    ...state,
                    isRunning: false,
                };
            }

            case "VIDEO_READY": {
                console.log('%cVIDEO_READY', 'color: #f00; font-size: 3rem');
                return  {
                    ...state,
                    videoReady: true,
                };
            }

            case "SET_CURRENT_VIDEO": {
                let newState = {
                    ...state,
                    currentVideo: action.payload,
                };

                if(state.isWorkCycleRunning) {
                    newState.currentWorkVideoElaspedTime = 0;
                    newState.currentWorkVideoIndex = state.configuration.playlists.work.findIndex((video) => video.id === action.payload.id);
                }
                else {
                    newState.currentPauseVideoElaspedTime = 0;
                    newState.currentPauseVideoIndex = state.configuration.playlists.pause.findIndex((video) => video.id === action.payload.id);
                }

                return newState;

            };
            case "UPDATE_PLAYLIST": {
                let newState = {
                    ...state,
                    configuration: {
                        ...state.configuration
                    },
                };

                // https://www.youtube.com/watch?v=DCtouot15cA
                // https://www.youtube.com/watch?v=le1QF3uoQNg

                if(
                    !newState.configuration.playlists[action.payload.playlistName].length
                    && action.payload.videos.length
                ) {
                    newState.currentVideo = {
                        ...action.payload.videos[0]
                    };
                    console.log('%cSET CURRENT VIDEO IF', 'color: #f00; font-size: 2rem');
                    console.log(state.currentVideo);
                    console.log(newState.currentVideo);
                }
                else {
                    console.log('%cSET CURRENT VIDEO ELSE', 'color: #f00; font-size: 2rem');
                    newState.currentVideo = {
                        ...newState.configuration.playlists[state.currentPlaylist][state.currentWorkVideoIndex]
                    };
                }

                newState.configuration.playlists[action.payload.playlistName] = action.payload.videos;

                console.log(JSON.stringify(newState.configuration));
                return newState;
            }

            case "SET_CONFIGURATION": {
                return {
                    ...state,
                    currentVideo: action.payload.playlists.work[0] || null,
                    configuration: action.payload,
                };
            }

            default:
                return state;
        }
    };

    const handleTick = (state: PlaymodoroState): PlaymodoroState => {
        if(!state.isRunning || !state.videoReady) {
            return state;
        }

        let newState = {...state};
        let lastTick = state.lastTick;

        let currentTick = new Date();
        let elapsed = currentTick.getTime() - lastTick.getTime();

        newState.timeElapsed += elapsed;
        newState.lastTick = currentTick;

        if(state.isWorkCycleRunning) {
            let playerElapsed = Math.round(state.player.playerInfo.currentTime * 1000);
            // console.log('%cplayerElapsed', 'color: #f00; font-size: 3rem', playerElapsed);
            if(playerElapsed) {
                newState.currentWorkVideoElaspedTime = playerElapsed;
            }

            newState.workTimeElapsed += elapsed;


            if(newState.workTimeElapsed >= state.configuration.workCycleDuration) {
                newState.cyclesCount++;

                if(newState.cyclesCount >= state.configuration.cycles) {
                    newState.isRunning = false;
                    newState.workTimeElapsed = 0;
                    // newState.isWorkCycleRunning = true;
                    // newState.currentPlaylist = 'work';
                    return newState;
                }

                if(!state.skipPause) {
                    newState.videoReady = false;
                    newState.isWorkCycleRunning = false;
                    newState.workTimeElapsed = 0;
                    newState.isWorkCycleRunning = false;
                    newState.currentPlaylist = 'pause';
                    newState.currentVideo = state.configuration.playlists.pause[state.currentPauseVideoIndex];
                }
            }
        }
        else {
            let playerElapsed = Math.round(state.player.playerInfo.currentTime * 1000);
            if(playerElapsed) {
                newState.currentPauseVideoElaspedTime = playerElapsed;
            }


            newState.pauseTimeElapsed += elapsed;
            if(newState.pauseTimeElapsed >= state.configuration.pauseCycleDuration) {
                newState.videoReady = false;
                newState.isWorkCycleRunning = true;
                newState.pauseTimeElapsed = 0;
                newState.isWorkCycleRunning = true;
                newState.currentPlaylist = 'work';
                newState.currentVideo = state.configuration.playlists.work[state.currentWorkVideoIndex];
            }
        }

        return newState;
    };

    const rewindVideo = (state: PlaymodoroState): PlaymodoroState => {
        let newState = {...state};
        if(state.isWorkCycleRunning) {
            newState.currentWorkVideoElaspedTime = 0;
        }
        else {
            newState.currentPauseVideoElaspedTime = 0;
        }
        newState.videoReady = false;
        return newState;
    }

    const nextVideo = (state: PlaymodoroState): PlaymodoroState => {
        let newState = {...state};
        if(state.isWorkCycleRunning) {
            newState.currentWorkVideoIndex = (state.currentWorkVideoIndex + 1) % state.configuration.playlists.work.length;
            newState.currentWorkVideoElaspedTime = 0;
            newState.currentVideo = state.configuration.playlists.work[newState.currentWorkVideoIndex];
        }
        else {
            newState.currentPauseVideoIndex = (state.currentPauseVideoIndex + 1) % state.configuration.playlists.pause.length;
            newState.currentPauseVideoElaspedTime = 0;
            newState.currentVideo = state.configuration.playlists.pause[newState.currentPauseVideoIndex];
        }

        newState.videoReady = false;
        return newState;
    };

    const previousVideo = (state: PlaymodoroState): PlaymodoroState => {
        let newState = {...state};
        if(state.isWorkCycleRunning) {
            newState.currentWorkVideoIndex = (state.currentWorkVideoIndex - 1) % state.configuration.playlists.work.length;
            if(newState.currentWorkVideoIndex < 0) {
                newState.currentWorkVideoIndex = state.configuration.playlists.work.length - 1;
            }
            newState.currentWorkVideoElaspedTime = 0;
            newState.currentVideo = state.configuration.playlists.work[newState.currentWorkVideoIndex];
        }
        else {
            newState.currentPauseVideoIndex = (state.currentPauseVideoIndex - 1) % state.configuration.playlists.pause.length;
            if(newState.currentPauseVideoIndex < 0) {
                newState.currentPauseVideoIndex = state.configuration.playlists.pause.length - 1;
            }
            newState.currentPauseVideoElaspedTime = 0;
            newState.currentVideo = state.configuration.playlists.pause[newState.currentPauseVideoIndex];
        }

        newState.videoReady = false;
        return newState;
    }

    return handleCases();
}
// ====================================================================
export const PlaymodoroProvider: React.FC<PlaymodoroProviderProps> = ({
    configuration,
    children,
}) => {

    initialState.configuration = configuration;

    if(configuration.playlists.work.length > 0) {
        initialState.currentVideo = configuration.playlists.work[0];
    }

    const [state, dispatchState] = useReducer(playmodoroReducer, initialState);

    if(state.isRunning) {
        setTimeout(() => {

            dispatchState({
                type: "HANDLE_TICK",
            });
        }, 100);
    }



    return (
        <PlaymodoroContext.Provider value={{
            configuration,
            state,
            dispatchState,
        }}>
            {children}
        </PlaymodoroContext.Provider>
    )
};


// Hook personnalisé pour utiliser le contexte
export const usePlaymodoroContext = (): PlaymodoroContextType => {
    const context = useContext(PlaymodoroContext);
    if (!context) {
      throw new Error("usePlaymodoroContext must be used within a PlaymodoroProvider");
    }
    return context;
  };

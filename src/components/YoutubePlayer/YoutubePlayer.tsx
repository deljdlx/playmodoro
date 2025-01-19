import React, {useState, useEffect, useRef} from 'react';
import { usePlaymodoroContext } from '../../contexts/playmodoro';

type PlayerProps = {
};


export const YoutubePlayer: React.FC<PlayerProps> = ({
}) => {
    const [isYouTubeAPIReady, setYouTubeAPIReady] = useState(false);
    const [isPlayerReady, setIsPlayerReady] = useState(false);


    const {
        state,
        dispatchState,

    } = usePlaymodoroContext();

    const playerContainerRef = useRef<HTMLDivElement | null>(null);
    const playerInstanceRef = useRef<any>(null);



    // load youtube iframe api
    useEffect(() => {
        console.log('%cLOADING YOUTUBE IFRAME API', 'color: #f0f; font-size: 2rem');

        const loadYouTubeIframeAPI = () => {
            if (!window.YT) {
                const tag = document.createElement('script');
                tag.src = 'https://www.youtube.com/iframe_api';
                const firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

                // Ajoute une fonction globale appelée par l'API YouTube une fois prête
                window.onYouTubeIframeAPIReady = () => {
                    console.log('%cIFRAME API LOADED', 'color: #f00; font-size: 2rem');
                    setYouTubeAPIReady(true);
                };
            } else {
                console.log('%cIFRAME API ALREADY LOADED', 'color: #f00; font-size: 2rem');
                setYouTubeAPIReady(true);
          }
        };
        loadYouTubeIframeAPI();
    }, []);



    // create youtube player
    useEffect(() => {
        console.log('%cCREATE YOUTUBE PLAYER', 'color: #f0f; font-size: 2rem');
        if (isYouTubeAPIReady && !isPlayerReady) {

            let videoId = 'DCtouot15cA';
            if (state.currentVideo && state.currentVideo.id) {
                videoId = state.currentVideo.id;
            }

            playerInstanceRef.current = new window.YT.Player(playerContainerRef.current!, {
                videoId: videoId,
                events: {
                    onReady: (event: any) => {
                        playerInstanceRef.current = event.target
                        console.log('%cPLAYER CREATED', 'color: #f0f; font-size: 2rem');
                        console.log(playerInstanceRef.current);
                        setIsPlayerReady(true);

                        dispatchState({
                            type: "VIDEO_READY",
                        });
                    },

                    onStateChange: (event: any) => {

                        console.log('%cPlayer.tsx :: 86 =============================', 'color: #f00; font-size: 5rem');
                        console.log(event.data);

                        if (event.data === window.YT.PlayerState.PLAYING) {
                            dispatchState({
                                type: "VIDEO_PLAYING",
                            });
                            return;
                        }

                        if (event.data === window.YT.PlayerState.PAUSED) {
                            dispatchState({
                                type: "VIDEO_PAUSED",
                            });
                            return;
                        }


                        if (event.data === window.YT.PlayerState.ENDED) {
                            dispatchState({
                                type: "VIDEO_ENDED",
                            });
                            return;
                        }

                    },
                },
                playerVars: {
                    autoplay: 0,
                    controls: 1,
                },
            });

            dispatchState({
                type: "SET_PLAYER",
                payload: playerInstanceRef.current,
            });

        }
    }, [isYouTubeAPIReady]);



    useEffect(() => {

        if(!playerInstanceRef.current || !state.currentVideo || !state.isRunning) {
            return;
        }

        let elapsedTime = 0;
        if (state.isWorkCycleRunning) {
            elapsedTime = state.currentWorkVideoElaspedTime;
        }
        else {
            elapsedTime = state.currentPauseVideoElaspedTime
        }

        playerInstanceRef.current.loadVideoById(state.currentVideo.id);

        if (state.isRunning) {
            setTimeout(() => {
                playerInstanceRef.current.seekTo(elapsedTime / 1000, true);
                setTimeout(() => {
                    playerInstanceRef.current.playVideo();
                    dispatchState({
                        type: "VIDEO_READY",
                    });
                }, 250);
            }, 900);
        }

    }, [state.currentVideo]);



    // start or pause the video
    useEffect(() => {
        if(isPlayerReady) {
            if (state.isRunning) {
                playerInstanceRef.current.playVideo();
            } else {
                playerInstanceRef.current.pauseVideo();
            }
        }
    }, [state.isRunning]);

    return (
        <>
            <div className="youtube_player"ref={playerContainerRef} style={{ width: '100%'}} />
        </>
    )
}

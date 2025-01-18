// Étendre l'interface Window pour inclure YT
declare global {
    interface Window {
        YT: {
            Player: new (
                elementId: string | HTMLElement,
                options: {
                    videoId: string;
                    playerVars?: Record<string, any>;
                    events?: {
                        onReady?: (event: any) => void;
                        onStateChange?: (event: any) => void;
                    };
                }
            ) => any;
            PlayerState: {
                ENDED: number;
                PLAYING: number;
                PAUSED: number;
                CUED: number;
            };
        };
        onYouTubeIframeAPIReady: () => void;
    }
}

export {};
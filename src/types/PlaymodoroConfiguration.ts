import { Video } from './Video';

export type PlaymodoroConfiguration = {
    workCycleDuration: number;
    pauseCycleDuration: number;
    cycles: number;

    playlists: {[key: string]: Video[]};

    // videosList: Video[];
    // pauseVideosList: Video[];
};

import {
    fetchVideoInfo,
    fetchPlaylistVideos,
    searchVideos
} from './youtube';

import { MEDIA_API_BASE_URL }  from '../config';


export class VideoDataFetcher {

    static async fetchVideoInfo(videoId: string, mediaApiUrl: string = MEDIA_API_BASE_URL) {
        return fetchVideoInfo(videoId, mediaApiUrl);
    }

    static async fetchPlaylistVideos(playlistId: string, mediaApiUrl: string = MEDIA_API_BASE_URL) {
        return fetchPlaylistVideos(playlistId, mediaApiUrl);
    }

    static async searchVideos(query: string, mediaApiUrl: string = MEDIA_API_BASE_URL) {
        return searchVideos(query, mediaApiUrl);
    }
};

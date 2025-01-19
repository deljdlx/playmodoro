import {fetchVideoInfo, fetchPlaylistVideos} from './youtube';


const youtubeAPIKey = 'AIzaSyBGcT8apf6ZE3kF55NrSJEzBqE6Tan5qQg';

export class VideoDataFetcher {

    static async fetchVideoInfo(videoId: string, apiKeys: string = '') {
        if (!apiKeys) {
            apiKeys = youtubeAPIKey;
        }

        return fetchVideoInfo(videoId, apiKeys);
    }

    static async fetchPlaylistVideos(playlistId: string, apiKeys: string = '') {
        if (!apiKeys) {
            apiKeys = youtubeAPIKey;
        }

        return fetchPlaylistVideos(playlistId, apiKeys);
    }
};

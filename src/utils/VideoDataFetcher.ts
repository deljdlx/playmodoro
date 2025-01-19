import {
    fetchVideoInfo,
    fetchPlaylistVideos,
    searchVideos
} from './youtube';


export class VideoDataFetcher {

    static async fetchVideoInfo(videoId: string) {
        return fetchVideoInfo(videoId);
    }

    static async fetchPlaylistVideos(playlistId: string) {
        return fetchPlaylistVideos(playlistId);
    }

    static async searchVideos(query: string) {
        return searchVideos(query);
    }
};

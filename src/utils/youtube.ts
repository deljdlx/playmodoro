export const fetchVideoInfo = async (
    videoId: string,
    apiKeys: string = 'AIzaSyBGcT8apf6ZE3kF55NrSJEzBqE6Tan5qQg',
) => {
    try {
        const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${apiKeys}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.items && data.items.length > 0) {
            const video = data.items[0];

            return video;
        } else {
            console.error("Vidéo non trouvée ou inaccessible.");
            return null;
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des informations :", error);
        return null;
    }
};


export const fetchPlaylistVideos = async (
    playlistId: string,
    apiKeys: string = 'AIzaSyBGcT8apf6ZE3kF55NrSJEzBqE6Tan5qQg',
) => {

    try {
        const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&key=${apiKeys}`;
        const response = await fetch(url);
        const data = await response.json();

        console.log('%cyoutube.ts :: 35 =============================', 'color: #f00; font-size: 1rem');
        console.log(data);

        if (data.items && data.items.length > 0) {
            return data.items;
        } else {
            console.error("Aucune vidéo trouvée ou inaccessible.");
            return null;
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des vidéos de la playlist :", error);
        return null;
    }


};

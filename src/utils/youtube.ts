import { MEDIA_API_BASE_URL }  from '../config';

export const fetchVideoInfo = async (
    videoId: string,
) => {


    console.log(MEDIA_API_BASE_URL);

    try {
        const url = MEDIA_API_BASE_URL + `/video/${videoId}`;
        const response = await fetch(url);
        const json = await response.json();

        if (json.data) {
            const video = json.data;

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
) => {

    try {
        const url = MEDIA_API_BASE_URL + `/playlist/${playlistId}`;
        const response = await fetch(url);
        const json = await response.json();


        if (json.data && json.data.items) {
            return json.data.items;
        } else {
            console.error("Aucune vidéo trouvée ou inaccessible.");
            return null;
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des vidéos de la playlist :", error);
        return null;
    }
};

export const searchVideos = async (
    search: string,
) => {

    try {
        const url = MEDIA_API_BASE_URL + `/search?q=${search}`;
        const response = await fetch(url);
        const json = await response.json();

        if (json.data && json.data.items) {
            return json.data.items;
        } else {
            console.error("Aucune vidéo trouvée ou inaccessible.");
            return null;
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des vidéos de la playlist :", error);
        return null;
    }
};

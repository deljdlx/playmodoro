export const fetchVideoInfo = async (
    videoId: string,
    apiKeys: string = 'AIzaSyBGcT8apf6ZE3kF55NrSJEzBqE6Tan5qQg',
) => {
    try {


        // console.log('%cyoutube.ts :: 8 =============================', 'color: #f00; font-size: 1rem');
        // console.log('API CALL');

        // const width = 300 + Math.floor(Math.random() * 100);
        // const height = 200 + Math.floor(Math.random() * 100);

        // return {
        //     snippet: {
        //         title: 'Fake video',
        //         thumbnails: {
        //             default: {
        //                 url: `https://picsum.photos/${width}/${height}`,
        //             },
        //             medium: {
        //                 url: `https://picsum.photos/${width}/${height}`,
        //             },
        //         },
        //     },
        //     statistics: {
        //         viewCount: 0,
        //         likeCount: 0,
        //         dislikeCount: 0,
        //     },
        // };



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
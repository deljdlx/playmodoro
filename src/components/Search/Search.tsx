import React, { useRef, useState } from 'react';

import {VideoDataFetcher} from '../../utils/VideoDataFetcher';
import {usePlaymodoroContext} from '../../contexts/playmodoro';
import {Video} from '../../types/Video';

import {
    motion
} from "framer-motion";

import {RiSearchLine} from '@remixicon/react';
import {RiAddLine} from '@remixicon/react';

type SearchProps = {

};


export const Search: React.FC<SearchProps> = () => {

    const [searchResults, setSearchResults] = useState<Video[]>([]);
    const [searching, setSearching] = useState<boolean>(false);
    const {
        state,
        dispatchState,
    } = usePlaymodoroContext();

    const searchInput = useRef<HTMLInputElement>(null);

    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const search = searchInput.current?.value;
        console.log(search);

        setSearchResults([]);

        if (search) {
            setSearching(true);
            const results = await VideoDataFetcher.searchVideos(search, state.mediaApiUrl);
            console.log(results);
            const videos = [];
            for (const result of results) {
                const video: Video = {
                    id: result.id.videoId || result.id.playlistId,
                    apiData: result,
                    url: null,
                    title: result.snippet.title,
                };
                videos.push(video);
            }

            setSearchResults(videos);
            setSearching(false);
        }
    };

    const addToPlaylist = (playlistName: string, video: any) => {
        const resultsDomContainer = document.querySelector('.search_results');
        if(resultsDomContainer) {
            const resultDom = resultsDomContainer.querySelector(`[data-video-id="${video.id}"]`) as HTMLElement;
            if(resultDom) {
                resultDom.style.height = `${resultDom.offsetHeight}px`;

                setTimeout(() => {
                    resultDom.classList.add('added');
                    setTimeout(async () => {
                        const videos = [
                            ...state.configuration.playlists[playlistName]
                        ];

                        // check if video is a playlist
                        if(video.apiData.id.playlistId) {
                            // fetch playlist videos
                            const playlistId = video.apiData.id.playlistId;
                            const items = await VideoDataFetcher.fetchPlaylistVideos(playlistId, state.mediaApiUrl);
                            const itemsWithoutDeleted = items.filter((item: any) => {
                                return (
                                    item.snippet.thumbnails.default !== undefined
                                    && item.snippet.title !== 'Deleted video'
                                    && item.snippet.title !== 'Private video'
                                );
                            });

                            if(itemsWithoutDeleted) {
                                const newVideos = itemsWithoutDeleted.map((item: any) => {
                                    const videoId = item.snippet.resourceId.videoId;
                                    return {
                                        id: videoId,
                                        url: null,
                                        title: item.snippet.title,
                                        apiData: item,
                                    };
                                });
                                videos.push(...newVideos);
                            }
                        }
                         else {
                            videos.push(video);
                        }

                        dispatchState({
                            type: "UPDATE_PLAYLIST",
                            payload: {
                                playlistName: playlistName,
                                videos: videos,
                            }
                        });
                    }, 400);
                }, 20);
            } else {
                console.error('%cvideo not found', 'font-size: 20px; color: red;');
            }
        }
    };

    return (
        <div>
            <form className="flex gap-1 grow" onSubmit={(e) => handleSearch(e)}>
                <label className="input input-bordered flex items-center grow">
                    <input type="text" className="grow" placeholder="Search" ref={searchInput}/>
                </label>
                <button className="btn btn-primary btn-md">
                    <RiSearchLine/>
                </button>
            </form>

            <div className="search_results mt-4">

                {searching && (
                    <div className="search_searching">
                        <h3>Searching...</h3>
                        <div className="search_searching__icon">
                            <RiSearchLine
                                size={60}
                            />
                        </div>
                    </div>
                )}


                {searchResults.map((video: any, index) => (
                    <div key={index} className={[
                            'search_result_container',
                            (video.apiData.id.playlistId) ? 'playlist' : '',
                        ].join(' ')}
                        data-video-id={video.id}
                    >
                        <pre className="search_result_debug debug">{state.debugMode &&
                            JSON.stringify(video.apiData, null, 4)
                        }</pre>
                        <h3>{video.apiData.snippet.title}</h3>
                        <div className="search_result">
                            <div
                                className={[
                                    'search_result__thumbnail',
                                ].join(' ')}
                                style={{backgroundImage: `url(${video.apiData.snippet.thumbnails.medium.url})`}}>
                            </div>
                            <div className="search_result__actions">
                                <motion.button
                                    className="btn btn-primary btn-md"
                                    onClick={() => addToPlaylist('work', video)}
                                    // whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <RiAddLine/>
                                    work
                                </motion.button>
                                <motion.button
                                    className="btn btn-primary btn-md"
                                    onClick={() => addToPlaylist('pause', video)}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <RiAddLine/> pause
                                </motion.button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )

};
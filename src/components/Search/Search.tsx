import React, { useRef, useState } from 'react';

import {VideoDataFetcher} from '../../utils/VideoDataFetcher';
import {usePlaymodoroContext} from '../../contexts/playmodoro';
import {Video} from '../../types/Video';

import {
    motion
    // useMotionValue,
    // useTransform,
    // AnimatePresence
} from "framer-motion";

import {RiSearchLine} from '@remixicon/react';
import {RiAddLine} from '@remixicon/react';

type SearchProps = {

};


export const Search: React.FC<SearchProps> = () => {

    const [searchResults, setSearchResults] = useState<Video[]>([]);
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
            const results = await VideoDataFetcher.searchVideos(search);
            console.log(results);
            const videos = [];
            for (const result of results) {
                const video: Video = {
                    id: result.id,
                    apiData: result,
                    url: null,
                    title: result.snippet.title,
                };
                videos.push(video);
            }

            setSearchResults(videos);
        }
    };

    const addToPlaylist = (playlistName: string, video: any) => {

        // search the div with the video id and apply effect

        const resultsDomContainer = document.querySelector('.search_results');
        if(resultsDomContainer) {
            const resultDom = resultsDomContainer.querySelector(`[data-video-id="${video.id}"]`) as HTMLElement;
            if(resultDom) {
                resultDom.style.height = `${resultDom.offsetHeight}px`;



                setTimeout(() => {
                    resultDom.classList.add('added');
                    setTimeout(() => {
                        const videos = [
                            ...state.configuration.playlists[playlistName]
                        ];

                        videos.push(video);

                        dispatchState({
                            type: "UPDATE_PLAYLIST",
                            payload: {
                                playlistName: playlistName,
                                videos: videos,
                            }
                        });
                    },400);

                }, 20);
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
                {searchResults.map((video: any) => (
                    <div key={video.id} className="search_result_container" data-video-id={video.id}>
                        <h3>{video.apiData.snippet.title}</h3>
                        <div className="search_result">
                            <div className="search_result__thumbnail" style={{backgroundImage: `url(${video.apiData.snippet.thumbnails.medium.url})`}}>
                            </div>
                            <div className="search_result__actions">
                                <motion.button
                                    className="btn btn-primary btn-md"
                                    onClick={() => addToPlaylist('work', video)}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <RiAddLine/>
                                    work
                                </motion.button>
                                <motion.button
                                    className="btn btn-primary btn-md"
                                     onClick={() => addToPlaylist('pause', video)}
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
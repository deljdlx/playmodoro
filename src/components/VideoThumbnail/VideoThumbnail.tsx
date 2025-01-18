import React from 'react';

import type { Video } from '../../types/Video';


import { RiPlayLargeFill } from '@remixicon/react'


type VideoThumbnailProps = {
    video: Video;
    width?: number;
    height?: number;

    onDelete?: (video: Video) => void;
    onClick?: (video: Video) => void;
};


export const VideoThumbnail: React.FC<VideoThumbnailProps> = ({
    video,
    width,
    height,
    onDelete,
    onClick,
}) => {

    const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log('%cVideoThumbnail.tsx :: 22 =============================', 'color: #f00; font-size: 1rem');
        console.log('DELETE');
        console.log(event);
        event.stopPropagation ();
        if (onDelete) {
            onDelete(video);
        }
    };


    return (
        <>
            {video.id &&(
                <div className="video_thumbnail">
                    <div>
                        {video.apiData?.snippet?.thumbnails?.medium?.url && (
                            <div className="video_thumbnail__thumbnail"
                                style={{
                                    backgroundImage: `url(${video.apiData.snippet.thumbnails.medium.url})`,
                                }}
                            >
                                <RiPlayLargeFill
                                    className="video_thumbnail__play"
                                    size={36}
                                    onClick={() => {
                                        if (onClick) {
                                            onClick(video);
                                        }
                                    }}
                                />
                            </div>
                        )}
                        {/* delete button */}
                        {onDelete && (

                            <button
                                className="video_thumbnail__delete"
                                onClick={(event) => {
                                    handleDelete(event)
                                }}
                            >
                                ❌
                            </button>
                        )}
                    </div>

                    <div className="video_thumbnail__title">
                        {video.title || 'No title'}
                    </div>
                </div>
            )}
        </>
    );
}
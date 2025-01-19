import React, { useRef } from 'react';

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
    onDelete,
    onClick,
}) => {

    const thumbnailRef = useRef<HTMLDivElement>(null);


    const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation ();

        const domContainer = thumbnailRef.current;
        if(domContainer) {
            const container = domContainer.parentElement;
            if(container) {
                container.style.height = `${domContainer.offsetHeight}px`;
                setTimeout(() => {
                    container.classList.add('deleted');
                    setTimeout(() => {
                        // container.remove();
                        if (onDelete) {
                            onDelete(video);
                        }
                    }, 300);
                }, 30);
            }
        }
    };


    return (
        <>
            {video.id &&(
                <div className="video_thumbnail" ref={thumbnailRef}>
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
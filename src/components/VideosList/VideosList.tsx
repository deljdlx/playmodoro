import React from 'react';
import { usePlaymodoroContext } from '../../contexts/playmodoro';

import {
    DndContext,
    closestCenter,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors,
  } from '@dnd-kit/core';
  import {
    SortableContext,
    verticalListSortingStrategy,
    arrayMove,
  } from '@dnd-kit/sortable';


import type { Video } from '../../types/Video';


import {SortableItem} from '../SortableItem/SortableItem';
import { VideoThumbnail } from '../VideoThumbnail/VideoThumbnail';

// not used any more, but kept for reference
// import { VideoDataFetcher } from '../../utils/VideoDataFetcher';
// import { RiSearchLine } from '@remixicon/react';



type VideosListProps = {
    videos: Video[];
    onChange?: (videos: Video[]) => void;
    onVideoClick?: (video: Video) => void;
};

export const VideosList: React.FC<VideosListProps> = ({
    videos,
    onChange,
    onVideoClick,
}) => {

    const {
        state,
    } = usePlaymodoroContext();

    const sensors = useSensors(
        useSensor(PointerSensor, {
          activationConstraint: {
            delay: 75,
            tolerance: 5,
          },
        }),
        useSensor(TouchSensor, {
          activationConstraint: {
            delay: 75,
            tolerance: 5,
          },
        })
    );


    const handleDragEnd = (event: any) => {
        const { active, over } = event;

        if (active.id !== over.id) {
          const oldIndex = videos.findIndex((video) => video.id === active.id);
          const newIndex = videos.findIndex((video) => video.id === over.id);

          const reorderedVideos = arrayMove(videos, oldIndex, newIndex);
          if (onChange) {
            onChange(reorderedVideos);
          }
        }
    };

    // not used any more, but kept for reference
    // const handleAdd = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     const input = (e.target as HTMLFormElement).querySelector('input');

    //     if(input) {
    //         const url = input.value;
    //         input.value = '';

    //         if(url.includes('list=')) {
    //             return handleAddPlaylist(url);
    //         }

    //         return handleAddVideo(url);
    //     }
    // };


    // not used any more, but kept for reference
    // const handleAddPlaylist = async (url: string) => {
    //     const playlistId = url.split('list=')[1];
    //     const items = await VideoDataFetcher.fetchPlaylistVideos(playlistId);

    //     if(items) {
    //         const newVideos = items.map((item: any) => {
    //             const videoId = item.snippet.resourceId.videoId;
    //             return {
    //                 id: videoId,
    //                 url: `https://www.youtube.com/watch?v=${videoId}`,
    //                 title: item.snippet.title,
    //                 apiData: item,
    //             };
    //         });

    //         if(onChange) {
    //             onChange([...videos, ...newVideos]);
    //         }
    //     }
    // };

    // not used any more, but kept for reference
    // const handleAddVideo = async (url: string) => {
    //     let videoId = url.split('v=')[1];

    //     if(!videoId) {
    //         const shortUrl = url.split('?')[0];

    //         if(shortUrl) {
    //             const extractedId = shortUrl.split('/').pop();

    //             if(extractedId) {
    //                 videoId = extractedId;
    //             }
    //         }

    //         if(!videoId) {
    //             console.error('Invalid video url');
    //             return;
    //         }
    //     }

    //     const videoInfo = await VideoDataFetcher.fetchVideoInfo(
    //         videoId,
    //         state.mediaApiUrl,
    //     );
    //     if(!videoInfo) {
    //         console.error('Video not found');
    //         return;
    //     }

    //     if(videoInfo) {
    //         const newVideo: Video = {
    //             id: videoId,
    //             url: url,
    //             title: videoInfo.snippet.title,
    //             apiData: videoInfo,
    //         };
    //         if(onChange) {
    //             onChange([...videos, newVideo]);
    //         }
    //     }
    // };

    const handleDeleteVideo = (video: Video) => {
        const newListOfVideos = videos.filter((v) => v.id !== video.id);
        if(onChange) {
            onChange(newListOfVideos);
        }
    };


    return (
        <section className="videos_list mt-4">


            {/* <form onSubmit={(e) => {handleAdd(e)}}>
                <div className="flex pb-2 gap-1">
                    <label className="input input-bordered flex items-center gap-2 input-md grow">
                        <input
                            type="text"
                            className="grow"
                            placeholder="Video or playlist youtube url"
                        />
                        <RiSearchLine size={16} />
                    </label>
                    <button className="btn btn-primary btn-md" type="submit">Add</button>
                </div>
            </form> */}



            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                >
                <SortableContext items={videos} strategy={verticalListSortingStrategy}>
                    {videos.map((video, index) => (
                        <SortableItem key={video.id + ' ' + index} id={video.id}>
                            <VideoThumbnail
                                video={video}
                                width={150}
                                height={100}
                                onDelete={handleDeleteVideo}
                                onClick={onVideoClick}
                            />
                        </SortableItem>
                    ))}
                </SortableContext>
            </DndContext>
        </section>

    );
};

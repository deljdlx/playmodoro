import React, { useState } from 'react';

import {
    DndContext,
    closestCenter,
    KeyboardSensor,
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

import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import {SortableItem} from '../SortableItem/SortableItem';


import type { Video } from '../../types/Video';

import { VideoThumbnail } from '../VideoThumbnail/VideoThumbnail';
import { RiSearchLine } from '@remixicon/react';


import { fetchVideoInfo } from '../../utils/youtube';

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

    // Sortable configuration
    // const sensors = useSensors(
    //     useSensor(PointerSensor), // Souris / tactile
    //     useSensor(KeyboardSensor, {
    //     coordinateGetter: sortableKeyboardCoordinates, // Support clavier
    //     })
    // );


    // kept for reference
    // const sensors = useSensors(
    //     useSensor(PointerSensor, {
    //       activationConstraint: {
    //         delay: 75, // Délai avant activation du drag-and-drop
    //         tolerance: 5, // Mouvement minimal pour activer le drag
    //       },
    //     })
    // );

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

    const handleAddVideo = async (e: React.FormEvent) => {
        e.preventDefault();

        const input = (e.target as HTMLFormElement).querySelector('input');
        if(input) {
            const url = input?.value;
            let videoId = url?.split('v=')[1];

            if(!videoId) {
                const shortUrl = url.split('?')[0];

                if(shortUrl) {
                    const extractedId = shortUrl.split('/').pop();

                    if(extractedId) {
                        videoId = extractedId;
                    }
                }

                if(!videoId) {
                    console.error('Invalid video url');
                    return;
                }
            }

            if(videoId) {
                const videoInfo = await fetchVideoInfo(videoId);
                if(!videoInfo) {
                    console.error('Video not found');
                    return;
                }

                input.value = '';
                if(videoInfo) {
                    const newVideo: Video = {
                        id: videoId,
                        url: url,
                        title: videoInfo.snippet.title,
                        apiData: videoInfo,
                    };
                    if(onChange) {
                        onChange([...videos, newVideo]);
                    }
                }
            }
        }
    };

    const handleDeleteVideo = (video: Video) => {
        const newListOfVideos = videos.filter((v) => v.id !== video.id);
        if(onChange) {
            onChange(newListOfVideos);
        }
    };


    return (
        <section className="videos_list mt-4">
            <form onSubmit={(e) => {handleAddVideo(e)}}>
                <div className="flex pb-2 gap-1">
                    <label className="input input-bordered flex items-center gap-2 input-md grow">
                        <input
                            // onChange={(e) => handleNewVideoUrl(e.target.value)}
                            type="text"
                            className="grow"
                            placeholder="Video url"
                        />
                        <RiSearchLine size={16} />
                    </label>
                    <button className="btn btn-primary btn-md" type="submit">Add</button>
                </div>
            </form>



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


    // return (
    //     <section>
    //         <DndContext
    //             sensors={sensors}
    //             collisionDetection={closestCenter}
    //             onDragEnd={handleDragEnd}
    //             >
    //             <SortableContext items={videos} strategy={verticalListSortingStrategy}>
    //                 <ul style={{ listStyleType: 'none', padding: 0 }}>
    //                 {videos.map((video) => (
    //                     <SortableItem key={video.id} id={video.id}>
    //                         <VideoThumbnail video={video} width={150} height={100} onDelete={onVideoDelete}/>
    //                     </SortableItem>
    //                 ))}
    //                 </ul>
    //             </SortableContext>
    //         </DndContext>
    //     </section>

    // );
};

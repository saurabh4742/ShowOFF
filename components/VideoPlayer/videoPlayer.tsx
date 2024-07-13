"use client"
import React from 'react';
import { VideoPlayer, VideoPlayerProps } from "@graphland/react-video-player";


 const PostVideoPlayer=({src}:{src:string})=>  {
  const videoSources = [
    {
      src: src,
      type: "video/mp4",
    }]
  const smallerScreenvideoProps: VideoPlayerProps = {
    theme: "city", // 'city', 'fantasy', 'forest', 'sea'
    autoPlay: false,
    loop: false,
    height: 300, // Set height to a smaller value
    width: 250, // Set width to a smaller value
    sources: videoSources,
    controlBar: {
      skipButtons: {
        forward: 5,
        backward: 5,
      },
    },
    playbackRates: [0.5, 1, 1.5, 2],
    disablePictureInPicture: false,
    onReady: () => {
      console.log("Video player is ready!");
    },
  };
  const BigScreenvideoProps: VideoPlayerProps = {
    theme: "city", // 'city', 'fantasy', 'forest', 'sea'
    autoPlay: false,
    loop: false,
    height: 480, // Set height to 480 for 480p resolution
    width: 854,  // Set width to a smaller value
    sources: videoSources,
    controlBar: {
      skipButtons: {
        forward: 5,
        backward: 5,
      },
    },
    playbackRates: [0.5, 1, 1.5, 2],
    disablePictureInPicture: false,
    onReady: () => {
      console.log("Video player is ready!");
    },
  };
    return (
      <><div className='sm:hidden flex'><VideoPlayer {...smallerScreenvideoProps} /></div>
      <div className='sm:flex hidden'><VideoPlayer {...BigScreenvideoProps} /></div></>
       
    );
}
export default PostVideoPlayer
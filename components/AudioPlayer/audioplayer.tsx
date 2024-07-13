"use client"
import React, { useState, useRef, useEffect, ChangeEvent, MouseEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PlayIcon, PauseIcon } from 'lucide-react';
import { Card } from '../ui/card';

interface AudioPlayerProps {
  audioSrc: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;

    const updateProgress = () => {
      if (audio) {
        const currentTime = audio.currentTime;
        const progress = (currentTime / duration) * 100;
        setProgress(progress);
      }
    };

    const setAudioData = () => {
      if (audio) {
        setDuration(audio.duration);
      }
    };

    if (audio) {
      audio.addEventListener('timeupdate', updateProgress);
      audio.addEventListener('loadedmetadata', setAudioData);
    }

    return () => {
      if (audio) {
        audio.removeEventListener('timeupdate', updateProgress);
        audio.removeEventListener('loadedmetadata', setAudioData);
      }
    };
  }, [duration]);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleProgressClick = (e: MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (audio && progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newProgress = (clickX / rect.width) * 100;
      audio.currentTime = (newProgress / 100) * duration;
      setProgress(newProgress);
    }
  };

  return (
    <Card className="flex flex-col w-full sm:w-3/12 gap-1 items-center p-2 mt-4">
      <div
        ref={progressRef}
        className="w-[60%]"
        onClick={handleProgressClick}
        style={{ cursor: 'pointer' }}
      >
        <Progress value={progress} className="w-full h-1" />
      </div>
      <audio ref={audioRef} src={audioSrc} />
      <div className="flex items-center text-muted-foreground text-sm">Mp3</div>
      <Button onClick={handlePlayPause} size="sm" className=" rounded-sm">
        {isPlaying ? <PauseIcon size={15}  /> : <PlayIcon size={15} />}
      </Button>
    </Card>
  );
};

export default AudioPlayer;



import React, { useState, useRef } from "react";
import "./PodcastPlayer.css";
import { Play, Pause } from "lucide-react";
import ProgressBar from "../progress-bar/ProgressBar";

const PodcastPlayer = ({ podcastTitle, audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // In seconds
  const [duration, setDuration] = useState(0); // In seconds
  const audioReference = useRef(null);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioReference.current.pause();
    } else {
      audioReference.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (value) => {
    setProgress(value);
    audioReference.current.currentTime = value;
  };

  const updateProgress = () => {
    const audio = audioReference.current;
    setProgress(audio.currentTime);
  };

  return (
    <div className="podcast-player">
      <h2>{podcastTitle}</h2>
      <audio
        ref={audioReference}
        src={audioSrc}
        onTimeUpdate={updateProgress}
        onLoadedMetadata={() => setDuration(audioReference.current.duration)}
        onEnded={() => setIsPlaying(false)}
      />
      <div className="controls">
        <ProgressBar
          progress={progress}
          duration={duration}
          onProgressChange={handleProgressChange}
        />
        <button className="play-button" onClick={togglePlayPause}>
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
      </div>
    </div>
  );
};

export default PodcastPlayer;

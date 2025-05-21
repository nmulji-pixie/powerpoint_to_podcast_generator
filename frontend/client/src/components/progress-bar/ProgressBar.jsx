import React from 'react';

const ProgressBar = ({ progress, duration, onProgressChange }) => {
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="voice-bar-container">
      <span>{formatTime(progress)}</span>
      <input
        type="range"
        value={progress}
        onChange={(e) => onProgressChange(parseFloat(e.target.value))}
        max={duration}
        className="voice-bar"
      />
      <span>{formatTime(duration)}</span>
    </div>
  );
};

export default ProgressBar;

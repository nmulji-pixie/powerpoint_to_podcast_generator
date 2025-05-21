import React from "react";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading-overlay">
      <svg
        className="wave"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="#252525"
          fillOpacity="0.8"
          d="M0,160 C360,300 1080,0 1440,160 L1440,320 L0,320 Z"
        />
      </svg>
      <div className="loading-text-container">
         <p className="loading-text">Wait a minute while the podcast is being generated...</p>
      </div>
    </div>
  );
};

export default Loading;

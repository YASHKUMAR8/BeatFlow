import React from 'react';

const Track = ({ isPlaying, isActive, activeSong }) => {
  const { title, subtitle, images } = activeSong || {};

  return (
    <div className="flex-1 flex items-center justify-start">
      {/* Image with conditional animation */}
      <div className={`hidden sm:block h-16 w-16 mr-4 ${isPlaying && isActive ? 'animate-[spin_3s_linear_infinite]' : ''}`}>
        <img
          src={images?.coverart || '/default-image.jpg'} // Fallback image if cover art is unavailable
          alt={title || 'Cover art'}
          className="rounded-full object-cover"
        />
      </div>
      <div className="w-[50%]">
        {/* Song title */}
        <p className="truncate text-white font-bold text-lg">
          {title || 'No active Song'}
        </p>

        {/* Song subtitle */}
        <p className="truncate text-gray-300">
          {subtitle || 'No active Song'}
        </p>
      </div>
    </div>
  );
};

export default Track;

import React from 'react';
import { BsFillVolumeUpFill, BsVolumeDownFill, BsFillVolumeMuteFill } from 'react-icons/bs';

const VolumeBar = ({ value, min, max, onChange, setVolume }) => {
  const handleMuteClick = () => {
    // Toggle mute functionality
    if (value > 0) {
      setVolume(0); // Mute the volume
    } else {
      setVolume(1); // Restore to full volume
    }
  };

  // const handleMaxVolumeClick = () => setVolume(1); // Set to full volume
  const handleLowVolumeClick = () => setVolume(0); // Set to mute

  return (
    <div className="hidden lg:flex flex-1 items-center justify-end">
      {/* Conditionally render icons based on volume */}
      {value > 0.5 && value <= 1 && (
        <BsFillVolumeUpFill size={25} color="#FFF" onClick={handleLowVolumeClick} />
      )}
      {value > 0 && value <= 0.5 && (
        <BsVolumeDownFill size={25} color="#FFF" onClick={handleLowVolumeClick} />
      )}
      {value === 0 && (
        <BsFillVolumeMuteFill size={25} color="#FFF" onClick={handleMuteClick} />
      )}

      {/* Volume slider */}
      <input
        type="range"
        step="any"
        value={value}
        min={min}
        max={max}
        onChange={onChange}
        className="2xl:w-40 lg:w-32 md:w-32 h-1 ml-2"
      />
    </div>
  );
};

export default VolumeBar;

import React, { useCallback } from 'react';

const Seekbar = ({ value, min, max, onInput, setSeekTime }) => {
  // Convert time to format 0:00
  const getTime = (time) => `${Math.floor(time / 60)}:${(`0${Math.floor(time % 60)}`).slice(-2)}`;

  // Callback to seek backwards by 5 seconds
  const handleSeekBackward = useCallback(() => {
    setSeekTime((prevTime) => Math.max(0, prevTime - 5)); // Prevent going negative
  }, [setSeekTime]);

  // Callback to seek forwards by 5 seconds
  const handleSeekForward = useCallback(() => {
    setSeekTime((prevTime) => Math.min(max, prevTime + 5)); // Prevent exceeding max time
  }, [setSeekTime, max]);

  return (
    <div className="hidden sm:flex flex-row items-center">
      <button
        type="button"
        onClick={handleSeekBackward}
        className="hidden lg:mr-4 lg:block text-white"
      >
        -
      </button>
      <p className="text-white">{value === 0 ? '0:00' : getTime(value)}</p>
      <input
        type="range"
        step="any"
        value={value}
        min={min}
        max={max}
        onInput={onInput}
        className="md:block w-24 md:w-56 2xl:w-96 h-1 mx-4 2xl:mx-6 rounded-lg"
      />
      <p className="text-white">{max === 0 ? '0:00' : getTime(max)}</p>
      <button
        type="button"
        onClick={handleSeekForward}
        className="hidden lg:ml-4 lg:block text-white"
      >
        +
      </button>
    </div>
  );
};

export default Seekbar;

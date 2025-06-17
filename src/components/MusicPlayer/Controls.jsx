import React from 'react';
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import { BsArrowRepeat, BsFillPauseFill, BsFillPlayFill, BsShuffle } from 'react-icons/bs';

const Controls = ({
  isPlaying,
  repeat,
  setRepeat,
  shuffle,
  setShuffle,
  currentSongs,
  handlePlayPause,
  handlePrevSong,
  handleNextSong,
}) => {
  const toggleRepeat = () => setRepeat((prev) => !prev);
  const toggleShuffle = () => setShuffle((prev) => !prev);

  return (
    <div className="flex items-center justify-around md:w-36 lg:w-52 2xl:w-80">
      <BsArrowRepeat
        size={20}
        color={repeat ? 'red' : 'white'}
        onClick={toggleRepeat}
        className="hidden sm:block cursor-pointer"
        aria-label="Repeat toggle"
      />
      {currentSongs?.length > 0 && (
        <MdSkipPrevious
          size={30}
          color="#FFF"
          className="cursor-pointer"
          onClick={handlePrevSong}
          aria-label="Previous song"
        />
      )}
      {isPlaying ? (
        <BsFillPauseFill
          size={45}
          color="#FFF"
          onClick={handlePlayPause}
          className="cursor-pointer"
          aria-label="Pause"
        />
      ) : (
        <BsFillPlayFill
          size={45}
          color="#FFF"
          onClick={handlePlayPause}
          className="cursor-pointer"
          aria-label="Play"
        />
      )}
      {currentSongs?.length > 0 && (
        <MdSkipNext
          size={30}
          color="#FFF"
          className="cursor-pointer"
          onClick={handleNextSong}
          aria-label="Next song"
        />
      )}
      <BsShuffle
        size={20}
        color={shuffle ? 'red' : 'white'}
        onClick={toggleShuffle}
        className="hidden sm:block cursor-pointer"
        aria-label="Shuffle toggle"
      />
    </div>
  );
};

export default Controls;

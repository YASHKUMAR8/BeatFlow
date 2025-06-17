import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nextSong, prevSong, playPause } from '../../redux/features/playerSlice';

import Controls from './Controls';
import Player from './Player';
import Seekbar from './Seekbar';
import Track from './Track';
import VolumeBar from './VolumeBar';

const MusicPlayer = () => {
  const dispatch = useDispatch();
  const { activeSong, currentSongs, currentIndex, isActive, isPlaying } = useSelector((state) => state.player);

  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);

  useEffect(() => {
    if (currentSongs?.length) {
      dispatch(playPause(true));
    }
  }, [currentIndex, currentSongs, dispatch]);

  const handlePlayPause = useCallback(() => {
    if (!isActive) return;
    dispatch(playPause(!isPlaying));
  }, [isActive, isPlaying, dispatch]);

  const handleNextSong = useCallback(() => {
    dispatch(playPause(false));

    const nextIndex = shuffle
      ? Math.floor(Math.random() * currentSongs.length)
      : (currentIndex + 1) % currentSongs.length;

    dispatch(nextSong(nextIndex));
  }, [shuffle, currentIndex, currentSongs.length, dispatch]);

  const handlePrevSong = useCallback(() => {
    let prevIndex = 0;

    if (shuffle) {
      prevIndex = Math.floor(Math.random() * currentSongs.length);
    } else {
      prevIndex = currentIndex === 0 ? currentSongs.length - 1 : currentIndex - 1;
    }

    dispatch(prevSong(prevIndex));
  }, [shuffle, currentIndex, currentSongs.length, dispatch]);

  return (
    <div className="relative sm:px-12 px-8 w-full flex items-center justify-between">
      <Track isPlaying={isPlaying} isActive={isActive} activeSong={activeSong} />
      <div className="flex-1 flex flex-col items-center justify-center">
        <Controls
          isPlaying={isPlaying}
          isActive={isActive}
          repeat={repeat}
          setRepeat={setRepeat}
          shuffle={shuffle}
          setShuffle={setShuffle}
          currentSongs={currentSongs}
          handlePlayPause={handlePlayPause}
          handlePrevSong={handlePrevSong}
          handleNextSong={handleNextSong}
        />

        <Seekbar
          value={appTime}
          min="0"
          max={duration}
          onInput={(e) => setSeekTime(Number(e.target.value))}
          setSeekTime={setSeekTime}
          appTime={appTime}
        />

        <Player
          activeSong={activeSong}
          volume={volume}
          isPlaying={isPlaying}
          seekTime={seekTime}
          repeat={repeat}
          currentIndex={currentIndex}
          onEnded={handleNextSong}
          onTimeUpdate={(e) => setAppTime(e.target.currentTime)}
          onLoadedData={(e) => setDuration(e.target.duration)}
        />
      </div>

      <VolumeBar
        value={volume}
        min="0"
        max="1"
        onChange={(e) => setVolume(Number(e.target.value))}
        setVolume={setVolume}
      />
    </div>
  );
};

export default MusicPlayer;

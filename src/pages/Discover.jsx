import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Error, Loader, SongCard } from '../components';
import { selectGenreListId } from '../redux/features/playerSlice';
import { useGetSongsByGenreQuery } from '../redux/services/shazamCore';
import { genres } from '../assets/constants';

const Discover = () => {
  console.log('API KEY:', import.meta.env.VITE_SHAZAM_CORE_RAPID_API_KEY);
  const dispatch = useDispatch();
  const { genreListId } = useSelector((state) => state.player);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const [retryCount, setRetryCount] = useState(0);
  
  // Set default genre if none is selected
  useEffect(() => {
    if (!genreListId) {
      dispatch(selectGenreListId('pop'));
    }
  }, [dispatch, genreListId]);

  useEffect(() => {
    fetch('https://shazam-core.p.rapidapi.com/v1/charts/world', {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_SHAZAM_CORE_RAPID_API_KEY,
        'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com',
      },
    })
      .then(res => res.json())
      .then(data => console.log('Direct fetch result:', data))
      .catch(err => console.error('Direct fetch error:', err));
  }, []);

  const { data, isFetching, error, refetch } = useGetSongsByGenreQuery(genreListId || 'pop', {
    // Skip the query if we've retried too many times
    skip: retryCount >= 3,
  });

  // Handle retry logic
  useEffect(() => {
    if (error?.status === 429 && retryCount < 3) {
      const timeout = setTimeout(() => {
        setRetryCount(prev => prev + 1);
        refetch();
      }, Math.min(1000 * 2 ** retryCount, 30000));
      return () => clearTimeout(timeout);
    }
  }, [error, retryCount, refetch]);

  if (isFetching) return <Loader title="Loading songs..." />;

  if (error) {
    console.error('Error in Discover:', error);
    if (error.status === 429) {
      return (
        <div className="flex flex-col items-center justify-center">
          <Error message="Too many requests. Please wait a moment..." />
          <button
            onClick={() => {
              setRetryCount(0);
              refetch();
            }}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      );
    }
          
          return <Error message="Something went wrong. Please try again later." /> ;
  }

  const genreTitle = genres.find(({ value }) => value === genreListId)?.title;

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">Discover {genreTitle}</h2>

        <select
          onChange={(e) => {
            setRetryCount(0); // Reset retry count when changing genre
            dispatch(selectGenreListId(e.target.value));
          }}
          value={genreListId || 'pop'}
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {genres.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;

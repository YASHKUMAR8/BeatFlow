import React from 'react';
import { useNavigate } from 'react-router-dom';

const ArtistCard = ({ track }) => {
  const navigate = useNavigate();

  // Destructuring to handle undefined properties more gracefully
  const { images, subtitle, artists } = track || {};
  const artistId = artists?.[0]?.adamid || null;
  const coverArt = images?.coverart || '/default-cover.jpg'; // Fallback image
  const artistName = subtitle || 'Unknown Artist';

  return (
    <div
      className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
      onClick={() => artistId && navigate(`/artists/${artistId}`)}
    >
      <img
        alt={artistName} // Improved alt text for accessibility
        src={coverArt}
        className="w-full h-56 rounded-lg"
      />
      <p className="mt-4 font-semibold text-lg text-white truncate">
        {artistName}
      </p>
    </div>
  );
};

export default ArtistCard;

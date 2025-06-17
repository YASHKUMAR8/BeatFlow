import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shahzamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
    prepareHeaders: (headers) => {
      headers.set(
        'X-RapidAPI-Key',
        import.meta.env.VITE_SHAZAM_CORE_RAPID_API_KEY,
      );
      headers.set('X-RapidAPI-Host', 'shazam-core.p.rapidapi.com');
      return headers;
    },
  }),
  keepUnusedDataFor: 300, // Keep data for 5 minutes
  endpoints: (builder) => ({
    getTopCharts: builder.query({
      query: () => '/charts/world',
      providesTags: ['Charts'],
      extraOptions: {
        maxRetries: 3,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      },
    }),
    getSongDetails: builder.query({
      query: ({ songid }) => `/tracks/details?track_id=${songid}`,
      providesTags: (result, error, { songid }) => [{ type: 'Song', id: songid }],
    }),
    getSongRelated: builder.query({
      query: ({ songid }) => `/tracks/related?track_id=${songid}`,
      providesTags: (result, error, { songid }) => [{ type: 'RelatedSongs', id: songid }],
    }),
    getArtistDetails: builder.query({
      query: (artistId) => `/artists/details?artist_id=${artistId}`,
      providesTags: (result, error, artistId) => [{ type: 'Artist', id: artistId }],
    }),
    getSongsByGenre: builder.query({
      query: (genre) => `/charts/genre-world?genre_code=${genre}&country_code=IN`,
      providesTags: (result, error, genre) => [{ type: 'Genre', id: genre }],
      extraOptions: {
        maxRetries: 3,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      },
    }),
    getSongsByCountry: builder.query({
      query: (countryCode) => `/charts/country?country_code=${countryCode}`,
      providesTags: (result, error, countryCode) => [{ type: 'Country', id: countryCode }],
    }),
    getSongsBySearch: builder.query({
      query: (searchTerm) => `/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}`,
      providesTags: (result, error, searchTerm) => [{ type: 'Search', id: searchTerm }],
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
  useGetSongsByGenreQuery,
  useGetSongsByCountryQuery,
  useGetSongsBySearchQuery,
  useGetArtistDetailsQuery,
} = shahzamCoreApi;
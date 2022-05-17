import { GenreList, MovieDetail, MovieList, GetVideos } from '@/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import prepareHeaders from '../apiPrepareHeaders'

// Define a service using a base URL and expected endpoints
export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: process.env.VITE_THEMOVIEDB_API_URL,
    prepareHeaders
  }),
  endpoints: (builder) => ({
    getGenreList: builder.query<GenreList, null>({
      query: () => `/genre/movie/list`,
    }),
    getPopularMovies: builder.query<MovieList, null>({
      query: () => `/movie/popular`,
    }),
    getMovieDetail: builder.query<MovieDetail, number>({
      query: (id) => `/movie/${id}`,
    }),
    getMovieVideos: builder.query<GetVideos, number>({
      query: (id) => `/movie/${id}/videos`,
    }),
    getLastestMovies: builder.query<MovieDetail, null>({
      query: () => `/movie/latest`,
    }),
    getTopRatedMovies: builder.query<MovieList, null>({
      query: () => `/movie/top_rated`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { 
  useGetGenreListQuery, 
  useGetPopularMoviesQuery, 
  useGetMovieDetailQuery,
  useGetLastestMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetMovieVideosQuery
} = movieApi
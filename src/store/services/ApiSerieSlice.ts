import { GenreList, SerieDetail, SerieList } from '@/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import prepareHeaders from '../apiPrepareHeaders'

// Define a service using a base URL and expected endpoints
export const serieApi = createApi({
  reducerPath: 'serieApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: import.meta.env.VITE_THEMOVIEDB_API_URL,
    prepareHeaders
  }),
  endpoints: (builder) => ({
    getGenreList: builder.query<GenreList, null>({
      query: () => `/genre/tv/list`,
    }),
    getSerieDetail: builder.query<SerieDetail, number>({
      query: (id) => `/tv/${id}`,
    }),
    getPopularSerie: builder.query<SerieList, null>({
      query: () => `/tv/popular`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { 
  useGetGenreListQuery,
  useGetSerieDetailQuery,
  useGetPopularSerieQuery
} = serieApi
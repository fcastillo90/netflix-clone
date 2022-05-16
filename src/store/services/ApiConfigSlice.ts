import { ConfigAPI } from '@/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import prepareHeaders from '../apiPrepareHeaders'

// Define a service using a base URL and expected endpoints
export const configApi = createApi({
  reducerPath: 'configApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: import.meta.env.VITE_THEMOVIEDB_API_URL,
    prepareHeaders
  }),
  endpoints: (builder) => ({
    getApiConfiguration: builder.query<ConfigAPI, null>({
      query: () => `/configuration`,
    }),
    getPrimaryTranslations: builder.query<string[], null>({
      query: () => `/configuration/primary_translations`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { 
  useGetApiConfigurationQuery,
  useGetPrimaryTranslationsQuery,
} = configApi
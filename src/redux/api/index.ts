import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://5.130.78.41:27020/',
  }),
  endpoints: () => ({}),
})

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://5.130.78.41:27020/',
    prepareHeaders: (headers, { endpoint }) => {
      if (endpoint === 'signup') {
        return headers
      }

      if (endpoint === 'getOAuthToken') {
        headers.set('Authorization', 'Basic YWNhZGVtaWNzOm15aGVscGVyLWtleQ==')
      } else {
        const token = localStorage.getItem('token')

        headers.set('Authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  tagTypes: ['Deals', 'UserInfo'],
  endpoints: () => ({}),
})

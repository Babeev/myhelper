import { api } from 'app/api'

export interface Deal {
  city: string
  date: string
  description: string
  id: number
  name: string
  ownerId: number
  price: number
  subscribers: number[]
}

export interface GetServicesResponse {
  deals: Deal[]
}

const ServicesEndpoint = api.injectEndpoints({
  endpoints: (build) => ({
    getServices: build.query<Deal[], void>({
      query: () => ({
        url: 'api/deal/all',
        method: 'GET',
      }),
      transformResponse: (response: GetServicesResponse) => {
        return response.deals
      },
    }),
  }),
})

export const { useGetServicesQuery } = ServicesEndpoint

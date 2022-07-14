import { api } from 'redux/api'
import { Deal } from 'types'
import { AddDealRequest, GetDealsResponse, SubscribeDealRequest } from './types'

const dealsEndpoint = api.injectEndpoints({
  endpoints: (build) => ({
    getDeal: build.query<Deal, string | null>({
      query: (id) => ({
        url: `api/deal/${id}/info`,
      }),
      providesTags: ['Deal'],
    }),

    getDeals: build.query<Deal[], void>({
      query: () => ({
        url: 'api/deal/all',
        method: 'GET',
      }),
      transformResponse: (response: GetDealsResponse) => {
        return response.deals
      },
      providesTags: ['Deals'],
    }),

    addDeal: build.mutation<Deal, AddDealRequest>({
      query: (data) => ({
        url: 'api/add/deal',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Deals', 'UserInfo'],
    }),

    subscribeDeal: build.mutation<void, SubscribeDealRequest>({
      query: (data) => ({
        url: 'api/subscribe/deal',
        method: 'POST',
        body: data,
      }),
    }),

    editDeal: build.mutation<void, Deal>({
      query: ({ id, city, date, description, name, price }) => ({
        url: `api/deal/${id}/update`,
        method: 'PUT',
        body: {
          city,
          date,
          description,
          name,
          price,
        },
      }),
      invalidatesTags: ['Deal'],
    }),
  }),
})

export const {
  useGetDealQuery,
  useGetDealsQuery,
  useAddDealMutation,
  useSubscribeDealMutation,
  useEditDealMutation,
  endpoints: { getDeals },
} = dealsEndpoint

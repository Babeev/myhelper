import { api } from 'redux/api'
import { Deal } from 'types'
import {
  AddDealRequest,
  GetDealsResponse,
  SubscribeDealRequest,
  UnsubscribeDealRequest,
} from './types'

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
      invalidatesTags: ['Deal'],
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

    unsubscribeDeal: build.mutation<void, UnsubscribeDealRequest>({
      query: (data) => ({
        url: '/api/unsubscribe/deal',
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['Deal'],
    }),

    deleteDeal: build.mutation<void, number | null>({
      query: (id) => ({
        url: `api/deal/${id}/delete`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Deals', 'UserInfo'],
    }),
  }),
})

export const {
  useGetDealQuery,
  useGetDealsQuery,
  useAddDealMutation,
  useSubscribeDealMutation,
  useEditDealMutation,
  useUnsubscribeDealMutation,
  useDeleteDealMutation,
  endpoints: { getDeals },
} = dealsEndpoint

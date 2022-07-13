import { AddDealRequest, Deal, GetDealsResponse } from 'types'
import { api } from 'redux/api'

const dealsEndpoint = api.injectEndpoints({
  endpoints: (build) => ({
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
  }),
})

export const {
  useGetDealsQuery,
  useAddDealMutation,
  endpoints: { getDeals },
} = dealsEndpoint

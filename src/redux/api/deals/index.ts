import { AddDealRequest, Deal, GetServicesResponse } from 'common/types'
import { api } from 'redux/api'

const dealsEndpoint = api.injectEndpoints({
  endpoints: (build) => ({
    getDeals: build.query<Deal[], void>({
      query: () => ({
        url: 'api/deal/all',
        method: 'GET',
      }),
      transformResponse: (response: GetServicesResponse) => {
        return response.deals
      },
    }),
    addDeal: build.mutation<Deal, AddDealRequest>({
      query: (data) => ({
        url: 'api/add/deal',
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const { useGetDealsQuery, useAddDealMutation } = dealsEndpoint

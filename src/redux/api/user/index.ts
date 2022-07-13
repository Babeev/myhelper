import { api } from 'redux/api'
import { UserInfoResponse } from './types'

const userEndpoint = api.injectEndpoints({
  endpoints: (build) => ({
    getUserInfo: build.query<UserInfoResponse, number | null>({
      query: (id) => ({
        url: `api/user/${id}/info`,
      }),
      providesTags: ['UserInfo'],
    }),
  }),
})

export const {
  useGetUserInfoQuery,
  endpoints: { getUserInfo },
} = userEndpoint

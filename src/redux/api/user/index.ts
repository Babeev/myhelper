import { api } from 'redux/api'
import { UserInfoResponse, UserUpdateRequest } from './types'

const userEndpoint = api.injectEndpoints({
  endpoints: (build) => ({
    getUserInfo: build.query<UserInfoResponse, number | null>({
      query: (id) => ({
        url: `api/user/${id}/info`,
      }),
      providesTags: ['UserInfo'],
    }),
    putUserUpdate: build.mutation<void, UserUpdateRequest>({
      query: ({ id, ...userUpdate }) => ({
        url: `api/user/${id}/update/`,
        method: 'PUT',
        body: userUpdate,
      }),
      invalidatesTags: ['UserInfo'],
    }),
  }),
})

export const {
  useGetUserInfoQuery,
  usePutUserUpdateMutation,
  endpoints: { getUserInfo },
} = userEndpoint

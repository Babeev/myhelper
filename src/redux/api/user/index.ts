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

    getUserAvatar: build.query<Blob | JSON, void>({
      query: () => ({
        url: 'api/user/avatar',
        responseHandler: (response) => {
          return response.blob()
        },
      }),
      providesTags: ['UserAvatar'],
    }),

    putUserUpdate: build.mutation<void, UserUpdateRequest>({
      query: ({ id, ...userUpdate }) => ({
        url: `api/user/${id}/update/`,
        method: 'PUT',
        body: userUpdate,
      }),
      invalidatesTags: ['UserInfo'],
    }),

    deleteUser: build.mutation<void, number | null>({
      query: (id) => ({
        url: `api/user/${id}/delete`,
        method: 'DELETE',
      }),
    }),

    postUserAvatar: build.mutation<void, FormData>({
      query: (data) => ({
        url: 'api/user/avatar',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['UserAvatar'],
    }),
  }),
})

export const {
  useGetUserInfoQuery,
  usePutUserUpdateMutation,
  useDeleteUserMutation,
  usePostUserAvatarMutation,
  useGetUserAvatarQuery,
  endpoints: { getUserInfo, getUserAvatar },
} = userEndpoint

import jwtDecode from 'jwt-decode'
import { api } from 'redux/api'
import { DecodedAccountToken } from 'types'
import {
  GetOAuthTokenRequest,
  GetOAuthTokenResponse,
  SignupRequest,
} from './types'

const authEndpoint = api.injectEndpoints({
  endpoints: (build) => ({
    signup: build.mutation<void, SignupRequest>({
      query: (body) => ({
        url: 'api/add/user',
        method: 'POST',
        body,
      }),
    }),

    getOAuthToken: build.mutation<GetOAuthTokenResponse, GetOAuthTokenRequest>({
      query: ({ login, password }) => ({
        url: `/oauth/token?username=${login}&password=${password}&grant_type=password`,
        method: 'POST',
        headers: {
          Authorization: 'Basic YWNhZGVtaWNzOm15aGVscGVyLWtleQ==',
        },
      }),
      transformResponse: (response: GetOAuthTokenResponse) => {
        const token = response.access_token
        const decodedToken = jwtDecode<DecodedAccountToken>(token)
        const stringId = decodedToken.authorities.find((elem) =>
          /id/.test(elem)
        )
        const parsedStringId = stringId?.split(':')
        const id = parsedStringId?.[1]

        return {
          ...response,
          user_id: Number(id),
        }
      },
    }),
  }),
})

export const {
  useSignupMutation,
  useGetOAuthTokenMutation,
  endpoints: { getOAuthToken },
} = authEndpoint

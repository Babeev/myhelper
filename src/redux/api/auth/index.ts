import { api } from 'redux/api'
import { Deal } from 'types'

interface SignupRequest {
  firstName: string
  lastName: string
  middleName: string
}

interface SignupResponse {
  firstName: string | null
  lastName: string | null
  middleName: string | null
  login: string | null
  number: string | null
  userId: number | null
  deals: Deal[]
}

const authEndpoint = api.injectEndpoints({
  endpoints: (build) => ({
    signup: build.mutation<SignupResponse, SignupRequest>({
      query: (body) => ({
        url: 'api/add/user',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const {
  useSignupMutation,
  endpoints: { signup },
} = authEndpoint

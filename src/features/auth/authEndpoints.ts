import { api } from 'app/api'

interface SignupRequest {
  firstName: string
  lastName: string
  middleName: string
}

const authEndpoint = api.injectEndpoints({
  endpoints: (build) => ({
    signup: build.mutation<string, SignupRequest>({
      query: (body) => ({
        url: 'api/add/user',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useSignupMutation } = authEndpoint

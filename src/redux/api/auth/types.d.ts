export interface SignupRequest {
  firstName: string | null
  lastName: string | null
  middleName: string | null
  login: string | null
  password: string | null
}

export interface GetOAuthTokenRequest {
  login: string
  password: string
}

export interface GetOAuthTokenResponse {
  access_token: string
  token_type: string
  refresh_token: string
  expires_in: number
  user_id: number
}

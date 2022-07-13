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

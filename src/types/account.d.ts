export interface AccountSliceState {
  firstName: string | null
  lastName: string | null
  middleName: string | null
  login: string | null
  number: string | null
  userId: number | null
  isLoggedIn: boolean
}

export interface DecodedAccountToken {
  user_name: string
  authorities: [string, string]
  client_id: string
  exp: number
}

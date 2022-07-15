export interface AccountSliceState {
  firstName: string | null
  lastName: string | null
  middleName: string | null
  login: string | null
  phoneNumber: string | null
  userId: number | null
  isLoggedIn: boolean
  avatarSrc: string | null
}

export interface DecodedAccountToken {
  user_name: string
  authorities: [string, string]
  client_id: string
  exp: number
}

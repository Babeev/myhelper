import { Deal } from './deals'

export interface UserInfoResponse {
  firstName: string | null
  lastName: string | null
  middleName: string | null
  login: string | null
  phoneNumber: string | null
  id: number | null
  placedDeals: Deal[]
}

export interface UserUpdateRequest {
  firstName: string | null
  lastName: string | null
  middleName: string | null
  login: string | null
  password: string | null
  phoneNumber: string | null
  id: number | null
}

import { Deal } from './deals'

export interface UserInfoResponse {
  firstName: string | null
  lastName: string | null
  middleName: string | null
  login?: string | null
  number?: string | null
  id: number | null
  placedDeals: Deal[]
}

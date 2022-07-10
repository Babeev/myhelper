export interface Deal {
  city: string
  date: string
  description: string
  id: number
  name: string
  ownerId: number
  price: number
  subscribers: number[]
}

export interface AddDealRequest {
  city: string | null
  date: string | null
  description: string | null
  name: string | null
  ownerId: number | null
  price: string | null
}

export interface GetServicesResponse {
  deals: Deal[]
}

export interface GetDealsResponse {
  deals: Deal[]
}

export interface AddDealRequest {
  city: string | null
  date: string | null
  description: string | null
  name: string | null
  ownerId: number | null
  price: string | null
}

export interface SubscribeDealRequest {
  dealId: number | null
  subscriberId: number | null
}

export interface UnsubscribeDealRequest {
  dealId: number | null
  subscriberId: number | null
}

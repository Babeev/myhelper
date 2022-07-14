export interface DealsSlice {
  allDeals: Deal[]
  myDeals: Deal[]
}

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

export interface Recipe {
  id: string
  title: string
  description: string
  ingredients: Ingredient[]
  instructions: string
}

export interface Ingredient {
  name: string
  quantity: string
  unit: string
}

export const UNITS = Object.freeze({
  KG: 'kg',
  LB: 'lb',
  PIECE: 'piece',
  CUP: 'cup',
  LITRE: 'litre',
})

export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

export interface RecipesInitialState {
  recipes: Recipe[]
  status: RequestStatus
  error: null | string
}

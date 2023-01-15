import type { RequestStatus } from '../app/types'

export interface Ingredient {
  name: string
  quantity: number
  unit: string
}

export interface Recipe {
  id: string
  title: string
  description: string
  ingredients: Ingredient[]
  instructions: string
}

export interface RecipeState {
  recipes: Recipe[]
  status: RequestStatus
  error: null | string
}

export interface Recipe {
  id: string
  title: string
  description: string
  ingredients: Ingredient[]
}

interface Ingredient {
  name: string
  quantity: string
}

export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

export interface RecipesInitialState {
  recipes: Recipe[]
  status: RequestStatus
  error: null
}

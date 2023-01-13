import { createSlice } from '@reduxjs/toolkit'
import type { Recipe, RecipesInitialState, RequestStatus } from './types'
import { createNewRecipe, fetchRecipes } from './recipes.thunks'

const initialState: RecipesInitialState = {
  recipes: [],
  status: 'idle',
  error: null,
}

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {

  },
  extraReducers(builder) {
    builder
      .addCase(fetchRecipes.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = 'succeeded'

        state.recipes = action.payload
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = 'failed'

        state.error = action.error.message || 'Unknown Error'
      })
      .addCase(createNewRecipe.fulfilled, (state, action) => {
        state.status = 'succeeded'

        state.recipes = [...state.recipes, action.payload]
      })
  },
})

// TODO: Define the State type properly
interface RecipesState {
  recipes: {
    recipes: Recipe[]
    status: RequestStatus
    error: string | null
  }
}

export const selectRecipes = (state: RecipesState) => state.recipes

export default recipesSlice.reducer

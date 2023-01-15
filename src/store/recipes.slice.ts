import { createSlice } from '@reduxjs/toolkit'
import { createNewRecipe, fetchRecipes } from './recipes.thunks'
import type { RecipeState } from './types'
import type { RootState } from '.'

const initialState: RecipeState = {
  recipes: [],
  status: 'idle',
  error: null,
}

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchRecipes.pending, (state) => {
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

export const selectRecipes = (state: RootState) => state.recipes

export default recipesSlice.reducer

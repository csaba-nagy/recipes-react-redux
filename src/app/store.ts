import { configureStore } from '@reduxjs/toolkit'
import recipesReducer from '../features/recipes/recipe.slice'

export const store = configureStore({
  reducer: {
    recipes: recipesReducer,
  },
})

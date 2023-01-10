import { configureStore } from '@reduxjs/toolkit'
import recipesReducer from '../features/recipes/recipes.slice'

export const store = configureStore({
  reducer: {
    recipes: recipesReducer,
  },
})

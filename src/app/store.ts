import { configureStore } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'
import recipesReducer from '../features/recipes/recipes.slice'

export const store = configureStore({
  reducer: {
    recipes: recipesReducer,
  },
  middleware: [thunkMiddleware],
})

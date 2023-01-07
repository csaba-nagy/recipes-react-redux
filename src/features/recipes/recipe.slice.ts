import { createSlice } from '@reduxjs/toolkit'
import type { RecipesInitialState } from './types'

const initialState: RecipesInitialState = {
  recipes: [],
  status: 'idle',
  error: null,
}

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {},
  extraReducers(builder) {

  },
})

export default recipesSlice.reducer

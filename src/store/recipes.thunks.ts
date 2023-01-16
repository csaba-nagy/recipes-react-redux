import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_BASE_URL } from '../app/api'
import type { Recipe } from './types'

export const fetchRecipes = createAsyncThunk('recipes/fetchRecipes', async () => {
  const response = await axios.get(API_BASE_URL)

  return response.data
})

export const createNewRecipe = createAsyncThunk('recipes/createNewRecipe', async (recipe: Recipe) => {
  const response = await axios.post(API_BASE_URL, recipe)

  return response.data
})

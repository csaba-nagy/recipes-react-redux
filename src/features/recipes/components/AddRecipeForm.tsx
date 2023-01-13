import { nanoid } from '@reduxjs/toolkit'
import type { ChangeEvent } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import type { Ingredient, Recipe, RequestStatus } from '../types'
import { UNITS } from '../types'
import { createNewRecipe } from '../recipes.thunks'
import IngredientsList from './IngredientsList'

const AddRecipeForm = () => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [ingredient, setIngredient] = useState<string>('')
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [quantity, setQuantity] = useState<string>('0')
  const [unit, setUnit] = useState<string>('')
  const [instructions, setInstructions] = useState<string>('')
  const [createRequestStatus, setCreateRequestStatus] = useState<RequestStatus>('idle')

  const onTitleChanged = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)
  const onDescriptionChanged = (e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)
  const onIngredientChanged = (e: ChangeEvent<HTMLInputElement>) => setIngredient(e.target.value)
  const OnQuantityChanged = (e: ChangeEvent<HTMLInputElement>) => setQuantity(e.target.value)
  const onUnitChanged = (e: ChangeEvent<HTMLSelectElement>) => setUnit(e.target.value)
  const onInstructionsChanged = (e: ChangeEvent<HTMLTextAreaElement>) => setInstructions(e.target.value)

  const renderUnitOptions = Object
    .values(UNITS)
    .map(unit => (<option value={unit} key={nanoid()}>{unit}</option>))

  const saveIngredient = () => {
    if (!ingredient || quantity === '0' || !unit)
      return

    const newIngredient = {
      name: ingredient,
      quantity,
      unit,
    }

    setIngredients([...ingredients, newIngredient])

    setIngredient('')
    setQuantity('0')
  }

  const ingredientIsSaveable = [ingredient, quantity, unit].every(Boolean)

  const recipeIsSaveable = [title, description, ingredients.length > 0, instructions]
    .every(Boolean)
    && createRequestStatus === 'idle'

  const reset = () => {
    setTitle('')
    setDescription('')
    setInstructions('')
    setIngredients([])
    setUnit('')
    setQuantity('')
    setIngredient('')
  }

  const onCreateClicked = () => {
    if (recipeIsSaveable) {
      try {
        setCreateRequestStatus('loading')

        const newRecipe = {
          title,
          description,
          ingredients,
          instructions,
          id: nanoid(),
        } as Recipe

        dispatch(createNewRecipe(newRecipe)).unwrap()

        reset()
      }
      catch (error) {
        console.error(error)
      }
      finally {
        setCreateRequestStatus('idle')
      }
    }
  }

  return (
    <form className='AddRecipeForm'>
      <h3 className='form-title'>Add new Recipe</h3>
      <div className='recipe-base-data'>
        <input
          type='text'
          id='recipe-title'
          name='recipe-title'
          value={title}
          onChange={onTitleChanged}
          placeholder='Title'
          required
        />
        <textarea
          name='recipe-description'
          id='recipe-description'
          value={description}
          onChange={onDescriptionChanged}
          placeholder='Write a short description (max 500 characters)'
          maxLength={500}
          required
        >
        </textarea>
        <div className='container'>
          <div className='ingredients-form'>
            <h3>Add Ingredients</h3>
            <input
              type='text'
              name='ingredient-name'
              id='ingredient-name'
              value={ingredient}
              onChange={onIngredientChanged}
              placeholder='Add an ingredient'
              maxLength={100}
            />
            <input
              type='number'
              name='ingredient-quantity'
              id='ingredient-quantity'
              value={quantity}
              onChange={OnQuantityChanged}
              min={0}
              max={100}
            />
            <select name='units' id='units' value={unit} onChange={onUnitChanged}>
              <option value='' disabled>Choose a unit</option>
              {renderUnitOptions}
            </select>
            <button
              type='button'
              className='orange-button'
              onClick={saveIngredient}
              disabled={!ingredientIsSaveable}
            >
              Add New Ingredient
            </button>
          </div>
          <div>
            <IngredientsList ingredients={ingredients} setIngredients={setIngredients} />
          </div>
        </div>

      </div>
      <textarea
        name='instructions'
        id='instructions'
        placeholder='Write instructions...'
        className='instructions'
        minLength={10}
        maxLength={1500}
        value={instructions}
        onChange={onInstructionsChanged}
      >
      </textarea>
      <div className='button-container'>
        <button type='button' className='green-button' disabled={!recipeIsSaveable} onClick={onCreateClicked}>Create</button>
        <button type='button' className='red-button' onClick={reset}>Cancel</button>
      </div>
    </form>
  )
}

export default AddRecipeForm

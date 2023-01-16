import type { ChangeEvent, ChangeEventHandler } from 'react'
import { useCallback, useId, useMemo, useState } from 'react'

import { useAppDispatch } from '../../../app/hooks'
import type { RequestStatus } from '../../../app/types'
import { UNITS } from '../../../app/types'
import { createNewRecipe } from '../../../store/recipes.thunks'
import type { Ingredient, Recipe } from '../../../store/types'
import IngredientsList from './IngredientsList'

// TODO: move belongs to the constant maybe
const renderUnitOptions = Object
  .values(UNITS)
  .map(unit => <option value={unit} key={useId()}>{unit}</option>)

interface FormState extends Record<string, unknown> {}

const AddRecipeForm = () => {
  const dispatch = useAppDispatch()

  // TODO: replace whole block with new `const state = useState({})` logic
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [ingredient, setIngredient] = useState('')
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [quantity, setQuantity] = useState(0)
  const [unit, setUnit] = useState('')
  const [instructions, setInstructions] = useState('')
  const [createRequestStatus, setCreateRequestStatus] = useState<RequestStatus>('idle')

  // TODO: solve form state
  const [state, setState] = useState<FormState>({})

  // TODO: is onFormChange correct naming?
  const onFormChange: ChangeEventHandler<HTMLFormElement> = useCallback((event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    })
  }, [state])

  const onTitleChanged: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    setTitle(event.target.value)
  }, [title])

  // TODO: add useCallback to each handler
  const onDescriptionChanged = (e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)
  const onIngredientChanged = (e: ChangeEvent<HTMLInputElement>) => setIngredient(e.target.value)
  const OnQuantityChanged = (e: ChangeEvent<HTMLInputElement>) => setQuantity(e.target.valueAsNumber)
  const onUnitChanged = (e: ChangeEvent<HTMLSelectElement>) => setUnit(e.target.value)
  const onInstructionsChanged = (e: ChangeEvent<HTMLTextAreaElement>) => setInstructions(e.target.value)

  const saveIngredient = useCallback(() => {
    if (!ingredient || quantity === 0 || !unit)
      return

    const newIngredient: Ingredient = {
      name: ingredient,
      quantity,
      unit,
    }

    setIngredients([...ingredients, newIngredient])

    setIngredient('')
    setQuantity(0)
  }, [quantity, ingredient, unit])

  const isIngredientSaveable = useMemo(
    () => [ingredient, quantity, unit].every(Boolean),
    [ingredient, quantity, unit],
  )

  const isRecipeSaveable = useMemo(() => {
    const exists = ingredients.length > 0 && [title, description, instructions].every(Boolean)

    return exists && createRequestStatus === 'idle'
  }, [])

  const reset = () => {
    setTitle('')
    setDescription('')
    setInstructions('')
    setIngredients([])
    setUnit('')
    setQuantity(0)
    setIngredient('')
  }

  const onCreateClicked = useCallback(() => {
    if (!isRecipeSaveable)
      return

    try {
      setCreateRequestStatus('loading')

      const newRecipe: Recipe = {
        title,
        description,
        ingredients,
        instructions,
        id: useId(),
      }

      dispatch(createNewRecipe(newRecipe)).unwrap()
      reset()
    }
    catch (error) {
      console.error(error)
    }

    setCreateRequestStatus('idle')
  }, [title, description, ingredients, instructions])

  // TODO: solve this
  // const hasTitleError = useMemo(() => {
  //   return title.length < 10
  // }, [title])

  return (
    <form className='AddRecipeForm' onChange={onFormChange}>
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
        {/* <span>{hasTitleError ? 'Title must be at least 10 characters' : null}</span> */}
        <textarea
          name='recipe-description'
          id='recipe-description'
          value={description}
          onChange={onDescriptionChanged}
          placeholder='Write a short description (max. 500 characters)'
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
              disabled={!isIngredientSaveable}
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
        <button
          type='button'
          className='green-button'
          disabled={!isRecipeSaveable}
          onClick={onCreateClicked}
        >
            Create
        </button>
        <button type='button' className='red-button' onClick={reset}>Cancel</button>
      </div>
    </form>
  )
}

export default AddRecipeForm

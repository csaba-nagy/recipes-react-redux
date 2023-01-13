import type { Ingredient } from '../types'

const IngredientPanel = (props: { ingredient: Ingredient; ingredients: Ingredient[]; setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>> }) => {
  const { ingredient, setIngredients, ingredients } = props

  const removeIngredient = () => {
    setIngredients(
      ingredients.filter(element => element !== ingredient),
    )
  }
  return (
    <article className='ingredient-panel'>
        <p>{ingredient.name} ({ingredient.quantity} {ingredient.quantity === '1' ? ingredient.unit : `${ingredient.unit}s`})</p>
        <button className='red-button small' onClick={removeIngredient}>X</button>
    </article>
  )
}

export default IngredientPanel

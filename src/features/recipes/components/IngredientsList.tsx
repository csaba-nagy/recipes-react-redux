import type { Ingredient } from '../types'
import IngredientPanel from './IngredientPanel'

const IngredientsList = (props: { ingredients: Ingredient[]; setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>> }) => {
  const { ingredients, setIngredients } = props

  const ingredientList = ingredients.length > 0
    && (ingredients.map(ingredient => <IngredientPanel ingredient={ingredient} setIngredients={setIngredients} ingredients={ingredients} />))

  return (
    <section className='ingredients-list'>
      <h3>Ingredients</h3>
      {ingredientList}
    </section>
  )
}

export default IngredientsList

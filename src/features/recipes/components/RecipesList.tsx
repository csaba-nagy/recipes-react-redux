import { useSelector } from 'react-redux'
import { selectRecipes } from '../recipes.slice'
import RecipeExcerpt from './RecipeExcerpt'

const RecipesList = () => {
  const { recipes, status, error } = useSelector(selectRecipes)

  const setContent = () => {
    if (status === 'loading') {
      return (
        <p>Loading...</p>
      )
    }

    if (status === 'succeeded') {
      return recipes.map(recipe => (
        <RecipeExcerpt {...recipe} key={recipe.id} />
      ))
    }

    if (status === 'failed') {
      return (
        <p>An error occurred: { error }</p>
      )
    }
  }

  return (
    <section>
      {setContent()}
    </section>
  )
}

export default RecipesList

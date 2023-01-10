import { Recipe } from '../types'

const RecipeExcerpt = ({title, description}: Recipe) => {
  return (
    <article>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  )
}

export default RecipeExcerpt

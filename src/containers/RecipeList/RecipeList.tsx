import Link from '../../components/Link/Link'
import Recipe from '../../types/Recipe'

interface Props {
    recipes: Recipe[]
}

const RecipeList = (props: Props) => {

    const { recipes } = props

    return (
        <ul>
            {recipes?.map((recipe, idx) => {
                return (
                <li key={idx}>
                    <Link>{recipe.name}</Link>
                </li>
                )
            })}
        </ul>
    )
}

export default RecipeList
import { Link, List, SubHeaderText, FlexContainer } from '../../components'
import Recipe from '../../types/Recipe'

interface Props {
    recipes: Recipe[]
}

const RecipeList = (props: Props) => {

    const { recipes } = props

    return (
        <List>
            {recipes?.map((recipe, idx) => {
                return (
                <li key={idx}>
                    <Link href={`/${recipe.id}`}>{recipe.name}</Link>
                </li>
                )
            })}
        </List>
    )
}

export default RecipeList
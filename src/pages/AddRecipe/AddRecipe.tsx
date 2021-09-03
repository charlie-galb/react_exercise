import { useHistory } from 'react-router-dom'
import { RouteComponentProps } from '@reach/router'

import RecipeForm from "../../containers/RecipeForm/RecipeForm"
import Recipe from '../../types/Recipe'
import createRecipe from '../../api/createRecipe'

interface Props extends RouteComponentProps {
    recipes: Recipe[]
    setRecipes: (recipes: Recipe[]) => void
}

const AddRecipe = (props: Props) => {
    const { recipes, setRecipes } = props
    return (
        <RecipeForm recipes={recipes} setRecipes={setRecipes} sendToBackend={createRecipe}/>
    )
}

export default AddRecipe
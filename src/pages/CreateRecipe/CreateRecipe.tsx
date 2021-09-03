import { useHistory } from 'react-router-dom'
import { RouteComponentProps } from '@reach/router'

import CreateRecipeForm from "../../containers/CreateRecipeForm/CreateRecipeForm"
import Recipe from '../../types/Recipe'

interface Props extends RouteComponentProps {
    recipes: Recipe[]
    setRecipes: (recipes: Recipe[]) => void
}

const CreateRecipe = (props: Props) => {
    return (
        <CreateRecipeForm />
    )
}

export default CreateRecipe
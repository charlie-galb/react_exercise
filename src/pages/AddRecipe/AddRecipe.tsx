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
    const history = useHistory()

    const createAndAddToRecipes = async (name: string, description: string, ingredients: object[]) => {
        const currentRecipes = recipes
        try {
            const newRecipe = await createRecipe({
                name: name,
                description: description,
                ingredients: ingredients
            })
            setRecipes([...currentRecipes, newRecipe])
            history.push('/')
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <RecipeForm onSubmit={createAndAddToRecipes}/>
        </>
    )
}

export default AddRecipe
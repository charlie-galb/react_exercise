import { useHistory } from 'react-router-dom'

import { Section, HeaderText } from '../../components'
import RecipeForm from "../../containers/RecipeForm/RecipeForm"
import createRecipe from '../../api/createRecipe'

const AddRecipe = () => {
    const history = useHistory()

    const createAndAddToRecipes = async (name: string, description: string, ingredients: object[]) => {
        try {
            await createRecipe({
                name: name,
                description: description,
                ingredients: ingredients
            })
            history.push('/')
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <Section>
            <HeaderText>Add a new recipe</HeaderText>
            <RecipeForm onSubmit={createAndAddToRecipes}/>
        </Section>
    )
}

export default AddRecipe
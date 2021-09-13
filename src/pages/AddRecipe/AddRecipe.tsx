import { useHistory } from 'react-router-dom'

import { useState } from 'react';
import { Section, HeaderText, FlashNotice } from '../../components'
import RecipeForm from "../../containers/RecipeForm/RecipeForm"
import createRecipe from '../../api/createRecipe'

const AddRecipe = () => {
    const history = useHistory()
    const [renderNotice, setRenderNotice] = useState(false)

    const createAndAddToRecipes = async (name: string, description: string, ingredients: object[]) => {
        try {
            await createRecipe({
                name: name,
                description: description,
                ingredients: ingredients
            })
            history.push('/')
        } catch (err) {
            setRenderNotice(true)
            console.error(err)
        }
    }

    return (
        <Section>
            {renderNotice &&
                <FlashNotice data-testid='retrieve-recipes-failed-notice'>
                  Failed to add recipe. Sorry about that.
                </FlashNotice>
              }
            <HeaderText>Add a new recipe</HeaderText>
            <RecipeForm onSubmit={createAndAddToRecipes}/>
        </Section>
    )
}

export default AddRecipe
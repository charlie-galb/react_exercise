import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import RecipeForm from '../../containers/RecipeForm/RecipeForm'
import patchRecipe from '../../api/patchRecipe'
import retrieveAndSetRecipe from '../../utils/retrieveAndSetRecipe'
import RecipeType from '../../types/Recipe'

interface Props {
    recipe?: RecipeType
}

const UpdateRecipe = (props: Props) => {
    const [recipe, setRecipe] = useState<RecipeType>()
    const { id } = useParams<{ id: string }>()
    const history = useHistory()

    useEffect(() => {
        retrieveAndSetRecipe(id, setRecipe)
    }, [id])

    const patchAndUpdateRecipe = async (name: string, description: string, ingredients: object[]) => {
        try {
            const payload = {
                name: name,
                description: description,
                ingredients: ingredients
            }
            const newRecipe = await patchRecipe(id, payload)
            history.push(`/${id}`)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <RecipeForm recipe={recipe} onSubmit={patchAndUpdateRecipe}
            />
        </>
    )
}

export default UpdateRecipe
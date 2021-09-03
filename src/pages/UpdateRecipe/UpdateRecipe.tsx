import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import RecipeForm from '../../containers/RecipeForm/RecipeForm'
import patchRecipe from '../../api/patchRecipe'
import retrieveAndSetRecipe from '../../utils/retrieveAndSetRecipe'
import RecipeType from '../../types/Recipe'

interface Props {
    recipe?: RecipeType
    setRecipes: (recipes: RecipeType[]) => void
    recipes: RecipeType[]
}

const UpdateRecipe = (props: Props) => {
    const { recipes, setRecipes } = props
    const [recipe, setRecipe] = useState<RecipeType>()
    const { id } = useParams<{ id: string }>()
    const history = useHistory()

    useEffect(() => {
        retrieveAndSetRecipe(id, setRecipe)
    }, [])

    const patchAndUpdateRecipe = async (name: string, description: string, ingredients: object[]) => {
        try {
            const currentRecipes = recipes
            const currentId = parseInt(id)
            const payload = {
                name: name,
                description: description,
                ingredients: ingredients
            }
            const newRecipe = await patchRecipe(id, payload)
            const newRecipes = currentRecipes.map((rec) => {
                if (rec.id === currentId) {
                    return newRecipe
                } else {
                    return rec
                }
            })
            setRecipes(newRecipes)
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
import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import RecipeForm from '../../containers/RecipeForm/RecipeForm'
import { FlashNotice } from '../../components'
import patchRecipe from '../../api/patchRecipe'
import retrieveAndSetRecipe from '../../utils/retrieveAndSetRecipe'
import RecipeType from '../../types/Recipe'

const UpdateRecipe = () => {
    const [recipe, setRecipe] = useState<RecipeType>()
    const [renderUpdateFailedNotice, setRenderUpdateFailedNotice] = useState<Boolean>(false)
    const [renderRetrieveFailedNotice, setRenderRetrieveFailedNotice] = useState<Boolean>(false)
    const { id } = useParams<{ id: string }>()
    const history = useHistory()

    useEffect(() => {
        retrieveAndSetRecipe(id, setRecipe, setRenderRetrieveFailedNotice)
    }, [id])

    const patchAndUpdateRecipe = async (name: string, description: string, ingredients: object[] | void[]) => {
        try {
            const payload = {
                name: name,
                description: description,
                ingredients: ingredients
            }
            await patchRecipe(id, payload)
            history.push(`/${id}`)
        } catch (err) {
            setRenderUpdateFailedNotice(true)
            console.error(err)
        }
    }

    return (
        <>
            {renderRetrieveFailedNotice &&
              <FlashNotice data-testid='retrieve-recipes-failed-notice'>
                Failed to retrieve recipe. Sorry about that.
              </FlashNotice>
            }
            <RecipeForm recipe={recipe} onSubmit={patchAndUpdateRecipe}/>
            {renderUpdateFailedNotice &&
              <FlashNotice data-testid='retrieve-recipes-failed-notice'>
                Failed to update recipe. Sorry about that.
              </FlashNotice>
            }
        </>
    )
}

export default UpdateRecipe
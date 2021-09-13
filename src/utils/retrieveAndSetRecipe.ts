import retrieveRecipe from '../api/retrieveRecipe'
import Recipe from '../types/Recipe'

const retrieveAndSetRecipe = async (
    id: string,
    setRecipe: (recipe: Recipe) => void,
    setRenderDeleteFailedNotice: (display: Boolean) => void) => {
    try {
        const retrievedRecipe = await retrieveRecipe(id)
        setRecipe(retrievedRecipe)
    } catch(err) {
        setRenderDeleteFailedNotice(true)
        console.error(err)
    }
}

export default retrieveAndSetRecipe
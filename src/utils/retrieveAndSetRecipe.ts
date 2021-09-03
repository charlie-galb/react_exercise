import retrieveRecipe from '../api/retrieveRecipe'
import Recipe from '../types/Recipe'

const retrieveAndSetRecipe = async (id: string, setRecipe: (recipe: Recipe) => void) => {
    try {
        const retrievedRecipe = await retrieveRecipe(id)
        setRecipe(retrievedRecipe)
    } catch(err) {
        console.error(err)
    }
}

export default retrieveAndSetRecipe
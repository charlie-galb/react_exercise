import axios from 'axios'

import Recipe from '../types/Recipe'

const createRecipe = (payload: object): Promise<Recipe> => 
    axios.post('/api/recipe/recipes/', payload)
        .then(response => {
            return response.data
        })
        .catch(error => console.error(error))

export default createRecipe
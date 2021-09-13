import axios from 'axios'

import Recipe from '../types/Recipe'

const createRecipe = (payload: object): Promise<Recipe> => 
    axios.post('/api/recipe/recipes/', payload)
        .then(response => response.data)

export default createRecipe
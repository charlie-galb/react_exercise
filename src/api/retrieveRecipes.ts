import axios from 'axios'

import Recipe from '../types/Recipe'

const retrieveRecipes = (): Promise<Recipe[]> => 
    axios.get('/api/recipe/recipes/')
        .then(response => {
            return response.data
        })
        .catch(error => console.error(error))

export default retrieveRecipes
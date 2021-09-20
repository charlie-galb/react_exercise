import axios from 'axios'

import Recipe from '../types/Recipe'

const retrieveRecipes = (): Promise<Recipe[]> => 
    axios.get('/api/recipe/recipes/')
        .then(response => response.data)

export default retrieveRecipes
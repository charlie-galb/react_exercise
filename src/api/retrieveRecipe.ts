import axios from 'axios'

import Recipe from '../types/Recipe'

const retrieveRecipe = (id: string): Promise<Recipe> => 
    axios.get(`/api/recipe/recipes/${id}`)
        .then(response => response.data)

export default retrieveRecipe
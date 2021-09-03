import axios from 'axios'

import Recipe from '../types/Recipe'

const retrieveRecipe = (id: string): Promise<Recipe> => 
    axios.get(`/api/recipe/recipes/${id}`)
        .then(response => {
            return response.data
        })
        .catch(error => console.error(error))

export default retrieveRecipe
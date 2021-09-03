import axios from 'axios'

import Recipe from '../types/Recipe'

const patchRecipe = (id: string, payload: object): Promise<Recipe> => 
    axios.patch(`/api/recipe/recipes/${id}/`, payload)
        .then(response => {
            return response.data
        })
        .catch(error => console.error(error))

export default patchRecipe
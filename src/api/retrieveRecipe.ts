import axios from 'axios'

import Recipe from '../types/Recipe'

const retrieveRecipes = (id: string, callback: (responseData: Recipe) => void) => {
    axios.get<Recipe>(`/api/recipe/recipes/${1}`)
        .then(response => {
            callback(response.data)
        })
        .catch(error => console.error(error))
}

export default retrieveRecipes
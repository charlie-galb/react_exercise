import axios from 'axios'

const deleteRecipe = (id: string) =>
   axios.delete(`/api/recipe/recipes/${id}`)
    .then(response => response.status)

export default deleteRecipe
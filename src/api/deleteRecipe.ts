import axios from 'axios'

const deleteRecipe = async (id: string) => {
   try {
       axios.delete(`/api/recipe/recipes/${id}`)
   } catch (err) {
       console.error(err)
   }
}

export default deleteRecipe
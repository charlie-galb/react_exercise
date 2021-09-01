import { useState, useEffect } from 'react'
import axios from 'axios'

import RecipeList from '../../containers/RecipeList/RecipeList'
import Recipe from '../../types/Recipe'

const Home = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([])

    useEffect(() => {
        axios.get<Recipe[]>('/api/recipe/recipes/')
        .then(response => {
            console.log(JSON.stringify(response.data))
            setRecipes(response.data)
        })
        .catch(error => console.error(error))
    }, [])

    return (
        <RecipeList recipes={recipes} />
    )
}

export default Home
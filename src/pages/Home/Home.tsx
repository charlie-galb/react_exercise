import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

import RecipeList from '../../containers/RecipeList/RecipeList'
import Recipe from '../../types/Recipe'
import Section from '../../components/Section'
import Button from '../../components/Button'

const Home = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([])
    const history = useHistory()

    const handleClick = () => {
        history.push('/create_recipe')
    }

    useEffect(() => {
        axios.get<Recipe[]>('/api/recipe/recipes/')
        .then(response => {
            console.log(JSON.stringify(response.data))
            setRecipes(response.data)
        })
        .catch(error => console.error(error))
    }, [])

    return (
        <>  
            <Section>
                <RecipeList recipes={recipes} />
            </Section>
            <Section>
                <Button onClick={handleClick}>Create a new recipe</Button>
            </Section>
        </>
    )
}

export default Home
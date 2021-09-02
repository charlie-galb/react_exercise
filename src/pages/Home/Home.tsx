import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import RecipeList from '../../containers/RecipeList/RecipeList'
import Recipe from '../../types/Recipe'
import Section from '../../components/Section'
import Button from '../../components/Button'
import retrieveRecipes from '../../api/retrieveRecipes'

const Home = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([])
    const history = useHistory()

    const handleClick = () => {
        history.push('/create_recipe')
    }

    useEffect(() => {
        retrieveRecipes(setRecipes)
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
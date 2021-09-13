import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'

import RecipeList from '../../containers/RecipeList/RecipeList'
import { Section, Button, HeaderText, FlashNotice } from '../../components'
import Recipe from '../../types/Recipe'
import retrieveRecipes from '../../api/retrieveRecipes'

const Home = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([])
    const [renderNotice, setRenderNotice] = useState(false)
    const history = useHistory()

    const handleClick = () => {
        history.push('/add_recipe')
    }

    const retrieveAndSetRecipes = async () => {
        try {
          const newRecipes = await retrieveRecipes()
          setRecipes(newRecipes)
        } catch (err) {
          setRenderNotice(true)
          console.error(err)
        }
      }

    useEffect(() => {
        retrieveAndSetRecipes()
      }, [])

    return (
        <Section>
          {renderNotice &&
              <FlashNotice data-testid='retrieve-recipes-failed-notice'>
                Failed to retrieve recipes. Sorry about that.
              </FlashNotice>
            }
          <HeaderText>My Recipes</HeaderText>
          <RecipeList recipes={recipes} />
          <Button onClick={handleClick} data-testid='create-recipe-button'>Create a new recipe</Button>
        </Section>
    )
}

export default Home
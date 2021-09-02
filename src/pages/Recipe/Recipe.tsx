import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import retrieveRecipe from '../../api/retrieveRecipe'
import RecipeType from '../../types/Recipe'
import Ingredient from '../../types/Ingredient'
import { HeaderText, Button, Para, SubHeaderText, List, Section } from '../../components'

const Recipe = () => {
    const { id } = useParams<{ id: string }>()
    const [recipe, setRecipe] = useState<RecipeType>()

    useEffect(() => {
        retrieveRecipe(id, setRecipe)
    }, [])

    return (
        <Section>
            <HeaderText>{recipe && recipe.name}</HeaderText>
            <Para>{recipe && recipe.description}</Para>
            <SubHeaderText>Ingredients</SubHeaderText>
            <List>
                {recipe && recipe.ingredients.map((
                    ingredient: Ingredient, 
                    idx: number) => {
                        return (
                            <li key={idx}>{ingredient.name}</li>
                        )
                })}
            </List>
        </Section>
    )
}

export default Recipe
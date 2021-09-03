import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { RouteComponentProps } from '@reach/router'

import retrieveRecipe from '../../api/retrieveRecipe'
import deleteRecipe from '../../api/deleteRecipe'
import RecipeType from '../../types/Recipe'
import Ingredient from '../../types/Ingredient'
import { HeaderText, Button, Para, SubHeaderText, List, Section } from '../../components'

interface Props extends RouteComponentProps {
    recipes: RecipeType[]
    setRecipes: (recipes: RecipeType[]) => void
}

const Recipe = (props: Props) => {
    const { id } = useParams<{ id: string }>()
    const [recipe, setRecipe] = useState<RecipeType | null>()
    const { recipes, setRecipes } = props
    const history = useHistory()

    const handleDelete = async (event: React.FormEvent) => {
        event.preventDefault()
        await deleteRecipe(id)
        console.log(id)
        const currentId = parseInt(id)
        console.log(currentId)
        let newRecipes = recipes
        newRecipes = newRecipes.filter((recipe: RecipeType) => recipe.id !== currentId)
        console.log(JSON.stringify(newRecipes))
        setRecipes(newRecipes)
        history.push('/')
    }

    useEffect(() => {
        retrieveRecipe(id, setRecipe)
    }, [id])

    return (
        <>
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
            <Section>
                <Button onClick={handleDelete}>Delete</Button>
            </Section>
        </>
    )
}

export default Recipe
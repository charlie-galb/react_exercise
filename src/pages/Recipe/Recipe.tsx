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
        try {
            await deleteRecipe(id)
            console.log('In Delete!')
            const currentId = parseInt(id)
            let newRecipes = recipes
            newRecipes = newRecipes.filter((recipe: RecipeType) => recipe.id !== currentId)
            setRecipes(newRecipes)
            history.push('/')
        } catch (err) {
            console.error(err)
        }
    }

    const retrieveAndSetRecipe = async () => {
        try {
            const retrievedRecipe = await retrieveRecipe(id)
            setRecipe(retrievedRecipe)
        } catch(err) {
            console.error(err)
        }
    }

    useEffect(() => {
        retrieveAndSetRecipe()
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
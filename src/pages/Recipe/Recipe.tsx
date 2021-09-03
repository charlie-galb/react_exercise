import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import { RouteComponentProps } from '@reach/router'

import retrieveAndSetRecipe from '../../utils/retrieveAndSetRecipe'
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
    const [recipe, setRecipe] = useState<RecipeType>()
    const { recipes, setRecipes } = props
    const history = useHistory()

    const handleUpdate = () => {
        history.push(`/${id}/update`)
    }

    const handleDelete = async (event: React.FormEvent) => {
        event.preventDefault()
        try {
            await deleteRecipe(id)
            const currentId = parseInt(id)
            let newRecipes = recipes
            newRecipes = newRecipes.filter((recipe: RecipeType) => recipe.id !== currentId)
            setRecipes(newRecipes)
            history.push('/')
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        retrieveAndSetRecipe(id, setRecipe)
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
                <Button onClick={handleUpdate}>Update</Button>
            </Section>
        </>
    )
}

export default Recipe
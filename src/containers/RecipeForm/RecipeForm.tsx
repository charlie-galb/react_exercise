import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { Form, Button, Input} from '../../components'
import Recipe from '../../types/Recipe'
import RecipeList from '../RecipeList/RecipeList'

interface Props {
    recipe?: Recipe
    sendToBackend: (payload: object) => Promise<Recipe>
    setRecipes: (recipes: Recipe[]) => void
    recipes: Recipe[]
}


const RecipeForm = (props: Props) => {
    const { recipe, recipes, setRecipes, sendToBackend } = props
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [ingredients, setIngredients] = useState([{'name': ''}])
    const history = useHistory()

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        const currentRecipes = recipes
        try {
            const newRecipe = await sendToBackend({
                name: name,
                description: description,
                ingredients: ingredients
            })
            setRecipes([...currentRecipes, newRecipe])
            history.push('/')
        } catch (err) {
            console.error(err)
        }
    }

    const handleNameChange = (event: React.FormEvent<HTMLInputElement>): void => {
        setName(event.currentTarget.value)
    }

    const handleDescriptionChange = (event: React.FormEvent<HTMLInputElement>): void => {
        setDescription(event.currentTarget.value)
    }

    const handleIngredientsChange = (index:  number) => (event: React.FormEvent<HTMLInputElement>): void => {
        let currentIngredients = [...ingredients]
        currentIngredients[index]['name'] = event.currentTarget.value 
        setIngredients([...currentIngredients])
    }

    const handleAddIngredient = (event: React.FormEvent) => {
        event.preventDefault()
        let currentIngredients = [...ingredients]
        setIngredients([...currentIngredients, {'name': ''}])
    }

    const handleRemoveIngredient = (event: React.FormEvent) => {
        event.preventDefault()
        let currentIngredients = ingredients
        currentIngredients.pop()
        setIngredients([...currentIngredients])
    }

    useEffect(() => {
        if (recipe) {
            setName(recipe.name)
            setDescription(recipe.description)
            setIngredients(recipe.ingredients)
        }
    }, [recipe])

    return (
        <Form>
            <Input type='text' 
            placeholder='Name' 
            value={name} 
            onChange={handleNameChange} />
            <Input type='text' 
            placeholder='Description' 
            value={description} 
            onChange={handleDescriptionChange} />
            {ingredients.map((ingredient, index) => (
                <span key={index}>
                    <Input 
                    type='text' 
                    data-testid={`ingredient${index+1}`}
                    placeholder='Name of ingredient' 
                    value={ingredient.name} 
                    onChange={handleIngredientsChange(index)} />
                </span>
            ))}
            <Button onClick={handleAddIngredient}>Add ingredient</Button>
            <Button onClick={handleRemoveIngredient}>Remove ingredient</Button>
            <Button submit={true} primary={true} onClick={handleSubmit}>Submit</Button>
        </Form>
    )
}

export default RecipeForm
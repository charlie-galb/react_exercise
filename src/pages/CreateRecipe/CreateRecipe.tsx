import React, { useState } from 'react'
import axios from 'axios'

import Form from '../../components/Form'
import Input from '../../components/Input'
import Button from '../../components/Button'

const CreateRecipe = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [ingredients, setIngredients] = useState([{'name': ''}])

    const handleSubmit = (event: React.FormEvent): void => {
        event.preventDefault()
        axios.post('/api/recipe/recipes/', {
            name: name,
            description: description,
            ingredients: ingredients
        })
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

export default CreateRecipe
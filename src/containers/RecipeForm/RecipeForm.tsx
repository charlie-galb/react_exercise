import React, { useState, useEffect } from 'react'
import styled from "styled-components"

import { 
    Form, Button, Input, LabelText, FlexContainer, Section, FlashNotice, TextArea
} from '../../components'
import Recipe from '../../types/Recipe'

interface Props {
    recipe?: Recipe
    onSubmit: (name: string, description: string, ingredients: object[]) => Promise<void>
}


const RecipeForm = (props: Props) => {
    const { recipe, onSubmit } = props
    const [renderNotice, setRenderNotice] = useState(false)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [ingredients, setIngredients] = useState([{'name': ''}])

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        if (name && description) {
            onSubmit(name, description, ingredients)
        } else {
            setRenderNotice(true)
            setTimeout(() => { setRenderNotice(false) }, 5000)
        }
    }

    const renderFlashNotice = () => {
        if (renderNotice === true) {
            return (
                <FlashNotice data-testid='empty-fields-notice'>Please fill in name and description fields before submitting</FlashNotice>
            )
        }
    }

    const handleNameChange = (event: React.FormEvent<HTMLInputElement>): void => {
        setName(event.currentTarget.value)
    }

    const handleDescriptionChange = (event: React.FormEvent<HTMLTextAreaElement>): void => {
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
        <Section>
            <Form>
                <LabelText>Name</LabelText>
                <Input type='text'
                data-testid='recipe-name-input' 
                placeholder='Souffle' 
                value={name} 
                onChange={handleNameChange} />
                <LabelText>Description</LabelText>
                <TextArea 
                data-testid='recipe-description-input'
                placeholder='Some kind of inflatable cake' 
                value={description} 
                onChange={handleDescriptionChange} 
                required />
                <LabelText>Ingredients</LabelText>
                {ingredients.map((ingredient, index) => (
                    <StyledSpan key={index}>
                        <Input 
                        type='text' 
                        data-testid={`ingredient${index+1}-name-input`}
                        placeholder='Sugar' 
                        value={ingredient.name} 
                        onChange={handleIngredientsChange(index)} 
                        required />
                    </StyledSpan>
                ))}
                <FlexContainer>
                    <Button onClick={handleAddIngredient} color='green'>Add ingredient</Button>
                    <Button onClick={handleRemoveIngredient}>Remove ingredient</Button>
                </FlexContainer>
                <Button submit={true} primary={true} color='green' onClick={handleSubmit}>Submit</Button>
                {renderFlashNotice()}
            </Form>
        </Section>
    )
}

const StyledSpan = styled.span`
    text-align: center;
    width: 100%;
`

export default RecipeForm
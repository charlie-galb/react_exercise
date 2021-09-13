import React, { useState, useEffect } from 'react'
import styled from "styled-components"
import { v4 as uuidv4 } from 'uuid';

import { 
    Form, Button, Input, LabelText, FlexContainer, Section, FlashNotice, TextArea
} from '../../components'
import Recipe from '../../types/Recipe'

interface Props {
    recipe?: Recipe
    onSubmit: (name: string, description: string, ingredients: object[] | void[]) => Promise<void>
}


const RecipeForm = (props: Props) => {
    const { recipe, onSubmit } = props
    const [renderNotice, setRenderNotice] = useState(false)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [ingredients, setIngredients] = useState<Array<{id: string, name: string}>>([{id: uuidv4(), name: ''}])

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        if (name && description) {
            const processedIngredients = ingredients ? ingredients.map(ingredient => {
                return {name: ingredient.name}
            })
            : []
            onSubmit(name, description, processedIngredients)
        } else {
            setRenderNotice(true)
            setTimeout(() => { setRenderNotice(false) }, 5000)
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
        setIngredients([...currentIngredients, {id: uuidv4(), name: ''}])
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
            const unidentifiedIngredients = recipe.ingredients.map((ingredient) => {
                return {
                    id: uuidv4(),
                    name: ingredient.name || ''
                }
            })
            setIngredients(unidentifiedIngredients)
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
                {renderNotice &&
                    <FlashNotice data-testid='empty-fields-notice'>Please fill in name and description fields before submitting</FlashNotice>
                }
            </Form>
        </Section>
    )
}

const StyledSpan = styled.span`
    text-align: center;
    width: 100%;
`

export default RecipeForm
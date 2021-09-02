import { render, fireEvent, screen } from '@testing-library/react'
import axios from 'axios'

import CreateRecipeForm from './CreateRecipeForm'

jest.mock('axios')

const url = "/api/recipe/recipes/"

const inputAllFields = () => {
    const { getByPlaceholderText, getByTestId, getByText } = render(
        <CreateRecipeForm />
    )
    const nameField = getByPlaceholderText('Name')
    const descriptionField = getByPlaceholderText('Description')
    const ingredientsField = getByTestId('ingredient1')
    const submitButton = getByText('Submit')
    fireEvent.change(nameField, {target: {value: 'Bangers and mash'}})
    fireEvent.change(
        descriptionField, {target: {
            value: 'Cook sausages and mashed potato and mix together.'
        }})
    fireEvent.change(
        ingredientsField, {target: {
            value: 'Bangers'
        }})
}

describe('CreateRecipeForm', () => {
    it('Sends a post request to backend on submit', () => {
        inputAllFields()
        fireEvent.click(screen.getByText('Submit'))
        expect(axios.post).toHaveBeenCalledTimes(1)
        expect(axios.post).toHaveBeenCalledWith(url, {
            name: 'Bangers and mash',
            description: 'Cook sausages and mashed potato and mix together.',
            ingredients: [
                {name: 'Bangers'}
            ]
        })
    })
    it('Allows the user to add multiple ingredients', () => {
        inputAllFields()
        fireEvent.click(screen.getByText('Add ingredient'))
        const ingredientsField2 = screen.getByTestId('ingredient2')
        fireEvent.change(
            ingredientsField2, {target: {
                value: 'Mash'
            }})
        fireEvent.click(screen.getByText('Submit'))
        expect(axios.post).toHaveBeenCalledTimes(1)
        expect(axios.post).toHaveBeenCalledWith(url, {
            name: 'Bangers and mash',
            description: 'Cook sausages and mashed potato and mix together.',
            ingredients: [
                {name: 'Bangers'},
                {name: 'Mash'}
            ]
        })
    })
    it('Allows the user to remove ingredients', () => {
        inputAllFields()
        fireEvent.click(screen.getByText('Add ingredient'))
        const ingredientsField2 = screen.getByTestId('ingredient2')
        fireEvent.change(
            ingredientsField2, {target: {
                value: 'Mash'
            }})
        fireEvent.click(screen.getByText('Remove ingredient'))
        fireEvent.click(screen.getByText('Submit'))
        expect(axios.post).toHaveBeenCalledTimes(1)
        expect(axios.post).toHaveBeenCalledWith(url, {
            name: 'Bangers and mash',
            description: 'Cook sausages and mashed potato and mix together.',
            ingredients: [
                {name: 'Bangers'}
            ]
        })
    })
})
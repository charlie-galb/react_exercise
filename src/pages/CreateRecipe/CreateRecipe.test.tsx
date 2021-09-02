import { render, fireEvent } from '@testing-library/react'
import axios from 'axios'

import CreateRecipe from './CreateRecipe'

jest.mock('axios')

describe('CreateRecipe page', () => {
    it('Sends a post request to backend on submit', () => {
        const page = render(
            <CreateRecipe />
        )
        const url = "/api/recipes/"
        const nameField = page.getByPlaceholderText('Name')
        const descriptionField = page.getByPlaceholderText('Description')
        const ingredientsField = page.getByPlaceholderText('Ingredients')
        const submitButton = page.getByText('Submit')
        fireEvent.change(nameField, {target: {value: 'Bangers and mash'}})
        fireEvent.change(
            descriptionField, {target: {
                value: 'Cook sausages and mashed potato and mix together.'
            }})
        fireEvent.change(
            ingredientsField, {target: {
                value: 'Bangers'
            }})
        fireEvent.click(submitButton)
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
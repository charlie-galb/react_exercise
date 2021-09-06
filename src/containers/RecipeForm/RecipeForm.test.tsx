import { render, fireEvent, screen } from '@testing-library/react'

import RecipeForm from './RecipeForm'
import { recipe1 } from '../../data/testData'

describe('RecipeForm', () => {

    const mockOnSubmit = jest.fn()

    const fillOutFields = () => {
        const component = render(<RecipeForm onSubmit={mockOnSubmit} />)
        const nameField = screen.getByTestId('recipe-name-input')
        const descriptionField = screen.getByTestId('recipe-description-input')
        const ingredientsField = screen.getByTestId('ingredient1-name-input')
        fireEvent.change(nameField, {target: {value: 'Bangers and mash'}})
        fireEvent.change(
            descriptionField, {target: {
                value: 'Cook sausages and mashed potato and mix together.'
            }})
        fireEvent.change(
            ingredientsField, {target: {
                value: 'Bangers'
            }})
        return component
    }

    it('Leaves the fields blank if no values are passed in as props', () => {
        render(<RecipeForm onSubmit={mockOnSubmit} />)
        expect(screen.getByTestId('recipe-name-input')).toHaveValue('')
        expect(screen.getByTestId('recipe-description-input')).toHaveValue('')
        expect(screen.getByTestId('ingredient1-name-input')).toHaveValue('')
    })
    it('Populates the fields with values passed in as props', () => {
        render(<RecipeForm
            onSubmit={mockOnSubmit}
            recipe={recipe1}
            />)
        expect(screen.getByTestId('recipe-name-input')).toHaveValue(recipe1.name)
        expect(screen.getByTestId('recipe-description-input')).toHaveValue(recipe1.description)
        expect(screen.getByTestId('ingredient1-name-input')).toHaveValue(recipe1.ingredients[0].name)
    })
    it('Fires callback on submit', async () => {
        fillOutFields()
        fireEvent.click(screen.getByText('Submit'))
        expect(mockOnSubmit).toHaveBeenCalledTimes(1)
        expect(mockOnSubmit).toHaveBeenCalledWith(
            'Bangers and mash',
            'Cook sausages and mashed potato and mix together.',
            [{name: 'Bangers'}]
        )
    })
    it('Allows the user to add multiple ingredients', () => {
        fillOutFields()
        fireEvent.click(screen.getByText('Add ingredient'))
        const ingredientsField2 = screen.getByTestId('ingredient2-name-input')
        fireEvent.change(
            ingredientsField2, {target: {
                value: 'Mash'
            }})
        fireEvent.click(screen.getByText('Submit'))
        expect(mockOnSubmit).toHaveBeenCalledTimes(1)
        expect(mockOnSubmit).toHaveBeenCalledWith(
            'Bangers and mash',
            'Cook sausages and mashed potato and mix together.',
            [
                {name: 'Bangers'},
                {name: 'Mash'}
            ]
        )
    })
    it('Allows the user to remove ingredients', () => {
        fillOutFields()
        fireEvent.click(screen.getByText('Add ingredient'))
        const ingredientsField2 = screen.getByTestId('ingredient2-name-input')
        fireEvent.change(
            ingredientsField2, {target: {
                value: 'Mash'
            }})
        fireEvent.click(screen.getByText('Remove ingredient'))
        fireEvent.click(screen.getByText('Submit'))
        expect(mockOnSubmit).toHaveBeenCalledTimes(1)
        expect(mockOnSubmit).toHaveBeenCalledWith(
            'Bangers and mash',
            'Cook sausages and mashed potato and mix together.',
            [
                {name: 'Bangers'}
            ]
        )
    })
})
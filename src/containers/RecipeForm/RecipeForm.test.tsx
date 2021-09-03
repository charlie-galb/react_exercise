import { render, fireEvent, screen, act } from '@testing-library/react'

import RecipeForm from './RecipeForm'
import { recipe1, recipeArr } from '../../data/testData'
import renderWithRouter from '../../utils/testUtils/renderWithRouter'

describe('RecipeForm', () => {

    const mockOnSubmit = jest.fn()
    const mockSetRecipes = jest.fn()


    const fillOutFields = () => {
        const component = renderWithRouter(
            <RecipeForm onSubmit={mockOnSubmit} />,
            '/add_recipe'
        )
        const nameField = screen.getByPlaceholderText('Name')
        const descriptionField = screen.getByPlaceholderText('Description')
        const ingredientsField = screen.getByTestId('ingredient1')
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
        expect(screen.getByPlaceholderText('Name')).toHaveValue('')
        expect(screen.getByPlaceholderText('Description')).toHaveValue('')
        expect(screen.getByTestId('ingredient1')).toHaveValue('')
    })
    it('Populates the fields with values passed in as props', () => {
        render(<RecipeForm
            onSubmit={mockOnSubmit}
            recipe={recipe1}
            />)
        expect(screen.getByPlaceholderText('Name')).toHaveValue(recipe1.name)
        expect(screen.getByPlaceholderText('Description')).toHaveValue(recipe1.description)
        expect(screen.getByTestId('ingredient1')).toHaveValue(recipe1.ingredients[0].name)
    })
    it('Sends request to backend on submit and redirects to home', async () => {
        const { history } = fillOutFields()
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
        const ingredientsField2 = screen.getByTestId('ingredient2')
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
        const ingredientsField2 = screen.getByTestId('ingredient2')
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
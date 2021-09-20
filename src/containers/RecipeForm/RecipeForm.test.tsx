import { render, fireEvent, screen, RenderResult } from '@testing-library/react'

import RecipeForm from './RecipeForm'
import RecipeType from '../../types/Recipe'
import Ingredient from '../../types/Ingredient'

const ingredient1: Ingredient = {
    id: 1,
    name: 'Sugar'
}

const ingredient2: Ingredient = {
    id: 2,
    name: 'Flour'
}

const recipe1: RecipeType = {
    id: 1,
    name: 'Nice cake',
    description: 'A lovely bit of cake',
    ingredients: [
        ingredient1,
        ingredient2
    ]
}

describe('RecipeForm', () => {

    const mockOnSubmit = jest.fn()
    const setupComponent = (): RenderResult => render(<RecipeForm onSubmit={mockOnSubmit} />)
    const setupPreFilledComponent = (): RenderResult => render(<RecipeForm recipe={recipe1} onSubmit={mockOnSubmit} />)

    const fillOutFields = () => {
        const nameField = screen.getByTestId('recipe-name-input')
        const descriptionField = screen.getByTestId('recipe-description-input')
        fireEvent.click(screen.getByText('Add ingredient'))
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
    }

    it('Leaves the fields blank if no values are passed in as props', () => {
        setupComponent()
        expect(screen.getByTestId('recipe-name-input')).toHaveValue('')
        expect(screen.getByTestId('recipe-description-input')).toHaveValue('')
        expect(screen.queryByTestId('ingredient1-name-input')).toBeNull()
    })
    it('Will not submit and displays flash notice if "name" and "description" fields are blank', () => {
        setupComponent()
        expect(screen.getByTestId('recipe-name-input')).toHaveValue('')
        fireEvent.click(screen.getByText('Submit'))
        expect(mockOnSubmit).toHaveBeenCalledTimes(0)
        expect(screen.getByTestId('empty-fields-notice')).not.toBeNull()
    })
    it('Populates the fields with values passed in as props', async () => {
        setupPreFilledComponent()
        expect(screen.getByTestId('recipe-name-input')).toHaveValue(recipe1.name)
        expect(screen.getByTestId('recipe-description-input')).toHaveValue(recipe1.description)
        expect(screen.getByTestId('ingredient1-name-input')).toHaveValue(recipe1.ingredients[0].name)
    })
    it('Fires callback on submit', async () => {
        setupComponent()
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
        setupComponent()
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
        setupComponent()
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
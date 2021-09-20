import { fireEvent, waitFor } from '@testing-library/react'
import axios from 'axios'
import { Route } from 'react-router-dom'

import UpdateRecipe from './UpdateRecipe'
import renderWithRouter from '../../utils/testUtils/renderWithRouter'
import Recipe from '../../types/Recipe'
import Ingredient from '../../types/Ingredient'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
const component = <Route path='/:id/update'>
                <UpdateRecipe />
            </Route>

const ingredient1: Ingredient = {
    id: 1,
    name: 'Sugar'
}

const ingredient3: Ingredient = {
    id: 3,
    name: 'Cyanide'
}

const recipe2: Recipe = {
    id: 2,
    name: 'Bad cake',
    description: 'May cause death',
    ingredients: [
        ingredient1,
        ingredient3
    ]
}

describe('UpdateRecipe', () => {
    it('Displays a flash notice if it fails to retrieve the recipe', async () => {
        mockedAxios.get.mockImplementation(() => { throw Error })
        const { getByText } = renderWithRouter(
        component, 
        `/${recipe2.id}/update`
        )
        await waitFor(() => expect(mockedAxios.get).toBeCalledTimes(1))
        expect(getByText('Failed to retrieve recipe. Sorry about that.')).not.toBeNull()
    })
    it('Sends Patch request to backend when submit button is pressed', async () => {
        mockedAxios.get.mockResolvedValue({data: recipe2})
        mockedAxios.patch.mockResolvedValue({data: recipe2})
        const { getByText, getByTestId, history } = renderWithRouter(
        component,
        `/${recipe2.id}/update`
        )
        await waitFor(() => {
            expect(getByTestId('recipe-name-input')).toHaveValue(recipe2.name)
            expect(getByTestId('recipe-description-input')).toHaveValue(recipe2.description)
            expect(getByTestId('ingredient1-name-input')).toHaveValue(recipe2.ingredients[0].name)
        })
        fireEvent.change(getByTestId('recipe-name-input'), {target: {value: 'Bangers and mash'}})
        fireEvent.change(
            getByTestId('recipe-description-input'), {target: {
                value: 'Cook sausages and mashed potato and mix together.'
            }})
        fireEvent.change(
            getByTestId('ingredient1-name-input'), {target: {
                value: 'Bangers'
            }})
        fireEvent.click(getByText('Remove ingredient'))
        fireEvent.click(getByText('Submit'))
        await waitFor(() => {
            expect(mockedAxios.patch).toHaveBeenCalledTimes(1)
            expect(mockedAxios.patch).toHaveBeenCalledWith(`/api/recipe/recipes/${recipe2.id}/`, {
                name: 'Bangers and mash',
                description: 'Cook sausages and mashed potato and mix together.',
                ingredients: [{
                    name: 'Bangers'
                }]
            })
        })
        expect(history.location.pathname).toEqual(`/${recipe2.id}`)
    })
    it('Displays a flash notice if it fails to update the recipe', async () => {
        mockedAxios.get.mockResolvedValue({data: recipe2})
        mockedAxios.patch.mockImplementation(() => { throw Error })
        const { getByText } = renderWithRouter(
        component, 
        `/${recipe2.id}/update`
        )
        await waitFor(() => expect(mockedAxios.get).toBeCalledTimes(1))
        fireEvent.click(getByText('Submit'))
        await waitFor(() => expect(mockedAxios.patch).toBeCalledTimes(1))
        expect(getByText('Failed to update recipe. Sorry about that.')).not.toBeNull()
    })
})


import { fireEvent, act } from '@testing-library/react'
import axios from 'axios'
import { Route } from 'react-router-dom'

import UpdateRecipe from './UpdateRecipe'
import { recipeArr, recipe2 } from '../../data/testData'
import renderWithRouter from '../../utils/testUtils/renderWithRouter'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
const mockSetRecipes = jest.fn().mockResolvedValue(recipeArr)
const component = <Route path='/:id'>
                    <UpdateRecipe recipe={recipe2} recipes={recipeArr} setRecipes={mockSetRecipes} />
                </Route>

describe('UpdateRecipe', () => {
    it('Sends Patch request to backend when submit button is pressed', async () => {
        mockedAxios.get.mockResolvedValue({data: recipe2})
        mockedAxios.patch.mockResolvedValue({data: recipe2})
        const { getByText, history } = renderWithRouter(
        component,
        `/${recipe2.id}/update`
        )
        fireEvent.click(getByText('Submit'))
        await act(() => Promise.resolve())
        expect(mockedAxios.patch).toHaveBeenCalledTimes(1)
        expect(mockSetRecipes).toHaveBeenCalledTimes(1)
        expect(history.location.pathname).toEqual(`/${recipe2.id}`)
    })
})
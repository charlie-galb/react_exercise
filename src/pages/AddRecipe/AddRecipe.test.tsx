import { fireEvent, act } from '@testing-library/react'
import axios from 'axios'
import { Route } from 'react-router-dom'

import AddRecipe from './AddRecipe'
import { recipeArr, recipe2 } from '../../data/testData'
import renderWithRouter from '../../utils/testUtils/renderWithRouter'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
const mockSetRecipes = jest.fn().mockResolvedValue(recipeArr)
const component = <Route path='/add_recipe'>
                    <AddRecipe recipes={recipeArr} setRecipes={mockSetRecipes} />
                </Route>

describe('AddRecipe', () => {
    it('Sends Post request to backend when submit button is pressed', async () => {
        mockedAxios.post.mockResolvedValue({data: recipe2})
        const { getByText, history } = renderWithRouter(
            component,
            '/add_recipe'
        )
        fireEvent.click(getByText('Submit'))
        await act(() => Promise.resolve())
        expect(mockedAxios.post).toHaveBeenCalledTimes(1)
        expect(mockSetRecipes).toHaveBeenCalledTimes(1)
        expect(history.location.pathname).toEqual('/')
    })
})
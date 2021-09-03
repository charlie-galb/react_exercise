import axios from 'axios'
import { render, fireEvent, act } from '@testing-library/react'

import Home from './Home'
import { recipeArr } from '../../data/testData'
import renderWithRouter from '../../utils/testUtils/renderWithRouter'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
const mockRecipes = recipeArr

describe('Home', () => {
    it('redirects when the "Create a new recipe" button is clicked', async () => {
        mockedAxios.get.mockResolvedValue({data: recipeArr})
        const { getByText, history } = renderWithRouter(
        <Home recipes={mockRecipes} />,
        '/'
        )
        await act(() => Promise.resolve())
        const btn = getByText('Create a new recipe')
        fireEvent.click(btn)
        expect(history.location.pathname).toEqual('/create_recipe')
    })
})
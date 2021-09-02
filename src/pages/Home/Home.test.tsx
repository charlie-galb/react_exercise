import axios from 'axios'
import { render, fireEvent, act } from '@testing-library/react'

import Home from './Home'
import { recipeArr } from '../../data/testData'
import renderWithRouter from '../../utils/testUtils/renderWithRouter'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('Home', () => {
    it('retrieves recipes from backend upon rendering', async () => {
        mockedAxios.get.mockResolvedValue({data: recipeArr})
        await act(() => Promise.resolve())
        render(
            <Home />
        )
        expect(mockedAxios.get).toHaveBeenCalledTimes(1)
    })
    it('redirects when the "Create a new recipe" button is clicked', async () => {
        mockedAxios.get.mockResolvedValue({data: recipeArr})
        const { getByText, history } = renderWithRouter(<Home />, '/')
        await act(() => Promise.resolve())
        const btn = getByText('Create a new recipe')
        fireEvent.click(btn)
        expect(history.location.pathname).toEqual('/create_recipe')
    })
})
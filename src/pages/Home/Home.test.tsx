import axios from 'axios'
import { render, fireEvent, act } from '@testing-library/react'

import Home from './Home'
import { recipeArr } from '../../data/testData'
import renderWithRouter from '../../utils/testUtils/renderWithRouter'

jest.mock('axios')

describe('Home', () => {
    it('retrieves recipes from backend upon rendering', () => {
        axios.get.mockResolvedValue({data: recipeArr})
        render(
            <Home />
        )
        expect(axios.get).toHaveBeenCalledTimes(1)
    })
    it('redirects when the "Create a new recipe" button is clicked', async () => {
        axios.get.mockResolvedValue({data: recipeArr})
        const { getByText, history } = renderWithRouter(<Home />, '/')
        const btn = getByText('Create a new recipe')
        fireEvent.click(btn)
        expect(history.location.pathname).toEqual('/create_recipe')
    })
})
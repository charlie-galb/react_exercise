import axios from 'axios'
import { Route } from 'react-router-dom'
import { fireEvent, act } from '@testing-library/react'

import Home from './Home'
import renderWithRouter from '../../utils/testUtils/renderWithRouter'
import Recipe from '../../types/Recipe'
import Ingredient from '../../types/Ingredient'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
const component = <Route path='/'>
                    <Home />
                </Route>

const ingredient1: Ingredient = {
    id: 1,
    name: 'Sugar'
}

const ingredient2: Ingredient = {
    id: 2,
    name: 'Flour'
}

const ingredient3: Ingredient = {
    id: 3,
    name: 'Cyanide'
}

const recipe1: Recipe = {
    id: 1,
    name: 'Nice cake',
    description: 'A lovely bit of cake',
    ingredients: [
        ingredient1,
        ingredient2
    ]
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

const recipeArr: Recipe[] = [
    recipe1, recipe2
]

describe('Home', () => {
    it('redirects when the "Create a new recipe" button is clicked', async () => {
        mockedAxios.get.mockResolvedValue({data: recipeArr})
        const { getByText, history } = renderWithRouter(
        component,
        '/'
        )
        await act(() => Promise.resolve())
        const btn = getByText('Create a new recipe')
        fireEvent.click(btn)
        expect(mockedAxios.get).toHaveBeenCalled()
        expect(history.location.pathname).toEqual('/add_recipe')
    })
    it('displays a flash notice when api call fails', async () => {
        mockedAxios.get.mockImplementation(() => { throw Error })
        const { getByText, history } = renderWithRouter(
        component,
        '/'
        )
        await act(() => Promise.resolve())
        expect(mockedAxios.get).toHaveBeenCalled()
        expect(getByText('Failed to retrieve recipes. Sorry about that.')).not.toBeNull()
    })
})
import axios from 'axios'
import { Route } from 'react-router-dom'
import { fireEvent, act } from '@testing-library/react'

import Home from './Home'
import { recipeArr } from '../../data/testData'
import renderWithRouter from '../../utils/testUtils/renderWithRouter'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
const component = <Route path='/'>
                    <Home />
                </Route>

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
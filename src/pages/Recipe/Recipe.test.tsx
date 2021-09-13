import { screen, act, fireEvent } from '@testing-library/react'
import axios from 'axios'
import { Route } from 'react-router-dom'

import Recipe from './Recipe'
import renderWithRouter from '../../utils/testUtils/renderWithRouter'
import { recipe1 } from '../../data/testData'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
const component = <Route path='/:id'>
                    <Recipe />
                </Route>

describe('Recipe', () => {
    it('Retrieves the recipe from the backend and displays the data', async () => {
        mockedAxios.get.mockResolvedValue({data: recipe1})
        renderWithRouter(
        component, 
        '/1'
        )
        await act(() => Promise.resolve())
        expect(mockedAxios.get).toBeCalledTimes(1)
        expect(screen.getByText('Nice cake')).not.toBeNull()
        expect(screen.getByText('A lovely bit of cake')).not.toBeNull()
        expect(screen.getByText('Sugar')).not.toBeNull()
        expect(screen.getByText('Flour')).not.toBeNull()
    })
    it('Deletes recipe and redirects to home when delete button is pressed', async () => {
        mockedAxios.get.mockResolvedValue({data: recipe1})
        mockedAxios.delete.mockResolvedValue({status: 204})
        const { history, getByText } = renderWithRouter(
            component, 
            '/1'
            )
        await act(() => Promise.resolve())
        expect(mockedAxios.get).toBeCalledTimes(1)
        expect(getByText('Nice cake')).not.toBeNull()
        fireEvent.click(getByText('Delete'))
        await act(() => Promise.resolve())
        expect(mockedAxios.delete).toBeCalledTimes(1)
        expect(history.location.pathname).toEqual('/')
    })
    it('Routes to "/:id/update" path when update button is pressed', async () => {
        mockedAxios.get.mockResolvedValue({data: recipe1})
        const { history, getByText } = renderWithRouter(
            component, 
            '/1'
            )
        await act(() => Promise.resolve())
        fireEvent.click(getByText('Update'))
        await act(() => Promise.resolve())
        expect(history.location.pathname).toEqual('/1/update')
    })
})

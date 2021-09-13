import { screen, act, fireEvent, waitFor } from '@testing-library/react'
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
        await waitFor(() => expect(mockedAxios.get).toBeCalledTimes(1))
        expect(screen.getByText('Nice cake')).not.toBeNull()
        expect(screen.getByText('A lovely bit of cake')).not.toBeNull()
        expect(screen.getByText('Sugar')).not.toBeNull()
        expect(screen.getByText('Flour')).not.toBeNull()
    })
    it('Displays a flash notice if it fails to retrieve the recipe', async () => {
        mockedAxios.get.mockImplementation(() => { throw Error })
        renderWithRouter(
        component, 
        '/1'
        )
        await waitFor(() => expect(mockedAxios.get).toBeCalledTimes(1))
        expect(screen.getByText('Failed to retrieve recipe. Sorry about that.')).not.toBeNull()
    })
    it('Deletes recipe and redirects to home when delete button is pressed', async () => {
        mockedAxios.get.mockResolvedValue({data: recipe1})
        mockedAxios.delete.mockResolvedValue({status: 204})
        const { history, getByText } = renderWithRouter(
            component, 
            '/1'
            )
        await waitFor(() => expect(mockedAxios.get).toBeCalledTimes(1))
        expect(mockedAxios.get).toBeCalledTimes(1)
        expect(getByText('Nice cake')).not.toBeNull()
        fireEvent.click(getByText('Delete'))
        await waitFor(() => expect(mockedAxios.delete).toBeCalledTimes(1))
        expect(history.location.pathname).toEqual('/')
    })
    it('Displays a flash notice if it fails to delete the recipe', async () => {
        mockedAxios.delete.mockImplementation(() => { throw Error })
        const { getByText } = renderWithRouter(
        component, 
        '/1'
        )
        await waitFor(() => expect(mockedAxios.get).toBeCalledTimes(1))
        fireEvent.click(getByText('Delete'))
        await waitFor(() => expect(mockedAxios.delete).toBeCalledTimes(1))
        expect(getByText('Failed to delete recipe. Sorry about that.')).not.toBeNull()
    })
    it('Routes to "/:id/update" path when update button is pressed', async () => {
        mockedAxios.get.mockResolvedValue({data: recipe1})
        const { history, getByText } = renderWithRouter(
            component, 
            '/1'
            )
        await waitFor(() => expect(mockedAxios.get).toBeCalledTimes(1))
        fireEvent.click(getByText('Update'))
        await waitFor(() => expect(history.location.pathname).toEqual('/1/update'))
    })
})

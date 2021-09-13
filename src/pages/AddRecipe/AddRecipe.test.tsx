import { fireEvent, waitFor } from '@testing-library/react'
import axios from 'axios'
import { Route } from 'react-router-dom'

import AddRecipe from './AddRecipe'
import { recipe2 } from '../../data/testData'
import renderWithRouter from '../../utils/testUtils/renderWithRouter'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
const component = <Route path='/add_recipe'>
                    <AddRecipe />
                </Route>

describe('AddRecipe', () => {
    it('Sends Post request to backend when submit button is pressed', async () => {
        mockedAxios.post.mockResolvedValue({data: recipe2})
        const { getByText, getByTestId, history } = renderWithRouter(
            component,
            '/add_recipe'
        )
        fireEvent.change(getByTestId('recipe-name-input'), {target: {value: 'Bangers and mash'}})
        fireEvent.change(
            getByTestId('recipe-description-input'), {target: {
                value: 'Cook sausages and mashed potato and mix together.'
            }})
        fireEvent.change(
            getByTestId('ingredient1-name-input'), {target: {
                value: 'Bangers'
            }})
        fireEvent.click(getByText('Submit'))
        await waitFor(() => {
            expect(mockedAxios.post).toHaveBeenCalledTimes(1)
        })
        expect(history.location.pathname).toEqual('/')
    })
    it('displays a flash notice when api call fails', async () => {
        mockedAxios.get.mockImplementation(() => { throw Error })
        const { getByText, getByTestId } = renderWithRouter(
        component,
        '/add_recipe'
        )
        fireEvent.change(getByTestId('recipe-name-input'), {target: {value: 'Bangers and mash'}})
        fireEvent.change(
            getByTestId('recipe-description-input'), {target: {
                value: 'Cook sausages and mashed potato and mix together.'
            }})
        fireEvent.change(
            getByTestId('ingredient1-name-input'), {target: {
                value: 'Bangers'
            }})
        fireEvent.click(getByText('Submit'))
        fireEvent.click(getByText('Submit'))
        await waitFor(() => {
            expect(mockedAxios.post).toHaveBeenCalled()
            expect(getByText('Failed to add recipe. Sorry about that.')).not.toBeNull()
        })
    })
})
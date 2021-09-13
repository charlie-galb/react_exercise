import { fireEvent, waitFor } from '@testing-library/react'
import axios from 'axios'
import { Route } from 'react-router-dom'

import UpdateRecipe from './UpdateRecipe'
import { recipe2 } from '../../data/testData'
import renderWithRouter from '../../utils/testUtils/renderWithRouter'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
const component = <Route path='/:id/update'>
                    <UpdateRecipe recipe={recipe2} />
                </Route>

describe('UpdateRecipe', () => {
    it('Sends Patch request to backend when submit button is pressed', async () => {
        mockedAxios.get.mockResolvedValue({data: recipe2})
        mockedAxios.patch.mockResolvedValue({data: recipe2})
        const { getByText, getByTestId, history } = renderWithRouter(
        component,
        `/${recipe2.id}/update`
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
            expect(mockedAxios.patch).toHaveBeenCalledTimes(1)
            expect(mockedAxios.patch).toHaveBeenCalledWith(`/api/recipe/recipes/${recipe2.id}/`, {
                name: 'Bangers and mash',
                description: 'Cook sausages and mashed potato and mix together.',
                ingredients: [{
                    name: 'Bangers'
                }]
            })
        })
        expect(history.location.pathname).toEqual(`/${recipe2.id}`)
    })
})
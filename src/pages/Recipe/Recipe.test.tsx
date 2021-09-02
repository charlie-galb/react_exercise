import { screen, act } from '@testing-library/react'
import axios from 'axios'

import Recipe from './Recipe'
import renderWithRouter from '../../utils/testUtils/renderWithRouter'
import { recipe1 } from '../../data/testData'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('Recipe', () => {
    it('Retrieves the recipe from the backend and displays the data', async () => {
        mockedAxios.get.mockResolvedValue({data: recipe1})
        renderWithRouter(<Recipe />, '/1')
        await act(() => Promise.resolve())
        expect(mockedAxios.get).toBeCalledTimes(1)
        expect(screen.getByText('Nice cake')).not.toBeNull()
        expect(screen.getByText('A lovely bit of cake')).not.toBeNull()
        expect(screen.getByText('Sugar')).not.toBeNull()
        expect(screen.getByText('Flour')).not.toBeNull()
    })
})

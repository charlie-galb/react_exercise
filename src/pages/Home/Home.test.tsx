import axios from 'axios'
import { render } from '@testing-library/react'

import Home from './Home'
import { recipeArr } from '../../data/testData'

jest.mock('axios')

describe('Home', () => {
    it('retrieves recipes from backend upon rendering', () => {
        axios.get.mockResolvedValue({data: recipeArr})
        render(
            <Home />
        )
        expect(axios.get).toHaveBeenCalledTimes(1)
    })
})
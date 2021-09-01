import { render } from '@testing-library/react'

import RecipeList from './RecipeList'
import { recipeArr } from '../../data/testData'

describe('Home', () => {
    it('Retrieves and displays a list of recipes', () => {
    
        const list = render(
            <RecipeList recipes={recipeArr}/>
        )
        expect(list.getAllByRole('listitem').length).toEqual(2)
        expect(list.queryAllByText('Death cake')).not.toBeNull()
    })
})
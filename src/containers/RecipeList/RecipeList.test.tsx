import { render } from '@testing-library/react'

import RecipeList from './RecipeList'
import { recipeArr } from '../../data/testData'

describe('Home', () => {
    it('Retrieves and displays a list of recipes', () => {
    
        const { getAllByRole, getByText } = render(
            <RecipeList recipes={recipeArr}/>
        )
        expect(getAllByRole('listitem').length).toEqual(2)
        expect(getByText(recipeArr[0].name)).not.toBeNull()
    })
    it('Passes the recipe id to the link element', async () => {
        const { getByText } = render(
            <RecipeList recipes={recipeArr}/>
        )
        expect(getByText(recipeArr[1].name)).toHaveAttribute('href', `/${recipeArr[1].id}`)
    })
})
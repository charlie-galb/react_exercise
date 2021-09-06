import { render } from '@testing-library/react'

import RecipeList from './RecipeList'
import { recipeArr } from '../../data/testData'
import Recipe from '../../types/Recipe'

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
    it('Truncates the description to 30 characters', async () => {
        const longRecipe: Recipe = {
            id: 4,
            name: 'A Long Recipe',
            description: 'This is a long description with over thirty characters',
            ingredients: [{id: 7, name: 'Random ingredient'}]
        }
        recipeArr.push(longRecipe)
        const { getByTestId } = render(
            <RecipeList recipes={recipeArr}/>
        )
        const truncatedDescription = `${recipeArr[2].description.substring(0, 30)}...`

        expect(getByTestId(`recipe${recipeArr[2].id}-description`))
            .toHaveTextContent(truncatedDescription)
    })
})
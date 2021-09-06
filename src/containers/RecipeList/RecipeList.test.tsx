import RecipeList from './RecipeList'
import { recipeArr } from '../../data/testData'
import Recipe from '../../types/Recipe'
import renderWithRouter from '../../utils/testUtils/renderWithRouter'

describe('Home', () => {

    it('Retrieves and displays a list of recipes', () => {

        const { getAllByRole, getByText } = renderWithRouter(
        <RecipeList recipes={recipeArr}/>, '/'
        )
        expect(getAllByRole('listitem').length).toEqual(2)
        expect(getByText(recipeArr[0].name)).not.toBeNull()
    })
    it('Passes the recipe id to the link element', () => {
        const { getByText } = renderWithRouter(
            <RecipeList recipes={recipeArr}/>, '/'
            )
        expect(getByText(recipeArr[0].name)).not.toBeNull()
        expect(getByText(recipeArr[1].name)).not.toBeNull()
        expect(getByText(recipeArr[1].name)).toHaveAttribute('href', `/${recipeArr[1].id}`)
    })
    it('Truncates long descriptions to 30 characters', async () => {
        const longRecipe: Recipe = {
            id: 4,
            name: 'A Long Recipe',
            description: 'This is a long description with over thirty characters',
            ingredients: [{id: 7, name: 'Random ingredient'}]
        }
        recipeArr.push(longRecipe)
        const { getByTestId } = renderWithRouter(
            <RecipeList recipes={recipeArr}/>,
            '/'
            )
        const truncatedDescription = `${recipeArr[2].description.substring(0, 30)}...`

        expect(getByTestId(`recipe${recipeArr[2].id}-description`))
            .toHaveTextContent(truncatedDescription)
    })
    it('Does not apply ellipsis to short descriptions', async () => {
        const { getByTestId } = renderWithRouter(
            <RecipeList recipes={recipeArr}/>,
            '/'
            )
        expect(getByTestId(`recipe${recipeArr[1].id}-description`))
            .not.toHaveTextContent('...')
    })
})
import RecipeList from './RecipeList'
import Recipe from '../../types/Recipe'
import renderWithRouter from '../../utils/testUtils/renderWithRouter'
import RecipeType from '../../types/Recipe'
import Ingredient from '../../types/Ingredient'

const ingredient1: Ingredient = {
    id: 1,
    name: 'Sugar'
}

const ingredient2: Ingredient = {
    id: 2,
    name: 'Flour'
}

const ingredient3: Ingredient = {
    id: 3,
    name: 'Cyanide'
}

const recipe1: RecipeType = {
    id: 1,
    name: 'Nice cake',
    description: 'A lovely bit of cake',
    ingredients: [
        ingredient1,
        ingredient2
    ]
}

const recipe2: RecipeType = {
    id: 2,
    name: 'Bad cake',
    description: 'May cause death',
    ingredients: [
        ingredient1,
        ingredient3
    ]
}

const recipeArr: RecipeType[] = [
    recipe1, recipe2
]

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
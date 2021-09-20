import Ingredient from './Ingredient'

type Recipe = {
    id: number,
    name: string,
    description: string,
    ingredients: Ingredient[],
}

export default Recipe
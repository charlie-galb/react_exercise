import Recipe from '../types/Recipe'
import Ingredient from '../types/Ingredient'

export const ingredient1: Ingredient = {
    id: 1,
    name: 'Sugar'
}

export const ingredient2: Ingredient = {
    id: 2,
    name: 'Flour'
}

export const ingredient3: Ingredient = {
    id: 3,
    name: 'Cyanide'
}

export const recipe1: Recipe = {
    id: 1,
    name: 'Nice cake',
    description: 'A lovely bit of cake',
    ingredients: [
        ingredient1,
        ingredient2
    ]
}

export const recipe2: Recipe = {
    id: 2,
    name: 'Bad cake',
    description: 'May cause death',
    ingredients: [
        ingredient1,
        ingredient3
    ]
}

export const recipeArr: Recipe[] = [
    recipe1, recipe2
]
import styled, { css } from 'styled-components'

import Link from '../../components/Link'
import Recipe from '../../types/Recipe'

interface Props {
    recipes: Recipe[]
}

const RecipeList = (props: Props) => {

    const { recipes } = props

    return (
        <StyledList>
            {recipes?.map((recipe, idx) => {
                return (
                <li key={idx}>
                    <Link>{recipe.name}</Link>
                </li>
                )
            })}
        </StyledList>
    )
}

const StyledList = styled.ul`
    list-style-type: none;
`

export default RecipeList
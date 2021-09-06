import { Link, List, Para, FlexContainer, StyledDiv } from '../../components'
import Recipe from '../../types/Recipe'

interface Props {
    recipes: Recipe[]
}

const RecipeList = (props: Props) => {

    const { recipes } = props

    const truncateDescription = (description: string) => {
        if (description.length > 30) {
            return `${description.substring(0, 30)}...`
        }
        return description
    }

    return (
        <List>
            {recipes?.map((recipe, idx) => {
                return (
                <li key={idx}>
                    <FlexContainer>
                        <StyledDiv>
                            <Link data-testid={`recipe${recipe.id}-link`} to={`/${recipe.id}`}>
                                {recipe.name}
                                </Link>
                        </StyledDiv>
                        <StyledDiv>
                            <Para data-testid={`recipe${recipe.id}-description`}>
                                {truncateDescription(recipe.description)}
                                </Para>
                        </StyledDiv>
                    </FlexContainer>
                </li>
                )
            })}
        </List>
    )
}

export default RecipeList
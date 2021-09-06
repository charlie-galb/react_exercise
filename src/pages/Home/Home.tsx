import { useHistory } from 'react-router-dom'
import { RouteComponentProps } from '@reach/router'

import RecipeList from '../../containers/RecipeList/RecipeList'
import { Section, Button, HeaderText } from '../../components'
import Recipe from '../../types/Recipe'

interface Props extends RouteComponentProps {
    recipes: Recipe[]
}

const Home = (props: Props) => {
    const history = useHistory()

    const { recipes } = props

    const handleClick = () => {
        history.push('/add_recipe')
    }

    return (
        <Section>
            <HeaderText>My Recipes</HeaderText>
                <RecipeList recipes={recipes} />
                <Button onClick={handleClick}>Create a new recipe</Button>
        </Section>
    )
}

export default Home
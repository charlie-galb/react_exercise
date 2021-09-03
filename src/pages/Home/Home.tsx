import { useHistory } from 'react-router-dom'
import { RouteComponentProps } from '@reach/router'

import RecipeList from '../../containers/RecipeList/RecipeList'
import Section from '../../components/Section'
import Button from '../../components/Button'
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
        <>  
            <Section>
                <RecipeList recipes={recipes} />
            </Section>
            <Section>
                <Button onClick={handleClick}>Create a new recipe</Button>
            </Section>
        </>
    )
}

export default Home
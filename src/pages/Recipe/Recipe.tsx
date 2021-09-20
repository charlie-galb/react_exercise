import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom';

import retrieveAndSetRecipe from '../../utils/retrieveAndSetRecipe'
import deleteRecipe from '../../api/deleteRecipe'
import RecipeType from '../../types/Recipe'
import Ingredient from '../../types/Ingredient'
import { 
    HeaderText, Button, Para, SubHeaderText, List,
    Section, FlexContainer, StyledDiv, FlashNotice
} from '../../components'

const Recipe = () => {
    const { id } = useParams<{ id: string }>()
    const [recipe, setRecipe] = useState<RecipeType>()
    const [renderDeleteFailedNotice, setRenderDeleteFailedNotice] = useState<Boolean>(false)
    const [renderRetrieveFailedNotice, setRenderRetrieveFailedNotice] = useState<Boolean>(false)
    const history = useHistory()

    const handleUpdate = () => {
        history.push(`/${id}/update`)
    }

    const handleDelete = async (event: React.FormEvent) => {
        event.preventDefault()
        try {
            await deleteRecipe(id)
            history.push('/')
        } catch (err) {
            setRenderDeleteFailedNotice(true)
            console.error(err)
        }
    }

    useEffect(() => {
        retrieveAndSetRecipe(id, setRecipe, setRenderRetrieveFailedNotice)
    }, [id])

    return (
        <Section>
            {renderRetrieveFailedNotice &&
              <FlashNotice data-testid='retrieve-recipes-failed-notice'>
                Failed to retrieve recipe. Sorry about that.
              </FlashNotice>
            }
            <HeaderText>{recipe && recipe.name}</HeaderText>
            <FlexContainer>
                <StyledDiv width='75%'>
                    <SubHeaderText>Description</SubHeaderText>
                    <Para>{recipe && recipe.description}</Para>
                </StyledDiv>
                <StyledDiv width='25%'>
                    <SubHeaderText>Ingredients</SubHeaderText>
                    <List listStyle='circle'>
                        {recipe && recipe.ingredients.map((
                            ingredient: Ingredient, 
                            idx: number) => {
                                return (
                                    <li key={idx}>{ingredient.name}</li>
                                )
                        })}
                    </List>
                </StyledDiv>
            </FlexContainer>
            <FlexContainer width='40%'>
                <Button onClick={handleDelete} primary={true}>Delete</Button>
                <Button onClick={handleUpdate} primary={true} color='green'>Update</Button>
            </FlexContainer>
            {renderDeleteFailedNotice &&
              <FlashNotice data-testid='retrieve-recipes-failed-notice'>
                Failed to delete recipe. Sorry about that.
              </FlashNotice>
            }
        </Section>
    )
}

export default Recipe
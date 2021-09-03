import styled, { css } from "styled-components"

interface Props {
    children: React.ReactNode
    column?: string
}

const FlexContainer = styled.div<Props>`
    border: solid blue 2px;
    display: flex;
    margin-left: auto;
    margin-right: auto;
    margin-top: 5px;
    margin-bottom: 5px;
    padding: 10px;
    width: 80%;

    ${props =>
    props.column &&
    css`
    flex-direction: ${props.column};`}
`

export default FlexContainer
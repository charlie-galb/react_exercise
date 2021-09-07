import styled from "styled-components"

interface Props {
    children: React.ReactNode
    flexDirection?: string
    width?: string
}

const FlexContainer = styled.div<Props>`
    display: flex;
    flex-direction: ${props => props.flexDirection || 'row'};
    margin-left: auto;
    margin-right: auto;
    margin-top: 5px;
    margin-bottom: 5px;
    padding: 10px;
    width: ${props => props.width || '80%' }
`

export default FlexContainer
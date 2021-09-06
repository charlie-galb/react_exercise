import styled from "styled-components"

interface Props {
    children: React.ReactNode
    textAlign?: string
    width?:string
}

const StyledDiv = styled.div<Props>`
    padding: 5px;
    text-align: ${props => props.textAlign || 'left' };
    width: ${props => props.width || '50%' };
`

export default StyledDiv
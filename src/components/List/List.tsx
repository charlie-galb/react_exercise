import styled from 'styled-components'

interface Props {
    listStyle?:string
}

const List = styled.ul<Props>`
    list-style-type: ${props => props.listStyle || 'none'};
    padding: 5px
`

export default List
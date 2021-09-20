import styled from "styled-components"
import { Link } from 'react-router-dom';

interface Props {
    disableStyling?: boolean
}

const StyledLink = styled(Link)<Props>`
    color: green;

    ${props =>
        props.disableStyling &&
        `
         text-decoration: none;
         color: black;
        `}
`

export default StyledLink
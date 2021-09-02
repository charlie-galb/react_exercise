import styled from "styled-components"

interface Props {
    children: React.ReactNode
}

const Link: React.FC<Props> = (props: Props) => {
    const { children } = props
    return (
        <StyledLink href='#'>{children}</StyledLink>
    )
}

const StyledLink = styled.a`
    color: green;
`

export default Link
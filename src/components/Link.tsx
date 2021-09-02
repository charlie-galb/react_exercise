import styled from "styled-components"

interface Props {
    children: React.ReactNode
    href: string
}

const Link: React.FC<Props> = (props: Props) => {
    const { children, href } = props
    return (
        <StyledLink href={href}>{children}</StyledLink>
    )
}

const StyledLink = styled.a`
    color: green;
`

export default Link
import styled from "styled-components"

interface Props {
    children: React.ReactNode
}

const Link: React.FC<Props> = (props: Props) => {
    const { children } = props
    return (
        <LinkText>{children}</LinkText>
    )
}

const LinkText = styled.a`
    color: green;
`

export default Link
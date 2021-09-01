import styled from "styled-components"

interface Props {
    children: React.ReactNode
}

const Header: React.FC<Props> = (props: Props) => {
    const { children } = props
    return (
        <HeaderText>{children}</HeaderText>
    )
}

const HeaderText = styled.h1`
    background-color: red;
    text-align: center;
`

export default Header
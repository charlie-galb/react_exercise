import styled from "styled-components"

interface Props {
    children?: React.ReactNode

}

const Section: React.FC<Props> = (props: Props) => {
    const { children } = props
    return (
        <StyledSection>{children}</StyledSection>
    )
}

const StyledSection = styled.section`
    background-color: yellow;
    margin: auto;
    padding: 10px;
    width: 80%;
`

export default Section
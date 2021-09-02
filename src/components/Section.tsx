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
    border: solid black 2px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 5px;
    margin-bottom: 5px;
    padding: 10px;
    width: 80%;
`

export default Section
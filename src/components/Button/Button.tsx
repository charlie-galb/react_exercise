import styled, { css } from 'styled-components'

interface Props {
    children: React.ReactNode
    color?: string
    primary?: boolean
    submit?:boolean
}

const Button = styled.button<Props>`
  background: transparent;
  border-radius: 3px;
  border: 2px solid ${props => props.color || 'red'};
  color: ${props => props.color || 'red'};
  margin: 0 auto;
  display: block;
  padding: 0.25em 1em;

  &:hover {
    background-color: ${props => props.color || 'red'};
    color: white;
    cursor: pointer;
  }

  ${props =>
    props.primary &&
    css`
      background: ${props.color || 'red'};
      color: white;

      &:hover {
        background: transparent;
        color: ${props.color || 'red'};
        cursor: pointer;
      }
    `};
`

export default Button
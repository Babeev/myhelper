import styled from 'styled-components'

export const StyledHeader = styled.h1<{
  fontSize?: string
  opacity?: string
  cursor?: string
}>`
  font-size: ${({ fontSize }) => fontSize || '2rem'};
  cursor: ${({ cursor }) => cursor || 'auto'};
  margin: 0;

  &:hover {
    opacity: ${({ opacity }) => opacity || 1};
  }
`

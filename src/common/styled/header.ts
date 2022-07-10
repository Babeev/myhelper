import styled from 'styled-components'

export const Header = styled.h1<{
  fontSize?: string
  margin?: string
  opacity?: string
  cursor?: string
}>`
  font-size: ${({ fontSize }) => fontSize || '2rem'};
  margin: ${({ margin }) => margin || 'margin'};
  cursor: ${({ cursor }) => cursor || 'auto'};

  &:hover {
    opacity: ${({ opacity }) => opacity || 1};
  }
`

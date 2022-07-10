import styled from 'styled-components'

export const Header = styled.h1<{ fontSize?: string; margin?: string }>`
  font-size: ${({ fontSize }) => fontSize || '2rem'};
  margin: ${({ margin }) => margin || 'margin'};
`
